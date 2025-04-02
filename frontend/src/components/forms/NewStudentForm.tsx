import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

const formSchema = z.object({
  firstName: z.string().min(3, "Must contain at least 3 characters.").max(50),
  lastName: z.string().min(3, "Must contain at least 3 characters.").max(50),
  birthDate: z.date(),
  gender: z.string().min(1),
  parentEmail: z.string().email("Invalid email address."),
  parentPhoneNumber: z.string().regex(/^\d{9,}$/, "Must be a valid phone number with at least 9 digits.")
});

const genderTypes = ["Male", "Female"];

export const NewStudentForm = ({
  onSubmit,
}: {
  onSubmit: (data: z.infer<typeof formSchema>) => void;
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      birthDate: new Date(),
      gender: "Female",
    },
  });

  return (
    <div className="p-1 bg-gray-200 rounded-2xl max-w-lg w-full mx-auto">
      <div className="p-6 bg-gray-800 rounded-xl text-gray-200">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-300">First Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter the first name"
                      {...field}
                      className="bg-gray-700 text-gray-200 border-gray-600"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-300">Last Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter the last name"
                      {...field}
                      className="bg-gray-700 text-gray-200 border-gray-600"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="birthDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-300">Birth Date</FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      {...field}
                      value={field.value ? field.value.toISOString().substring(0, 10) : ""}
                      onChange={(e) => field.onChange(new Date(e.target.value))}
                      className="bg-gray-700 text-gray-200 border-gray-600"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel className="text-gray-300">Select Gender</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      {genderTypes.map((type) => (
                        <FormItem
                          key={type}
                          className="flex items-center space-x-3 space-y-0"
                        >
                          <FormControl>
                            <RadioGroupItem value={type} className="bg-gray-700 border-gray-600 text-gray-200" />
                          </FormControl>
                          <FormLabel className="font-normal text-gray-300">
                            {type}
                          </FormLabel>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="parentEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-300">Parent Email Address</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter the parent email address"
                      {...field}
                      className="bg-gray-700 text-gray-200 border-gray-600"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="parentPhoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-300">Parent Phone Number</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter the parent phone number"
                      {...field}
                      className="bg-gray-700 text-gray-200 border-gray-600"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};
