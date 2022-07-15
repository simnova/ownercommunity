import { useEffect, useState } from 'react';
import { Tag } from 'antd';
import { useSearchParams } from 'react-router-dom';

interface ServiceTicketsSearchTagsProps {
  memberData: any;
}

export const ServiceTicketsSearchTags: React.FC<ServiceTicketsSearchTagsProps> = (props) => {
  const [selectedFilterList, setSelectedFilterList] = useState<string[]>([]);
  const [SearchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    getSelectedFilters();
  }, [SearchParams]);

  const convertMemberIdToName = (memberId: string): string => {
    if (memberId) {
      const member = props.memberData.membersByCommunityId.find((m: any) => m.id === memberId);
      return member.memberName;
    }
    return '';
  }

  const convertMemberNameToId = (memberName: string): string => {
    if (memberName) {
      const member = props.memberData.membersByCommunityId.find((m: any) => m.memberName === memberName);
      return member.id;
    }
    return '';
  }

  const isNameDuplicate = (name: string): boolean => {
    let count = 0;
    props.memberData.membersByCommunityId.forEach((m: any) => {
      if (m.memberName === name) {
        count++;
      }
    });
    return count > 1;
  }


  const getSelectedFilters = () => {
    let tempList: string[] = [];

    // const qsrequestorId = SearchParams.get('requestor');
    const qsassignedToId = SearchParams.get('assignedTo')?.split(',');
    const qspriority = SearchParams.get('priority')?.split(',');
    const qsstatus = SearchParams.get('status')?.split(',');

    if (qsassignedToId) {
      const assignedTo = qsassignedToId.map((id: string) => {
        const name = convertMemberIdToName(id);
        let tagName = name;
        if (isNameDuplicate(name)) {
          tagName = `${name} (${id})`;
        }
        return 'Assigned to: ' + tagName;
      });

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
      if (value.includes('(')) {
        value = value.split('(')[1].split(')')[0];
      } else {
        value = convertMemberNameToId(value);
      }
      console.log("VALUE ", value);
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
