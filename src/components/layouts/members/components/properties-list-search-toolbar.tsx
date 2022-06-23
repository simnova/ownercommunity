import { FC, useState } from 'react';
import { FilterDetail, PropertySearchFacets } from '../../../../generated';
import { Space, AutoComplete, Button, Pagination, Modal, Select } from 'antd';
import { FilterOutlined } from '@ant-design/icons';
import { PropertiesListSearchFilters } from './properties-list-search-filters';
import { SearchParamKeys } from '../../../../constants';
import { useSearchParams } from 'react-router-dom';

const { Option } = Select;

interface PropertiesListSearchToolbarProps {
  data: any;
  searchString: string;
  selectedFilter: FilterDetail | undefined;
  setSelectedFilter: (filter: FilterDetail | undefined) => void;
  handleSearch: (page?: number) => void;
  onInputAddressChanged: (value: string) => void;
  onInputAddressSelected: (value: string) => void;
  handlePagination: (page: number) => void;
  top: number | undefined;
  setTop: (top: number) => void;
  addresses: AddressDataType[];
  currentPage: number | undefined;
  setCurrentPage: (page: number) => void;
  orderBy: string[];
  setOrderBy: (orderBy: string[]) => void;
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
  const [searchParams, setSearchParams] = useSearchParams();

  const onSelectTopChanged = (value: number) => {
    props.setTop(value);
    searchParams.set(SearchParamKeys.Top, value.toString());
    searchParams.set('page', '1');
    setSearchParams(searchParams);
    props.setCurrentPage(0);
    setIsModalVisible(false);
  };

  const onSelectOrderByChanged = (value: string) => {
    props.setOrderBy([value]);
  }

  const clearFilter = () => {
    props.setSelectedFilter(undefined);
    searchParams.delete(SearchParamKeys.AdditionalAmenities);
    searchParams.delete(SearchParamKeys.Amenities);
    searchParams.delete(SearchParamKeys.Bathrooms);
    searchParams.delete(SearchParamKeys.Bedrooms);
    searchParams.delete(SearchParamKeys.ListedInfo);
    searchParams.delete(SearchParamKeys.MaxPrice);
    searchParams.delete(SearchParamKeys.MinPrice);
    searchParams.delete(SearchParamKeys.PropertyType);
    searchParams.delete(SearchParamKeys.MaxSquareFeet);
    searchParams.delete(SearchParamKeys.MinSquareFeet);
    searchParams.set(SearchParamKeys.Page, '1');
    setSearchParams(searchParams);
  };

