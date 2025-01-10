import { z } from "zod";


const registerValidation = z.object({
    username: z.string().min(1, { message: "username is required"})
    /* .refine(async (username): boolean => {
        // TODO unique
    }) */,
    password: z.string()
        .min(6, { message: "password must be at least 6 characters"})
        .regex(/[0-9]/, { message: "password must contain at least one number" })
        .regex(/[!@#$%^&*(),.?":{}|<>]/, { message: "password must contain at least one special character" }),
    email: z.string()
        .email({ message: "email address is invalid" })
        /* .refine(async (email): boolean => {
            // TODO unique
        }) */,
    firstname: z.string().min(1, { message: "firstname is required"}),
    lastname: z.string().min(1, { message: "lastname is required"}),
});

interface Register {
    username: string,
    password: string,
    email: string,
    firstname: string,
    lastname: string
}
export const validateRegister = ({username, password, email, firstname, lastname}: Register) => {
    return registerValidation.parse({username, password, email, firstname, lastname});
};