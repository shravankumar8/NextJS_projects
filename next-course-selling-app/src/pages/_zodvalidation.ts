import { z } from "zod";
export function inputvalidation(email: string, password: string) {
  let titleInputProps = z.object({
    email: z.string().min(1).email(),
    password: z.string().min(6),
  });
  const parsedInput = titleInputProps.safeParse({
    email,
    password,
  });
  return parsedInput;
}

 