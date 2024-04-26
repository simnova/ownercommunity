import { useLazyQuery, useQuery } from '@apollo/client';
import { PageLayoutProps } from '.';
import { Member, SectionLayoutContainerMemberByIdQueryDocument } from '../../../generated';
import { useParams } from 'react-router-dom';
import { ComponentQueryLoader } from '../../ui/molecules/component-query-loader';
import { SectionLayout } from './section-layout';
import { useEffect, useState } from 'react';
import { Exception } from '@microsoft/applicationinsights-web';

interface SectionLayoutContainerProps {
  pageLayouts: PageLayoutProps[];
}

export const SectionLayoutContainer = (props: SectionLayoutContainerProps) => {
  const params = useParams();

  const [memberQuery] = useLazyQuery(SectionLayoutContainerMemberByIdQueryDocument);
  const [memberData, setMemberData] = useState<any>(null);
  const [memberError, setMemberError] = useState<any>(null);
  const [memberLoading, setMemberLoading] = useState<any>(null);

  useEffect(() => {
    const getData = async () => {
      try{
        const {
          data: memberDataTemp,
          loading: memberLoadingTemp,
          error: memberErrorTemp
        } = await memberQuery({
          variables: {
            memberId: params.memberId ?? ''
          }
        });
        setMemberData(memberDataTemp);
      setMemberError(memberErrorTemp);
      setMemberLoading(memberLoadingTemp);
      }
      catch(e){
        console.error("Error fetching data in section layout: ", e);
      }
    };
    getData();
  }, [params]);

  return (
    <ComponentQueryLoader
      loading={memberLoading}
      hasData={memberData}
      hasDataComponent={<SectionLayout pageLayouts={props.pageLayouts} memberData={memberData?.member as Member} />}
      error={memberError}
    />
  );
};
