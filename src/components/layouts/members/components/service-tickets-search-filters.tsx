import { useEffect, useState } from 'react';
import { ServiceTicketsSearchFilter } from './service-tickets-search-filter';

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
      id: 'assignedTo',
      searchbar: true
    };

    props.memberData.membersByCommunityId.forEach((member: { id: string; memberName: string }) => {
      const count = props.searchData.facets.assignedToId.find((t: any) => t.value === member.id)?.count ?? 0;
      assignedTo.options.push({
        name: member.memberName,
        count: count,
        id: member.id
      });
    });

    const priorityValues = [1, 2, 3, 4, 5];

    const priority: FilterType = {
      title: 'Priority',
      options: [],
      id: 'priority'
    };

    priorityValues.forEach((priorityValue) => {
      const count = props.searchData.facets.priority.find((t: any) => t.value === priorityValue.toString())?.count ?? 0;
      priority.options.push({
        name: priorityValue.toString(),
        count: count ?? 0,
        id: priorityValue.toString()
      });
    });

    const status: FilterType = {
      title: 'Status',
      options: [],
      id: 'status',
      searchbar: true
    };

    const statusValues = ['Created', 'Draft', 'Submitted', 'Assigned', 'In Progress', 'Completed', 'Closed'];

    statusValues.forEach((statusValue) => {
      const count = props.searchData.facets.status.find((t: any) => t.value === statusValue.toUpperCase())?.count ?? 0;
      status.options.push({
        name: statusValue,
        count: count ?? 0,
        id: statusValue
      });
    });

    setFilters([assignedTo, priority, status]);
  }, []);

  console.log('props', props);

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
