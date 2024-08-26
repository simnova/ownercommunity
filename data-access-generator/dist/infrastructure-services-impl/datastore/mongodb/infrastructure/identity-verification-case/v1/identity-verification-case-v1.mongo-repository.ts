export class MongoIdentityVerificationCaseV1Repository<PropType extends IdentityVerificationCaseV1Props>
  extends MongoRepositoryBase<DomainExecutionContext, IdentityVerificationCase, PropType, IdentityVerificationCaseV1DO<PropType>>
  implements IdentityVerificationCaseV1Repository<PropType>
{
  async getNewInstance(name: string): Promise<IdentityVerificationCaseV1DO<PropType>> {
    let adapter = this.typeConverter.toAdapter(new this.model());
    return IdentityVerificationCaseV1DO.getNewInstance(adapter, 
    // name, 
    this.context);
  }

  async getById(id: string): Promise<IdentityVerificationCaseV1DO<PropType>> {
    // add populate method as needed
    let item = await this.model.findById(id)
    //.populate('community').exec();
    return this.typeConverter.toDomain(item, this.context);
  }

  async getAll(): Promise<IdentityVerificationCaseV1DO<PropType>[]> {
    // add populate method as needed
    let items = await this.model.find()
    //.populate('community').exec();
    return items.map((item) => this.typeConverter.toDomain(item, this.context));
  }
}