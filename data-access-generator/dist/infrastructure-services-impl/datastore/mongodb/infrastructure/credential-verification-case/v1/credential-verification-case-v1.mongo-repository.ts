export class MongoCredentialVerificationCaseV1Repository<PropType extends CredentialVerificationCaseV1Props>
  extends MongoRepositoryBase<DomainExecutionContext, CredentialVerificationCase, PropType, CredentialVerificationCaseV1DO<PropType>>
  implements CredentialVerificationCaseV1Repository<PropType>
{
  async getNewInstance(name: string): Promise<CredentialVerificationCaseV1DO<PropType>> {
    let adapter = this.typeConverter.toAdapter(new this.model());
    return CredentialVerificationCaseV1DO.getNewInstance(adapter, 
    // name, 
    this.context);
  }

  async getById(id: string): Promise<CredentialVerificationCaseV1DO<PropType>> {
    // add populate method as needed
    let item = await this.model.findById(id)
    //.populate('community').exec();
    return this.typeConverter.toDomain(item, this.context);
  }

  async getAll(): Promise<CredentialVerificationCaseV1DO<PropType>[]> {
    // add populate method as needed
    let items = await this.model.find()
    //.populate('community').exec();
    return items.map((item) => this.typeConverter.toDomain(item, this.context));
  }
}