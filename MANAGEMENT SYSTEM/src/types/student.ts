export interface Student {
  id: string;
  name: string;
  studentCode: string;
  guardianName: string;
  guardianPhone: string;
  assignedClass: string;
  assignedTeacherId: string;
  assignedTeacherName: string;
  enrollmentDate: string;
  accountCreationDate: string;
  status: 'active' | 'suspended';
  attendanceRate: number;
  gender: 'male' | 'female';
}

