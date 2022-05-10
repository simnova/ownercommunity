import React from "react";
import { useQuery } from "@apollo/client";
import { Skeleton } from "antd";
import { MemberSiteNeighborsListContainerDocument } from "../../../../generated";
import { NeighborsCardList } from "./neighbors-card-list";

interface NeighborsCardListContainerProps {
    data: {
        communityId: string;
    }
}

export const NeighborsCardListContainer: React.FC<NeighborsCardListContainerProps> = (props) => {
    const {
        data: memberData,
        loading: memberLoading,
        error: memberError
      } = useQuery(MemberSiteNeighborsListContainerDocument, {
        variables: { communityId: props.data.communityId }
      });
    
      if (memberLoading) {
        return (
          <div>
            <Skeleton active />
          </div>
        );
      }
      if (memberError) {
        return <div>{JSON.stringify(memberError)}</div>;
      }
      if (memberData) {
        console.log("MemberData: ", memberData);
        return <NeighborsCardList data={memberData.membersByCommunityId} />;
      } else {
        return <div>No Data...</div>;
      }
}