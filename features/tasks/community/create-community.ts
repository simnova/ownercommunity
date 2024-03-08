// import { Answerable, d, QuestionAdapter, Task } from '@serenity-js/core';
// import { FillOutRegistrationForm } from './FillOutRegistrationForm';
// import { LocateRegistrationForm } from './LocateRegistrationForm';
// import { SubmitRegistrationForm } from './SubmitRegistrationForm';
// import { LastResponse, PostRequest, Send } from '@serenity-js/rest';
// import { Ensure, equals } from '@serenity-js/assertions';
// import { TravelerDetails } from '../../integration';
import { Community, CommunityProps } from '../../../domain/contexts/community/community';
import { UserEntityReference } from '../../../domain/contexts/user/user';
import { SystemExecutionContext } from '../../../domain/infrastructure/execution-context';


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

export class CreateCommunity {

    // static using(name: string) {
    //     return Task.where(`#actor signs up using valid details`,
    //     createCommunity(name)
    //     );
    // }

    // static viaApiUsing(travelerDetails: Answerable<TravelerDetails>) {
    //     return Task.where(`#actor signs up (via API)`,
    //         Send.a(PostRequest.to('/api/auth/register').with(travelerDetails)),
    //         Ensure.that(LastResponse.status(), equals(201)),
    //     );
    // }
}