import { AppContext } from "../../../../framework/app/app-context-builder";
import { EndUserRoleApi, EndUserRoleApiImpl } from "./end-user-role/api";
import { StaffRoleApi, StaffRoleApiImpl } from "./staff-role/api";

export interface RoleApi {
  endUserRole: EndUserRoleApi;
  staffRole: StaffRoleApi;
}

export class RoleApiImpl implements RoleApi {
  endUserRole: EndUserRoleApi;
  staffRole: StaffRoleApi;

  constructor(context: AppContext) {
    this.endUserRole = new EndUserRoleApiImpl(context);
    this.staffRole = new StaffRoleApiImpl(context);
  }
}