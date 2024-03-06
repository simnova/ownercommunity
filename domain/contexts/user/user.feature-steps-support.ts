import { defineParameterType } from "@cucumber/cucumber";
import { DomainExecutionContext } from "../context";
import { Passport } from "../iam/passport";
import { UserVisa } from "../iam/user-visa";
import { User, UserPermissions, UserProps } from "./user";

const userContext = (mockPermissions: UserPermissions) => {
  return ({
    passport: <Passport>(
      ({
        forUser:() => {
          return {
              determineIf: (func:((permissions:UserPermissions) => boolean)) => {
                  return func(mockPermissions);
              }
          } as UserVisa;
        }
    } as Partial<Passport>) as any)
  } as DomainExecutionContext);
};

const userProps = <UserProps>(
  ({
    id: 'valid-id',
    email: 'valid-email',
    password: 'valid-password',
    createdAt: new Date(),
    updatedAt: new Date(),
    schemaVersion: 'valid-schema-version',
    setCreatedByRef: () => {}
  } as Partial<UserProps>) as any
);

const createUser = (name:string): User<UserProps> => {
  return User.getNewUser(
    userProps,
    'valid-external-id',
    name,
    null
  );
}

defineParameterType({
  name: 'userType',
  regexp: /.*/,
  transformer: name => createUser(name)
});