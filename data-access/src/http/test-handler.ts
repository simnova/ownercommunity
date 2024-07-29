import { HttpContext } from "../../seedwork/az-function-handler-seedwork-http/http-context-builder";
import { ApplicationServices } from "../app/application-services";
import { InfrastructureServices } from "../app/infrastructure-services";
import { VerifiedJwtPayloadType } from "../app/init/app-context-builder";
import { Passport } from "../app/init/passport";

export const TestHttpHandler = async (context: HttpContext<InfrastructureServices, ApplicationServices, Passport, VerifiedJwtPayloadType>) => {
  const email = context.req.headers.get('email');
  const memberId = context.req.headers.get('member');

  const member = await context.applicationServices.member.dataApi.getMemberById(memberId);
  
  return {
    status: 200,
    body: "Hello, " + member.memberName + ". Your email is " + email
  };
}