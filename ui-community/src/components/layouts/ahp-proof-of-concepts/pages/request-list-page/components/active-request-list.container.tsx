import { FC, Key, useEffect, useState } from 'react';
import { useMatch, useNavigate } from 'react-router-dom';
import { SelectableList, SelectableListDataType } from '../../../components/selectable-list';
import { AHPObjectRouteLayer, AHPRootRouteLayer } from '../../..';
 import { AHPObjectStatusRouteLayer } from '..';
import { AHPObjectIDRouteLayer } from '../request-details-page';

const DummyActiveRequests: SelectableListDataType[] = [
  {
    key: 1,
    initials: 'NO',
    title: `Notary Case`,
    timestamp: '2021-09-01T00:00:00Z',
    progress: 'Revision Requested',
    version: "1",
    caseType: "Notary"
  },
  {
    key: 2,
    initials: 'ID',
    title: `Identity Verification`,
    timestamp: '2021-09-01T00:00:00Z',
    progress: 'Revision Submitted',
    version: "1",
    caseType: "Identity Verification"
  }
];

interface ActiveRequestListContainerProps {}

export const ActiveRequestListContainer: FC<ActiveRequestListContainerProps> = (_props) => {
  const navigate = useNavigate();

  const [selectedActiveRequest, setSelectedActiveRequest] = useState<SelectableListDataType | undefined>();
  const selectedActiveRequestRouteMatch = useMatch(`/${AHPRootRouteLayer}/${AHPObjectRouteLayer.Cases}/${AHPObjectStatusRouteLayer.Active}/:${AHPObjectIDRouteLayer.CaseId}/*`);

  // set selected request based on request type and request id
  useEffect(() => {
    setSelectedActiveRequest(undefined);
    if (selectedActiveRequestRouteMatch) {
      setSelectedActiveRequest(
        DummyActiveRequests.find((r) => r.key.toString() === selectedActiveRequestRouteMatch.params[AHPObjectIDRouteLayer.CaseId])
      );
      navigate(selectedActiveRequestRouteMatch.pathname);
    }
  }, [selectedActiveRequestRouteMatch]);

  const onAnActiveRequestSelected = (selectedRowKey: Key) => {
    setSelectedActiveRequest(DummyActiveRequests.find((r) => r.key === selectedRowKey));
    navigate(`${selectedRowKey}/chat`);
  };

  return (
    <SelectableList
      data={DummyActiveRequests}
      selectedRecord={selectedActiveRequest}
      onSelectChange={onAnActiveRequestSelected}
    />
  );
};
