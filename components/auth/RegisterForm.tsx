"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import GoogleSignInButton from "./GoogleSignInButton";
import PasswordInput from "./PasswordInput";
import { toast } from "sonner";
import { RegisterFormData } from "@/types";
import { authRepo } from "@/lib/repos/authRepo";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const [formData, setFormData] = useState<RegisterFormData>({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    terms: false,
  });

  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    if (!formData.terms) {
      toast.error("Please agree to the Terms & Conditions");
      return;
    }

    setLoading(true);
    await authRepo.register({
      data: {
        name: formData.fullName,
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
      },
      onSuccess: (message) => {
        toast.success(message as string || "Registration successful! Please verify your email.");
        setFormData({
          fullName: "",
          email: "",
          password: "",
          confirmPassword: "",
          terms: false,
        });
        router.push("/verify-otp");
      },
      onError: (message) => {
        toast.error(message);
      },
    });
    setLoading(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTermsChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, terms: checked }));
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div>
        <Label htmlFor="fullName" className="mb-1">
          Full Name
        </Label>
        <Input
          id="fullName"
          name="fullName"
          type="text"
          placeholder="John Doe"
          value={formData.fullName}
          required
          onChange={handleInputChange}
          className="w-full"
        />
      </div>

      <div>
        <Label htmlFor="email" className="mb-1">
          Email
        </Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="name@example.com"
          value={formData.email}
          onChange={handleInputChange}
          className="w-full"
          required
        />
      </div>

      <PasswordInput
        id="password"
        name="password"
        label="Password"
        value={formData.password}
        onChange={handleInputChange}
      />

      <PasswordInput
        id="confirm-password"
        name="confirmPassword"
        label="Confirm Password"
        value={formData.confirmPassword}
        onChange={handleInputChange}
      />

      <div className="flex items-center">
        <Checkbox
          id="terms"
          checked={formData.terms}
          onCheckedChange={handleTermsChange}
        />
        <Label htmlFor="terms" className="ml-2 text-sm">
          I agree to the{" "}
          <a href="#" className="text-cyan-600 hover:underline">
            Bright Smile Terms & Conditions
          </a>
        </Label>
      </div>

      <Button
        type="submit"
        disabled={loading}
        className="w-full bg-[#8BC34A] hover:bg-[#7CB342] cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {loading ? "loading..." : "Register"}
      </Button>

      <div className="flex items-center my-6">
        <div className="flex-grow border-t border-gray-300"></div>
        <span className="mx-4 text-gray-500 text-sm">OR</span>
        <div className="flex-grow border-t border-gray-300"></div>
      </div>

      <GoogleSignInButton />

      <p className="text-center text-sm text-gray-600 mt-6">
        Already have an account?{" "}
        <a href="#" className="text-cyan-600 font-medium hover:underline">
          Login
        </a>
      </p>
    </form>
  );
}
