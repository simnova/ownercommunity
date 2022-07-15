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
const { Option } = Select;
const { Text } = Typography;

interface ServiceTicketsSearchToolbarProps {
  memberData: any;
}

export const ServiceTicketsSearchToolbar: React.FC<ServiceTicketsSearchToolbarProps> = (props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isSaveModalVisible, setIsSaveModalVisible] = useState(false);
  const [savedFilterName, setSavedFilterName] = useState('');

  const filters = JSON.parse(localStorage.getItem('service-ticket-filters') ?? '[]');

  const handleSave = () => {
    const filter = GetFilterFromServiceTicketQueryString(searchParams);
    console.log('FILTER ', filter);
    if (savedFilterName != '') {
      if (filters.find((f: any) => f.name === savedFilterName)) {
        filters.splice(
          filters.findIndex((f: any) => f.name === savedFilterName),
          1,
          { name: savedFilterName, value: JSON.stringify(filter) }
        );
        message.success(`Filter "${savedFilterName}" updated`);
      } else {
        filters.push({
          name: savedFilterName,
          value: JSON.stringify(filter)
        });
        message.success(`Filter "${savedFilterName}" saved`);
      }
      localStorage.setItem('service-ticket-filters', JSON.stringify(filters));
    }
    setIsSaveModalVisible(false);
  };

  const deleteSavedFilter = (filterName: string) => {
    if (filterName) {
      filters.splice(
        filters.findIndex((f: any) => f.name === filterName),
        1
      );
      localStorage.setItem('service-ticket-filters', JSON.stringify(filters));
      const currentSavedFilterName = searchParams.get(ServiceTicketSearchParamKeys.SavedFilter) ?? '';
      if (currentSavedFilterName === filterName) {
        clearFilter();
      }
      message.success(`Filter "${filterName}" deleted`);
    }
  };

  const onSelectFilterChanged = (filterName: string) => {
    const filter = filters.find((f: any) => f.name === filterName);
    console.log('FILTER ', filter);
    setSavedFilterName(filterName);
    searchParams.set(ServiceTicketSearchParamKeys.SavedFilter, filterName);
    setSearchParams(searchParams);
    GetSearchParamsFromServiceTicketFilter(JSON.parse(filter.value), searchParams);
    setSearchParams(searchParams);
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

  const clearFilter = () => {
    searchParams.delete(ServiceTicketSearchParamKeys.SavedFilter);
    searchParams.delete(ServiceTicketSearchParamKeys.SearchString);
    searchParams.delete(ServiceTicketSearchParamKeys.AssignedTo);
    searchParams.delete(ServiceTicketSearchParamKeys.Status);
    searchParams.delete(ServiceTicketSearchParamKeys.Priority);
    searchParams.delete(ServiceTicketSearchParamKeys.Column);
    // searchParams.delete(ServiceTicketSearchParamKeys.Requestor);
    setSavedFilterName('');
    setSearchParams(searchParams);
  };

  const columnOptions = ['Title', 'Requestor', 'Assigned To', 'Priority', 'Created', 'Updated'];

  const defaultValues = searchParams.get(ServiceTicketSearchParamKeys.Column)?.split(',') ?? [];

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '80%', paddingLeft: '16px' }}>
        <Select
          value={searchParams.get(ServiceTicketSearchParamKeys.SavedFilter) ?? savedFilterName}
          style={{ width: '175px' }}
          onSelect={(e: any) => onSelectFilterChanged(e)}
        >
          <Option value="">View Name</Option>
          {filters.map((filter: any) => {
            return (
              <Option value={filter.name}>
                <div>
                  <Space>
                    <DeleteOutlined onClick={() => deleteSavedFilter(filter.name)} />
                    {filter.name}
                  </Space>
                </div>
              </Option>
            );
          })}
        </Select>
        <Button type="primary" onClick={() => setIsSaveModalVisible(true)}>
          Save
        </Button>
        <Modal
          title="Save Filter"
          visible={isSaveModalVisible}
          onOk={handleSave}
          onCancel={() => setIsSaveModalVisible(false)}
        >
          <Space size="middle">
            <Input placeholder="Filter Name" onChange={(e) => setSavedFilterName(e.target.value)} />
          </Space>
        </Modal>
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
