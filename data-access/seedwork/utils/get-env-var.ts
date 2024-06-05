export function tryGetEnvVar(envVar: string): string {
  const value = process.env[envVar];
  if (value === undefined) {
    throw new Error(`Environment variable ${envVar} is not set`);
  }
  return value;
}