import {
  IsEmail,
  IsString,
  Length,
  IsBoolean,
  IsNotEmpty,
  Matches,
} from "class-validator";
import { Match } from "./validators";

export class RegisterUserDto {
  @IsString()
  @Length(3, 50)
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @Length(8, 50)
  @Matches(/[A-Z]/, {
    message: "Password must contain at least one uppercase letter",
  })
  @Matches(/[a-z]/, {
    message: "Password must contain at least one lowercase letter",
  })
  @Matches(/[0-9]/, { message: "Password must contain at least one number" })
  @Matches(/[@$!%*?&]/, {
    message:
      "Password must contain at least one special character (@, $, !, %, *, ?, &)",
  })
  password: string;

  @IsNotEmpty()
  @IsString()
  @Length(8, 50)
  @Match("password", {
    message: "Confirm password does not match password",
  })
  confirmPassword: string;

  @IsBoolean()
  isActive: boolean = true;

  @IsBoolean()
  isVerified: boolean = false;
}
