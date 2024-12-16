import { AppContext } from "../../init/app-context-builder";
import { EndUserApi, EndUserApiImpl,  } from "./end-user";
import { StaffUserApi, StaffUserApiImpl } from "./staff-user";
import { VendorUserApi, VendorUserApiImpl } from "./vendor-user";

export interface UsersApi {
  staffUser: StaffUserApi;
  endUser: EndUserApi;
  vendorUser: VendorUserApi
}

export class UsersApiImpl implements UsersApi {
  staffUser: StaffUserApi;
  endUser: EndUserApi;
  vendorUser: VendorUserApi

  constructor(context: AppContext) {
    this.staffUser = new StaffUserApiImpl(context);
    this.endUser = new EndUserApiImpl(context);
    this.vendorUser = new VendorUserApiImpl(context)
  }
}