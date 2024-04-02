import { DomainExecutionContext } from "../src/app/domain/contexts/domain-execution-context";
import { SystemPassport } from "../src/app/domain/contexts/iam/passport";

export const generateEnumRegexFromInterface = (interfaceObj: Record<string, boolean>): RegExp => {
  const enumValues = Object.keys(interfaceObj);
  const enumPattern = enumValues.join('|');
  return new RegExp(`^\\[${enumPattern}(?:,${enumPattern})*\\]$`);
}


export const generatePermissions = <PermissionsType extends Object>(permissionList: string[], defaultPermissions: PermissionsType): PermissionsType => {
  permissionList.forEach((permission) => {
    const key = permission.trim();
    if (key in defaultPermissions) {
      defaultPermissions[key] = true;
    }
  });
  return defaultPermissions;
}


// export const SystemExecutionContext = (): DomainExecutionContext => {
//   const context: DomainExecutionContext = {
//     passport: SystemPassport.GetInstance(),
//   };
//   return context;
// };