import { Collapse, Radio } from 'antd';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { FilterNames, SearchParamKeys, DateOptions } from '../../../../constants';
import { FilterDetail, FacetDetail } from '../../../../generated';
const { Panel } = Collapse;

interface PropertiesListSearchFilterCreatedDateProps {
  selectedFilter?: FilterDetail;
  setSelectedFilter: (selectedFilter: FilterDetail) => void;
  createdDateFacet?: FacetDetail[];
}

export const PropertiesListSearchFilterCreatedDate: React.FC<PropertiesListSearchFilterCreatedDateProps> =
  (props) => {
    const location = useLocation();
    const [searchParams, setSearchParams] = useSearchParams();
    const [selectedDateOption, setSelectedDateOption] = useState<number | undefined>();

    const onCreatedDateChanged = (e: any) => {
      const value = e.target.value;
      const date = dayjs().subtract(value, 'day').toISOString();
      setSelectedDateOption(value);
      // update query string
      searchParams.set(SearchParamKeys.CreatedAt, value);
      setSearchParams(searchParams);
      props.setSelectedFilter({
        ...props.selectedFilter,
        createdAt: date
      });
    };

    // Update UI (selected property types) with corresponding property types when page is loaded
    useEffect(() => {
      const qsCreatedDate = searchParams.get(SearchParamKeys.CreatedAt);
      if (qsCreatedDate) {
        setSelectedDateOption(parseInt(qsCreatedDate));
      } else {
        setSelectedDateOption(undefined);
      }
    }, []);

    // handle when clear all filter clicked
    useEffect(() => {
      if (!location.search.includes(SearchParamKeys.CreatedAt)) {
        setSelectedDateOption(undefined);
      }
    }, [location]);

    const getOptions = () => {
      const options: any = [];

      DateOptions.forEach((option: { label: string; value: number }) => {
        const count = props.createdDateFacet?.find((t: any) => t?.value === option.label)?.count;
        if (!count) {
          return;
        }
        options.push({
          label: option.label + ' ' + `(${count})`,
          value: option.value
        });
      });
      return options;
    };

    if (getOptions().length === 0) {
      return null;
    }

    return (
      <>
        {/* <Panel header={<h2 className="font-bold">Created Date</h2>} key={FilterNames.UpdatedDate}> */}
        <Radio.Group
          value={selectedDateOption}
          options={getOptions()}
          onChange={(e: any) => onCreatedDateChanged(e)}
        />
        {/* </Panel> */}
      </>
    );
  };
