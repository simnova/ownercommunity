import { Tag } from 'antd';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ConvertMemberNameToId, GetServiceTicketSelectedFilterTags } from '../../../../constants';
import { Member, MemberNameServiceTicketContainerQuery } from '../../../../generated';

interface ServiceTicketsSearchTagsProps {
  memberData: MemberNameServiceTicketContainerQuery;
}

export const ServiceTicketsSearchTags: React.FC<ServiceTicketsSearchTagsProps> = (props) => {
  const [selectedFilterList, setSelectedFilterList] = useState<string[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const tags = GetServiceTicketSelectedFilterTags(searchParams, props.memberData?.membersByCommunityId as Member[]);
    setSelectedFilterList(tags);
  }, [searchParams]);

  const removeFilter = (filter: string) => {
    const tempList = selectedFilterList.filter((item) => item !== filter);
    setSelectedFilterList(tempList);
    let section = filter.split(':')[0];
    let value = filter.split(':')[1].trim();

    if (section === 'Assigned to') {
      const qsassignedToId = searchParams.get('assignedTo')?.split(',');
      if (value.includes('(')) {
        value = value.split('(')[1].split(')')[0];
      } else {
        value = ConvertMemberNameToId(value, props.memberData.membersByCommunityId as Member[]);
      }
      let newAssignedToId = qsassignedToId?.filter((id: string) => id !== value);
      if (newAssignedToId && newAssignedToId.length > 0) {
        searchParams.set('assignedTo', newAssignedToId.join(','));
      } else {
        searchParams.delete('assignedTo');
      }
    }
    if (section === 'Priority') {
      const qspriority = searchParams.get('priority')?.split(',');
      let newPriority = qspriority?.filter((id: string) => id !== value);
      if (newPriority && newPriority.length > 0) {
        searchParams.set('priority', newPriority.join(','));
      } else {
        searchParams.delete('priority');
      }
    }
    if (section === 'Status') {
      const qsstatus = searchParams.get('status')?.split(',');
      let newStatus = qsstatus?.filter((id: string) => id !== value);
      if (newStatus && newStatus.length > 0) {
        searchParams.set('status', newStatus.join(','));
      } else {
        searchParams.delete('status');
      }
    }
    setSearchParams(searchParams);
  };

  return (
    <div>
      {selectedFilterList.map((filter: string) => {
        return (
          <Tag
            key={filter}
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
