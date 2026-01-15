import { IsNotEmpty, IsString, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCategoryDto {
    @ApiProperty({
        example: 'Énergie Solaire',
        description: 'Category name',
    })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiPropertyOptional({
        example: 'Solutions complètes pour l\'énergie solaire',
        description: 'Category description',
    })
    @IsString()
    @IsOptional()
    description?: string;
}
