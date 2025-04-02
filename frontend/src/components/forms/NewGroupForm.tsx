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
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

const formSchema = z.object({
  groupName: z.string().min(3, "Must contain at least 3 characters.").max(50),
  groupTypes: z
    .array(z.string())
    .min(1, "Please select at least one group type."),
  groupLevel: z.string().min(1),
});

const groupTypes = ["Acting", "Ballet", "Tango", "Musical"];
const groupLevels = ["Beginner", "Intermediate", "Advanced"];
export const NewGroupForm = ({
  onSubmit,
}: {
  onSubmit: (data: z.infer<typeof formSchema>) => void;
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      groupName: "",
      groupTypes: [],
      groupLevel: "Beginner",
    },
  });

  return (
    <div className="p-1 bg-gray-100 rounded-2xl max-w-lg w-full mx-auto">
      <div className="p-6 bg-gray-800 rounded-xl text-gray-200">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="groupName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-300">Group Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter the group name"
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
              name="groupTypes"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel className="text-gray-300">
                    Select Group Properties
                  </FormLabel>
                  <FormControl>
                    <div className="space-y-2">
                      {groupTypes.map((type) => (
                        <FormItem
                          key={type}
                          className="flex items-center space-x-3"
                        >
                          <Checkbox
                            checked={field.value.includes(type)}
                            onCheckedChange={(checked) => {
                              const newValue = checked
                                ? [...field.value, type]
                                : field.value.filter((value) => value !== type);
                              field.onChange(newValue);
                            }}
                            className="bg-gray-700 border-gray-600 text-gray-200"
                          />
                          <FormLabel className="font-normal text-gray-300">
                            {type}
                          </FormLabel>
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
                  <FormLabel className="text-gray-300">
                    Select Group Level
                  </FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      {groupLevels.map((type) => (
                        <FormItem
                          key={type}
                          className="flex items-center space-x-3 space-y-0"
                        >
                          <FormControl>
                            <RadioGroupItem
                              value={type}
                              className="bg-gray-700 border-gray-600 text-gray-200"
                            />
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

            <Button
              type="submit"
              className="text-white rounded-md"
            >
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};
