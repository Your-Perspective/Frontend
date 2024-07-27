import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const ConfirmPassword = () => {
  return (
    <div className="w-full h-screen justify-center flex items-center">
      <Card className="mx-auto w-96 ">
        <CardHeader>
          <CardTitle className="text-2xl">Confirm your password</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="code">Code</Label>
              <Input id="code" type="text" placeholder="12345" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="pw">Password</Label>
              <Input id="pw" placeholder="Password" type="password" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="c_pw">Confirm Password</Label>
              <Input id="c_pw" placeholder="Confirm Password" type="password" />
            </div>
            <Link href={"/pages/auth-form/confirm-pw/"}>
              <Button type="submit" className="w-full">
                Confirm
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
};

export default ConfirmPassword;
