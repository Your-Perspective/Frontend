"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, ChangeEvent, FormEvent } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useGetAuthRegisterMutation } from "@/lib/api/services/Auth-form";
import { RegisterAuthForm } from "@/types/Types";
import { navigation } from "@/app/action";
import { toast } from "sonner";

export default function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  const [formData, setFormData] = useState<RegisterAuthForm>({
    userName: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const { password, passwordConfirmation } = formData;
    const strongPasswordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (password !== passwordConfirmation) {
      toast("Error", {
        description: "Passwords do not match.",
        action: {
          label: "Undo",
          onClick: () => {},
        },
      });
      return false;
    }

    if (!strongPasswordRegex.test(password)) {
      toast("Error", {
        description:
          "Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a special character.",
        action: {
          label: "Undo",
          onClick: () => {},
        },
      });
      return false;
    }
    return true;
  };

  const [getAuthRegister] = useGetAuthRegisterMutation();
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    try {
      await getAuthRegister(formData).unwrap();
      navigation("/pages/admin/user");
    } catch (err) {}
  };

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <Card className="mx-auto w-96">
        <CardHeader>
          <CardTitle className="text-xl">Sign Up</CardTitle>
          <CardDescription>
            Enter your information to create an account
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="userName">User Name</Label>
                <Input
                  id="userName"
                  name="userName"
                  placeholder="Please enter"
                  value={formData.userName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="example@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="grid gap-2 relative">
                <Label htmlFor="password">Password</Label>
                <div className="flex items-start justify-end">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 top-5 pr-3 flex items-center text-sm leading-5"
                    onClick={togglePasswordVisibility}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? <EyeOff /> : <Eye />}
                  </button>
                </div>
              </div>
              <div className="grid gap-2 relative">
                <Label htmlFor="passwordConfirmation">Confirm Password</Label>
                <div className="flex items-start justify-end">
                  <Input
                    id="passwordConfirmation"
                    name="passwordConfirmation"
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.passwordConfirmation}
                    onChange={handleChange}
                    required
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 top-5 pr-3 flex items-center text-sm leading-5"
                    onClick={toggleConfirmPasswordVisibility}
                  >
                    {showConfirmPassword ? <EyeOff /> : <Eye />}
                  </button>
                </div>
              </div>
              <Button type="submit" className="w-full">
                Create an account
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <Link href="/pages/auth-form/login" className="underline">
                Sign in
              </Link>
            </div>
          </CardContent>
        </form>
      </Card>
    </div>
  );
}
