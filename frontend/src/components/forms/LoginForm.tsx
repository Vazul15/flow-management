import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Login } from "../types/types";

interface LoginFormProps {
  onLogin: (loginData: Login) => Promise<void>;
}

export const LoginForm = ({ onLogin }: LoginFormProps) => {
    const { register, handleSubmit, formState: { errors } } = useForm<Login>();
  
    const onSubmit: SubmitHandler<Login> = (data) => {
      onLogin(data);
    };
  
    return (
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="Your email address"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && <p className="text-red-600 text-sm">{errors.email.message}</p>}
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="Your password"
            {...register("password", { required: "Password is required" })}
          />
          {errors.password && <p className="text-red-600 text-sm">{errors.password.message}</p>}
        </div>
        <Button type="submit" className="w-full">
          Login
        </Button>
      </form>
    );
  };
