export interface IWorkingDepartmentAttributes {
  id: string;
  departmentCode: string;
  departmentName: string;
  updatedBy?: string;
  createdBy?: string;
}

export interface IWorkingPositionAttributes {
  id: string;
  positionCode: string;
  positionName: string;
  departmentId: string;
}
