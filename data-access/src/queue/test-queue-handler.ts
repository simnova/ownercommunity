import { QueueContext } from "../../seedwork/az-function-handler-seedwork-queue/queue-context-builder";
import { ApplicationServices } from "../app/application-services";
import { InfrastructureServices } from "../app/infrastructure-services";
import { Passport } from "../app/init/passport";

export const TestQueueHandler = async (context: QueueContext<InfrastructureServices, ApplicationServices, Passport>): Promise<void> => {
    console.log('[TestQueueHandler] | Invocation ID ', context.invocationId);
    console.log('[TestQueueHandler] | Processing queue message: ', context.payload);

    const community = await context.applicationServices.community.dataApi.getCommunityById(context.payload?.communityId);

    if (community) {
      console.log('[TestQueueHandler] | Community Name: ', community.name);
    }

    return;
}