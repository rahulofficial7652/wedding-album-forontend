
"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { signup } from "@/services/authServices";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function SignupPage() {
  const router = useRouter();
  const [register, setRegister] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSignup = async () => {
    try {
      await signup(register);
      router.push("/photographer");
      toast.success("Account created successfully!");
    } catch (error :any) {
const message = error?.response.data.message || "Something went wrong";
toast.error(message);
    }
  };

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <div>
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-xl">Create your account</CardTitle>
              <CardDescription>
                Enter your email below to create your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={(e) => {
                e.preventDefault();
                handleSignup();
              }}>
                <FieldGroup>
                  <Field>
                    <FieldLabel htmlFor="name">Full Name</FieldLabel>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Enter your full name"
                      required
                      onChange={(e) => setRegister({ ...register, name: e.target.value })}
                    />                    
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <Input
                      id="email"
                      type="email"
                      placeholder="youremail@example.com"
                      required
                      onChange={(e) => setRegister({ ...register, email: e.target.value })} 
                    />
                  </Field>
                  <Field>
                    <Field className="gap-4">
                      <Field>
                        <FieldLabel htmlFor="password">Password</FieldLabel>
                        <Input
                          id="password"
                          type="password"
                          required
                          placeholder="Enter your password"
                          onChange={(e)=> setRegister({ ...register, password: e.target.value })}
                        />
                      </Field>
                    </Field>
                    <FieldDescription>
                      Must be at least 8 characters long.
                    </FieldDescription>
                  </Field>
                  {/* <Button variant="outline" className="w-full cursor-pointer">
            Sign up with Google
          </Button> */}
                  <Field>
                    <Button type="submit">Create Account</Button>
                    <FieldDescription className="text-center">
                      Already have an account?
                      <Link href="/login" className="ml-1 underline">
                        Login
                      </Link>
                    </FieldDescription>
                  </Field>
                </FieldGroup>
              </form>
            </CardContent>
          </Card>
          
          <FieldDescription className="px-6 text-center">
            By clicking continue, you agree to our
            <Link href="#">Terms of Service</Link>
            and <Link href="#">privacy policy</Link>
          </FieldDescription>
        </div>
      </div>
    </div>
  );
}
