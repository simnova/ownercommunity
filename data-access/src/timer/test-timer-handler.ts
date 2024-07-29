import { TimerContext } from "../../seedwork/az-function-handler-seedwork-timer/timer-context-builder";
import { ApplicationServices } from "../app/application-services";
import { InfrastructureServices } from "../app/infrastructure-services";
import { Passport } from "../app/init/passport";

export const TestTimerHandler = async (context: TimerContext<InfrastructureServices, ApplicationServices, Passport>): Promise<void> => {
  console.log('[TestTimerHandler] | Invocation ID ', context.invocationId);
  console.log('[TestTimerHandler] | Timer ', context.timer);

  return;
}