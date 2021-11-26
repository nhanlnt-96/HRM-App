export interface IUserAccountAttributes {
  id: string;
  username: string;
  password: string;
  managerId?: string;
  level: number;
  status: number;
  updatedBy?: string;
  createdBy: string;
}

export interface IUserAllowanceAttributes {
  id: string;
  userId: string;
  allowance: number;
  description: string;
  updatedBy?: string;
  createdBy: string;
}

export interface IUserCertificationAttributes {
  id: number;
  userId: string;
  certificationUrl: string;
  description: string;
  updatedBy?: string;
  createdBy: string;
}

export interface IUserContractAttributes {
  id: string;
  userId: string;
  description: string;
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
  dob: Date;
  phoneNumber: string;
  cardId: string;
  issuedOn: Date;
  issuedAt: string;
  currentAddress: string;
  education: string;
  majorIn: string;
  salaryRange: string;
  workPermit: boolean;
}

export interface IUserPositionAttributes {
  id: string;
  userId: string;
  positionId: number;
}
