For Each Environment:

Create Azure Data Lake Storage Gen2 storage account
https://learn.microsoft.com/en-us/azure/storage/common/storage-account-create
(Creating a hierarchical namespace requires Azure CLI version 2.0.79 or later)
az storage account create --name cxadevstdlaavaqbizf2s7le --resource-group reporting-rg --location eastus2 --sku Standard_RAGZRS --kind StorageV2 --min-tls-version TLS1_2 --allow-blob-public-access false --enable-hierarchical-namespace true --tags environment=dev application=cxa-reporting

Add a role assignment to the storage account for Storage Account Contributor
az role assignment create --role "Storage Account Contributor" --assignee "ec0da0c5-e9c8-4893-afa3-64b768db6788" --scope "/subscriptions/3ea42799-6a1b-4b86-bf6c-9c8e3bc2095b/resourceGroups/reporting-rg/providers/Microsoft.Storage/storageAccounts/cxadevstdlaavaqbizf2s7le"

Create a container in the storage account
az storage container create --name reportingdls --account-name cxadevstdlaavaqbizf2s7le --public-access off --auth-mode login

Register Resource Provider in your Azure Subscription (if not already registered)
az provider register --namespace 'Microsoft.Synapse'
may take a couple of mins to register

Create Azure Synapse Analytics Workspace
https://learn.microsoft.com/en-us/azure/synapse-analytics/quickstart-create-workspace-cli#create-an-azure-synapse-analytics-workspace-by-using-the-azure-cli
az synapse workspace create --name cxa-dev-synw-avaqbizf2s7le --resource-group reporting-rg --storage-account cxadevstdlaavaqbizf2s7le --file-system reportingdls --sql-admin-login-user "sqladminuser" --sql-admin-login-password "<password>" --location eastus2 --tags environment=dev application=cxa-reporting --managed-rg-name reporting-rg-synw --enable-managed-virtual-network true --prevent-data-exfiltration false
(takes severak mins to create)

az synapse workspace firewall-rule create --name allowAll --workspace-name cxa-dev-synw-avaqbizf2s7le --resource-group reporting-rg --start-ip-address 0.0.0.0 --end-ip-address 255.255.255.255

Role Assignments
Assign other users of the workspace to the Contributor role in the workspace
az role assignment create --assignee "ec0da0c5-e9c8-4893-afa3-64b768db6788" --role "Contributor" --scope "/subscriptions/3ea42799-6a1b-4b86-bf6c-9c8e3bc2095b/resourcegroups/reporting-rg/providers/Microsoft.Synapse/workspaces/cxa-dev-synw-avaqbizf2s7le"


Assign the Storage Blob Data Contributor role to the Azure Synapse Analytics workspace managed service identity and other users.
az role assignment create --assignee "d2890998-06ba-4aa9-b793-842ce92e8384" --role "Storage Blob Data Contributor" --scope "/subscriptions/3ea42799-6a1b-4b86-bf6c-9c8e3bc2095b/resourcegroups/reporting-rg/providers/Microsoft.Storage/storageAccounts/cxadevstdlaavaqbizf2s7le"

Assign other users the appropriate Azure Synapse Analytics role-based access control roles by using Synapse Studio. ???

Add Azure Key Vault Access Policy to allow the workspace to access secrets in the key vault
az keyvault set-policy --name cxa-dev-kv-mg --object-id "d2890998-06ba-4aa9-b793-842ce92e8384" --secret-permissions get list

Create Linked Service to Azure Key Vault
az synapse linked-service create --workspace-name cxa-dev-synw-avaqbizf2s7le --name AzureKeyVaultLinkedService --file @"./az-bicep/modules/reporting/azure-key-vault-linked-service.json"


FOR EACH COSMOS DB:
Enable Azure Synapse Link for Azure Cosmos DB accounts
https://learn.microsoft.com/en-us/azure/cosmos-db/configure-synapse-link?context=%2Fazure%2Fsynapse-analytics%2Fcontext%2Fcontext#enable-synapse-link
az cosmosdb update --name reporting-cosmosdb --resource-group reporting-rg --enable-analytical-storage true --analytical-storage-schema-type FullFidelity

Enable Azure Synapse Link for your containers
https://learn.microsoft.com/en-us/azure/cosmos-db/configure-synapse-link?context=%2Fazure%2Fsynapse-analytics%2Fcontext%2Fcontext#update-analytical-ttl
az cosmosdb mongodb collection update --account-name reporting-cosmosdb --database-name reportingdb --name collection1 --resource-group reporting-rg --analytical-storage-ttl -1

Create Linked Service to CosmosDB MongoDB API
az synapse linked-service create --workspace-name cxa-dev-synw-avaqbizf2s7le --name AzureCosmosDbMongoDbApiLinkedService --file @"./az-bicep/modules/reporting/azure-cosmos-db-mongo-db-api-linked-service.json"