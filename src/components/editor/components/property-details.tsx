import { useLocation, useParams } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';
import { useNode } from '@craftjs/core';
import { MemberPropertyByPropertyIdDocument } from '../../../generated';
import { Typography, Card, Space, Badge, Skeleton } from 'antd';
import { CommunityPropertyDetail } from '../../layouts/members/components/community-property-detail';

let PropertyDetails: any;

PropertyDetails = () => {
    const params = useParams();
    const propertyId = params['*']?.slice(params['*'].lastIndexOf('/') + 1);

    const { connectors: { connect, drag }, selected } = useNode((state) =>(
        {
            selected: state.events.selected,
        }
    ));

    const { loading: propertyLoading, error: propertyError, data: propertyData } = useQuery(MemberPropertyByPropertyIdDocument, {
      variables: { propertyId: propertyId}
    }
    );

    const content = () => {
        if (propertyLoading) return <Skeleton active/>;
        if (propertyError) return <p>Error! ${propertyError.message}</p>;
        if (propertyData) return (
            <div 
                className="px-4 py-2"
                ref={ref => connect(drag(ref as HTMLDivElement))} 
            >
                <div className="bg-white shadow overflow-hidden sm:rounded" style={{padding: '5%', display: 'flex', justifyContent: 'center'}}>
                    <CommunityPropertyDetail data={propertyData} space="horizontal"/>
                </div>
            </div>
        )
        return (
          <div>No data</div>
        )
    }

    return <>
        {content()}
    </>
}

const PropertyDetailsSettings = () => {
    return <></>
}

PropertyDetails.craft = {
    related: {
        settings: PropertyDetailsSettings
    },
    custom: {
        isDeletable: false,
    }
}

export {
    PropertyDetails
}