import React, { useEffect, useState } from 'react';
import { Select, Button, Typography, Modal, Space, Input, message } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { ServiceTicketsSearchTags } from './service-tickets-search-tags';
import {
  GetFilterFromServiceTicketQueryString,
  GetSearchParamsFromServiceTicketFilter,
  SearchParamKeys,
  ServiceTicketSearchParamKeys
} from '../../../../constants';
import { useSearchParams } from 'react-router-dom';
import { ServiceTicketsSearchFilterDetail } from '../../../../generated';
const { Option } = Select;
const { Text } = Typography;

interface ServiceTicketsSearchToolbarProps {
  memberData: any;
}

interface SavedFilterDetails {
  name: string;
  value: string;
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
  // get saved filters from url
  const [savedFilters, setSavedFilters] = useState<SavedFilterDetails[]>(
    JSON.parse(localStorage.getItem('service-ticket-filters') ?? '[]')
  );

  useEffect(() => {
    const savedFilterName = searchParams.get(ServiceTicketSearchParamKeys.SavedFilter);
    if (savedFilterName) {
      setSelectedSavedFilterName(savedFilterName);
    }
  }, []);

  const updateSavedFilters = (filter: ServiceTicketsSearchFilterDetail) => {
    savedFilters.splice(
      savedFilters.findIndex((f: any) => f.name === selectedSavedFilterName),
      1,
      { name: selectedSavedFilterName!, value: JSON.stringify(filter) }
    );
    setSavedFilters(savedFilters);
    message.success(`Filter "${selectedSavedFilterName}" updated`);
    localStorage.setItem('service-ticket-filters', JSON.stringify(savedFilters));
  };

  const saveNewFilter = () => {
    const filter = GetFilterFromServiceTicketQueryString(searchParams);
    savedFilters.push({
      name: savedFilterNameInput,
      value: JSON.stringify(filter)
    });
    setSavedFilters(savedFilters);
    message.success(`Filter "${savedFilterNameInput}" saved`);
    localStorage.setItem('service-ticket-filters', JSON.stringify(savedFilters));
    setIsSaveModalVisible(false);
    onSelectFilterChanged(savedFilterNameInput);
    clearFilter();
  };

  // create/update saved filter
  const handleSaveFilters = () => {
    const filter = GetFilterFromServiceTicketQueryString(searchParams);
    console.log('FILTER ', filter);
    // update saved filters
    if (selectedSavedFilterName) {
      updateSavedFilters(filter);
    } else if (savedFilterNameInput != '') {
      // save new saved filter
      setIsSaveModalVisible(true);
    }
  };

  const deleteSavedFilter = (filterName: string) => {
    if (filterName) {
      savedFilters.splice(
        savedFilters.findIndex((f: any) => f.name === filterName),
        1
      );
      localStorage.setItem('service-ticket-filters', JSON.stringify(savedFilters));
      const currentSavedFilterName = searchParams.get(ServiceTicketSearchParamKeys.SavedFilter) ?? '';
      if (currentSavedFilterName === filterName) {
        clearFilter();
      }
      setSavedFilters(savedFilters);
      message.success(`Filter "${filterName}" deleted`);
      forceUpdate();
    }
  };

  const onSelectFilterChanged = (filterName: string) => {
    if (filterName === '') {
      clearFilter();
    } else {
      const filter = savedFilters.find((f: any) => f.name === filterName);
      console.log('FILTER ', filter);
      setSelectedSavedFilterName(filterName);
      searchParams.set(ServiceTicketSearchParamKeys.SavedFilter, filterName);
      GetSearchParamsFromServiceTicketFilter(JSON.parse(filter?.value ?? ''), searchParams);
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
              savedFilters && savedFilters.length > 0 ? (
                <div key="savedFilters">
                  {savedFilters.map((f: any) => (
                    <Space align="baseline" style={{ width: '100%' }}>
                      <Button type="link" onClick={() => deleteSavedFilter(f.name)}>
                        <DeleteOutlined style={{ color: 'red' }} />
                      </Button>
                      <Typography.Link style={{ width: '150px' }} onClick={() => onSelectFilterChanged(f.name)}>
                        {f.name}
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
            // <>
            //   {savedFilters && savedFilters.length > 0 ? (
            // savedFilters.map((f: any) => (
            //   <Space align="baseline" style={{ width: '100%' }}>
            //     <Button type="link" onClick={() => deleteSavedFilter(f.name)}>
            //       <DeleteOutlined style={{ color: 'red' }} />
            //     </Button>
            //     <Typography.Link style={{ width: '150px' }} onClick={() => onSelectFilterChanged(f.name)}>
            //       {f.name}
            //     </Typography.Link>
            //   </Space>
            // ))
            //   ) : (
            //     <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            //   )}
            // </>
          }
        ></Select>
        <Button type="primary" onClick={() => handleSaveFilters()} disabled={selectedSavedFilterName ? false : true}>
          Update
        </Button>
        <Modal
          title="Save Filter"
          visible={isSaveModalVisible}
          onOk={() => saveNewFilter()}
          onCancel={() => setIsSaveModalVisible(false)}
        >
          <Space size="middle">
            <Input
              onPressEnter={() => saveNewFilter()}
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
