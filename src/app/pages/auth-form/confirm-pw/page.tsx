"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, ChangeEvent, FormEvent } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useConfirmPasswordMutation } from "@/lib/api/services/Auth-form";
import { ConfirmPasswordAuthForm } from "@/types/Types";
import { navigation } from "@/app/action";
import { toast } from "sonner";
import { ReloadIcon } from "@radix-ui/react-icons";

const ConfirmPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState<boolean | undefined>(false);

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

  const validateForm = () => {
    const { password, passwordConfirmation } = formData;
    const strongPasswordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (password !== passwordConfirmation) {
      toast("Error", {
        description: "Passwords do not match.",
        action: {
          label: "understand",
          onClick: () => { },
        },
      });
      return false;
    }

    if (!strongPasswordRegex.test(password)) {
      toast("Error", {
        description:
          "Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a special character.",
        action: {
          label: "understand",
          onClick: () => { },
        },
      });
      return false;
    }
    return true;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const [confirmPassword] = useConfirmPasswordMutation();
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (!validateForm()) {
      setLoading(false);
      return;
    }
    try {
      await confirmPassword(formData).unwrap();
      navigation("/pages/auth-form/login");
    } catch (err: any) {
      console.error(err.data.messages);
    }
    setLoading(false);
  };

  return (
    <section className="w-full h-screen justify-center flex items-center">
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
                  placeholder="3f6e972e-370b-4e7e-9339-9149a54b25ae"
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
              <Button disabled={loading} type="submit" className="w-full">
                {loading && (
                  <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                )}
                Confirm
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
};

export default ConfirmPassword;
