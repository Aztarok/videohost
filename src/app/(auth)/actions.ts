"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

export async function login(formData: FormData) {
    const supabase = await createClient();

    // type-casting here for convenience
    // in practice, you should validate your inputs
    const data = {
        email: formData.get("email") as string,
        password: formData.get("password") as string,
        user_name: "Anon"
    };

    const { error } = await supabase.auth.signInWithPassword(data);

    if (error) {
        console.log(error);
        redirect("/error");
    }

    // revalidatePath("/", "layout");
    // redirect("/");
}

export async function signup(formData: FormData) {
    const supabase = await createClient();

    function getFormDataValue(formData: FormData, key: string): string {
        const value = formData.get(key);
        if (typeof value !== "string") {
            throw new Error(`Invalid value for ${key}`);
        }
        return value;
    }

    // type-casting here for convenience
    // in practice, you should validate your inputs
    // const data = {
    //     email: formData.get("email") as string,
    //     password: formData.get("password") as string
    // };

    if (formData.get("password") !== formData.get("confirmPassword")) {
        return;
    }

    const { error } = await supabase.auth.signUp({
        email: getFormDataValue(formData, "email"),
        password: getFormDataValue(formData, "password"),
        options: {
            data: {
                user_name: getFormDataValue(formData, "username")
            }
        }
    });

    if (error) {
        console.log(error);
        redirect("/error");
    }

    // revalidatePath("/", "layout");
    // redirect("/");
}

export async function signout() {
    const supabase = await createClient();

    const { error } = await supabase.auth.signOut();

    if (error) {
        redirect("/error");
    }

    revalidatePath("/", "layout");
    redirect("/");
}

export async function checkPath() {
    revalidatePath("/", "layout");
}