  return (
    <Space size="large">
      <Space size={0}>
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

        <Button type="primary" onClick={() => props.handleSearch(0)}>
          Search
        </Button>
      </Space>
      <Pagination
        current={(props.currentPage ?? 0) + 1}
        total={props.data?.propertiesSearch?.count ?? 10}
        pageSize={props.top ?? 10}
        onChange={(page) => props.handlePagination(page)}
      />
      <Space>
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
        <Select
          defaultValue={parseInt(searchParams.get(SearchParamKeys.Top) ?? '10')}
          onChange={(value) => onSelectTopChanged(value)}
        >
          <Option value={5}>5</Option>
          <Option value={10}>10</Option>
          <Option value={15}>15</Option>
          <Option value={25}>25</Option>
          <Option value={50}>50</Option>
        </Select>
        <Select
          defaultValue={''}
          onChange={(value) => {onSelectOrderByChanged(value)}}
        >
          <Option value={''}>None</Option>
          <Option value={'price desc'}>Price: High to Low</Option>
          <Option value={'price'}>Price: Low to High</Option>
        </Select>
      </Space>
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
              clearFilter();
            }}
          >
            Clear Filters
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={() => {
              props.handleSearch(0);
              searchParams.set('page', '1');
              setSearchParams(searchParams);
              props.setCurrentPage(0);
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
          setTop={props.setTop}
          setCurrentPage={props.setCurrentPage}
          handleSearch={props.handleSearch}
        />
      </Modal>
    </Space>
    // <Space size="large">
    //   <Space size={0}>
    //     {/* <Input
    //     placeholder="Enter an address"
    //     onPressEnter={(e: any) => handleSearch(e.target.value, selectedFilter)}
    //     value={searchString}
    //     onChange={(e) => setSearchString(e.target.value)}
    //   /> */}
    //     <AutoComplete
    //       options={props.addresses}
    //       style={{
    //         width: '400px'
    //       }}
    //       placeholder="Enter an address or a property name"
    //       filterOption={false}
    //       value={props.searchString}
    //       onChange={(value: string) => props.onInputAddressChanged(value)}
    //       onSelect={(value: string) => props.onInputAddressSelected(value)}
    //     ></AutoComplete>

    //     <Button
    //       type="primary"
    //       onClick={() => props.handleSearch(props.searchString, props.selectedFilter)}
    //     >
    //       Search
    //     </Button>
    //   </Space>
    //   <Pagination
    //     current={props.currentPage + 1}
    //     total={props.data?.propertiesSearch?.count ?? 10}
    //     pageSize={props.top}
    //     onChange={(page) => props.handlePagination(page)}
    //   />
    //   <Button type="ghost" onClick={() => setIsModalVisible(true)} style={{ borderRadius: '10px' }}>
    //     <Space size="middle">
    //       <FilterOutlined />
    //       <span>Filters</span>
    //     </Space>
    //   </Button>
    //   <Select
    //     defaultValue={props.searchParams.get('top') ?? props.top}
    //     onChange={(value) => {
    //       props.setTop(value);
    //       props.searchParams.set('top', value);
    //       props.setSearchParams(props.searchParams);
    //     }}
    //   >
    //     <Option value={5}>5</Option>
    //     <Option value={10}>10</Option>
    //     <Option value={15}>15</Option>
    //     <Option value={25}>25</Option>
    //     <Option value={50}>50</Option>
    //   </Select>
    //   <Select defaultValue={''} onChange={(value) => {
    //     console.log("KEY ", value);
    //     props.setOrderBy(value);
    //     props.searchParams.set('sort', value);
    //     props.setSearchParams(props.searchParams);
    //     props.handleSearch(props.searchString, props.selectedFilter);
    //   }}>
    //     <Option value={''}>None</Option>
    //     <Option value={'price'}>Price: High to Low</Option>
    //     <Option value={'price desc'}>Price: Low to High</Option>
    //   </Select>
    //   <Modal
    //     title="Filters"
    //     visible={isModalVisible}
    //     width={1000}
    //     onCancel={() => setIsModalVisible(false)}
    //     footer={[
    //       <Button key="cancel" onClick={() => setIsModalVisible(false)}>
    //         Cancel
    //       </Button>,
    //       <Button
    //         key="clear"
    //         type="link"
    //         onClick={() => {
    //           props.handleSearch('', undefined);
    //           props.setSelectedFilter(undefined);
    //           props.setSearchParams({
    //             page: (props.currentPage + 1).toString() ?? '1',
    //             top: props.top.toString() ?? '10'
    //           });
    //         }}
    //       >
    //         Clear Filters
    //       </Button>,
    //       <Button
    //         key="submit"
    //         type="primary"
    //         onClick={() => {
    //           props.handleSearch(props.searchString, props.selectedFilter);
    //           setIsModalVisible(false);
    //         }}
    //       >
    //         Apply
    //       </Button>
    //     ]}
    //   >
    //     {/* <PropertiesListSearchFilters
    //       facets={props.data?.propertiesSearch?.facets as PropertySearchFacets}
    //       setSelectedFilter={props.setSelectedFilter}
    //       selectedFilter={props.selectedFilter}
    //     /> */}
    //   </Modal>
    // </Space>
  );
};
