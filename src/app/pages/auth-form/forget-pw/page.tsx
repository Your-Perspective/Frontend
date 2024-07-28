"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, ChangeEvent, FormEvent } from "react";
import { useGetAuthForgetPasswordMutation } from "@/lib/api/services/Auth-form";
import { ForgetPasswordAuthForm } from "@/types/Types";
import { useToast } from "@/components/ui/use-toast";
import { navigation } from "@/app/action";

export default function ForgetPassword() {
  const [formData, setFormData] = useState<ForgetPasswordAuthForm>({
    email: "",
  });

  const { toast } = useToast();
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const [getAuthForgetPassword] = useGetAuthForgetPasswordMutation();
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await getAuthForgetPassword(formData).unwrap();
      navigation("/pages/auth-form/confirm-pw");
    } catch (err) {
      toast({
        description: "Email not found",
      });
    }
  };
  return (
    <div className="w-full h-screen justify-center flex items-center">
      <Card className="mx-auto w-96 ">
        <CardHeader>
          <CardTitle className="text-2xl">Forget Password</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  name="email"
                  onChange={handleChange}
                />
              </div>
              <Button type="submit" className="w-full">
                Continue
              </Button>
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
}
