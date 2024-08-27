export const MongoEntityUnitOfWork = new MongoUnitOfWork(InProcEventBusInstance, NodeEventBusInstance, EntityModel, new EntityConverter(), MongoEntityRepository);
