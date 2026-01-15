import {
    Injectable,
    ConflictException,
    UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import { User } from '../../entities/user.entity';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private jwtService: JwtService,
    ) { }

    async register(registerDto: RegisterDto) {
        // Check if user already exists
        const existingUser = await this.userRepository.findOne({
            where: [
                { email: registerDto.email },
                { phone: registerDto.phone },
            ],
        });

        if (existingUser) {
            throw new ConflictException('Email or phone already registered');
        }

        // Hash password with Argon2
        const password_hash = await argon2.hash(registerDto.password);

        // Create user
        const user = this.userRepository.create({
            full_name: registerDto.full_name,
            email: registerDto.email,
            phone: registerDto.phone,
            password_hash,
        });

        await this.userRepository.save(user);

        // Generate JWT token
        const token = this.generateToken(user);

        return {
            access_token: token,
            user: {
                id: user.id,
                full_name: user.full_name,
                email: user.email,
                phone: user.phone,
                role: user.role,
            },
        };
    }

    async login(loginDto: LoginDto) {
        // Find user by email
        const user = await this.userRepository.findOne({
            where: { email: loginDto.email },
        });

        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        // Verify password with Argon2
        const isPasswordValid = await argon2.verify(
            user.password_hash,
            loginDto.password,
        );

        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid credentials');
        }

        // Generate JWT token
        const token = this.generateToken(user);

        return {
            access_token: token,
            user: {
                id: user.id,
                full_name: user.full_name,
                email: user.email,
                phone: user.phone,
                role: user.role,
            },
        };
    }

    private generateToken(user: User): string {
        const payload = {
            sub: user.id,
            email: user.email,
            role: user.role,
        };

        return this.jwtService.sign(payload);
    }

    async getUserProfile(userId: string) {
        const user = await this.userRepository.findOne({
            where: { id: userId },
            select: ['id', 'full_name', 'email', 'phone', 'role', 'created_at'],
        });

        if (!user) {
            throw new UnauthorizedException('User not found');
        }

        return user;
    }
}
