export interface CredentialVerificationCaseV1Repository<props extends CredentialVerificationCaseV1Props> extends Repository<CredentialVerificationCaseV1<props>> {
  getNewInstance(name: string): Promise<CredentialVerificationCaseV1<props>>;
  getById(id: string): Promise<CredentialVerificationCaseV1<props>>;
  getAll(): Promise<CredentialVerificationCaseV1<props>[]>
}