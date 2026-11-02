export interface Teacher {
  id: string;
  name: string;
  phone: string;
  email: string;
  assignedClasses: string[];
  status: 'active' | 'suspended';
  joinedDate: string;
  accountCreationDate: string;
  studentCount: number;
  qualification: string;
  accountCreated: boolean;
}

export interface DemoStudentAssignment {
  id: string;
  name: string;
  studentCode: string;
  className: string;
  attendanceRate: number;
}
