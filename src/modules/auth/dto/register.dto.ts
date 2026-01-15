import { IsEmail, IsNotEmpty, IsString, MinLength, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
    @ApiProperty({
        example: 'Jean-Paul Mukendi',
        description: 'Full name of the user',
    })
    @IsString()
    @IsNotEmpty()
    full_name: string;

    @ApiProperty({
        example: 'jean.mukendi@example.com',
        description: 'Email address',
    })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({
        example: '+243812345678',
        description: 'Phone number (DRC format)',
    })
    @IsString()
    @IsNotEmpty()
    @Matches(/^\+243[0-9]{9}$/, {
        message: 'Phone must be a valid DRC number (+243XXXXXXXXX)',
    })
    phone: string;

    @ApiProperty({
        example: 'SecurePass123!',
        description: 'Password (minimum 8 characters)',
        minLength: 8,
    })
    @IsString()
    @MinLength(8)
    password: string;
}
