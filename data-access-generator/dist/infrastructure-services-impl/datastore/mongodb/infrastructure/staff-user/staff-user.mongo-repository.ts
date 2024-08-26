export class MongoStaffUserRepository<PropType extends StaffUserProps>
  extends MongoRepositoryBase<DomainExecutionContext, StaffUser, PropType, StaffUserDO<PropType>>
  implements StaffUserRepository<PropType>
{
  async getNewInstance(name: string): Promise<StaffUserDO<PropType>> {
    let adapter = this.typeConverter.toAdapter(new this.model());
    return StaffUserDO.getNewInstance(adapter, 
    // name, 
    this.context);
  }

  async getById(id: string): Promise<StaffUserDO<PropType>> {
    // add populate method as needed
    let item = await this.model.findById(id)
    //.populate('community').exec();
    return this.typeConverter.toDomain(item, this.context);
  }

  async getAll(): Promise<StaffUserDO<PropType>[]> {
    // add populate method as needed
    let items = await this.model.find()
    //.populate('community').exec();
    return items.map((item) => this.typeConverter.toDomain(item, this.context));
  }
}