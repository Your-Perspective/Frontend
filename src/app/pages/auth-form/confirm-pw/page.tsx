"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, ChangeEvent, FormEvent } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useGetAuthConfirmPasswordMutation } from "@/lib/api/services/Auth-form";
import { ConfirmPasswordAuthForm } from "@/types/Types";
import { navigation } from "@/app/action";

const ConfirmPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { toast } = useToast();

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  const [formData, setFormData] = useState<ConfirmPasswordAuthForm>({
    token: "",
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

  const [getAuthConfirmPassword] = useGetAuthConfirmPasswordMutation();
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await getAuthConfirmPassword(formData).unwrap();
      navigation("/pages/auth-form/login");
    } catch (err) {
      toast({
        description: "Incorrect code or password not match",
      });
    }
  };

  return (
    <div className="w-full h-screen justify-center flex items-center">
      <Card className="mx-auto w-96 ">
        <CardHeader>
          <CardTitle className="text-2xl">Confirm your password</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="code">Code</Label>
                <Input
                  name="token"
                  type="text"
                  placeholder="12345"
                  required
                  value={formData.token}
                  onChange={handleChange}
                />
              </div>
              <div className="grid gap-2 relative">
                <Label htmlFor="password">Password</Label>
                <div className="flex items-start justify-end">
                  <Input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    onChange={handleChange}
                    value={formData.password}
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
              <div className="grid gap-2 relative">
                <Label htmlFor="cf_pw">Confirm Password</Label>
                <div className="flex items-start justify-end">
                  <Input
                    name="passwordConfirmation"
                    type={showConfirmPassword ? "text" : "password"}
                    required
                    onChange={handleChange}
                    value={formData.passwordConfirmation}
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
                Confirm
              </Button>
              {/* </Link> */}
              <div className="mt-4 text-center text-sm">
                Back to{" "}
                <Link href={"/pages/auth-form/login"} className="underline">
                  Sign In
                </Link>
              </div>
            </div>
          </CardContent>
        </form>
      </Card>
    </div>
  );
};

export default ConfirmPassword;
