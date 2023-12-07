import { useMutation, useQuery } from '@apollo/client';
import {
  AdminPropertiesListContainerPropertiesDocument,
  SharedPropertiesDetailContainerPropertyDeleteDocument,
  SharedPropertiesDetailContainerMembersDocument,
  SharedPropertiesDetailContainerPropertyDocument,
  SharedPropertiesDetailContainerPropertyUpdateDocument,
  PropertyUpdateInput
} from '../../../../generated';
import { PropertiesDetail } from './properties-detail';
import PropTypes from 'prop-types';
import { message, Skeleton } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useAppInsightsContext } from "@microsoft/applicationinsights-react-js";
import { IDiagnosticLogger, generateW3CId, getLocation } from "@microsoft/applicationinsights-core-js";
import { IExceptionTelemetry, ApplicationInsights as AIObject, AppInsightsCore, ApplicationInsights, ApplicationInsightsContainer} from '@microsoft/applicationinsights-web';

const ComponentPropTypes = {
  data: PropTypes.shape({
    id: PropTypes.string.isRequired,
    communityId: PropTypes.string.isRequired
  })
};

interface ComponentPropInterface {
  data: {
    id: string;
    communityId: string;
  };
  isAdmin?: boolean;
}

export type PropertiesDetailContainerPropTypes = PropTypes.InferProps<typeof ComponentPropTypes> &
  ComponentPropInterface;

export const PropertiesDetailContainer: React.FC<PropertiesDetailContainerPropTypes> = (props) => {
  const navigate = useNavigate();
  const appInsights = useAppInsightsContext();
  const [updateProperty] = useMutation(SharedPropertiesDetailContainerPropertyUpdateDocument);
  const [deleteProperty] = useMutation(SharedPropertiesDetailContainerPropertyDeleteDocument, {
    update(cache, { data }) {
      // update the list by removing the deleted item - necessary for root objects
      const deletedProperty = data?.propertyDelete.property;
      const properties = cache.readQuery({
        query: AdminPropertiesListContainerPropertiesDocument,
        variables: { communityId: props.data.communityId }
      })?.propertiesByCommunityId;
      if (deletedProperty && properties) {
        cache.writeQuery({
          query: AdminPropertiesListContainerPropertiesDocument,
          variables: { communityId: props.data.communityId },
          data: {
            propertiesByCommunityId: properties?.filter(
              (property) => property?.id !== deletedProperty.id
            )
          }
        });
      }
    }
  });

  const {
    data: memberData,
    loading: memberLoading,
    error: memberError
  } = useQuery(SharedPropertiesDetailContainerMembersDocument, {
    variables: { communityId: props.data.communityId }
  });

  const {
    data: propertyData,
    loading: propertyLoading,
    error: propertyError
  } = useQuery(SharedPropertiesDetailContainerPropertyDocument, {
    variables: {
      id: props.data.id
    }
  });

  const handleSave = async (values: PropertyUpdateInput) => {
    try {
      // hack : https://learn.microsoft.com/en-us/azure/azure-monitor/app/transaction-diagnostics#is-there-a-way-to-see-fewer-events-per-transaction-when-i-use-the-application-insights-javascript-sdk
      
      (appInsights.getAppInsights() as any ).core.getTraceCtx().setTraceId(generateW3CId())
      //(appInsights.getAppInsights() as AIObject).context.telemetryTrace.traceID = generateW3CId();
      appInsights.getAppInsights().startTrackPage('PropertiesDetail-SavePageView');
     
      //.properties.context.telemetryTrace.traceID = ApplicationInsights.Telemetry.Util.generateW3CId().
      //appInsights.trackPageView({name: 'PropertiesDetail-SavePageView', uri: window.location.href + "/save-property"});
   
      appInsights.trackTrace({message: 'PropertiesDetail-SaveTrace'});
      await updateProperty({
        variables: {
          input: values
        }
      });
      appInsights.trackEvent({name: 'PropertiesDetail-SaveEvent', properties: {success: true}});
      message.success('Saved');
      appInsights.getAppInsights().stopTrackPage('PropertiesDetail-SavePageView', window.location.href + "/save-property");
    } catch (error) {
      message.error(`Error updating Property: ${JSON.stringify(error)}`);
      appInsights.trackException({error:error} as IExceptionTelemetry,{propertyId: values.id});
    }
  };
  const handleDelete = async () => {
    try {
      await deleteProperty({
        variables: {
          input: {
            id: props.data.id
          }
        }
      });
      message.success('Deleted');
      navigate('../../');
    } catch (error) {
      message.error(`Error deleting Property: ${JSON.stringify(error)}`);
    }
  };

  const content = () => {
    if (propertyLoading || memberLoading) {
      return (
        <div>
          <Skeleton active />
        </div>
      );
    } else if (propertyError || memberError) {
      return <div>{JSON.stringify(propertyError || memberError)}</div>;
    } else if (propertyData && propertyData.property && memberData?.membersByCommunityId) {
      var detailData = {
        property: propertyData.property,
        members: memberData.membersByCommunityId
      };
      return <PropertiesDetail data={detailData} onSave={handleSave} onDelete={handleDelete} isAdmin={props.isAdmin} />;
    } else {
      return <div>No data</div>;
    }
  };

  return <>{content()}</>;
};
