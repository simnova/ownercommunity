import { app } from "@azure/functions";
import { PortalTokenValidation } from "../../../seedwork/auth-seedwork-oidc/portal-token-validation";
import { GlDailySummaryContextBuilder } from "./init/gl-daily-summary-context-builder";
import { InfrastructureServicesBuilder } from "../../infrastructure-services-impl/infrastructure-services-builder";
import { ProcessGLTransactions } from "./gl-transaction";

app.http('gl-daily-summary', {
  methods: ['GET', 'POST'],
  route: 'gl-daily-summary/{*segments}',
  handler: async (req) => {
    let glDailySummaryContext = new GlDailySummaryContextBuilder(InfrastructureServicesBuilder.getInstance(), PortalTokenValidation.getInstance());
    await glDailySummaryContext.init(req);
    return ProcessGLTransactions(glDailySummaryContext);
  },
});
