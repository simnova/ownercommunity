import { FC, Key, useEffect, useState } from 'react';
import { useMatch, useNavigate, useResolvedPath } from 'react-router-dom';
import { SelectableList, SelectableListDataType } from '../../../components/selectable-list';
import { AHPObjectIDRouteLayer } from '../case-details-page';

const DummyActiveCases: SelectableListDataType[] = [
  {
    key: 1,
    initials: 'NO',
    title: `Notary Case`,
    timestamp: '2021-09-01T00:00:00Z',
    progress: 'Revision Requested',
    version: '1',
    caseType: 'Notary'
  },
  {
    key: 2,
    initials: 'ID',
    title: `Identity Verification`,
    timestamp: '2021-09-01T00:00:00Z',
    progress: 'Revision Submitted',
    version: '1',
    caseType: 'Identity Verification'
  }
];

interface ActiveCaseListContainerProps {}

export const ActiveCaseListContainer: FC<ActiveCaseListContainerProps> = (_props) => {
  const navigate = useNavigate();

  const [selectedActiveCase, setSelectedActiveCase] = useState<SelectableListDataType | undefined>();

  const activeCaseListRoutePath = useResolvedPath('');
  const selectedActiveCaseRouteMatch = useMatch(
    `${activeCaseListRoutePath.pathname}/:${AHPObjectIDRouteLayer.CaseId}/*`
  );
  // set selected based on type and id
  useEffect(() => {
    setSelectedActiveCase(undefined);
    if (selectedActiveCaseRouteMatch) {
      setSelectedActiveCase(
        DummyActiveCases.find(
          (r) => r.key.toString() === selectedActiveCaseRouteMatch.params[AHPObjectIDRouteLayer.CaseId]
        )
      );
      navigate(selectedActiveCaseRouteMatch.pathname);
    }
  }, [selectedActiveCaseRouteMatch]);

  const onAnActiveCaseSelected = (selectedRowKey: Key) => {
    setSelectedActiveCase(DummyActiveCases.find((r) => r.key === selectedRowKey));
    navigate(`${selectedRowKey}/chat`);
  };

  return (
    <SelectableList
      data={DummyActiveCases}
      selectedRecord={selectedActiveCase}
      onSelectChange={onAnActiveCaseSelected}
    />
  );
};
