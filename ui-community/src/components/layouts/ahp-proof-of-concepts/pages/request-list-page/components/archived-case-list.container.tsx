import { FC, Key, useEffect, useState } from 'react';
import { useMatch, useNavigate, useResolvedPath } from 'react-router-dom';
import { SelectableList, SelectableListDataType } from '../../../components/selectable-list';
import { AHPObjectIDRouteLayer } from '../case-details-page';

const DummyArchivedCases: SelectableListDataType[] = [
  {
    key: 1,
    initials: 'NO',
    title: `Notary Case`,
    timestamp: '2021-09-01T00:00:00Z',
    progress: 'Decision Rendered',
    version: '1',
    caseType: 'Notary'
  },
  {
    key: 2,
    initials: 'ID',
    title: `Identity Verification`,
    timestamp: '2021-09-01T00:00:00Z',
    progress: 'Decision Rendered',
    version: '1',
    caseType: 'Identity Verification'
  }
];

interface ArchivedCaseListContainerProps {}

export const ArchivedCaseListContainer: FC<ArchivedCaseListContainerProps> = (_props) => {
  const navigate = useNavigate();

  const [selectedArchivedCase, setSelectedArchivedCase] = useState<SelectableListDataType | undefined>();

  const archivedCaseListRoutePath = useResolvedPath('');
  const selectedArchivedCaseRouteMatch = useMatch(
    `${archivedCaseListRoutePath.pathname}/:${AHPObjectIDRouteLayer.CaseId}`
  );

  // set selected based on type and id
  useEffect(() => {
    setSelectedArchivedCase(undefined);
    if (selectedArchivedCaseRouteMatch) {
      setSelectedArchivedCase(
        DummyArchivedCases.find(
          (r) => r.key.toString() === selectedArchivedCaseRouteMatch.params[AHPObjectIDRouteLayer.CaseId]
        )
      );
      navigate(selectedArchivedCaseRouteMatch.pathname);
    }
  }, [selectedArchivedCaseRouteMatch]);

  const onAnArchivedCaseSelected = (selectedRowKey: Key) => {
    setSelectedArchivedCase(DummyArchivedCases.find((r) => r.key === selectedRowKey));
    navigate(`${selectedRowKey}`);
  };

  return (
    <SelectableList
      data={DummyArchivedCases}
      selectedRecord={selectedArchivedCase}
      onSelectChange={onAnArchivedCaseSelected}
    />
  );
};
