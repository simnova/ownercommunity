import { useEffect, useState } from 'react';
import { Tag } from 'antd';

export const ServiceTicketsSearchTags: React.FC<any> = (props) => {
  const [selectedFilterList, setSelectedFilterList] = useState<string[]>([]);

  useEffect(() => {
    getSelectedFilters();
  }, [props.searchParams]);

  const getSelectedFilters = () => {
    let tempList: string[] = [];

    // const qsrequestorId = props.searchParams.get('requestor');
    const qsassignedToId = props.searchParams.get('assignedTo')?.split(',');
    const qspriority = props.searchParams.get('priority')?.split(',');
    const qsstatus = props.searchParams.get('status')?.split(',');

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
    let value = filter.split(':')[1];

    if (section === 'Assigned to') {
      const qsassignedToId = props.searchParams.get('assignedTo')?.split(',');
      let newAssignedToId = qsassignedToId?.filter((id: string) => id !== value);
      if (newAssignedToId && newAssignedToId.length > 0) {
        props.searchParams.set('assignedTo', newAssignedToId.join(','));
      } else {
        props.searchParams.delete('assignedTo');
      }
    }
    if (section === 'Priority') {
      const qspriority = props.searchParams.get('priority')?.split(',');
      let newPriority = qspriority?.filter((id: string) => id !== value);
      if (newPriority && newPriority.length > 0) {
        props.searchParams.set('priority', newPriority.join(','));
      } else {
        props.searchParams.delete('priority');
      }
    }
    if (section === 'Status') {
      const qsstatus = props.searchParams.get('status')?.split(',');
      let newStatus = qsstatus?.filter((id: string) => id !== value);
      if (newStatus && newStatus.length > 0) {
        props.searchParams.set('status', newStatus.join(','));
      } else {
        props.searchParams.delete('status');
      }
    }
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
