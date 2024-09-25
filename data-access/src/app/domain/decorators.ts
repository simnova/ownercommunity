import { AuditContextFactory } from "../init/audit-context";

export function Audit(originalMethod: any, context: ClassMethodDecoratorContext) {
    // const methodName = String(context.name);
    function replacementMethod(this: any, ...args: any[]) {
        // console.log(`LOG: Entering method '${methodName}'`)
        // console.log(`original args : ${JSON.stringify(args)}`)
        const newargs = [AuditContextFactory,...args]
        // console.log(`new args : ${JSON.stringify(newargs)}`)
        const result = originalMethod.call(this, ...newargs);
        // console.log(`LOG: Exiting method '${methodName}'.`)
        return result;
    }
    return replacementMethod;
}