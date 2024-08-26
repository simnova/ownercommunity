export interface SendReportCaseV1Repository<props extends SendReportCaseV1Props> extends Repository<SendReportCaseV1<props>> {
  getNewInstance(name: string): Promise<SendReportCaseV1<props>>;
  getById(id: string): Promise<SendReportCaseV1<props>>;
  getAll(): Promise<SendReportCaseV1<props>[]>
}