import { AppContext } from "../../../../framework/app/app-context-builder";
import { EndUserApi, EndUserApiImpl,  } from "./end-user/api";
import { StaffUserApi, StaffUserApiImpl } from "./staff-user/api";

export interface UsersApi {
  staffUser: StaffUserApi;
  endUser: EndUserApi;
}

export class UsersApiImpl implements UsersApi {
  staffUser: StaffUserApi;
  endUser: EndUserApi;

  constructor(context: AppContext) {
    this.staffUser = new StaffUserApiImpl(context);
    this.endUser = new EndUserApiImpl(context);
  }
}