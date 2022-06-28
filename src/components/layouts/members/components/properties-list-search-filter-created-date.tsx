import { Collapse, Radio } from 'antd';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { FilterNames, SearchParamKeys, UpdatedAtOptions } from '../../../../constants';
import { FilterDetail, FacetDetail } from '../../../../generated';
const { Panel } = Collapse;

interface PropertiesListSearchFilterCreatedDateProps {
  selectedFilter?: FilterDetail;
  setSelectedFilter: (selectedFilter: FilterDetail) => void;
  propertyTypeFacets?: FacetDetail[];
}

export const PropertiesListSearchFilterCreatedDate: React.FC<PropertiesListSearchFilterCreatedDateProps> =
  (props) => {
    const location = useLocation();
    const [searchParams, setSearchParams] = useSearchParams();
    const [selectedDateOption, setSelectedDateOption] = useState<number | undefined>();

    const onUpdatedDateChanged = (e: any) => {
      const value = e.target.value;
      const date = dayjs().subtract(value, 'day').toISOString();
      setSelectedDateOption(value);
      // update query string
      searchParams.set(SearchParamKeys.UpdatedDate, value);
      setSearchParams(searchParams);
      props.setSelectedFilter({
        ...props.selectedFilter,
        updatedAt: date
      });
    };

    // Update UI (selected property types) with corresponding property types when page is loaded
    useEffect(() => {
      const qsUpdatedDate = searchParams.get(SearchParamKeys.UpdatedDate);
      if (qsUpdatedDate) {
        setSelectedDateOption(parseInt(qsUpdatedDate));
      } else {
        setSelectedDateOption(undefined);
      }
    }, []);

    // handle when clear all filter clicked
    useEffect(() => {
      if (!location.search.includes(SearchParamKeys.UpdatedDate)) {
        setSelectedDateOption(undefined);
      }
    }, [location]);

    return (
      <>
        <Panel header={<h2 className="font-bold">Updated Date</h2>} key={FilterNames.UpdatedDate}>
          <Radio.Group
            value={selectedDateOption}
            options={UpdatedAtOptions}
            onChange={(e: any) => onUpdatedDateChanged(e)}
          />
        </Panel>
      </>
    );
  };
