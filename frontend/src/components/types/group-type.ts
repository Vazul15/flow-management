export type danceGroupNameAndLevel = {
  groupName: string;
  groupLevel: string;
};

export type groupsPageGroupDisplay = {
  groupName: string;
  groupLevel: string;
  studentsNumber: number;
};

export interface newGroup {
  groupName: string;
  groupTypes: string[];
  groupLevel: string;
}

export interface updateGroup {
  groupName: string;
  groupTypes: string[];
  groupLevel: string;
  schedule: { dayOfWeek: string; startTime: string; endTime: string }[];
}

export type recurringScheduleStartEndTime = {
  startTime: string,
  endTime: string
}

export type schedule = {
  date: Date,
  startTime: string,
  endTime: string
}
