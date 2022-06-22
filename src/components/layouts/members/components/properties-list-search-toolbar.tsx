import { FC, useState } from 'react';
import { FilterDetail, PropertySearchFacets } from '../../../../generated';
import { Space, AutoComplete, Button, Pagination, Modal, Select } from 'antd';
import { FilterOutlined } from '@ant-design/icons';
import { PropertiesListSearchFilters } from './properties-list-search-filters';

const { Option } = Select;

interface PropertiesListSearchToolbarProps {
  data: any;
  searchString: string;
  selectedFilter: FilterDetail | undefined;
  setSelectedFilter: (filter: FilterDetail | undefined) => void;
  handleSearch: (searchString?: string, filter?: FilterDetail) => void;
  onInputAddressChanged: (value: string) => void;
  onInputAddressSelected: (value: string) => void;
  handlePagination: (page: number) => void;
  top: number;
  setTop: (top: number) => void;
  addresses: AddressDataType[];
  currentPage: number;
  setSearchParams: (searchParams: any) => void;

}

interface AddressDataType {
  value: string;
  label: string;
  key: string;
  address: any;
  lat: number;
  long: number;
}

export const PropertiesListSearchToolbar: FC<PropertiesListSearchToolbarProps> = (props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <Space size="large">
      <Space size={0}>
        {/* <Input
        placeholder="Enter an address"
        onPressEnter={(e: any) => handleSearch(e.target.value, selectedFilter)}
        value={searchString}
        onChange={(e) => setSearchString(e.target.value)}
      /> */}
        <AutoComplete
          options={props.addresses}
          style={{
            width: '400px'
          }}
          placeholder="Enter an address or a property name"
          filterOption={false}
          value={props.searchString}
          onChange={(value: string) => props.onInputAddressChanged(value)}
          onSelect={(value: string) => props.onInputAddressSelected(value)}
        ></AutoComplete>

        <Button type="primary" onClick={() => props.handleSearch(props.searchString, props.selectedFilter)}>
          Search
        </Button>
      </Space>
      <Pagination
        current={props.currentPage + 1}
        total={props.data?.propertiesSearch?.count ?? 10}
        pageSize={props.top}
        onChange={(page) => props.handlePagination(page)}
      />
      <Button
        type="ghost"
        onClick={() => setIsModalVisible(true)}
        style={{ borderRadius: '10px' }}
      >
        <Space size="middle">
          <FilterOutlined />
          <span>Filters</span>
        </Space>
      </Button>
      <Select defaultValue={10} onChange={(value) => props.setTop(value)}>
        <Option value={5}>5</Option>
        <Option value={10}>10</Option>
        <Option value={15}>15</Option>
        <Option value={25}>25</Option>
        <Option value={50}>50</Option>
      </Select>
      <Modal
        title="Filters"
        visible={isModalVisible}
        width={1000}
        onCancel={() => setIsModalVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setIsModalVisible(false)}>
            Cancel
          </Button>,
          <Button
            key="clear"
            type="link"
            onClick={() => {
              props.handleSearch('', undefined);
              props.setSelectedFilter(undefined);
              props.setSearchParams({ page: (props.currentPage + 1).toString() ??  '1'});
            }}
          >
            Clear Filters
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={() => {
              props.handleSearch(props.searchString, props.selectedFilter);
              setIsModalVisible(false);
            }}
          >
            Apply
          </Button>
        ]}
      >
        <PropertiesListSearchFilters
          facets={props.data?.propertiesSearch?.facets as PropertySearchFacets}
          setSelectedFilter={props.setSelectedFilter}
          selectedFilter={props.selectedFilter}
        />
    </Modal>
  </Space>
  )
}