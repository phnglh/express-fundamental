import { RegisterUserDto } from "@/dto/auth/register-user.dto";
import { User } from "@/entities/user.entity";
import { Repository } from "typeorm";
import jwt, { JwtPayload } from "jsonwebtoken";
import bcrypt from "bcrypt";
import AppDataSource from "@/config/database";
import { RefreshToken } from "@/entities/refresh_tokens.entity";
import { Role } from "@/entities/role.entity";
import { RoleName } from "@/contants/role-name";

interface AuthPayload extends JwtPayload {
  id: string;
  email: string;
  name?: string;
}

export class AuthService {
  private userRepository: Repository<User>;
  private refreshTokenRepository: Repository<RefreshToken>;
  private roleRepository: Repository<Role>;

  constructor() {
    this.userRepository = AppDataSource.getRepository(User);
    this.refreshTokenRepository = AppDataSource.getRepository(RefreshToken);
    this.roleRepository = AppDataSource.getRepository(Role);
  }

  private createAccessToken(user: User): string {
    const payload = {
      id: user.id,
      email: user.email,
      name: user.name,
    };

    return jwt.sign(payload, process.env.JWT_SECRET as string, {
      expiresIn: "30m",
    });
  }

  private createRefreshToken(user: User): string {
    const payload = {
      id: user.id,
      email: user.email,
    };

    return jwt.sign(payload, process.env.JWT_SECRET as string, {
      expiresIn: "7d",
    });
  }

  async registerUser(user: RegisterUserDto): Promise<{
    accessToken: string;
    refreshToken: string;
    user: Partial<User>;
  }> {
    const existingUser = await this.userRepository.findOne({
      where: { email: user.email },
    });

    if (existingUser) {
      throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(user.password, 10);

    const role = await this.roleRepository.findOne({
      where: { name: RoleName.USER },
    });

    if (!role) {
      throw new Error("Default role not found");
    }

    const newUser = this.userRepository.create({
      name: user.name,
      email: user.email,
      password: hashedPassword,
      role,
    });

    await this.userRepository.save(newUser);

    const accessToken = this.createAccessToken(newUser);
    const refreshToken = this.createRefreshToken(newUser);

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    const refreshTokenEntity = this.refreshTokenRepository.create({
      token: refreshToken,
      user: newUser,
      expiresAt,
      ipAddress: "",
    });

    await this.refreshTokenRepository.save(refreshTokenEntity);

    return { accessToken, refreshToken, user: newUser };
  }

  async loginUser(
    email: string,
    password: string,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      throw new Error("Invalid email or password");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new Error("Invalid email or password");
    }

    const accessToken = this.createAccessToken(user);
    const refreshToken = this.createRefreshToken(user);

    return { accessToken, refreshToken };
  }

  async authenticateToken(token: string): Promise<User | null> {
    try {
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET as string,
      ) as AuthPayload;
      const user = await this.userRepository.findOne({
        where: { id: decoded.id },
      });
      return user || null;
    } catch {
      return null;
    }
  }

  async authenticateRefreshToken(
    token: string,
  ): Promise<{ accessToken: string; refreshToken: string } | null> {
    try {
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET as string,
      ) as AuthPayload;

      const user = await this.userRepository.findOne({
        where: { id: decoded.id },
      });

      if (!user) {
        return null;
      }

      const accessToken = this.createAccessToken(user);
      const refreshToken = this.createRefreshToken(user);

      return { accessToken, refreshToken };
    } catch {
      return null;
    }
  }
}
