import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";

const FormLogin = () => {
  const onSave = () => {
    console.log("hello");
    // const emailValue = document.getElementById("email").value;
    // const password = document.getElementById("password").value;
    // console.log(emailValue);
    // console.log(password);
  };

  return (
    <div className="w-full justify-center flex items-start h-[100vh]">
      <Card className="w-[350px] h-fit">
        <CardHeader>
          <CardTitle>Sign up</CardTitle>
          <CardDescription>Already have an account? Log in</CardDescription>
        </CardHeader>
        <CardContent>
          {/* <form>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" placeholder="please enter email" />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="password">Password</Label>
                                <Input type="password" id="password" placeholder="please enter password" />
                            </div>
                        </div>
                    </form> */}
          hello
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button className="w-full" onClick={onSave}>
            Create account
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default FormLogin;
