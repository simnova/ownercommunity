import { QueueContext } from "../../seedwork/seedwork-az-function-handler_queue/queue-context-builder";

export const TestQueueHandler = async (context: QueueContext): Promise<void> => {
    console.log('[TestQueueHandler] | Invocation ID ', context.invocationId);
    console.log('[TestQueueHandler] | Processing queue message: ', context.payload);

    const community = await context.applicationServices.community.dataApi.getCommunityById(context.payload?.communityId);

    if (community) {
      console.log('[TestQueueHandler] | Community Name: ', community.name);
    }

    return;
}