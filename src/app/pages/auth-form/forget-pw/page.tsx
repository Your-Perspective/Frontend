"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, ChangeEvent, FormEvent } from "react";
import { useForgetPasswordMutation } from "@/lib/api/services/Auth-form";
import { ForgetPasswordAuthForm } from "@/types/Types";
import { navigation } from "@/app/action";
import { ReloadIcon } from "@radix-ui/react-icons";

export default function ForgetPassword() {
  const [formData, setFormData] = useState<ForgetPasswordAuthForm>({
    email: "",
  });
  const [loading, setLoading] = useState<boolean | undefined>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const [forgetPassword] = useForgetPasswordMutation();
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await forgetPassword(formData).unwrap();
      navigation("/pages/auth-form/confirm-pw");
    } catch (err: any) {
      console.error(err.data.messages);
    }
    setLoading(false);
  };
  return (
    <section className="w-full h-screen justify-center flex items-center">
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
                  type="email"
                  placeholder="example@example.com"
                  required
                  name="email"
                  onChange={handleChange}
                  value={formData.email}
                />
              </div>
              <Button disabled={loading} type="submit" className="w-full">
                {loading && (
                  <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                )}
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
    </section>
  );
}
