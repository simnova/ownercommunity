import { FC, Key, useEffect, useState } from 'react';
import { useMatch, useNavigate } from 'react-router-dom';
import { SelectableList, SelectableListDataType } from '../../../components/selectable-list';

const DummyActiveRequests: SelectableListDataType[] = [
  {
    key: 1,
    requestInitial: 'NO',
    title: `Notary Case`,
    timestamp: '2021-09-01T00:00:00Z',
    progress: 'Revision Requested'
  },
  {
    key: 2,
    requestInitial: 'ID',
    title: `Identity Verification`,
    timestamp: '2021-09-01T00:00:00Z',
    progress: 'Revision Submitted'
  }
];

interface ActiveRequestListContainerProps {}

export const ActiveRequestListContainer: FC<ActiveRequestListContainerProps> = (_props) => {
  const navigate = useNavigate();

  const [selectedActiveRequest, setSelectedActiveRequest] = useState<SelectableListDataType | undefined>();
  const selectedActiveRequestRouteMatch = useMatch('/ahp-proof-of-concepts/requests/active/:requestId/*');

  // set selected request based on request type and request id
  useEffect(() => {
    setSelectedActiveRequest(undefined);
    if (selectedActiveRequestRouteMatch) {
      setSelectedActiveRequest(
        DummyActiveRequests.find((r) => r.key.toString() === selectedActiveRequestRouteMatch.params['requestId'])
      );
      navigate(selectedActiveRequestRouteMatch.pathname);
    }
  }, [selectedActiveRequestRouteMatch]);

  const onAnActiveRequestSelected = (selectedRowKey: Key) => {
    setSelectedActiveRequest(DummyActiveRequests.find((r) => r.key === selectedRowKey));
    navigate(`/ahp-proof-of-concepts/requests/active/${selectedRowKey}/chat`);
  };

  return (
    <SelectableList
      data={DummyActiveRequests}
      selectedRecord={selectedActiveRequest}
      onSelectChange={onAnActiveRequestSelected}
    />
  );
};
