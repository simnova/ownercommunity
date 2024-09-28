import { app } from '@azure/functions';
import { tryGetEnvVar } from '../../../seedwork/utils/get-env-var';
import { TimerContextBuilder } from '../core/timer.context-builder';
import { ProcessGLTransactions } from './gl-transaction';
import { InfrastructureServicesBuilder } from '../../infrastructure-services-impl/infrastructure-services-builder';

app.timer('process_gl_transactions',{
  schedule: tryGetEnvVar('SCHEDULE_GL_TRANSACTION'),
  handler: async (timer, invocationContext) => {
    let timerContext = new TimerContextBuilder(InfrastructureServicesBuilder.getInstance());
    await timerContext.init(timer, invocationContext);
    return ProcessGLTransactions(timerContext);
  }
});
