import { TimerContext } from "../../seedwork/seedwork-az-function-handler_timer/timer-context-builder";

export const TestTimerHandler = async (context: TimerContext): Promise<void> => {
  console.log('[TestTimerHandler] | Invocation ID ', context.invocationId);
  console.log('[TestTimerHandler] | Timer ', context.timer);

  return;
}