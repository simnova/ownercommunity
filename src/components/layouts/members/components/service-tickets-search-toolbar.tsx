import React, { useEffect, useState } from 'react';
import { Select, Button, Typography, Modal, Space, Input, message } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { ServiceTicketsSearchTags } from './service-tickets-search-tags';
import {
  SetSearchParamsFromServiceTicketFilter,
  ServiceTicketSearchParamKeys,
  GetSelectedFilterTags,
  CustomViewOperation
} from '../../../../constants';
import { useSearchParams } from 'react-router-dom';
import {
  CustomView,
  CustomViewInput,
  Member,
  MemberMutationResult,
  MemberNameServiceTicketContainerQuery,
  MemberServiceTicketCustomViewsQuery
} from '../../../../generated';

const { Option } = Select;
const { Text } = Typography;

interface ServiceTicketsSearchToolbarProps {
  memberData: MemberNameServiceTicketContainerQuery;
  customViewsData?: MemberServiceTicketCustomViewsQuery;
  handleUpdateCustomView: (
    memberId: string,
    customViews: CustomViewInput[],
    operation: CustomViewOperation
  ) => Promise<MemberMutationResult | undefined>;
}

//create your forceUpdate hook
function useForceUpdate() {
  const [value, setValue] = useState(0); // integer state
  return () => setValue((value) => value + 1); // update state to force render
  // An function that increment 👆🏻 the previous state like here
  // is better than directly setting `value + 1`
}

const columnOptions = ['Title', 'Requestor', 'Assigned To', 'Priority', 'Updated', 'Created'];

