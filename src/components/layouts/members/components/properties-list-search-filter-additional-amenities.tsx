import { AdditionalAmenities, AdditionalAmenitiesValues } from '../../../../constants';
import { Checkbox } from 'antd';
import { useLocation, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
const CheckboxGroup = Checkbox.Group;

export const PropertiesListSearchFilterAdditionalAmenities = (props: any) => {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedAdditionalAmenities, setSelectedAdditionalAmenities] = useState<
    AdditionalAmenities[]
  >([]);

  const onAdditionalAmenitiesChange = (categoryValue: string, amenities: string[]) => {
    // get current additional amenities
    const currentAdditionalAmenities: AdditionalAmenities[] =
      props.selectedFilter?.listingDetail?.additionalAmenities ?? [];
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
      searchParams.set('additionalAmenities', additionalAmenitiesQueryStrings.join(';'));
    } else {
      searchParams.delete('additionalAmenities');
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
    const qsadditionalAmenities = searchParams.get('additionalAmenities')?.split(';');
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
    if (!location.search) {
      setSelectedAdditionalAmenities([]);
    }
  }, [location]);

  return (
    <>
      <h2 className="font-bold">Additional Amenities</h2>
      <div style={{ paddingLeft: '20px' }}>
        {AdditionalAmenitiesValues.map((aam: AdditionalAmenities) => {
          return (
            <>
              <h2 className="font-bold">{aam.category}</h2>
              <CheckboxGroup
                key={aam.category}
                options={aam.amenities.map((value: string) => {
                  const count =
                    props.data?.propertiesSearch?.facets?.additionalAmenitiesAmenities?.find(
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
    </>
  );
};
