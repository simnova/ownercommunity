import React, { useEffect, useState } from 'react';
import { Select, Button, Typography, Modal, Space, Input, message } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { ServiceTicketsSearchTags } from './service-tickets-search-tags';
import {
  GetFilterFromServiceTicketQueryString,
  GetSearchParamsFromServiceTicketFilter,
  SearchParamKeys,
  ServiceTicketSearchParamKeys,
  GetSelectedFilterTags,
  ConvertMemberNameToId,
  CustomViewOperation
} from '../../../../constants';
import { useSearchParams } from 'react-router-dom';
import {
  CustomView,
  CustomViewInput,
  Member,
  MemberNameServiceTicketContainerQuery,
  MemberServiceTicketCustomViewsQuery,
  ServiceTicketsSearchFilterDetail
} from '../../../../generated';

const { Option } = Select;
const { Text } = Typography;

interface ServiceTicketsSearchToolbarProps {
  memberData: MemberNameServiceTicketContainerQuery;
  customViewsData?: MemberServiceTicketCustomViewsQuery;
  handleUpdateCustomView: (memberId: string, customViews: CustomViewInput[], operation: CustomViewOperation) => void;
}

//create your forceUpdate hook
function useForceUpdate() {
  const [value, setValue] = useState(0); // integer state
  return () => setValue((value) => value + 1); // update state to force render
  // An function that increment 👆🏻 the previous state like here
  // is better than directly setting `value + 1`
}

export const ServiceTicketsSearchToolbar: React.FC<ServiceTicketsSearchToolbarProps> = (props) => {
  const forceUpdate = useForceUpdate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [isSaveModalVisible, setIsSaveModalVisible] = useState(false);
  const [savedFilterNameInput, setSavedFilterNameInput] = useState('');
  const [selectedSavedFilterName, setSelectedSavedFilterName] = useState<string | undefined>(undefined);

  const [customViews, setCustomViews] = useState<CustomView[]>(props.customViewsData?.memberForCurrentUser?.customViews as CustomView[] ?? []);

  // get selected filters from url (after page refresh)
  useEffect(() => {
    const savedFilterName = searchParams.get(ServiceTicketSearchParamKeys.SavedFilter);
    if (savedFilterName) {
      setSelectedSavedFilterName(savedFilterName);
    }
  }, []);

  const updateCustomView = async () => {
    let customViewInputs: CustomViewInput[] = [];
    customViews.forEach((view) => {
      if (view.name === selectedSavedFilterName) {
        customViewInputs.push({
          filters: GetSelectedFilterTags(searchParams, props.memberData.membersByCommunityId as Member[]),
          sortOrder: searchParams.get(ServiceTicketSearchParamKeys.Sort),
        });
      } else {
        customViewInputs.push({
          name: view.name,
          type: "SERVICE_TICKET",
          filters: view.filters,
          sortOrder: view.sortOrder,
        });
      }
    });
    setCustomViews(customViews);
    props.handleUpdateCustomView(props.customViewsData?.memberForCurrentUser?.id, customViewInputs, CustomViewOperation.Update);
  };

  const saveNewCustomView = async () => {
    // check if filter name is already exists
    if (customViews.find((view: any) => view.name === savedFilterNameInput)) {
      message.error(`Filter name "${savedFilterNameInput}" already exists`);
      return;
    }
    let customViewInputs: CustomViewInput[] = [];
    let newCustomView: CustomViewInput = {
      name: savedFilterNameInput,
      type: "SERVICE_TICKET",
      filters: GetSelectedFilterTags(searchParams, props.memberData.membersByCommunityId as Member[] ?? []),
    };
    customViewInputs.push(newCustomView);
    customViews.forEach((view) => {
      customViewInputs.push({
        name: view.name,
        type: "SERVICE_TICKET",
        filters: view.filters,
        sortOrder: view.sortOrder,
      });
    });

    setCustomViews(customViews);

    props.handleUpdateCustomView(props.customViewsData?.memberForCurrentUser?.id, customViewInputs, CustomViewOperation.Create);
    setIsSaveModalVisible(false);
    onSelectFilterChanged(savedFilterNameInput);
    setSavedFilterNameInput('');
  };

  const deleteCustomView = (filterName: string) => {
    if (filterName) {
      let customViewInputs: CustomViewInput[] = customViews.filter((view) => view.name !== filterName).map((view) => {
        return {
          name: view.name,
          type: "SERVICE_TICKET",
          filters: view.filters,
          sortOrder: view.sortOrder,
        }
      });
      setCustomViews(customViews.filter((view) => view.name !== filterName));
      props.handleUpdateCustomView(props.customViewsData?.memberForCurrentUser?.id, customViewInputs, CustomViewOperation.Delete);
      forceUpdate();
    }
  };

  const onSelectFilterChanged = (filterName: string) => {
    if (filterName === '') {
      clearFilter();
    } else {
      const filter = customViews.find((f: any) => f.name === filterName)?.filters;
      console.log('FILTER ', filter);
      setSelectedSavedFilterName(filterName);
      searchParams.set(ServiceTicketSearchParamKeys.SavedFilter, filterName);
      GetSearchParamsFromServiceTicketFilter(filter as string[], searchParams);
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

  const columnOptions = ['Title', 'Requestor', 'Assigned To', 'Priority', 'Updated', 'Created'];

  const defaultValues = searchParams.get(ServiceTicketSearchParamKeys.Column)?.split(',') ?? [];

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '80%', paddingLeft: '16px' }}>
        <Select
          onChange={onSelectFilterChanged}
          value={selectedSavedFilterName}
          style={{ width: '175px' }}
          placeholder="Select saved filter"
          dropdownRender={
            () =>
              customViews && customViews.length > 0 ? (
                <div key="savedFilters">
                  {customViews.map((view: any) => (
                    <Space align="baseline" style={{ width: '100%' }}>
                      <Button type="link" onClick={() => deleteCustomView(view.id)}>
                        <DeleteOutlined style={{ color: 'red' }} />
                      </Button>
                      <Typography.Link style={{ width: '150px' }} onClick={() => onSelectFilterChanged(view.name)}>
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
          visible={isSaveModalVisible}
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
          value={[...defaultValues]}
          allowClear
          onClear={() => {
            searchParams.delete(ServiceTicketSearchParamKeys.Column);
            setSearchParams(searchParams);
          }}
          onDeselect={(value: any) => onColumnDelete(value)}
        >
          {columnOptions.map((option: string) => {
            return <Option key={option}>{option}</Option>;
          })}
        </Select>
      </div>
      <ServiceTicketsSearchTags memberData={props.memberData} />
    </>
  );
};
