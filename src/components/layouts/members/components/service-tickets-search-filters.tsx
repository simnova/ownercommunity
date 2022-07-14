import { useEffect, useState } from 'react';
import { ServiceTicketsSearchFilter } from './service-tickets-search-filter';

interface SearchFilterConfigDefinition {
  filters: {
    title: string;
    id?: string;
    searchbar?: boolean;
    options: {
      name: string;
      count: number;
      id: string;
    }[];
  }[];
}

interface FilterType {
  title: string;
  options: { name: string; count: number; id: string }[];
  id?: string;
}

export const ServiceTicketsSearchFilters: React.FC<any> = (props) => {
  const [assignedToOptions, setAssignedToOptions] = useState<FilterType>();
  const [priorityOptions, setPriorityOptions] = useState<FilterType>();

  const [filters, setFilters] = useState();

  useEffect(() => {
    const assignedTo: FilterType = {
      title: 'Assigned To',
      options: [],
      id: 'assignedTo'
    };

    props.memberData.membersByCommunityId.forEach(
      (member: { id: string; memberName: string }) => {
        const count =
          props.searchData.facets.assignedToId.find(
            (t: any) => t.value === member.id
          )?.count ?? 0;
        assignedTo.options.push({
          name: member.memberName,
          count: count,
          id: member.id
        });
      }
    );
    setAssignedToOptions(assignedTo);
  }, []);

  useEffect(() => {
    const priority: FilterType = {
      title: 'Priority',
      options: [],
      id: 'priority'
    };

    const priorityValues = [1, 2, 3, 4, 5];

    priorityValues.forEach((priorityValue) => {
      const count =
        props.searchData.facets.priority.find(
          (t: any) => t.value === priorityValue.toString()
        )?.count ?? 0;
      priority.options.push({
        name: priorityValue.toString(),
        count: count ?? 0,
        id: priorityValue.toString()
      });
    });
    setPriorityOptions(priority);

    // props.searchData.facets.priority.forEach(
    //   (priorityFacet: {
    //     value: string;
    //     count: number;
    //     __typename?: string;
    //   }) => {
    //     const count = priorityFacet.count;
    //     priority.options.push({
    //       name: priorityFacet.value,
    //       count: count,
    //       id: priorityFacet.value
    //     });
    //     setPriorityOptions(priority);
    //   }
    // );
  }, []);

  // let filters: any = [assignedToOptions];

  console.log('props', props);

  const searchFilterConfig: SearchFilterConfigDefinition = {
    filters: [assignedToOptions as FilterType, priorityOptions as FilterType]
  };

  return (
    <>
      {searchFilterConfig.filters?.map((filter: any) => {
        return (
          <ServiceTicketsSearchFilter
            title={filter?.title}
            id={filter?.id}
            options={filter?.options}
            searchbar={filter?.searchbar ?? false}
          />
        );
      })}
    </>
  );
};
