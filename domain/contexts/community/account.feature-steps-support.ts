import { AccountProps } from "./account";
import { Member, MemberProps } from "./member";
import { User, UserProps } from "../user/user";

const accountProps = <AccountProps>(
  ({
    id: 'account-id',
    createdAt: new Date(),
    updatedAt: new Date(),
    schemaVersion: 'valid-schema-version',
    setCreatedByRef: () => {},
  } as Partial<AccountProps>) as any
);

export const addUserAsMemberAccount = (
  member: Member<MemberProps>, 
  user: User<UserProps>
): void => {
  accountProps.setUserRef(user);
  member.requestAddAccount(accountProps);
}