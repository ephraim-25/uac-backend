import { IsEnum, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { OrderStatus } from '../../../common/enums/order-status.enum';

export class UpdateOrderStatusDto {
    @ApiProperty({
        enum: OrderStatus,
        example: OrderStatus.CONFIRMED,
        description: 'New order status',
    })
    @IsEnum(OrderStatus)
    @IsNotEmpty()
    status: OrderStatus;
}
