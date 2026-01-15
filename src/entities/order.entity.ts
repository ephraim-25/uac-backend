import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import { User } from './user.entity';
import { OrderStatus } from '../common/enums/order-status.enum';

@Entity('orders')
export class Order {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => User, (user) => user.orders)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @Column({ type: 'uuid' })
    user_id: string;

    @Column({
        type: 'enum',
        enum: OrderStatus,
        default: OrderStatus.PENDING,
    })
    status: OrderStatus;

    @Column({ type: 'decimal', precision: 12, scale: 2 })
    total_usd: number;

    @Column({ type: 'varchar', length: 50, nullable: true })
    payment_method: string;

    @Column({ type: 'varchar', length: 100, nullable: true })
    tracking_number: string;

    @Column({ type: 'jsonb', nullable: true })
    items: Array<{
        product_id: string;
        product_name: string;
        quantity: number;
        unit_price: number;
    }>;

    @Column({ type: 'jsonb', nullable: true })
    delivery_address: {
        full_name: string;
        phone: string;
        city: string;
        address: string;
        postal_code?: string;
    };

    @CreateDateColumn()
    created_at: Date;
}
