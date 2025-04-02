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

const formSchema = z.object({
  firstName: z.string().min(3, "Must contain at least 3 characters.").max(50),
  email: z.string().email("Invalid email address."),
});

export const RegisterTeacherForm = ({
  onRegister,
}: {
  onRegister: (data: z.infer<typeof formSchema>) => void;
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      email: "",
    },
  });

  return (
    <div className="p-1 bg-gray-100 rounded-2xl">
      <div className="p-6 bg-gray-800 rounded-xl text-gray-200">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onRegister)} className="space-y-8">
            {/* First Name */}
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

            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-300">Email Address</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter the email address"
                      {...field}
                      className="bg-gray-700 text-gray-200 border-gray-600"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <Button
              type="submit"
              className=" text-white rounded-md"
            >
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};
