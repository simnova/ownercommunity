export interface CybersourceBase {
  generateKey(): Promise<string>;
}