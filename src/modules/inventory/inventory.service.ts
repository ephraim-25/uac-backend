import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Inventory } from '../../entities/inventory.entity';
import { Product } from '../../entities/product.entity';
import { UpdateInventoryDto } from './dto/update-inventory.dto';

@Injectable()
export class InventoryService {
    constructor(
        @InjectRepository(Inventory)
        private inventoryRepository: Repository<Inventory>,
        @InjectRepository(Product)
        private productRepository: Repository<Product>,
    ) { }

    async getInventoryByProduct(productId: string) {
        const product = await this.productRepository.findOne({
            where: { id: productId },
        });

        if (!product) {
            throw new NotFoundException('Product not found');
        }

        const inventory = await this.inventoryRepository.find({
            where: { product_id: productId },
            relations: ['product'],
        });

        return {
            product_id: productId,
            product_name: product.name,
            locations: inventory,
            total_quantity: inventory.reduce((sum, item) => sum + item.quantity, 0),
        };
    }

    async updateInventory(id: string, updateInventoryDto: UpdateInventoryDto) {
        const inventory = await this.inventoryRepository.findOne({
            where: { id },
        });

        if (!inventory) {
            throw new NotFoundException('Inventory record not found');
        }

        inventory.quantity = updateInventoryDto.quantity;
        return this.inventoryRepository.save(inventory);
    }

    async createInventoryRecord(
        productId: string,
        locationName: string,
        quantity: number = 0,
    ) {
        const product = await this.productRepository.findOne({
            where: { id: productId },
        });

        if (!product) {
            throw new NotFoundException('Product not found');
        }

        const inventory = this.inventoryRepository.create({
            product_id: productId,
            location_name: locationName,
            quantity,
        });

        return this.inventoryRepository.save(inventory);
    }
}
