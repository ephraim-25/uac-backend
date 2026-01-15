import {
    IsNotEmpty,
    IsString,
    IsNumber,
    IsUUID,
    IsOptional,
    IsArray,
    Min,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateProductDto {
    @ApiProperty({
        example: 'Kit Solaire 5KVA Premium',
        description: 'Product name',
    })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiPropertyOptional({
        example: 'Système solaire complet avec onduleur hybride 5KVA',
        description: 'Product description',
    })
    @IsString()
    @IsOptional()
    description?: string;

    @ApiProperty({
        example: 2500.0,
        description: 'Base price in USD',
        minimum: 0,
    })
    @IsNumber()
    @Min(0)
    base_price_usd: number;

    @ApiProperty({
        example: '123e4567-e89b-12d3-a456-426614174000',
        description: 'Category UUID',
    })
    @IsUUID()
    @IsNotEmpty()
    category_id: string;

    @ApiPropertyOptional({
        example: {
            power: '5KVA',
            battery_capacity: '200Ah',
            panel_wattage: '400W x 6',
            warranty: '2 years',
        },
        description: 'Product specifications (flexible JSON)',
    })
    @IsOptional()
    specifications?: Record<string, any>;

    @ApiPropertyOptional({
        example: [
            'https://cdn.uac-rdc.com/products/solar-kit-5kva-1.jpg',
            'https://cdn.uac-rdc.com/products/solar-kit-5kva-2.jpg',
        ],
        description: 'Array of image URLs',
    })
    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    images?: string[];
}
