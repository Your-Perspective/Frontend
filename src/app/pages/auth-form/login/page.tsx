"use client";
import Link from "next/link";
import { useState, ChangeEvent, FormEvent } from "react";
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
import { Eye, EyeOff } from "lucide-react";
import { useLoginMutation } from "@/lib/api/services/Auth-form";
import { LoginAuthForm } from "@/types/Types";
import { navigation } from "@/app/action";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/lib/api/auth/authSlice";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const dispath = useDispatch();

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const [formData, setFormData] = useState<LoginAuthForm>({
    email: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const [login] = useLoginMutation();
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const data = await login(formData).unwrap();

      dispath(
        setCredentials({
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
        })
      );

      if (data.accessToken) {
        navigation("/pages/admin/user");
      }
    } catch (err) {
      console.error("Login failed", err);
    }
  };

  return (
    <section className="w-full h-screen flex justify-center items-center">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="example@example.com"
                  required
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="grid gap-2 relative">
                <Label htmlFor="password">Password</Label>
                <div className="flex items-start justify-end">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 top-5 pr-3 flex items-center text-sm leading-5"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? <EyeOff /> : <Eye />}
                  </button>
                </div>
              </div>
              <div>
                <Link
                  href="/pages/auth-form/forget-pw"
                  className="ml-auto inline-block text-sm underline"
                >
                  Forgot your password?
                </Link>
              </div>
              <Button type="submit" className="w-full">
                Login
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link href="/pages/auth-form/signup" className="underline">
                Sign up
              </Link>
            </div>
          </CardContent>
        </form>
      </Card>
    </section>
  );
}
