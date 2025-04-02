export type studentPreview = {
  publicId: string;
  firstName: string;
  lastName: string;
  age: number;
  parentEmail: string;
  parentPhoneNumber: string;
};

export type StudentAllPreview = {
  publicId: string;
  firstName: string;
  lastName: string;
  age: number;
};

export type newStudent = {
  firstName: string;
  lastName: string;
  birthDate: Date;
  gender: string;
  parentEmail: string;
  parentPhoneNumber: string;
};

export type studentStatistics = {
  publicId: string;
  firstName: string;
  lastName: string;
  studentPresentPercentage: number;
  studentAbsentPercentage: number;
}