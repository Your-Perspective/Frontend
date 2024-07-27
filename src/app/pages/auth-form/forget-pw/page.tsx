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

export default function ForgetPassword() {
  return (
    <div className="w-full h-screen justify-center flex items-center">
      <Card className="mx-auto w-96 ">
        <CardHeader>
          <CardTitle className="text-2xl">Forget Password</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <Link href={"/pages/auth-form/confirm-pw/"}>
              <Button type="submit" className="w-full">
                Continue
              </Button>
            </Link>
            <div className="mt-4 text-center text-sm">
              Back to{" "}
              <Link href={"/pages/auth-form/login"} className="underline">
                Sign In
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
