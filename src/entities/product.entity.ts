import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToOne,
    OneToMany,
    JoinColumn,
} from 'typeorm';
import { Category } from './category.entity';
import { Inventory } from './inventory.entity';

@Entity('products')
export class Product {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 255 })
    name: string;

    @Column({ type: 'varchar', length: 255, unique: true })
    slug: string;

    @Column({ type: 'text', nullable: true })
    description: string;

    @Column({ type: 'decimal', precision: 12, scale: 2 })
    base_price_usd: number;

    @ManyToOne(() => Category, (category) => category.products)
    @JoinColumn({ name: 'category_id' })
    category: Category;

    @Column({ type: 'uuid' })
    category_id: string;

    @Column({ type: 'jsonb', nullable: true })
    specifications: Record<string, any>;

    @Column({ type: 'text', array: true, default: [] })
    images: string[];

    @CreateDateColumn()
    created_at: Date;

    @OneToMany(() => Inventory, (inventory) => inventory.product)
    inventory: Inventory[];
}
