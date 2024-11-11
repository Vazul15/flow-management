export type Login = {
  email: string;
  password: string;
};

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

export type StudentPreview = {
  firstName: string;
  lastName: string;
};