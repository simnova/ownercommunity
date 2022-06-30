import {
  AdditionalAmenities,
  additionalAmenitiesOptions,
  AdditionalAmenitiesValues,
  FilterNames,
  SearchParamKeys
} from '../../../../constants';
import { Checkbox, Collapse } from 'antd';
import { useLocation, useSearchParams } from 'react-router-dom';
import { useEffect, useState, FC } from 'react';
import { FacetDetail, FilterDetail } from '../../../../generated';

const { Panel } = Collapse;

const CheckboxGroup = Checkbox.Group;

interface PropertiesListSearchFilterAdditionalAmenitiesProps {
  setSelectedFilter: (selectedFilter: FilterDetail) => void;
  selectedFilter?: FilterDetail;
  additionalAmenitiesAmenitiesFacets?: FacetDetail[];
}

export const PropertiesListSearchFilterAdditionalAmenities: FC<PropertiesListSearchFilterAdditionalAmenitiesProps> =
  (props) => {
    const location = useLocation();
    const [searchParams, setSearchParams] = useSearchParams();
    const [selectedAdditionalAmenities, setSelectedAdditionalAmenities] = useState<
      AdditionalAmenities[]
    >([]);

    const onAdditionalAmenitiesChange = (categoryValue: string, amenities: string[]) => {
      // get current additional amenities
      const currentAdditionalAmenities: AdditionalAmenities[] =
        (props.selectedFilter?.listingDetail?.additionalAmenities as AdditionalAmenities[]) ?? [];
      // find index of updated category
      const index = currentAdditionalAmenities?.findIndex(
        (a: AdditionalAmenities) => a?.category === categoryValue
      );
      // update amenities
      if (index !== -1) {
        if (amenities.length === 0) {
          // remove category
          currentAdditionalAmenities.splice(index, 1);
        } else {
          currentAdditionalAmenities[index] = {
            category: categoryValue,
            amenities: amenities
          };
        }
      } else {
        currentAdditionalAmenities?.push({
          category: categoryValue,
          amenities: amenities
        });
      }

      setSelectedAdditionalAmenities(currentAdditionalAmenities);
      // update query string
      if (currentAdditionalAmenities.length > 0) {
        let additionalAmenitiesQueryStrings: string[] = [];
        currentAdditionalAmenities.forEach((amenity) => {
          additionalAmenitiesQueryStrings.push(
            `${amenity?.category}:${amenity?.amenities?.join(',')}`
          );
        });
        searchParams.set(
          SearchParamKeys.AdditionalAmenities,
          additionalAmenitiesQueryStrings.join(';')
        );
      } else {
        searchParams.delete(SearchParamKeys.AdditionalAmenities);
      }
      setSearchParams(searchParams);

      props.setSelectedFilter({
        ...props.selectedFilter,
        listingDetail: {
          ...props.selectedFilter?.listingDetail,
          additionalAmenities: currentAdditionalAmenities
        }
      });
    };

    useEffect(() => {
      const qsadditionalAmenities = searchParams
        .get(SearchParamKeys.AdditionalAmenities)
        ?.split(';');
      if (qsadditionalAmenities) {
        let temp: AdditionalAmenities[] = [];

        qsadditionalAmenities.forEach((amenity) => {
          const [cate, amen] = amenity.split(':');
          temp.push({
            category: cate,
            amenities: amen.split(',')
          });
        });
        setSelectedAdditionalAmenities(temp);
        props.setSelectedFilter({
          ...props.selectedFilter,
          listingDetail: {
            ...props.selectedFilter?.listingDetail,
            additionalAmenities: temp
          }
        });
      }
    }, []);

    useEffect(() => {
      if (!location.search.includes(SearchParamKeys.AdditionalAmenities)) {
        setSelectedAdditionalAmenities([]);
      }
    }, [location]);

    // const additionalAmenityAmenities = props.additionalAmenitiesAmenitiesFacets ?? [{ value: '' }];

    // let additionalAmenities: any[] = [];

    // additionalAmenityAmenities.forEach((additionalAmenity) => {
    //   if (additionalAmenity.value) {
    //     for (const [key, val] of Object.entries(AdditionalAmenitiesValues)) {
    //       if (val.amenities.includes(additionalAmenity.value)) {
    //         if (additionalAmenities[Number(key)]?.amenities) {
    //           additionalAmenities[Number(key)] = {
    //             category: val.category,
    //             amenities: [...additionalAmenities[Number(key)].amenities, additionalAmenity.value]
    //           };
    //         } else {
    //           additionalAmenities[Number(key)] = {
    //             category: val.category,
    //             amenities: [additionalAmenity.value]
    //           };
    //         }
    //       }
    //     }
    //   }
    // });

    // additionalAmenities = additionalAmenities.filter((n) => n);

    const getOptions = () => {
      const additionalAmenityAmenities = props.additionalAmenitiesAmenitiesFacets ?? [
        { value: '' }
      ];

      const options: any = [];

      for (const [key, val] of Object.entries(additionalAmenitiesOptions)) {
        let tmp: string[] = [];
        additionalAmenityAmenities.forEach((additionalAmenity) => {
          if (additionalAmenity.value) {
            if ((val as string[]).includes(additionalAmenity.value)) {
              if (additionalAmenity.count !== 0) {
                tmp.push(additionalAmenity.value);
              }
              // console.log(key, val);
            }
          }
        });
        if (tmp.length > 0) {
          options.push({
            category: key,
            amenities: tmp
          });
        }
      }

      return options;
    };

    if (getOptions().length === 0) {
      return null;
    }

    return (
      <Collapse
        className="search-filter-collapse"
        defaultActiveKey={
          searchParams.get(FilterNames.AdditionalAmenities)
            ? FilterNames.AdditionalAmenities
            : undefined
        }
      >
        <Panel
          header={<h2 className="font-bold">Additional Amenities</h2>}
          key={FilterNames.AdditionalAmenities}
        >
          <div style={{ paddingLeft: '20px' }}>
            {/* {AdditionalAmenitiesValues.map((aam: AdditionalAmenities) => { */}
            {/* {additionalAmenities.map((aam: AdditionalAmenities) => { */}
            {getOptions().map((aam: AdditionalAmenities) => {
              return (
                <>
                  <h2 className="font-bold">{aam.category}</h2>
                  <CheckboxGroup
                    key={aam.category}
                    options={aam.amenities.map((value: string) => {
                      const count = props.additionalAmenitiesAmenitiesFacets?.find(
                        (t: any) => t?.value === value
                      )?.count;
                      return {
                        label: `${value} ${
                          count !== undefined && count !== null && count > 0
                            ? `(${count})`
                            : count === 0
                            ? '(0)'
                            : ''
                        }`,
                        value: value
                      };
                    })}
                    value={
                      selectedAdditionalAmenities?.find((a: any) => a.category === aam.category)
                        ?.amenities
                    }
                    onChange={(checkedValues) =>
                      onAdditionalAmenitiesChange(aam.category, checkedValues as string[])
                    }
                  />
                </>
              );
            })}
          </div>
        </Panel>
      </Collapse>
    );
  };
