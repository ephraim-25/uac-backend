import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import { Product } from './product.entity';

@Entity('inventory')
export class Inventory {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Product, (product) => product.inventory)
    @JoinColumn({ name: 'product_id' })
    product: Product;

    @Column({ type: 'uuid' })
    product_id: string;

    @Column({ type: 'varchar', length: 100 })
    location_name: string;

    @Column({ type: 'integer', default: 0 })
    quantity: number;

    @UpdateDateColumn()
    updated_at: Date;
}
