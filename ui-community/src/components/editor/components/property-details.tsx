import { useQuery } from '@apollo/client';
import { useNode } from '@craftjs/core';
import { Skeleton } from 'antd';
import { useParams } from 'react-router-dom';
import { MemberPropertyByPropertyIdDocument } from '../../../generated';
import { CommunityPropertyDetail } from '../../layouts/members/components/community-property-detail';
import { mockPropertyData } from './property-details.mock-data';


const PropertyDetails: any = () => {
    const params = useParams();
    const propertyId = params['*']?.slice(params['*'].lastIndexOf('/') + 1);

    const { connectors: { connect, drag } } = useNode((state) =>(
        {
            selected: state.events.selected,
        }
    ));

    const {loading: propertyLoading, error: propertyError, data: propertyData } = useQuery(MemberPropertyByPropertyIdDocument, 
        {
            variables: { 
                propertyId: propertyId,
                
            }, skip: propertyId === 'page-editor'
        },
    );

    const generatePropertyDetails = (property: any) => {
        return (
            <div 
                className="px-4 py-2"
                ref={ref => connect(drag(ref as HTMLDivElement))} 
            >
                <div className="bg-white shadow overflow-hidden sm:rounded" style={{padding: '5%', display: 'flex', justifyContent: 'center'}}>
                    <CommunityPropertyDetail data={property} space="horizontal"/>
                </div>
            </div>
        )
    }

    const content = () => {
        if (propertyLoading) return <Skeleton active/>;
        if (propertyError) return <p>Error! ${propertyError.message}</p>;
        if (propertyData) return generatePropertyDetails(propertyData);
        return (
        <div>No data</div>
        )
    }

    return <>
        {propertyId === 'page-editor' ? generatePropertyDetails(mockPropertyData) : content()}
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
};
