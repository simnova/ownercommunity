export const MongoSendReportCaseV1UnitOfWork = new MongoUnitOfWork(InProcEventBusInstance, NodeEventBusInstance, SendReportCaseModel, new SendReportCaseV1Converter(), MongoSendReportCaseV1Repository);
