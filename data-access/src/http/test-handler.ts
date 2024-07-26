import { HttpContext } from "../../seedwork/seedwork-az-function-handler_http/http-context-builder";

export const testHandler = async (context: HttpContext) => {
  const email = context.req.headers.get('email');
  const memberId = context.req.headers.get('member');

  const member = await context.applicationServices.member.dataApi.getMemberById(memberId);
  
  return {
    status: 200,
    body: "Hello, " + member.memberName + ". Your email is " + email
  };
}