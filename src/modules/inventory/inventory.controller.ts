import {
    Controller,
    Get,
    Patch,
    Param,
    Body,
    UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
    ApiTags,
    ApiOperation,
    ApiResponse,
    ApiBearerAuth,
} from '@nestjs/swagger';
import { InventoryService } from './inventory.service';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { UserRole } from '../../common/enums/roles.enum';

@ApiTags('Inventory')
@Controller('inventory')
export class InventoryController {
    constructor(private readonly inventoryService: InventoryService) { }

    @Get('product/:productId')
    @ApiOperation({ summary: 'Get inventory for a product across all locations' })
    @ApiResponse({
        status: 200,
        description: 'Inventory retrieved successfully',
    })
    @ApiResponse({ status: 404, description: 'Product not found' })
    async getInventoryByProduct(@Param('productId') productId: string) {
        return this.inventoryService.getInventoryByProduct(productId);
    }

    @Patch(':id')
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles(UserRole.ADMIN_UAC, UserRole.ADMIN_DBH)
    @ApiBearerAuth('JWT-auth')
    @ApiOperation({ summary: 'Update inventory quantity (Admin only)' })
    @ApiResponse({
        status: 200,
        description: 'Inventory updated successfully',
    })
    @ApiResponse({ status: 404, description: 'Inventory record not found' })
    async updateInventory(
        @Param('id') id: string,
        @Body() updateInventoryDto: UpdateInventoryDto,
    ) {
        return this.inventoryService.updateInventory(id, updateInventoryDto);
    }
}