export const ServiceTicketsSearchToolbar: React.FC<ServiceTicketsSearchToolbarProps> = (props) => {
  const forceUpdate = useForceUpdate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [isSaveModalVisible, setIsSaveModalVisible] = useState(false);
  const [savedFilterNameInput, setSavedFilterNameInput] = useState('');
  const [selectedSavedFilterName, setSelectedSavedViewName] = useState<string | undefined>(undefined);

  const [customViews, setCustomViews] = useState<CustomView[]>([]);
  const [columnsToDisplay, setColumnsToDisplay] = useState<string[] | undefined>(
    searchParams.get(ServiceTicketSearchParamKeys.Column)?.split(',') ?? []
  );

  useEffect(() => {
    if (props.customViewsData?.memberForCurrentUser?.customViews) {
      const customViews = props.customViewsData?.memberForCurrentUser?.customViews as CustomView[] ?? [];
      const systemCustomViews = customViews.filter((view) => view.type === 'SERVICE_TICKET');
      setCustomViews(systemCustomViews);
    }
  }, [props.customViewsData?.memberForCurrentUser?.customViews]);

  // get selected filters from url (after page refresh)
  useEffect(() => {
    const savedFilterName = searchParams.get(ServiceTicketSearchParamKeys.SavedView);
    if (savedFilterName) {
      setSelectedSavedViewName(savedFilterName);
    }
  }, []);

  const updateCustomView = async () => {
    let customViewInputs: CustomViewInput[] = [];
    const currentViews = JSON.parse(JSON.stringify(customViews));
    currentViews.forEach((view: CustomView) => {
      if (view.name === selectedSavedFilterName) {
        const updatedFilters = GetSelectedFilterTags(searchParams, props.memberData.membersByCommunityId as Member[]);
        const updatedSortOrder = searchParams.get(ServiceTicketSearchParamKeys.Sort) ?? '';
        const updatedColumnsToDisplay = searchParams.get(ServiceTicketSearchParamKeys.Column);
        // update
        customViewInputs.push({
          name: view.name,
          type: 'SERVICE_TICKET',
          id: view.id,
          filters: GetSelectedFilterTags(searchParams, props.memberData.membersByCommunityId as Member[]),
          sortOrder: updatedSortOrder,
          columnsToDisplay: updatedColumnsToDisplay ? updatedColumnsToDisplay.split(',') : []
        });
        view.filters = updatedFilters;
        view.sortOrder = updatedSortOrder;
      } else {
        customViewInputs.push({
          id: view.id,
          name: view.name,
          type: view.type,
          filters: view.filters,
          sortOrder: view.sortOrder,
          columnsToDisplay: view.columnsToDisplay
        });
      }
    });
    message.loading({
      content: `Updating filter "${selectedSavedFilterName}"`,
      key: 'save-custom-view-loading'
    });
    await props.handleUpdateCustomView(
      props.customViewsData?.memberForCurrentUser?.id,
      customViewInputs,
      CustomViewOperation.Update
    );
    setCustomViews(currentViews);
    // forceUpdate();
  };

  const saveNewCustomView = async () => {
    // check if filter name is already exists
    if (customViews.find((view: any) => view.name === savedFilterNameInput)) {
      message.error(`Filter name "${savedFilterNameInput}" already exists`);
      return;
    }
    const qscolumnsToDisplay = searchParams.get(ServiceTicketSearchParamKeys.Column);
    let customViewInputs: CustomViewInput[] = [];
    let newCustomView: CustomViewInput = {
      name: savedFilterNameInput,
      type: 'SERVICE_TICKET',
      filters: GetSelectedFilterTags(searchParams, (props.memberData.membersByCommunityId as Member[]) ?? []),
      sortOrder: searchParams.get(ServiceTicketSearchParamKeys.Sort) ?? '',
      columnsToDisplay: qscolumnsToDisplay ? qscolumnsToDisplay.split(',') : []
    };
    customViewInputs.push(newCustomView);
    customViews.forEach((view) => {
      customViewInputs.push({
        id: view.id,
        name: view.name,
        type: view.type,
        filters: view.filters,
        sortOrder: view.sortOrder,
        columnsToDisplay: view.columnsToDisplay
      });
    });

    message.loading({
      key: 'save-custom-view-loading',
      content: `Saving filter "${savedFilterNameInput}"`
    });
    await props.handleUpdateCustomView(
      props.customViewsData?.memberForCurrentUser?.id,
      customViewInputs,
      CustomViewOperation.Create
    ).then(data =>{
      setCustomViews(data?.member?.customViews as CustomView[]);
      onSelectViewChanged(savedFilterNameInput);
      setSavedFilterNameInput('');
      setIsSaveModalVisible(false);
      forceUpdate();
    });
   
  };

  const deleteCustomView = async (id: string) => {
    if (id) {
      const updatedViews = customViews.filter((view) => view.id !== id);
      const deletedView = customViews.find((view) => view.id === id);

      let customViewInputs: CustomViewInput[] = updatedViews.map((view) => {
        return {
          id: view.id,
          name: view.name,
          type: view.type,
          filters: view.filters,
          sortOrder: view.sortOrder,
          columnsToDisplay: view.columnsToDisplay
        };
      });

      message.loading({
        key: 'delete-custom-view-loading',
        content: `Deleting filter "${deletedView?.name}"`
      });
      await props.handleUpdateCustomView(
        props.customViewsData?.memberForCurrentUser?.id,
        customViewInputs,
        CustomViewOperation.Delete
      );
      if (deletedView?.name === selectedSavedFilterName) {
        setSelectedSavedViewName(undefined);
        searchParams.delete(ServiceTicketSearchParamKeys.SavedView);
        setSearchParams(searchParams);
        clearFilter();
      }
      setCustomViews(updatedViews);

      // forceUpdate();
    }
  };

  const onSelectViewChanged = (viewName: string) => {
    if (viewName === '') {
      clearFilter();
    } else {
      const selectedView = customViews.find((view) => view.name === viewName);
      const filters = selectedView?.filters;
      console.log('FILTER ', filters);
      setSelectedSavedViewName(viewName);
      searchParams.set(ServiceTicketSearchParamKeys.SavedView, viewName);
      SetSearchParamsFromServiceTicketFilter(
        filters as string[],
        searchParams,
        props.memberData.membersByCommunityId as Member[]
      );
      
      const savedColumnsToDisplay =
        (customViews.find((view: any) => view.name === viewName)?.columnsToDisplay as string[]) ?? [];
      if (savedColumnsToDisplay.length > 0) {
        searchParams.set(ServiceTicketSearchParamKeys.Column, savedColumnsToDisplay.join(','));
      } else {
        searchParams.delete(ServiceTicketSearchParamKeys.Column);
      }

      setColumnsToDisplay(savedColumnsToDisplay);

      setSearchParams(searchParams);
    }
  };

  const onSelectColumnChanged = (columnName: string) => {
    const originalSearchParams = searchParams.get(ServiceTicketSearchParamKeys.Column) ?? '';
    searchParams.set(
      ServiceTicketSearchParamKeys.Column,
      originalSearchParams.length > 0
        ? searchParams.get(ServiceTicketSearchParamKeys.Column) + ',' + columnName
        : columnName
    );
    setSearchParams(searchParams);
    setColumnsToDisplay([...(columnsToDisplay ?? []), columnName]);
  };

  const onColumnDelete = (columnName: string) => {
    const searchParamsString = searchParams.get(ServiceTicketSearchParamKeys.Column)?.split(',');
    const newSearchParamsArray: any = [];
    searchParamsString?.forEach((searchParam) => {
      if (searchParam !== columnName) {
        newSearchParamsArray.push(searchParam);
      }
    });

    if (newSearchParamsArray.length > 0) {
      searchParams.set(ServiceTicketSearchParamKeys.Column, newSearchParamsArray.join(','));
    } else {
      searchParams.delete(ServiceTicketSearchParamKeys.Column);
    }
    setSearchParams(searchParams);
    setColumnsToDisplay(columnsToDisplay?.filter((column) => column !== columnName));
  };

  const onSortChanged = (value: string) => {
    if (value) {
      searchParams.set(ServiceTicketSearchParamKeys.Sort, value);
    } else {
      searchParams.delete(ServiceTicketSearchParamKeys.Sort);
    }

    setSearchParams(searchParams);
  };

  const clearFilter = () => {
    // searchParams.delete(ServiceTicketSearchParamKeys.SavedFilter);
    searchParams.delete(ServiceTicketSearchParamKeys.SearchString);
    searchParams.delete(ServiceTicketSearchParamKeys.AssignedTo);
    searchParams.delete(ServiceTicketSearchParamKeys.Status);
    searchParams.delete(ServiceTicketSearchParamKeys.Priority);
    searchParams.delete(ServiceTicketSearchParamKeys.Column);
    searchParams.delete(ServiceTicketSearchParamKeys.Sort);
    // searchParams.delete(ServiceTicketSearchParamKeys.Requestor);
    setSavedFilterNameInput('');
    setSearchParams(searchParams);
  };

  return (<>
    <div style={{ display: 'flex', justifyContent: 'space-between', width: '80%', paddingLeft: '16px' }}>
      <Select
        onChange={onSelectViewChanged}
        value={selectedSavedFilterName}
        style={{ width: '175px' }}
        placeholder="Select saved filter"
        dropdownRender={() =>
          customViews && customViews.length > 0 ? (
            <div key="savedFilters">
              {customViews.map((view: any) => (
                <Space align="baseline" style={{ width: '100%' }}>
                  <Button type="link" onClick={() => deleteCustomView(view.id)}>
                    <DeleteOutlined style={{ color: 'red' }} />
                  </Button>
                  <Typography.Link style={{ width: '150px' }} onClick={() => onSelectViewChanged(view.name)}>
                    {view.name}
                  </Typography.Link>
                </Space>
              ))}
              <Button type="link" onClick={() => setIsSaveModalVisible(true)}>
                Add New
              </Button>
            </div>
          ) : (
            <div>
              <Button type="link" onClick={() => setIsSaveModalVisible(true)}>
                Add New
              </Button>
            </div>
          )
        }
      ></Select>
      <Button type="primary" onClick={() => updateCustomView()} disabled={selectedSavedFilterName ? false : true}>
        Update
      </Button>
      <Modal
        title="Save Filter"
        open={isSaveModalVisible}
        onOk={() => saveNewCustomView()}
        onCancel={() => setIsSaveModalVisible(false)}
      >
        <Space size="middle">
          <Input
            autoFocus
            value={savedFilterNameInput}
            onPressEnter={() => saveNewCustomView()}
            placeholder="Filter Name"
            onChange={(e) => setSavedFilterNameInput(e.target.value)}
          />
        </Space>
      </Modal>
    </div>
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        width: '85%',
        marginTop: '9px',
        paddingLeft: '16px'
      }}
    >
      <Text style={{ fontWeight: '600', alignSelf: 'center' }}>Sort By: </Text>
      <Select
        defaultValue={searchParams.get('sort') ? searchParams.get('sort') : ''}
        style={{ width: '225px' }}
        onChange={(value) => onSortChanged(value)}
      >
        <Option value="">None</Option>
        <Option value="createdAt asc">Created Date: Oldest First</Option>
        <Option value="createdAt desc">Created Date: Newest First</Option>
        <Option value="updatedAt asc">Updated Date: Oldest First</Option>
        <Option value="updatedAt desc">Updated Date: Newest First</Option>
      </Select>
    </div>
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        width: '85%',
        marginTop: '9px',
        paddingLeft: '16px',
        marginBottom: '40px'
      }}
    >
      <Text style={{ fontWeight: '600', alignSelf: 'center' }}>Columns to display: </Text>
      <Select
        onSelect={(e: any) => onSelectColumnChanged(e)}
        style={{ width: '175px' }}
        mode="multiple"
        placeholder="Select"
        value={columnsToDisplay}
        defaultValue={columnsToDisplay}
        allowClear
        onClear={() => {
          searchParams.delete(ServiceTicketSearchParamKeys.Column);
          setSearchParams(searchParams);
          setColumnsToDisplay(undefined);
          forceUpdate();
        }}
        onDeselect={(value: any) => onColumnDelete(value)}
      >
        {columnOptions.map((option: string) => {
          return <Option key={option}>{option}</Option>;
        })}
      </Select>
    </div>
    <ServiceTicketsSearchTags memberData={props.memberData} />
  </>);
};
