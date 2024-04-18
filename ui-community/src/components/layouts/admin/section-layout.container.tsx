import { useQuery } from "@apollo/client";
import { PageLayoutProps } from "."
import { Member, SectionLayoutContainerMemberByIdQueryDocument } from "../../../generated";
import { useParams } from "react-router-dom";
import { ComponentQueryLoader } from "../../ui/molecules/component-query-loader";
import { SectionLayout } from "./section-layout";

interface SectionLayoutContainerProps {
  pageLayouts: PageLayoutProps[];
}

export const SectionLayoutContainer = (props: SectionLayoutContainerProps) => {
  const params = useParams();

  const { data: memberData, loading: memberLoading, error: memberError } = useQuery(SectionLayoutContainerMemberByIdQueryDocument, {
    variables: {
      memberId: params.memberId ?? '',
    }
  });

  return (
    <ComponentQueryLoader
      loading={memberLoading}
      hasData={memberData}
      hasDataComponent={<SectionLayout pageLayouts={props.pageLayouts} memberData={memberData?.member as Member}/>}
      error={memberError}
    />
  );

};
