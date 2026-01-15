import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../../entities/product.entity';
import { Category } from '../../entities/category.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CatalogService {
    constructor(
        @InjectRepository(Product)
        private productRepository: Repository<Product>,
        @InjectRepository(Category)
        private categoryRepository: Repository<Category>,
    ) { }

    // ========== PRODUCTS ==========

    async createProduct(createProductDto: CreateProductDto) {
        // Verify category exists
        const category = await this.categoryRepository.findOne({
            where: { id: createProductDto.category_id },
        });

        if (!category) {
            throw new NotFoundException('Category not found');
        }

        // Generate slug from name
        const slug = this.generateSlug(createProductDto.name);

        const product = this.productRepository.create({
            ...createProductDto,
            slug,
        });

        return this.productRepository.save(product);
    }

    async findAllProducts(page: number = 1, limit: number = 20) {
        const [products, total] = await this.productRepository.findAndCount({
            relations: ['category'],
            skip: (page - 1) * limit,
            take: limit,
            order: { created_at: 'DESC' },
        });

        return {
            data: products,
            meta: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        };
    }

    async findProductBySlug(slug: string) {
        const product = await this.productRepository.findOne({
            where: { slug },
            relations: ['category', 'inventory'],
        });

        if (!product) {
            throw new NotFoundException('Product not found');
        }

        return product;
    }

    async findProductById(id: string) {
        const product = await this.productRepository.findOne({
            where: { id },
            relations: ['category', 'inventory'],
        });

        if (!product) {
            throw new NotFoundException('Product not found');
        }

        return product;
    }

    async updateProduct(id: string, updateProductDto: UpdateProductDto) {
        const product = await this.findProductById(id);

        // Update slug if name changed
        let updatedData = { ...updateProductDto };
        if (updateProductDto.name && updateProductDto.name !== product.name) {
            updatedData = {
                ...updatedData,
                slug: this.generateSlug(updateProductDto.name),
            } as any;
        }

        Object.assign(product, updatedData);
        return this.productRepository.save(product);
    }

    async deleteProduct(id: string) {
        const product = await this.findProductById(id);
        await this.productRepository.remove(product);
        return { message: 'Product deleted successfully' };
    }

    // ========== CATEGORIES ==========

    async createCategory(createCategoryDto: CreateCategoryDto) {
        const slug = this.generateSlug(createCategoryDto.name);

        const category = this.categoryRepository.create({
            ...createCategoryDto,
            slug,
        });

        return this.categoryRepository.save(category);
    }

    async findAllCategories() {
        return this.categoryRepository.find({
            order: { name: 'ASC' },
        });
    }

    async findCategoryById(id: string) {
        const category = await this.categoryRepository.findOne({
            where: { id },
            relations: ['products'],
        });

        if (!category) {
            throw new NotFoundException('Category not found');
        }

        return category;
    }

    // ========== UTILITIES ==========

    private generateSlug(name: string): string {
        return name
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '') // Remove accents
            .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric with hyphens
            .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
    }
}
