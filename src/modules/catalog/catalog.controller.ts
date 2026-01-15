import {
    Controller,
    Get,
    Post,
    Patch,
    Delete,
    Body,
    Param,
    Query,
    UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
    ApiTags,
    ApiOperation,
    ApiResponse,
    ApiBearerAuth,
    ApiQuery,
} from '@nestjs/swagger';
import { CatalogService } from './catalog.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { UserRole } from '../../common/enums/roles.enum';

@ApiTags('Catalog')
@Controller('catalog')
export class CatalogController {
    constructor(private readonly catalogService: CatalogService) { }

    // ========== PRODUCTS ==========

    @Get('products')
    @ApiOperation({ summary: 'Get all products with pagination' })
    @ApiQuery({ name: 'page', required: false, example: 1 })
    @ApiQuery({ name: 'limit', required: false, example: 20 })
    @ApiResponse({ status: 200, description: 'Products retrieved successfully' })
    async getAllProducts(
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 20,
    ) {
        return this.catalogService.findAllProducts(page, limit);
    }

    @Get('products/:slug')
    @ApiOperation({ summary: 'Get product by slug' })
    @ApiResponse({ status: 200, description: 'Product found' })
    @ApiResponse({ status: 404, description: 'Product not found' })
    async getProductBySlug(@Param('slug') slug: string) {
        return this.catalogService.findProductBySlug(slug);
    }

    @Post('products')
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles(UserRole.ADMIN_UAC, UserRole.ADMIN_DBH)
    @ApiBearerAuth('JWT-auth')
    @ApiOperation({ summary: 'Create a new product (Admin only)' })
    @ApiResponse({ status: 201, description: 'Product created successfully' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({ status: 403, description: 'Forbidden - Admin access required' })
    async createProduct(@Body() createProductDto: CreateProductDto) {
        return this.catalogService.createProduct(createProductDto);
    }

    @Patch('products/:id')
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles(UserRole.ADMIN_UAC, UserRole.ADMIN_DBH)
    @ApiBearerAuth('JWT-auth')
    @ApiOperation({ summary: 'Update a product (Admin only)' })
    @ApiResponse({ status: 200, description: 'Product updated successfully' })
    @ApiResponse({ status: 404, description: 'Product not found' })
    async updateProduct(
        @Param('id') id: string,
        @Body() updateProductDto: UpdateProductDto,
    ) {
        return this.catalogService.updateProduct(id, updateProductDto);
    }

    @Delete('products/:id')
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles(UserRole.ADMIN_UAC, UserRole.ADMIN_DBH)
    @ApiBearerAuth('JWT-auth')
    @ApiOperation({ summary: 'Delete a product (Admin only)' })
    @ApiResponse({ status: 200, description: 'Product deleted successfully' })
    @ApiResponse({ status: 404, description: 'Product not found' })
    async deleteProduct(@Param('id') id: string) {
        return this.catalogService.deleteProduct(id);
    }

    // ========== CATEGORIES ==========

    @Get('categories')
    @ApiOperation({ summary: 'Get all categories' })
    @ApiResponse({ status: 200, description: 'Categories retrieved successfully' })
    async getAllCategories() {
        return this.catalogService.findAllCategories();
    }

    @Get('categories/:id')
    @ApiOperation({ summary: 'Get category by ID with products' })
    @ApiResponse({ status: 200, description: 'Category found' })
    @ApiResponse({ status: 404, description: 'Category not found' })
    async getCategoryById(@Param('id') id: string) {
        return this.catalogService.findCategoryById(id);
    }

    @Post('categories')
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles(UserRole.ADMIN_UAC, UserRole.ADMIN_DBH)
    @ApiBearerAuth('JWT-auth')
    @ApiOperation({ summary: 'Create a new category (Admin only)' })
    @ApiResponse({ status: 201, description: 'Category created successfully' })
    async createCategory(@Body() createCategoryDto: CreateCategoryDto) {
        return this.catalogService.createCategory(createCategoryDto);
    }
}
