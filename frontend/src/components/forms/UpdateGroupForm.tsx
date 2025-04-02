import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState, useEffect } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

const formSchema = z.object({
  groupName: z.string().min(3, "Must contain at least 3 characters.").max(50),
  groupTypes: z
    .array(z.string())
    .min(1, "Please select at least one group type."),
  groupLevel: z.string().min(1),
  schedule: z
    .array(
      z.object({
        dayOfWeek: z.string().min(1),
        startTime: z.string().min(1),
        endTime: z.string().min(1),
      })
    )
    .optional(),
});

const groupTypes = ["Acting", "Ballet", "Tango", "Musical"];
const groupLevels = ["Beginner", "Intermediate", "Advanced"];
const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export const UpdateGroupForm = ({
  onSubmit,
  initialData,
}: {
  onSubmit: (
    data: z.infer<typeof formSchema> & {
      schedule: { dayOfWeek: string; startTime: string; endTime: string }[];
    }
  ) => void;
  initialData: {
    groupName: string;
    groupTypes: string[];
    groupLevel: string;
    schedule: { dayOfWeek: string; startTime: string; endTime: string }[];
  };
}) => {
  const [schedule, setSchedule] = useState<
    { dayOfWeek: string; startTime: string; endTime: string }[]
  >(initialData.schedule || []);
  const [newSchedule, setNewSchedule] = useState<
    { dayOfWeek: string; startTime: string; endTime: string }[]
  >([]);
  const [dayOfWeek, setDayOfWeek] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      groupName: initialData.groupName,
      groupTypes: initialData.groupTypes.map((type) => type.toLowerCase()),
      groupLevel: initialData.groupLevel.toLowerCase() || "",
      schedule: [],
    },
  });

  useEffect(() => {
    setSchedule(initialData.schedule || []);
  }, [initialData]);

  const handleAddSchedule = () => {
    if (dayOfWeek && startTime && endTime) {
      const newScheduleItem = { dayOfWeek, startTime, endTime };
      const updatedSchedule = [...newSchedule, newScheduleItem];
      setNewSchedule(updatedSchedule);
      form.setValue("schedule", updatedSchedule);
      setDayOfWeek("");
      setStartTime("");
      setEndTime("");
    }
  };


  const handleDeleteNewSchedule = (index: number) => {
    const updatedSchedule = newSchedule.filter((_, i) => i !== index);
    setNewSchedule(updatedSchedule);
    form.setValue("schedule", updatedSchedule);
  };

  const handleSubmit = (data: z.infer<typeof formSchema>) => {
    onSubmit({
      ...data,
      schedule: newSchedule,
    });
  };

  return (
    <div className="flex justify-center items-center">
      <div className="p-1 bg-gray-100 rounded-2xl max-w-md w-full">
        <div className="p-6 bg-gray-800 rounded-xl text-gray-200">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="groupName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Group Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter the group name"
                        className="w-full p-3 border border-gray-300 rounded-lg text-black"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="groupTypes"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Select Group Properties</FormLabel>
                    <FormControl>
                      <div className="space-y-2">
                        {groupTypes.map((type) => (
                          <FormItem
                            key={type}
                            className="flex items-center space-x-3"
                          >
                            <Checkbox
                              checked={field.value.includes(type.toLowerCase())}
                              onCheckedChange={(checked) => {
                                const newValue = checked
                                  ? [...field.value, type.toLowerCase()]
                                  : field.value.filter(
                                    (value) => value !== type.toLowerCase()
                                  );
                                field.onChange(newValue);
                              }}
                            />
                            <FormLabel className="font-normal">{type}</FormLabel>{" "}
                          </FormItem>
                        ))}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="groupLevel"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Select Group Level</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        value={field.value}
                        className="flex flex-col space-y-1"
                      >
                        {groupLevels.map((type) => (
                          <div key={type} className="flex items-center space-x-3">
                            <RadioGroupItem value={type.toLowerCase()} />
                            <FormLabel className="font-normal">{type}</FormLabel>
                          </div>
                        ))}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div>
                <FormLabel className="mb-4 block">Add New Schedule</FormLabel>
                <div className="flex space-x-2">
                  <select
                    value={dayOfWeek}
                    onChange={(e) => setDayOfWeek(e.target.value)}
                    className="flex-1 p-3 border border-gray-300 rounded-lg text-black"
                  >
                    <option value="" disabled>
                      Select a day
                    </option>
                    {daysOfWeek.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                  <Input
                    type="time"
                    placeholder="Start Time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="flex-1 text-black"
                  />
                  <Input
                    type="time"
                    placeholder="End Time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="flex-1 text-black"
                  />
                  <Button onClick={handleAddSchedule} type="button">
                    Add
                  </Button>
                </div>
              </div>

              <div className="mt-6">
                <FormLabel className="mb-4 block">Newly Added Schedules</FormLabel>
                <table className="w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-100 text-black">
                      <th className="border border-gray-300 px-4 py-2">Day</th>
                      <th className="border border-gray-300 px-4 py-2">
                        Start Time
                      </th>
                      <th className="border border-gray-300 px-4 py-2">End Time</th>
                      <th className="border border-gray-300 px-4 py-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {newSchedule.map((item, index) => (
                      <tr key={index}>
                        <td className="border border-gray-600 px-4 py-2">
                          {item.dayOfWeek}
                        </td>
                        <td className="border border-gray-600 px-4 py-2">
                          {item.startTime}
                        </td>
                        <td className="border border-gray-600 px-4 py-2">
                          {item.endTime}
                        </td>
                        <td className="border border-gray-600 px-4 py-2">
                          <Button
                            type="button"
                            className="bg-red-500 text-white"
                            onClick={() => handleDeleteNewSchedule(index)}
                          >
                            Delete
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-6">
                <FormLabel className="mb-4 block">Current Schedules</FormLabel>
                <table className="w-full border-collapse border border-gray-400">
                  <thead>
                    <tr className="bg-gray-100 text-black">
                      <th className="border border-gray-600 px-4 py-2">Day</th>
                      <th className="border border-gray-600 px-4 py-2">
                        Start Time
                      </th>
                      <th className="border border-gray-600 px-4 py-2">End Time</th>
                      <th className="border border-gray-600 px-4 py-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {schedule.map((item, index) => (
                      <tr key={index}>
                        <td className="border border-gray-300 px-4 py-2">
                          {item.dayOfWeek}
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          {item.startTime}
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          {item.endTime}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <Button
                type="submit"
                className="w-full text-white p-3 rounded-lg"
              >
                Submit
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};
