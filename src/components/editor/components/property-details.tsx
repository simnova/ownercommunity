import { useLocation, useParams } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';
import { useNode } from '@craftjs/core';
import { MemberPropertyByPropertyIdDocument } from '../../../generated';
import { Typography, Card, Space, Badge, Skeleton } from 'antd';

let PropertyDetails: any;

PropertyDetails = () => {
    const params = useParams();
    const propertyId = params['*']?.slice(params['*'].lastIndexOf('/') + 1);

    const { connectors: { connect, drag }, selected } = useNode((state) =>(
        {
            selected: state.events.selected,
        }
    ));

    const { loading, error, data } = useQuery(MemberPropertyByPropertyIdDocument, {
      variables: { propertyId: propertyId}
    }
    );

    const content = () => {
        if (loading) return <Skeleton active/>;
        if (error) return <p>Error! ${error.message}</p>;
        if (data) return (
            <div 
                className="px-4 py-2"
                ref={ref => connect(drag(ref as HTMLDivElement))} 
            >
                <div className="bg-white shadow overflow-hidden sm:rounded" style={{display:'flex', justifyContent: 'space-around', flexWrap: 'wrap'}}>
                    Property Details go here
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