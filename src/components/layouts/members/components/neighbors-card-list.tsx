import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { MemberSiteNeighborsListCurrentMemberIdDocument } from '../../../../generated'
import { NeighborsCard } from "./neighbors-card";

interface CardListProps {
    data: any;
}

export const NeighborsCardList: React.FC<CardListProps> = (props) => {
    const { communityId } = useParams();
    const { data, loading, error } = useQuery(MemberSiteNeighborsListCurrentMemberIdDocument, {
        variables: { communityId: communityId }
    })

    const generateCards = (data: any, currentMemberId: string) => {
        return data.map((member: any) => {
            if (member.profile.showProfile) {
                return (
                    <NeighborsCard profile={member.profile} />
                );
            }
        });
    }

    const content = () => {
        if (loading) {
            return <div>Loading...</div>;
        } else if (error) {
            return <div>Error! {error}</div>;
        } else {
            return (
                <div style={{ display: 'flex' }}>
                    {generateCards(props.data, data?.memberForCurrentUser?.id)}
                </div>
            )
        }
    }
            

    return <>
        {content()}
    </>
}