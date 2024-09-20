interface AuditContext { user: string, timestamp: Date }


interface Context {domainVisa: string, auditContext: AuditContext}
class AggRoot {
    constructor(private readonly _context: Context) {}
    // public auditContext:AuditContext ;
    protected get context (): Context {return this._context};
}

class Ent extends AggRoot {

    log: ActLog;

    constructor(_context: Context) {
        super(_context);
    }
    // private _actLogs: ActLog[] = [];

    public addActLog(message: string): void {
        this.log = new ActLog(message, this.context);
        const t: AuditContext = {
            user: "JohnDoeTemp",
            timestamp: new Date(),
        };
        this.log.initialize();
        console.log(`Log added: ${this.log.message} by ${this.log.logUser} at ${this.log.logTimestamp}`);
    }
}
function Audit(originalMethod: any, context: ClassMethodDecoratorContext) {
    const methodName = String(context.name);

    function replacementMethod(this: any, ...args: any[]) {
        console.log(`original args : ${JSON.stringify(args)}`)
        const __auditContext: AuditContext = {
            user: "JohnDoe",
            timestamp: new Date(),
        };
        console.log(`LOG: Entering method '${methodName}'`)
        console.log(`context = ${JSON.stringify(this.context.auditContext)}`)
        // const newargs = [__auditContext,...args]
        const newargs = [this.context.auditContext,...args]
        console.log(`new args : ${JSON.stringify(newargs)}`)
        
        const result = originalMethod.call(this, ...newargs);
        console.log(`LOG: Exiting method '${methodName}'.`)
        return result;
    }

    return replacementMethod;
}

class ActLog {
    message: string;
    logTimestamp: Date|undefined;
    logUser: string|undefined;

    constructor(message: string, private readonly context: Context) {
        this.message = message;
    }

    
    @Audit
    public initialize(__auditContext?: AuditContext) {

        console.log(`inside initialize 0 ...${__auditContext!.user} at ${__auditContext!.timestamp}`)
        this.logTimestamp = __auditContext!.timestamp;
        this.logUser = __auditContext!.user;
        console.log(`inside initialize 1 ...${JSON.stringify(__auditContext)}`)
        console.log(`inside initialize 2 ...${this.message} by ${this.logUser} at ${this.logTimestamp}`)
    }
}



// Usage

const auditContext: AuditContext = {
    user: "JaneDoe",
    timestamp: new Date(),
};
const ent = new Ent({domainVisa:'domainVisa-1',auditContext});
ent.addActLog("Activity log created.");

