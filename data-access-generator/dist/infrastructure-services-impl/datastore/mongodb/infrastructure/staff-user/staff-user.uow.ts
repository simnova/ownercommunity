export const MongoStaffUserUnitOfWork = new MongoUnitOfWork(InProcEventBusInstance, NodeEventBusInstance, StaffUserModel, new StaffUserConverter(), MongoStaffUserRepository);
