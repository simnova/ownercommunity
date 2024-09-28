import { app, PostInvocationContext, PreInvocationContext } from '@azure/functions';

app.hook.preInvocation((context: PreInvocationContext) => {
    // context.invocationContext.log(
    //     `preInvocation hook executed for http function ${context.invocationContext.functionName}`
    // );
});

app.hook.postInvocation((context: PostInvocationContext) => {
    // context.invocationContext.log(
    //     `postInvocation hook executed for http function ${context.invocationContext.functionName}`
    // );
});
