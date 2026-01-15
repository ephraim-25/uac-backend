import {
    IsNotEmpty,
    IsString,
    IsNumber,
    IsEnum,
    IsOptional,
    IsEmail,
    Min,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export enum PaymentMethod {
    MOBILE_MONEY = 'MOBILE_MONEY',
    CARD = 'CARD',
}

export class InitiatePaymentDto {
    @ApiProperty({
        example: '123e4567-e89b-12d3-a456-426614174000',
        description: 'Order ID',
    })
    @IsString()
    @IsNotEmpty()
    order_id: string;

    @ApiProperty({
        enum: PaymentMethod,
        example: PaymentMethod.MOBILE_MONEY,
        description: 'Payment method (MOBILE_MONEY or CARD)',
    })
    @IsEnum(PaymentMethod)
    payment_method: string;

    @ApiProperty({
        example: 5000.0,
        description: 'Amount in USD',
    })
    @IsNumber()
    @Min(0)
    amount: number;

    @ApiPropertyOptional({
        example: '+243812345678',
        description: 'Phone number (required for MOBILE_MONEY)',
    })
    @IsString()
    @IsOptional()
    phone_number?: string;

    @ApiPropertyOptional({
        example: 'customer@example.com',
        description: 'Customer email (required for CARD payments)',
    })
    @IsEmail()
    @IsOptional()
    customer_email?: string;
}
