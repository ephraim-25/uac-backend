import {
    IsNotEmpty,
    IsArray,
    ValidateNested,
    IsString,
    IsNumber,
    IsUUID,
    Min,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

class OrderItemDto {
    @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
    @IsUUID()
    product_id: string;

    @ApiProperty({ example: 'Kit Solaire 5KVA Premium' })
    @IsString()
    product_name: string;

    @ApiProperty({ example: 2 })
    @IsNumber()
    @Min(1)
    quantity: number;

    @ApiProperty({ example: 2500.0 })
    @IsNumber()
    @Min(0)
    unit_price: number;
}

class DeliveryAddressDto {
    @ApiProperty({ example: 'Jean-Paul Mukendi' })
    @IsString()
    @IsNotEmpty()
    full_name: string;

    @ApiProperty({ example: '+243812345678' })
    @IsString()
    @IsNotEmpty()
    phone: string;

    @ApiProperty({ example: 'Kinshasa' })
    @IsString()
    @IsNotEmpty()
    city: string;

    @ApiProperty({ example: 'Avenue Kasa-Vubu, Commune de la Gombe' })
    @IsString()
    @IsNotEmpty()
    address: string;

    @ApiProperty({ example: '12345', required: false })
    @IsString()
    postal_code?: string;
}

export class CreateOrderDto {
    @ApiProperty({
        type: [OrderItemDto],
        description: 'Array of order items',
    })
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => OrderItemDto)
    items: OrderItemDto[];

    @ApiProperty({
        example: 'mobile_money',
        description: 'Payment method (mobile_money, stripe, etc.)',
    })
    @IsString()
    @IsNotEmpty()
    payment_method: string;

    @ApiProperty({
        type: DeliveryAddressDto,
        description: 'Delivery address details',
    })
    @ValidateNested()
    @Type(() => DeliveryAddressDto)
    delivery_address: DeliveryAddressDto;
}
