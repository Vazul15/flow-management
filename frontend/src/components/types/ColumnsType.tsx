import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { studentPreview } from "./studentTypes";
import { MoreHorizontal } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AttendanceStatus, StudentAttendance, TeacherPreviewAll } from "./types";

export const studentsPreviewcolumns = (
  handleDeleteStudent: (studentPublicId: string, groupName: string) => void,
  groupName: string
): ColumnDef<studentPreview>[] => [
  {
    accessorKey: "firstName",
    header: "First Name",
  },
  {
    accessorKey: "lastName",
    header: "Last Name",
  },
  {
    accessorKey: "age",
    header: "Age",
  },
  {
    accessorKey: "parentEmail",
    header: "Parent's email address",
  },
  {
    accessorKey: "parentPhoneNumber",
    header: "Parent's phone number",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const student = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => handleDeleteStudent(student.publicId, groupName)}
            >
              Remove student
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export const studentAddColumns: ColumnDef<studentPreview>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "firstName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          First Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "lastName",
    header: "Last Name",
  },
  {
    accessorKey: "age",
    header: "Age",
  },
  {
    accessorKey: "parentEmail",
    header: "Parent's email address",
  },
  {
    accessorKey: "parentPhoneNumber",
    header: "Parent's phone number",
  },
];

export const teachersPreviewcolumns = (
  handleRemoveTeacher: (teacherPublicId: string, groupName: string) => void,
  groupName: string
): ColumnDef<TeacherPreviewAll>[] => [
  {
    accessorKey: "firstName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          First Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "lastName",
    header: "Last Name",
  },
  {
    accessorKey: "email",
    header: "Email address",
  },
  {
    accessorKey: "phoneNumber",
    header: "Phone number",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const teacher = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => handleRemoveTeacher(teacher.publicId, groupName)}
            >
              Remove Teacher
            </DropdownMenuItem>
            {/* <DropdownMenuItem onClick={() => handleEditStudent(student.publicId)}>
              Edit student
            </DropdownMenuItem> */}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export const allStudentPreviewEditable = (
  handleDeleteStudent: (studentPublicId: string) => void
): ColumnDef<studentPreview>[] => [
  {
    accessorKey: "firstName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          First Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "lastName",
    header: "Last Name",
  },
  {
    accessorKey: "age",
    header: "Age",
  },
  {
    accessorKey: "parentPhoneNumber",
    header: "Parent's phone number",
  },
  {
    accessorKey: "parentEmail",
    header: "Parent's email address ",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const student = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => handleDeleteStudent(student.publicId)}
            >
              Delete student
            </DropdownMenuItem>
            {/* <DropdownMenuItem onClick={() => handleEditStudent(student.publicId)}>
              Edit student
            </DropdownMenuItem> */}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export const studentsOfTeacherColumns: ColumnDef<studentPreview>[] = [
  {
    accessorKey: "firstName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          First Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "lastName",
    header: "Last Name",
  },
  {
    accessorKey: "age",
    header: "Age",
  },
  {
    accessorKey: "parentPhoneNumber",
    header: "Parent's phone number",
  },
  {
    accessorKey: "parentEmail",
    header: "Parent's email address ",
  },
];

export const teacherAddColumns: ColumnDef<TeacherPreviewAll>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "firstName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          First Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "lastName",
    header: "Last Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "phoneNumber",
    header: "Phone Number",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.publicId)}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Edit teacher</DropdownMenuItem>
            <DropdownMenuItem>Delete teacher</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export const attendanceColumns = (
  handleToggleAttendanceStatus: (publicId: string, currentStatus: AttendanceStatus) => void
): ColumnDef<StudentAttendance>[] => [
  {
    accessorKey: "firstName",
    header: "First Name",
  },
  {
    accessorKey: "lastName",
    header: "Last Name",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const student = row.original;
      
      return (
        <div className="flex items-center justify-center gap-2">
          <Button
            variant={student.isPresent === "PRESENT" ? "default" : "outline"}
            onClick={() => handleToggleAttendanceStatus(student.publicId, "PRESENT")}
            className="w-20"
          >
            Present
          </Button>

          <Button
            variant={student.isPresent === "PENDING" ? "default" : "outline"}
            onClick={() => handleToggleAttendanceStatus(student.publicId, "PENDING")}
            className="w-20"
          >
            Pending
          </Button>

          <Button
            variant={student.isPresent === "ABSENT" ? "default" : "outline"}
            onClick={() => handleToggleAttendanceStatus(student.publicId, "ABSENT")}
            className="w-20"
          >
            Absent
          </Button>
        </div>
      );
    },
  },
];

