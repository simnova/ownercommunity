//Nested Path Type definitions
export const StaffUserSearchType = {
  hash: { type: String, required: false},
indexedAt: { type: Date, required: false},
indexingFailedAt: { type: Date, required: false},
};



//SubdocumentBase Definitions


export const StaffUserSchema = new Schema<StaffUser, Model<StaffUser>, StaffUser>({
  role: { type: Schema.Types.ObjectId, ref: StaffRole.StaffRoleModel.modelName, required: false}
,
firstName: { type: String, required: false},
lastName: { type: String, required: false},
emailAddress: { type: String, required: false},
accessBlocked: { type: Boolean, required: false},
tags: { type: [String], required: false},
search: {type: StaffUserSearchType,required: false, ...NestedPathOptions,},
displayName: { type: String, required: false},
userType: { type: String, required: false},
externalId: { type: String, required: false},
  schemaVersion: { type: String, required: false, default: "1.0.0" },
});

export const StaffUserModel = model<StaffUser>("StaffUser", StaffUserSchema);

// Be sure to:
// 1. Remove unnecessary fields in the model schema
// 2. Add enum constraints to fields (if any)
// 3. Fix export Model clause (last line) for model containing discriminator key