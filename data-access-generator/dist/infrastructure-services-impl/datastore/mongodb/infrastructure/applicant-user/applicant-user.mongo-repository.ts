export class MongoApplicantUserRepository<PropType extends ApplicantUserProps>
  extends MongoRepositoryBase<DomainExecutionContext, ApplicantUser, PropType, ApplicantUserDO<PropType>>
  implements ApplicantUserRepository<PropType>
{
  async getNewInstance(name: string): Promise<ApplicantUserDO<PropType>> {
    let adapter = this.typeConverter.toAdapter(new this.model());
    return ApplicantUserDO.getNewInstance(adapter, 
    // name, 
    this.context);
  }

  async getById(id: string): Promise<ApplicantUserDO<PropType>> {
    // add populate method as needed
    let item = await this.model.findById(id)
    //.populate('community').exec();
    return this.typeConverter.toDomain(item, this.context);
  }

  async getAll(): Promise<ApplicantUserDO<PropType>[]> {
    // add populate method as needed
    let items = await this.model.find()
    //.populate('community').exec();
    return items.map((item) => this.typeConverter.toDomain(item, this.context));
  }
}