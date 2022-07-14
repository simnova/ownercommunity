import { useEffect, useState } from 'react';
import { ServiceTicketsSearchFilter } from './service-tickets-search-filter';

interface SearchFilterConfigDefinition {
  filters: FilterType[];
}

interface FilterType {
  title: string;
  options: { name: string; count: number; id: string }[];
  id?: string;
  searchbar?: boolean;
}

export const ServiceTicketsSearchFilters: React.FC<any> = (props) => {
  const [filters, setFilters] = useState<FilterType[]>([]);

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
    setFilters([assignedTo]);
  }, []);

  return (
    <>
      {filters?.map((filter: any) => {
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
