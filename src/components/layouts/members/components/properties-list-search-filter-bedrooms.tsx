import { Radio, Collapse } from 'antd';
import { FC, useEffect, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { FilterNames, SearchParamKeys } from '../../../../constants';
import { FacetDetail, FilterDetail } from '../../../../generated';

const { Panel } = Collapse;
interface PropertiesListSearchFilterBedroomsProps {
  setSelectedFilter: (selectedFilter: FilterDetail) => void;
  selectedFilter?: FilterDetail;
  bedroomsFacets?: FacetDetail[];
}

export const PropertiesListSearchFilterBedrooms: FC<PropertiesListSearchFilterBedroomsProps> =
  (props) => {
    const location = useLocation();
    const [searchParams, setSearchParams] = useSearchParams();
    const [bedrooms, setBedrooms] = useState<undefined | number>();

    const onBedroomsClicked = (e: any) => {
      setBedrooms(parseInt(e.target.value));
      if (e.target.value) {
        searchParams.set(SearchParamKeys.Bedrooms, e.target.value);
      } else {
        searchParams.delete(SearchParamKeys.Bedrooms);
      }
      setSearchParams(searchParams);
      props.setSelectedFilter({
        ...props.selectedFilter,
        listingDetail: {
          ...props.selectedFilter?.listingDetail,
          bedrooms: parseInt(e.target.value)
        }
      });
    };

    useEffect(() => {
      const qsbedrooms = searchParams.get(SearchParamKeys.Bedrooms);
      if (qsbedrooms) {
        setBedrooms(parseInt(qsbedrooms));
      }
    }, [searchParams]);

    // handle when clear all filter clicked
    useEffect(() => {
      if (!location.search.includes(SearchParamKeys.Bedrooms)) {
        setBedrooms(undefined);
      }
    }, [location]);

    const getOptions = () => {
      const options: any = [];
      props.bedroomsFacets?.forEach((option) => {
        let value = option.value?.slice(0, -1);
        if (option.count != undefined && option.count > 0) {
          options.push({
            label: `${option.value} (${option.count})`,
            value: value ? parseInt(value) : ''
          });
        }
      });
      return options;
    };

    if (getOptions().length === 0) {
      return null;
    }

    return (
      <Collapse
        className="search-filter-collapse"
        defaultActiveKey={
          searchParams.get(FilterNames.Bedrooms)
            ? FilterNames.Bedrooms
            : undefined
        }
      >
        <Panel
          header={<h2 className="font-bold">Bedrooms</h2>}
          key={FilterNames.Bedrooms}
        >
          <Radio.Group
            value={bedrooms}
            onChange={onBedroomsClicked}
            buttonStyle="solid"
            optionType="button"
            options={getOptions()}
          />
        </Panel>
      </Collapse>
    );
  };
