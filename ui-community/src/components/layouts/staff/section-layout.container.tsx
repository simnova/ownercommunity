import { useQuery } from "@apollo/client"
import { StaffSectionLayoutContainerUserCurrentQueryDocument, User } from "../../../generated"
import { ComponentQueryLoader } from "../../ui/molecules/component-query-loader";
import { SectionLayout } from "./section-layout";

export const SectionLayoutContainer = (_props: any) => {
  const { data, loading, error } = useQuery(StaffSectionLayoutContainerUserCurrentQueryDocument);

  return (
    <ComponentQueryLoader
      loading={loading}
      hasData={data}
      hasDataComponent={<SectionLayout userData={data?.staffUserCurrent as User}/>}
      error={error}
    />
  );
}