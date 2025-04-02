export type Login = {
  email: string;
  password: string;
};

export type AttendanceStatus = "PRESENT" | "PENDING" | "ABSENT" ;

export type Parent = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  students: Student[];
};

export type Student = {
  firstName: string;
  lastName: string;
  birthday: Date;
  gender: string;
  parent: Parent;
  attendances: Attendance[];
  danceGroups: DanceGroup[];
};

export type Attendance = {
  date: Date;
  present: boolean;
  student: Student;
  teacher: Teacher;
  danceGroup: DanceGroup;
};

export type Teacher = {
  firstName: string;
  lastName: string;
  email: string;
  danceGroups: DanceGroup[];
};

export type DanceGroup = {
  name: string;
  description: string;
};

export type SetContent = (content: string) => void;

export type StudentIdGroupName = {
  id: number;
  danceGroupName: string;
}

export type TeacherPreviewAll = {
  publicId: string,
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
};

type ToastVariant = 'default' | 'destructive' | 'success' | 'warning';

export interface ToastOptions {
  title: string;
  description: string;
  variant?: ToastVariant;
  action?: JSX.Element;
}

export interface NavStudentSidebarWithCollapsibleMenuProps {
  setContent: (content: JSX.Element | null) => void;
}

export type ToastFunction = (options: {
   title: string; 
   description?: string; 
   variant?: "default" | "destructive" | null; 
  }) => void

  export interface AttendanceRow {
    publicId: string;
    firstName: string;
    lastName: string;
    isPresent: AttendanceStatus;
    toggleAttendanceStatus: (publicId: string, currentStatus: boolean) => void;
  }

  export interface StudentAttendance {
    publicId: string;
    firstName: string;
    lastName: string;
    isPresent: AttendanceStatus;
  }

  export interface updatedStudentAttendance {
    studentPublicId: string;
    isPresent: AttendanceStatus;
  }

  export interface StudentStatistics {
    studentPublicId: string;
    firstName: string;
    lastName: string;
    studentPresentPercentage: number;
    studentAbsentPercentage: number;
  }