//Nested Path Type definitions
export const EntityAddressInfoType = {
  addressLine1: { type: String, required: false},
addressLine2: { type: String, required: false},
city: { type: String, required: false},
stateOrProvince: { type: String, required: false},
zipOrPostalCode: { type: String, required: false},
country: { type: String, required: false},
};

export const EntityIssuingInstitutionType = {
  email: { type: String, required: false},
phoneNumber: { type: String, required: false},
address: {type: EntityAddressInfoType,required: false, ...NestedPathOptions,},
};

export const EntityClientType = {
  email: { type: String, required: false},
phoneNumber: { type: String, required: false},
address: {type: EntityAddressInfoType,required: false, ...NestedPathOptions,},
};



//SubdocumentBase Definitions


export const EntitySchema = new Schema<Entity, Model<Entity>, Entity>({
  entityName: { type: String, required: false},
entityLanguage: { type: String, required: false},
isIssuingInstitution: { type: Boolean, required: false},
issuingInstitution: {type: EntityIssuingInstitutionType,required: false, ...NestedPathOptions,},
isClient: { type: Boolean, required: false},
client: {type: EntityClientType,required: false, ...NestedPathOptions,},
address: {type: EntityAddressInfoType,required: false, ...NestedPathOptions,},
createdBy: { type: Schema.Types.ObjectId, ref: StaffUser.StaffUserModel.modelName, required: false}
,
disabledAt: { type: Date, required: false},
  schemaVersion: { type: String, required: false, default: "1.0.0" },
});

export const EntityModel = model<Entity>("Entity", EntitySchema);

// Be sure to:
// 1. Remove unnecessary fields in the model schema
// 2. Add enum constraints to fields (if any)
// 3. Fix export Model clause (last line) for model containing discriminator key