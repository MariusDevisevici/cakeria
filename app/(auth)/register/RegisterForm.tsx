"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { REGISTER_DEFAULT_VALUES } from "@/lib/constants";
import Link from "next/link";
import { registerUser } from "@/lib/actions/user.actions";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { useSearchParams } from "next/navigation";

const RegisterForm = () => {
  const [data, action] = useActionState(registerUser, {
    success: false,
    message: "",
  });

  const searchParams = useSearchParams();
  const callBackUrl = searchParams.get("callbackUrl") || "/";

  const RegisterButton = () => {
    const { pending } = useFormStatus();

    return (
      <Button disabled={pending} className="w-full" variant={"default"}>
        {pending ? "Submitting..." : "Register"}
      </Button>
    );
  };

  return (
    <form action={action}>
      <input type="hidden" name="callBackUrl" value={callBackUrl} />
      <div className="space-y-6">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            defaultValue={REGISTER_DEFAULT_VALUES.name}
          />
        </div>
        <div>
          <Label htmlFor="email"> Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            defaultValue={REGISTER_DEFAULT_VALUES.email}
          />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            required
            autoComplete="password"
            defaultValue={REGISTER_DEFAULT_VALUES.password}
          />
        </div>
        <div>
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            required
            autoComplete="confirmPassword"
            defaultValue={REGISTER_DEFAULT_VALUES.confirmPassword}
          />
        </div>
        <div>
          <RegisterButton />
        </div>
        {data && !data.success && (
          <div className="text-center text-destructive">{data.message}</div>
        )}
        <div className="text-sm text-center text-muted-foreground">
          Already have an account?{" "}
          <Link href="/sign-in" target="_self" className="underline">
            Sign In
          </Link>
        </div>
      </div>
    </form>
  );
};

export default RegisterForm;
