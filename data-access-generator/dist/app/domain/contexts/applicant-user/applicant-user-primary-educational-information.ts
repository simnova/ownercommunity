export interface ApplicantUserPrimaryEducationalInformationProps extends DomainEntityProps {
  // Primitive Fields
  degreeTitle?: string;
  attendanceStartDate?: Date;
  attendanceEndDate?: Date;
  dateDegreeIssued?: Date;
  graduationYear?: number;
  issuingInstitution?: string;

  // NestedPath Fields
  readonly otherIssuingInstitution: ApplicantUserOtherIssuingInstitutionProps;

  // PopulateDoc Fields

  // DocumentArray Fields

}

export interface ApplicantUserPrimaryEducationalInformationEntityReference extends Readonly<Omit<ApplicantUserPrimaryEducationalInformationProps, 'otherIssuingInstitution'>> {
  readonly otherIssuingInstitution: ApplicantUserOtherIssuingInstitutionEntityReference;



}

export class ApplicantUserPrimaryEducationalInformation extends DomainEntity<ApplicantUserPrimaryEducationalInformationProps> implements ApplicantUserPrimaryEducationalInformationEntityReference {
  constructor(props: ApplicantUserPrimaryEducationalInformationProps, private readonly context: DomainExecutionContext /*, private readonly visa: CommunityVisa */) {
    super(props);
  }
  // Primitive Field Getters
  get degreeTitle() {
    return this.props.degreeTitle;
    }
  get attendanceStartDate() {
    return this.props.attendanceStartDate;
    }
  get attendanceEndDate() {
    return this.props.attendanceEndDate;
    }
  get dateDegreeIssued() {
    return this.props.dateDegreeIssued;
    }
  get graduationYear() {
    return this.props.graduationYear;
    }
  get issuingInstitution() {
    return this.props.issuingInstitution;
    }

  // NestedPath Field Getters
  get otherIssuingInstitution() {
      return this.props.otherIssuingInstitution ? new ApplicantUserOtherIssuingInstitution(this.props.otherIssuingInstitution, this.context) : undefined;
    }

  // PopulateDoc Field Getters

  // DocumentArray Field Getters


  private validateVisa() {
    // modify this to match the permissions required to perform the action

    // if (
    //   !this.visa.determineIf(
    //     (permissions) => permissions.isSystemAccount || permissions.canManageMembers || (permissions.canEditOwnApplicantUserPrimaryEducationalInformations && permissions.isEditingOwnApplicantUserPrimaryEducationalInformation)
    //   )
    // ) {
    //   throw new Error('You do not have permission to update this account');
    // }
  }

  // using ts 5.1 setters
  // Primitive Field Setters
  set DegreeTitle(value: string) {
    this.props.degreeTitle = value;
  }
  set AttendanceStartDate(value: Date) {
    this.props.attendanceStartDate = value;
  }
  set AttendanceEndDate(value: Date) {
    this.props.attendanceEndDate = value;
  }
  set DateDegreeIssued(value: Date) {
    this.props.dateDegreeIssued = value;
  }
  set GraduationYear(value: number) {
    this.props.graduationYear = value;
  }
  set IssuingInstitution(value: string) {
    this.props.issuingInstitution = value;
  }

  // PopulatedDoc Field Setters

//DocumentArrayFieldSetters: added as needed
}
