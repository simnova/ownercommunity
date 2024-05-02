import { DeleteOutlined } from '@ant-design/icons';
import { Button, Input, Modal, Select, Space, Typography, message } from 'antd';
import { useEffect, useImperativeHandle, useLayoutEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  CustomViewOperation,
  GetPropertySelectedFilterTags,
  GetServiceTicketSelectedFilterTags,
  PropertySortOptions,
  SearchParamKeys,
  SearchType,
  ServiceTicketSearchParamKeys,
  ServiceTicketSortOptions,
  SetSearchParamsFromPropertyFilter,
  SetSearchParamsFromServiceTicketFilter
} from '../../../../constants';
import {
  CustomView,
  CustomViewInput,
  Member,
  MemberMutationResult,
  MemberNameServiceTicketContainerQuery,
  MemberPropertiesGetAllTagsQuery,
  SearchDrawerContainerCustomViewsQuery
} from '../../../../generated';
import { PropertiesListSearchTags } from '../../members/components/properties-list-search-tags';
import { ServiceTicketsSearchTags } from '../../members/components/service-tickets-search-tags';
import React from 'react';

const { Option } = Select;
const { Text } = Typography;

interface SearchToolbarProps {
  type: SearchType;
  customData: MemberPropertiesGetAllTagsQuery | MemberNameServiceTicketContainerQuery;
  customViewData: SearchDrawerContainerCustomViewsQuery;
  buttonClicked: number
  searchParams: URLSearchParams
  handleUpdateCustomView: (
    memberId: string,
    customViews: CustomViewInput[],
    operation: CustomViewOperation
  ) => Promise<MemberMutationResult | undefined>;
  clearFilter: () => void;
}

//create your forceUpdate hook
function useForceUpdate() {
  const [, setValue] = useState(0); // integer state
  return () => setValue((value) => value + 1); // update state to force render
  // An function that increment 👆🏻 the previous state like here
  // is better than directly setting `value + 1`
}

const columnOptions = ['Title', 'Requestor', 'Assigned To', 'Priority', 'Updated', 'Created'];

