import { FC, Key, useEffect, useState } from 'react';
import { useMatch, useNavigate } from 'react-router-dom';
import { SelectableList, SelectableListDataType } from '../../../components/selectable-list';
import { AHPFirstRouteLayer, AHPRootRouteLayer } from '../../..';
import { AHPSecondRouteLayer } from '..';

const DummyArchivedRequests: SelectableListDataType[] = [
  {
    key: 1,
    requestInitial: 'NO',
    title: `Notary Case`,
    timestamp: '2021-09-01T00:00:00Z',
    progress: 'Decision Rendered'
  },
  {
    key: 2,
    requestInitial: 'ID',
    title: `Identity Verification`,
    timestamp: '2021-09-01T00:00:00Z',
    progress: 'Decision Rendered'
  }
];

interface ArchivedRequestListContainerProps {}

export const ArchivedRequestListContainer: FC<ArchivedRequestListContainerProps> = (_props) => {
  const navigate = useNavigate();

  const [selectedArchivedRequest, setSelectedArchivedRequest] = useState<SelectableListDataType | undefined>();
  const selectedArchivedRequestRouteMatch = useMatch(`/${AHPRootRouteLayer}/${AHPFirstRouteLayer.Cases}/${AHPSecondRouteLayer.Archived}/:requestId`);

  // set selected request based on request type and request id
  useEffect(() => {
    setSelectedArchivedRequest(undefined);
    if (selectedArchivedRequestRouteMatch) {
      setSelectedArchivedRequest(
        DummyArchivedRequests.find((r) => r.key.toString() === selectedArchivedRequestRouteMatch.params['requestId'])
      );
      navigate(selectedArchivedRequestRouteMatch.pathname);
    }
  }, [selectedArchivedRequestRouteMatch]);

  const onAnArchivedRequestSelected = (selectedRowKey: Key) => {
    setSelectedArchivedRequest(DummyArchivedRequests.find((r) => r.key === selectedRowKey));
    navigate(`${selectedRowKey}`);
  };  

  return (
    <SelectableList
      data={DummyArchivedRequests}
      selectedRecord={selectedArchivedRequest}
      onSelectChange={onAnArchivedRequestSelected}
    />
  );
};
