import { redirect } from "next/navigation";
import { getCookie } from "@/utils/cookieHelper";

export default async function DashboardPage() {
  const token = await getCookie("token");

  if (!token) {
    redirect("/register");
  }

  return <div>Protected Dashboard (Placeholder)</div>;
}