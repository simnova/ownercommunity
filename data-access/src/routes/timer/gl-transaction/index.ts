import { TimerContext } from "../init/timer-context-builder";

export const ProcessGLTransactions = async (context: TimerContext): Promise<void> => {
  console.log('[TestTimerHandler] | Invocation ID ', context);
  console.log('[TestTimerHandler] | Timer ', context);
  // Timer function logic here
  return;
}