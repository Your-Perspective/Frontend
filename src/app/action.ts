"use server";
import { redirect } from "next/navigation";
export async function navigation(path: string) {
  redirect(path);
}
