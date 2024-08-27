export class MongoEntityRepository<PropType extends EntityProps>
  extends MongoRepositoryBase<DomainExecutionContext, Entity, PropType, EntityDO<PropType>>
  implements EntityRepository<PropType>
{
  async getNewInstance(name: string): Promise<EntityDO<PropType>> {
    let adapter = this.typeConverter.toAdapter(new this.model());
    return EntityDO.getNewInstance(adapter, 
    // name, 
    this.context);
  }

  async getById(id: string): Promise<EntityDO<PropType>> {
    // add populate method as needed
    let item = await this.model.findById(id)
    //.populate('community').exec();
    return this.typeConverter.toDomain(item, this.context);
  }

  async getAll(): Promise<EntityDO<PropType>[]> {
    // add populate method as needed
    let items = await this.model.find()
    //.populate('community').exec();
    return items.map((item) => this.typeConverter.toDomain(item, this.context));
  }
}