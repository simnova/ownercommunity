import { useEffect, useState } from 'react';
import { Tag } from 'antd';
import { useSearchParams } from 'react-router-dom';

export const ServiceTicketsSearchTags: React.FC<any> = (props) => {
  const [selectedFilterList, setSelectedFilterList] = useState<string[]>([]);
  const [SearchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    getSelectedFilters();
  }, [SearchParams]);

  const getSelectedFilters = () => {
    let tempList: string[] = [];

    // const qsrequestorId = SearchParams.get('requestor');
    const qsassignedToId = SearchParams.get('assignedTo')?.split(',');
    const qspriority = SearchParams.get('priority')?.split(',');
    const qsstatus = SearchParams.get('status')?.split(',');

    if (qsassignedToId) {
      const assignedTo = qsassignedToId.map((id: string) => 'Assigned to: ' + id);
      tempList.push(...assignedTo);
    }

    if (qspriority) {
      const priority = qspriority.map((id: string) => 'Priority: ' + id);
      tempList.push(...priority);
    }

    if (qsstatus) {
      const status = qsstatus.map((id: string) => 'Status: ' + id);
      tempList.push(...status);
    }

    setSelectedFilterList(tempList);
  };

  const removeFilter = (filter: string) => {
    const tempList = selectedFilterList.filter((item) => item !== filter);
    setSelectedFilterList(tempList);
    let section = filter.split(':')[0];
    let value = filter.split(':')[1].trim();

    if (section === 'Assigned to') {
      const qsassignedToId = SearchParams.get('assignedTo')?.split(',');
      let newAssignedToId = qsassignedToId?.filter((id: string) => id !== value);
      if (newAssignedToId && newAssignedToId.length > 0) {
        SearchParams.set('assignedTo', newAssignedToId.join(','));
      } else {
        SearchParams.delete('assignedTo');
      }
    }
    if (section === 'Priority') {
      const qspriority = SearchParams.get('priority')?.split(',');
      let newPriority = qspriority?.filter((id: string) => id !== value);
      if (newPriority && newPriority.length > 0) {
        SearchParams.set('priority', newPriority.join(','));
      } else {
        SearchParams.delete('priority');
      }
    }
    if (section === 'Status') {
      const qsstatus = SearchParams.get('status')?.split(',');
      let newStatus = qsstatus?.filter((id: string) => id !== value);
      if (newStatus && newStatus.length > 0) {
        SearchParams.set('status', newStatus.join(','));
      } else {
        SearchParams.delete('status');
      }
    }
    setSearchParams(SearchParams);
  };

  return (
    <div>
      {selectedFilterList.map((filter: string) => {
        return (
          <Tag
            closable
            onClose={(e: any) => {
              e.preventDefault();
              removeFilter(filter);
            }}
          >
            {filter}
          </Tag>
        );
      })}
    </div>
  );
};
