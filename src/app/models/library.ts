export interface Organisation {
  organization_id: number;
  organization_uid: string;
  organization: string;
  organization_description: string;
  created_by: number;
  created_date: string;
  updated_by: number;
  updated_date: string;
}

export interface AddOrgBody {
  organization: string;
  organization_description: string;
}

export interface EditOrgBody {
  organization_uid: string;
  organization: string;
  organization_description: string;
}

export interface Department {
  created_by: number;
  created_date: string;
  department: string;
  department_id: number;
  department_uid: string;
  organization_id?: string;
  organization: string;
  updated_by: number;
  updated_date: string;
}
