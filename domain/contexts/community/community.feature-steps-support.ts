import { defineParameterType } from '@cucumber/cucumber';
import { SystemExecutionContext } from '../feature-steps-helper';
import { Community, CommunityProps } from "./community";
import { UserEntityReference } from "../user/user";

// const communityProps1 = <CommunityProps>(
//   ({
//     name: 'valid-name',
//     domain: 'valid-domain',
//     whiteLabelDomain: 'valid-white-label-domain',
//     handle: 'valid-handle',
//     createdAt: new Date(),
//     updatedAt: new Date(),
//     schemaVersion: 'valid-schema-version',
//     createdBy: <UserProps>({id: 'valid-id'} as any),
//     setCreatedByRef: () => {}
//   } as Partial<CommunityProps>) as any
// );
const communityProps = {} as CommunityProps;
const userEntityReference = {} as UserEntityReference;
const createCommunity = (name: string): Community<CommunityProps> => {
  return Community.getNewInstance(
    communityProps,
    name,
    userEntityReference,
    SystemExecutionContext(),
  );
}

defineParameterType({
  name: 'communityType',
  regexp: /.*/,
  transformer: name => createCommunity(name)
});

