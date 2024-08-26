export const MongoApplicantUserUnitOfWork = new MongoUnitOfWork(InProcEventBusInstance, NodeEventBusInstance, ApplicantUserModel, new ApplicantUserConverter(), MongoApplicantUserRepository);
