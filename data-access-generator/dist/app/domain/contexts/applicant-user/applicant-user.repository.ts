export interface ApplicantUserRepository<props extends ApplicantUserProps> extends Repository<ApplicantUser<props>> {
  getNewInstance(name: string): Promise<ApplicantUser<props>>;
  getById(id: string): Promise<ApplicantUser<props>>;
  getAll(): Promise<ApplicantUser<props>[]>
}