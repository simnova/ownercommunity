import { FC, useEffect, useState } from 'react';
import {
  CustomView,
  CustomViewInput,
  MemberPropertiesListSearchCustomViewsQuery,
  MemberMutationResult
} from '../../../../generated';
import { Select, Button, Typography, Modal, Space, Input, message, theme } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { SearchParamKeys, CustomViewOperation, GetPropertySelectedFilterTags, SetSearchParamsFromPropertyFilter } from '../../../../constants';
import { useSearchParams } from 'react-router-dom';
import { PropertiesListSearchTags } from './properties-list-search-tags';

const { Option } = Select;
const { Text } = Typography;

interface PropertiesListSearchToolbarProps {
  searchData: any;
  tagData: string[];
  customViewsData: MemberPropertiesListSearchCustomViewsQuery;
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

export const PropertiesListSearchToolbar: FC<PropertiesListSearchToolbarProps> = (props) => {
  const {
    token: { colorText }
  } = theme.useToken();
  const forceUpdate = useForceUpdate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [isSaveModalVisible, setIsSaveModalVisible] = useState(false);
  const [savedFilterNameInput, setSavedFilterNameInput] = useState('');
  const [selectedSavedFilterName, setSelectedSavedFilterName] = useState<string | undefined>('');

  const [customViews, setCustomViews] = useState<CustomView[]>([]);

  useEffect(() => {
    if (props.customViewsData?.memberForCurrentUser?.customViews) {
      const customViews = props.customViewsData?.memberForCurrentUser?.customViews as CustomView[] ?? [];
      const propertyCustomViews = customViews.filter((view) => view.type === 'PROPERTY');
      setCustomViews(propertyCustomViews);
    }
  }, [props.customViewsData?.memberForCurrentUser?.customViews]);

  // get selected filters from url (after page refresh)
  useEffect(() => {
    const savedFilterName = searchParams.get(SearchParamKeys.SavedFilter);
    if (savedFilterName) {
      setSelectedSavedFilterName(savedFilterName);
    }
  }, []);

  const updateCustomView = async () => {
    let customViewInputs: CustomViewInput[] = [];
    const currentViews = JSON.parse(JSON.stringify(customViews));
    currentViews.forEach((view: CustomView) => {
      if (view.name === selectedSavedFilterName) {
        const updatedFilters = GetPropertySelectedFilterTags(searchParams);
        const updatedSortOrder = searchParams.get(SearchParamKeys.OrderBy) ?? '';
        // update
        customViewInputs.push({
          name: view.name,
          type: 'PROPERTY',
          id: view.id,
          filters: GetPropertySelectedFilterTags(searchParams),
          sortOrder: updatedSortOrder
        });
        view.filters = updatedFilters;
        view.sortOrder = updatedSortOrder;
      } else {
        customViewInputs.push({
          id: view.id,
          name: view.name,
          type: view.type,
          filters: view.filters,
          sortOrder: view.sortOrder
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
    let customViewInputs: CustomViewInput[] = [];
    let newCustomView: CustomViewInput = {
      name: savedFilterNameInput,
      type: 'PROPERTY',
      filters: GetPropertySelectedFilterTags(searchParams),
      sortOrder: searchParams.get(SearchParamKeys.OrderBy) ?? '',
    };
    customViewInputs.push(newCustomView);
    customViews.forEach((view) => {
      customViewInputs.push({
        id: view.id,
        name: view.name,
        type: view.type,
        filters: view.filters,
        sortOrder: view.sortOrder,
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
        setSelectedSavedFilterName(undefined);
        searchParams.delete(SearchParamKeys.SavedFilter);
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
      setSelectedSavedFilterName(viewName);
      searchParams.set(SearchParamKeys.SavedFilter, viewName);
      SetSearchParamsFromPropertyFilter(
        filters as string[],
        searchParams
      );

      setSearchParams(searchParams);
    }
  };

  const onSortChanged = (value: string) => {
    if (value) {
      searchParams.set(SearchParamKeys.OrderBy, value);
    } else {
      searchParams.delete(SearchParamKeys.OrderBy);
    }

    setSearchParams(searchParams);
  };

  const clearFilter = () => {
    searchParams.delete(SearchParamKeys.AdditionalAmenities);
    searchParams.delete(SearchParamKeys.Amenities);
    searchParams.delete(SearchParamKeys.Bathrooms);
    searchParams.delete(SearchParamKeys.Bedrooms);
    searchParams.delete(SearchParamKeys.ListedInfo);
    searchParams.delete(SearchParamKeys.MaxPrice);
    searchParams.delete(SearchParamKeys.MinPrice);
    searchParams.delete(SearchParamKeys.Type);
    searchParams.delete(SearchParamKeys.MaxSquareFeet);
    searchParams.delete(SearchParamKeys.MinSquareFeet);
    searchParams.delete(SearchParamKeys.Distance);
    searchParams.delete(SearchParamKeys.UpdatedAt);
    searchParams.delete(SearchParamKeys.CreatedAt);
    searchParams.delete(SearchParamKeys.SearchString);
    searchParams.delete(SearchParamKeys.Latitude);
    searchParams.delete(SearchParamKeys.Longitude);
    searchParams.delete(SearchParamKeys.SavedFilter);
    searchParams.delete(SearchParamKeys.Tags);
    // searchParams.set(SearchParamKeys.Page, '1');
    setSearchParams(searchParams);
    setSavedFilterNameInput('');
  };

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '80%', paddingLeft: '16px' }}>
      <Space size="middle">
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
          defaultValue={searchParams.get('sort') ? searchParams.get('sort') : ''}
          style={{ width: '225px' }}
          onChange={(value) => onSortChanged(value)}
        >
          <Option value="">None</Option>
          <Option value="createdAt asc">Created Date: Oldest First</Option>
          <Option value="createdAt desc">Created Date: Newest First</Option>
          <Option value="updatedAt asc">Updated Date: Oldest First</Option>
          <Option value="updatedAt desc">Updated Date: Newest First</Option>
          <Option value={'price desc'}>Price: High to Low</Option>
          <Option value={'price asc'}>Price: Low to High</Option>
          <Option value={'bedrooms desc'}>Bedrooms</Option>
          <Option value={'squareFeet desc'}>Square Feet</Option>
        </Select>
      </div>
      <PropertiesListSearchTags />
    </>
  );
};
