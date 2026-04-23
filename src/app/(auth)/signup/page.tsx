"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { signup } from "@/services/authServices";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

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
      router.push("/dashboard");
      toast.success("Account created successfully!");
    } catch (error: unknown) {
      const message =
        typeof error === "object" &&
        error !== null &&
        "response" in error &&
        typeof (error as { response?: { data?: { message?: string } } }).response?.data?.message === "string"
          ? (error as { response: { data: { message: string } } }).response.data.message
          : "Something went wrong";
      toast.error(message);
    }
  };

  return (
    <div className="flex min-h-svh items-center justify-center bg-muted/40 px-4 py-10">
      <div className="w-full max-w-md space-y-4">
        <Card className="shadow-sm">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Create your account</CardTitle>
            <CardDescription>Enter your details below to create your account</CardDescription>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSignup();
              }}
            >
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
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <Input
                    id="password"
                    type="password"
                    required
                    placeholder="Enter your password"
                    onChange={(e) => setRegister({ ...register, password: e.target.value })}
                  />
                  <FieldDescription>Must be at least 8 characters long.</FieldDescription>
                </Field>

                <Field>
                  <Button type="submit" className="w-full">
                    Create Account
                  </Button>
                  <FieldDescription className="text-center">
                    Already have an account?
                    <Link href="/login" className="ml-1 underline underline-offset-4">
                      Login
                    </Link>
                  </FieldDescription>
                </Field>
              </FieldGroup>
            </form>
          </CardContent>
        </Card>

        <FieldDescription className="px-2 text-center">
          By clicking continue, you agree to our <Link href="#">Terms of Service</Link> and{" "}
          <Link href="#">privacy policy</Link>
        </FieldDescription>
      </div>
    </div>
  );
}
