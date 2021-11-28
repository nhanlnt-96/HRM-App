export interface IUserAccountAttributes {
  id: string;
  username: string;
  password: string;
  managerId?: string;
  level: string;
  status: string;
  updatedBy?: string;
  createdBy: string;
}

export interface IUserAllowanceAttributes {
  id: string;
  userId: string;
  allowance: number;
  allowanceDescription: string;
  updatedBy?: string;
  createdBy: string;
}

export interface IUserCertificationAttributes {
  id: number;
  userId: string;
  certificationUrl: string;
  certificationDescription: string;
  updatedBy?: string;
  createdBy: string;
}

export interface IUserContractAttributes {
  id: string;
  userId: string;
  contractDescription: string;
  contractFrom: Date;
  contractTo: Date;
  createdBy: string;
  updatedBy?: string;
}

export interface IUserInfoAttributes {
  id: string;
  userId: string;
  avatarUrl: string;
  fullName: string;
  email: string;
  dob: Date;
  phoneNumber: string;
  cardId: string;
  issuedOn: Date;
  issuedAt: string;
  currentAddress: string;
  salaryRange: string;
  workPermit: boolean;
}

export interface IUserPositionAttributes {
  id: string;
  userId: string;
  positionId: string;
}

export interface IUserEducationAttributes {
  id: string;
  educationCode: string;
  userId: string;
  majorIn: string;
}
