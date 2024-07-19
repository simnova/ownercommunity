import { FC, Key, useEffect, useState } from 'react';
import { useMatch, useNavigate } from 'react-router-dom';
import { SelectableList, SelectableListDataType } from '../../../components/selectable-list';
import { AHPObjectRouteLayer, AHPRootRouteLayer } from '../../..';
import { AHPObjectStatusRouteLayer } from '..';
import { AHPObjectIDRouteLayer } from '../request-details-page';

const DummyArchivedRequests: SelectableListDataType[] = [
  {
    key: 1,
    initials: 'NO',
    title: `Notary Case`,
    timestamp: '2021-09-01T00:00:00Z',
    progress: 'Decision Rendered',
    version: "1",
    caseType: "Notary"
  },
  {
    key: 2,
    initials: 'ID',
    title: `Identity Verification`,
    timestamp: '2021-09-01T00:00:00Z',
    progress: 'Decision Rendered',
    version: "1",
    caseType: "Identity Verification"
  }
];

interface ArchivedRequestListContainerProps {}

export const ArchivedRequestListContainer: FC<ArchivedRequestListContainerProps> = (_props) => {
  const navigate = useNavigate();

  const [selectedArchivedRequest, setSelectedArchivedRequest] = useState<SelectableListDataType | undefined>();
  const selectedArchivedRequestRouteMatch = useMatch(`/${AHPRootRouteLayer}/${AHPObjectRouteLayer.Cases}/${AHPObjectStatusRouteLayer.Archived}/:${AHPObjectIDRouteLayer.CaseId}`);

  // set selected request based on request type and request id
  useEffect(() => {
    setSelectedArchivedRequest(undefined);
    if (selectedArchivedRequestRouteMatch) {
      setSelectedArchivedRequest(
        DummyArchivedRequests.find((r) => r.key.toString() === selectedArchivedRequestRouteMatch.params[AHPObjectIDRouteLayer.CaseId])
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
