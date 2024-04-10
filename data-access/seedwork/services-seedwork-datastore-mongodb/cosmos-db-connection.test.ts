import {expect, jest, test} from '@jest/globals';
import { CosmosDbConnection } from './cosmos-db-connection';

describe('Services::cosmos-db', () => {
  describe('cosmos-db-connection', () => {

      it.skip('should connect to database', async () => {
        // Arrange
        const azureTenantId='';
        const azureSubscriptionId='';
        const azureResourceGroupName='';
        const azureCosmosDbAccountName='';
        const azureCosmosDbName='';
        const autoIndex=true;
        const autoCreate=true;
        const minPoolSize=10;
        const maxPoolSize=100;

        // Act
        let cosmosDbConnection = CosmosDbConnection.getInstance(
          azureTenantId,
          azureSubscriptionId,
          azureResourceGroupName,
          azureCosmosDbAccountName,
          azureCosmosDbName,
          autoIndex,
          autoCreate,
          minPoolSize,
          maxPoolSize
        );
        await cosmosDbConnection.connect();
          
        // Assert
        expect(1).toEqual(1);
    });
  });
});




