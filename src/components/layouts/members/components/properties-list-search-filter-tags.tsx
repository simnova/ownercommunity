import { Checkbox, Collapse } from 'antd';
import { FC, useEffect, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { FilterNames, SearchParamKeys } from '../../../../constants';
import { FacetDetail, FilterDetail } from '../../../../generated';

const { Panel } = Collapse;

const CheckboxGroup = Checkbox.Group;

interface PropertiesListSearchFilterTagsProps {
  selectedFilter?: FilterDetail;
  setSelectedFilter: (selectedFilter: FilterDetail) => void;
  tagsFacets?: FacetDetail[];
  allTags?: string[];
}

export const PropertiesListSearchFilterTags: FC<PropertiesListSearchFilterTagsProps> = (props) => {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedTags, setSelectedTags] = useState<string[]>();

  const onTagsFilterChange = (checkedValues: string[]) => {
    setSelectedTags(checkedValues);
    // update query string
    if (checkedValues.length > 0) {
      searchParams.set(SearchParamKeys.Tags, checkedValues.join(','));
    } else {
      searchParams.delete(SearchParamKeys.Tags);
    }
    setSearchParams(searchParams);
    props.setSelectedFilter({ ...props.selectedFilter, tags: checkedValues });
  };

  // Update UI (selected tags) with corresponding tags when page is loaded
  useEffect(() => {
    const qsTags = searchParams.get(SearchParamKeys.Tags);
    setSelectedTags(qsTags?.split(',') ?? []);
  }, []);

  // handle when clear all filter clicked
  useEffect(() => {
    if (!location.search.includes(SearchParamKeys.Tags)) {
      setSelectedTags([]);
    }
  }, [location]);

  const getOptions = () => {
    const options: any = [];

    props?.allTags?.forEach((tag: string) => {
      const count = props?.tagsFacets?.find((t: any) => t?.value === tag)?.count;
      options.push({
        label: tag + ' ' + `(${count ?? 0})`,
        value: tag
      });
    });

    return options;
  };

  if (getOptions().length === 0) {
    return null;
  }

  return (
    <Collapse
      className="search-filter-collapse"
      defaultActiveKey={searchParams.get(FilterNames.Tags) ? FilterNames.Tags : undefined}
    >
      <Panel header={<h2 className="font-bold">Tags </h2>} key={FilterNames.Tags}>
        <CheckboxGroup
          options={getOptions()}
          value={selectedTags}
          onChange={(checkedValues) => onTagsFilterChange(checkedValues as string[])}
        />
      </Panel>
    </Collapse>
  );
};
