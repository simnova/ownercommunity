import React from "react";


interface CardListProps {
    data: any;
}

export const NeighborsCardList: React.FC<CardListProps> = (props) => {

    const generateCards = (data: any) => {
        return data.map((member: any) => {
            if (!member.profile.showProfile) {
                return (
                    <div key={member.profile.memberId}>
                        <h2>Name: {member.profile.name}</h2>
                        <h3>{member.profile.email}</h3>
                        <p>{member.profile.bio}</p>
                    </div>
                );
            }
        });
    }

    return <>
        {generateCards(props.data)}
    </>
}