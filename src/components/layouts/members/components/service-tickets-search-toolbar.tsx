import React, { useState } from 'react';
import { Select, Button, Typography, Modal, Space, Input, message } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { ServiceTicketsSearchTags } from './service-tickets-search-tags';
import { GetFilterFromServiceTicketQueryString, GetSearchParamsFromServiceTicketFilter, ServiceTicketSearchParamKeys } from '../../../../constants';
import { useSearchParams } from 'react-router-dom';
const { Option } = Select;
const { Text } = Typography;

export const ServiceTicketsSearchToolbar: React.FC<any> = (props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isSaveModalVisible, setIsSaveModalVisible] = useState(false);
  const [savedFilterName, setSavedFilterName] = useState('');

  const filters = JSON.parse(localStorage.getItem('service-ticket-filters') ?? '[]');

  const handleSave = () => {
    const filter = GetFilterFromServiceTicketQueryString(searchParams);
    console.log("FILTER ", filter);
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
          value: JSON.stringify(filter),
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
    if (filterName === '') {
      clearFilter();
    } else {
      const filter = filters.find((f: any) => f.name === filterName);
      console.log("FILTER ", filter);
      setSavedFilterName(filterName);
      searchParams.set(ServiceTicketSearchParamKeys.SavedFilter, filterName);
      setSearchParams(searchParams);
      GetSearchParamsFromServiceTicketFilter(JSON.parse(filter.value), searchParams);
      setSearchParams(searchParams);
    }
  };

  const clearFilter = () => {
    searchParams.delete(ServiceTicketSearchParamKeys.SavedFilter);
    searchParams.delete(ServiceTicketSearchParamKeys.SearchString);
    searchParams.delete(ServiceTicketSearchParamKeys.AssignedTo);
    searchParams.delete(ServiceTicketSearchParamKeys.Status);
    searchParams.delete(ServiceTicketSearchParamKeys.Priority);
    // searchParams.delete(ServiceTicketSearchParamKeys.Requestor);
    setSavedFilterName('');
    setSearchParams(searchParams);
  }

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '80%', paddingLeft: '16px' }}>
        <Select 
          value={searchParams.get(ServiceTicketSearchParamKeys.SavedFilter) ?? savedFilterName} 
          style={{ width: '175px' }} onSelect={(e: any) => onSelectFilterChanged(e)}>
          <Option value="">View Name</Option>
          {filters.map((filter: any) => {
              return (
                    <Option value={filter.name}>
                      <div>
                        <Space>
                          <DeleteOutlined onClick={() => deleteSavedFilter(filter.name)}/>
                          {filter.name}
                        </Space>
                      </div>
                    </Option>
                  );
            })}
        </Select>
        <Button type="primary" onClick={() => setIsSaveModalVisible(true)}>Save</Button>
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
        <Select defaultValue={''} style={{ width: '175px' }}>
          <Option value="">Select</Option>
        </Select>
      </div>
      <ServiceTicketsSearchTags />
    </>
  );
};
