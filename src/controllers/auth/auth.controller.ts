import { AuthService } from "@/services/auth/auth.service";
import { Request, Response } from "express";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { RegisterUserDto } from "@/dto/auth/register-user.dto";
import { LoginUserDto } from "@/dto/auth/login-user.dto";

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  async register(req: Request, res: Response) {
    try {
      const input = plainToInstance(RegisterUserDto, req.body);
      const errors = await validate(input);

      if (errors.length > 0) {
        return res.status(400).json({
          message: "Validation failed",
          errors: errors.map((err) => ({
            property: err.property,
            constraints: err.constraints,
          })),
        });
      }

      const tokens = await this.authService.registerUser(input);
      res.status(201).json(tokens);
    } catch (error: unknown) {
      const err = error as Error;
      res.status(400).json({ message: err.message });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const input = plainToInstance(LoginUserDto, req.body);
      const errors = await validate(input);

      if (errors.length > 0) {
        return res.status(400).json({
          message: "Validation failed",
          errors: errors.map((err) => ({
            property: err.property,
            constraints: err.constraints,
          })),
        });
      }

      const tokens = await this.authService.loginUser(
        input.email,
        input.password,
      );
      res.status(200).json(tokens);
    } catch (error: unknown) {
      const err = error as Error;
      res.status(401).json({ message: err.message });
    }
  }
}