export const SearchToolbar: React.FC<SearchToolbarProps> =(props) => {
  const forceUpdate = useForceUpdate();
  const [ _, setSearchParams ] = useSearchParams();
  const [isSaveModalVisible, setIsSaveModalVisible] = useState(false);
  const [savedFilterNameInput, setSavedFilterNameInput] = useState('');
  const [selectedSavedFilterName, setSelectedSavedFilterName] = useState<string | undefined>(
    props.searchParams.get(SearchParamKeys.SavedFilter) ?? undefined
  );

  const [customViews, setCustomViews] = useState<CustomView[]>([]);
  const [filteredCustomViews, setFilteredCustomViews] = useState<CustomView[]>([]);
  const [columnsToDisplay, setColumnsToDisplay] = useState<string[] | undefined>(
   props.searchParams.get(ServiceTicketSearchParamKeys.Column)?.split(',') ?? []
  );
  const [lastClick, setLastClick] = useState(0);

  const memberData = props.customData as MemberNameServiceTicketContainerQuery;
  const tagData = props.customData as MemberPropertiesGetAllTagsQuery;

  useEffect(() => {
    if (props.customViewData?.memberForCurrentUser?.customViews) {
      const customViews = (props.customViewData?.memberForCurrentUser?.customViews as CustomView[]) ?? [];
      setCustomViews(customViews);
      const filteredCustomViews = customViews.filter((view) => view.type === props.type);
      setFilteredCustomViews(filteredCustomViews);
    }
  }, [props.customViewData?.memberForCurrentUser?.customViews]);
  
  useEffect(() => {
    if(lastClick < props.buttonClicked){
      console.log("yoyo")
      setSearchParams(props.searchParams);
      setLastClick(lastClick => lastClick + 1);
    }
  }, [props.buttonClicked])
  

  const updateCustomView = async () => {
    let customViewInputs: CustomViewInput[] = [];
    const currentViews = JSON.parse(JSON.stringify(customViews));
    currentViews.forEach((view: CustomView) => {
      if (view.name === selectedSavedFilterName && view.type === props.type) {
        const updatedFilters =
          props.type === SearchType.Property
            ? GetPropertySelectedFilterTags(props.searchParams)
            : GetServiceTicketSelectedFilterTags(props.searchParams, memberData?.membersByCommunityId as Member[]);
        const updatedSortOrder = props.searchParams.get(SearchParamKeys.Sort) ?? '';
        const updatedColumnsToDisplay = props.searchParams.get(ServiceTicketSearchParamKeys.Column);
        // update
        customViewInputs.push({
          name: view.name,
          type: props.type,
          id: view.id,
          filters: updatedFilters,
          sortOrder: updatedSortOrder,
          columnsToDisplay:
            props.type === SearchType.ServiceTicket && updatedColumnsToDisplay ? updatedColumnsToDisplay.split(',') : []
        });
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
    await message.loading({
      content: `Updating filter "${selectedSavedFilterName}"`,
      key: 'save-custom-view-loading'
    });
    await props.handleUpdateCustomView(
      props.customViewData?.memberForCurrentUser?.id,
      customViewInputs,
      CustomViewOperation.Update
    );
    if (selectedSavedFilterName) {
      props.searchParams.set(SearchParamKeys.SavedFilter, selectedSavedFilterName);
      setSearchParams(props.searchParams);
    }
    setCustomViews(currentViews);
  };

  const saveNewCustomView = async () => {
    // check if filter name already exists
    if (filteredCustomViews.find((view: any) => view.name === savedFilterNameInput)) {
      await message.error(`Filter name "${savedFilterNameInput}" already exists`);
      return;
    }
    const filters =
      props.type === SearchType.ServiceTicket
        ? GetServiceTicketSelectedFilterTags(props.searchParams, memberData?.membersByCommunityId as Member[])
        : GetPropertySelectedFilterTags(props.searchParams);

    const qscolumnsToDisplay = props.searchParams.get(ServiceTicketSearchParamKeys.Column);

    let customViewInputs: CustomViewInput[] = [];
    let newCustomView: CustomViewInput = {
      name: savedFilterNameInput,
      type: props.type,
      filters: filters,
      sortOrder: props.searchParams.get(SearchParamKeys.Sort) ?? '',
      columnsToDisplay:
        props.type === SearchType.ServiceTicket && qscolumnsToDisplay ? qscolumnsToDisplay.split(',') : []
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

    await message.loading({
      key: 'save-custom-view-loading',
      content: `Saving filter "${savedFilterNameInput}"`
    });
    await props
      .handleUpdateCustomView(
        props.customViewData?.memberForCurrentUser?.id,
        customViewInputs,
        CustomViewOperation.Create
      )
      .then((data) => {
        setCustomViews(data?.member?.customViews as CustomView[]);
        props.searchParams.set(SearchParamKeys.SavedFilter, savedFilterNameInput);
        setSearchParams(props.searchParams);
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

      await message.loading({
        key: 'delete-custom-view-loading',
        content: `Deleting filter "${deletedView?.name}"`
      });
      await props.handleUpdateCustomView(
        props.customViewData?.memberForCurrentUser?.id,
        customViewInputs,
        CustomViewOperation.Delete
      );
      if (deletedView?.name === selectedSavedFilterName) {
        setSelectedSavedFilterName(undefined);
        props.searchParams.delete(SearchParamKeys.SavedFilter);
        setSearchParams(props.searchParams);
        clearFilter();
      }
      setCustomViews(updatedViews);
      const filteredViews = updatedViews.filter((view) => view.type === props.type);
      setFilteredCustomViews(filteredViews);
    }
  };

  const clearFilter = () => {
    props.clearFilter();
    setSavedFilterNameInput('');
    setSelectedSavedFilterName(undefined);
  };

  const onSortChanged = (value: string) => {
    if (value) {
     props.searchParams.set(SearchParamKeys.Sort, value);
    } else {
      props.searchParams.delete(SearchParamKeys.Sort);
    }
  };

  const onSelectViewChanged = (viewName: string) => {
    if (viewName === '') {
      clearFilter();
    } else {
      const selectedView = filteredCustomViews.find((view) => view.name === viewName);
      const filters = selectedView?.filters;
      if (selectedView?.sortOrder) props.searchParams.set(SearchParamKeys.Sort, selectedView?.sortOrder);
      setSelectedSavedFilterName(viewName);
      if (props.type === SearchType.Property) {
        SetSearchParamsFromPropertyFilter(filters as string[], props.searchParams);
      } else {
        const memberData = props.customData as MemberNameServiceTicketContainerQuery;
        SetSearchParamsFromServiceTicketFilter(
          filters as string[],
          props.searchParams,
          memberData?.membersByCommunityId as Member[]
        );
        if (selectedView?.columnsToDisplay && selectedView?.columnsToDisplay?.length > 0)
          props.searchParams.set(ServiceTicketSearchParamKeys.Column, selectedView.columnsToDisplay?.join(','));
      }
      props.searchParams.set(SearchParamKeys.SavedFilter, viewName);
    }
  };

  const onSelectColumnChanged = (columnName: string) => {
    const originalSearchParams = props.searchParams.get(ServiceTicketSearchParamKeys.Column) ?? '';
    props.searchParams.set(
      ServiceTicketSearchParamKeys.Column,
      originalSearchParams.length > 0
        ? props.searchParams.get(ServiceTicketSearchParamKeys.Column) + ',' + columnName
        : columnName
    );
    setColumnsToDisplay([...(columnsToDisplay ?? []), columnName]);
  };

  const onColumnDelete = (columnName: string) => {
    const searchParamsString = props.searchParams.get(ServiceTicketSearchParamKeys.Column)?.split(',');
    const newSearchParamsArray: any = [];
    searchParamsString?.forEach((searchParam) => {
      if (searchParam !== columnName) {
        newSearchParamsArray.push(searchParam);
      }
    });

    if (newSearchParamsArray.length > 0) {
      props.searchParams.set(ServiceTicketSearchParamKeys.Column, newSearchParamsArray.join(','));
    } else {
      props.searchParams.delete(ServiceTicketSearchParamKeys.Column);
    }
    setColumnsToDisplay(columnsToDisplay?.filter((column) => column !== columnName));
  };

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '80%', paddingLeft: '16px' }}>
        <Space size="middle">
          <Select
            onChange={onSelectViewChanged}
            value={props.searchParams.get(SearchParamKeys.SavedFilter) ?? selectedSavedFilterName}
            style={{ width: '175px' }}
            placeholder="Select saved filter"
            dropdownRender={() =>
              filteredCustomViews && filteredCustomViews.length > 0 ? (
                <div key="savedFilters">
                  {filteredCustomViews.map((view: any) => (
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
          <Button type="primary" onClick={() => updateCustomView()} disabled={!selectedSavedFilterName}>
            Update
          </Button>
          <Button type="default" danger onClick={() => clearFilter()}>
            Clear
          </Button>
        </Space>
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
          defaultValue={props.searchParams.get('sort') ? props.searchParams.get('sort') : ''}
          style={{ width: '225px' }}
          onChange={(value) => onSortChanged(value)}
        >
          <Option value="">None</Option>
          {props.type === SearchType.ServiceTicket
            ? ServiceTicketSortOptions.map((option) => {
                return (
                  <Option key={option.value} value={option.value}>
                    {option.label}
                  </Option>
                );
              })
            : PropertySortOptions.map((option) => {
                return (
                  <Option key={option.value} value={option.value}>
                    {option.label}
                  </Option>
                );
              })}
        </Select>
      </div>
      {props.type === SearchType.ServiceTicket && (
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
              props.searchParams.delete(ServiceTicketSearchParamKeys.Column);
              setSearchParams(props.searchParams);
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
      )}
      {props.type === SearchType.ServiceTicket && memberData ? (
        <ServiceTicketsSearchTags memberData={memberData} />
      ) : (
        <PropertiesListSearchTags tagData={tagData} />
      )}
    </>
  );
};
