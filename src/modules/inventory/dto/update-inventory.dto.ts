import { IsNotEmpty, IsNumber, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateInventoryDto {
    @ApiProperty({
        example: 50,
        description: 'New quantity for this location',
        minimum: 0,
    })
    @IsNumber()
    @Min(0)
    @IsNotEmpty()
    quantity: number;
}
