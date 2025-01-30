import { z } from "zod";

const LoginDTO = z
  .object({
    email: z.string().email(),
    password: z.string().min(6),
  })
  .strict();

const NameDTO = z
  .object({
    name: z.string(),
  })
  .strict();

const RegisterDTO = LoginDTO.merge(NameDTO);

type IUser = z.infer<typeof RegisterDTO>;
type ILogin = z.infer<typeof LoginDTO>;

type RoleType = "user" | "admin" | "superadmin";


export { LoginDTO, RegisterDTO, ILogin, IUser, RoleType };
