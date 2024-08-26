export class MongoSendReportCaseV1Repository<PropType extends SendReportCaseV1Props>
  extends MongoRepositoryBase<DomainExecutionContext, SendReportCase, PropType, SendReportCaseV1DO<PropType>>
  implements SendReportCaseV1Repository<PropType>
{
  async getNewInstance(name: string): Promise<SendReportCaseV1DO<PropType>> {
    let adapter = this.typeConverter.toAdapter(new this.model());
    return SendReportCaseV1DO.getNewInstance(adapter, 
    // name, 
    this.context);
  }

  async getById(id: string): Promise<SendReportCaseV1DO<PropType>> {
    // add populate method as needed
    let item = await this.model.findById(id)
    //.populate('community').exec();
    return this.typeConverter.toDomain(item, this.context);
  }

  async getAll(): Promise<SendReportCaseV1DO<PropType>[]> {
    // add populate method as needed
    let items = await this.model.find()
    //.populate('community').exec();
    return items.map((item) => this.typeConverter.toDomain(item, this.context));
  }
}