import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from '../../entities/order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';
import { OrderStatus } from '../../common/enums/order-status.enum';

@Injectable()
export class OrderService {
    constructor(
        @InjectRepository(Order)
        private orderRepository: Repository<Order>,
    ) { }

    async createOrder(userId: string, createOrderDto: CreateOrderDto) {
        // Calculate total
        const total_usd = createOrderDto.items.reduce(
            (sum, item) => sum + item.quantity * item.unit_price,
            0,
        );

        // Generate tracking number
        const tracking_number = this.generateTrackingNumber();

        const order = this.orderRepository.create({
            user_id: userId,
            items: createOrderDto.items,
            payment_method: createOrderDto.payment_method,
            delivery_address: createOrderDto.delivery_address,
            total_usd,
            tracking_number,
            status: OrderStatus.PENDING,
        });

        return this.orderRepository.save(order);
    }

    async findOrderById(id: string) {
        const order = await this.orderRepository.findOne({
            where: { id },
            relations: ['user'],
        });

        if (!order) {
            throw new NotFoundException('Order not found');
        }

        return order;
    }

    async findOrdersByUser(userId: string) {
        return this.orderRepository.find({
            where: { user_id: userId },
            order: { created_at: 'DESC' },
        });
    }

    async findAllOrders(page: number = 1, limit: number = 20) {
        const [orders, total] = await this.orderRepository.findAndCount({
            relations: ['user'],
            skip: (page - 1) * limit,
            take: limit,
            order: { created_at: 'DESC' },
        });

        return {
            data: orders,
            meta: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        };
    }

    async updateOrderStatus(
        id: string,
        updateOrderStatusDto: UpdateOrderStatusDto,
    ) {
        const order = await this.findOrderById(id);
        order.status = updateOrderStatusDto.status;
        return this.orderRepository.save(order);
    }

    private generateTrackingNumber(): string {
        const prefix = 'UAC';
        const timestamp = Date.now().toString(36).toUpperCase();
        const random = Math.random().toString(36).substring(2, 6).toUpperCase();
        return `${prefix}-${timestamp}-${random}`;
    }
}
