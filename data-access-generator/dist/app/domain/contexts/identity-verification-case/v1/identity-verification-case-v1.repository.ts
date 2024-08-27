export interface IdentityVerificationCaseV1Repository<props extends IdentityVerificationCaseV1Props> extends Repository<IdentityVerificationCaseV1<props>> {
  getNewInstance(name: string): Promise<IdentityVerificationCaseV1<props>>;
  getById(id: string): Promise<IdentityVerificationCaseV1<props>>;
  getAll(): Promise<IdentityVerificationCaseV1<props>[]>
}