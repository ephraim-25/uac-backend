import {
    Controller,
    Get,
    Post,
    Patch,
    Param,
    Body,
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
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { UserRole } from '../../common/enums/roles.enum';

@ApiTags('Orders')
@Controller('orders')
export class OrderController {
    constructor(private readonly orderService: OrderService) { }

    @Post()
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth('JWT-auth')
    @ApiOperation({ summary: 'Create a new order' })
    @ApiResponse({ status: 201, description: 'Order created successfully' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    async createOrder(
        @CurrentUser() user: any,
        @Body() createOrderDto: CreateOrderDto,
    ) {
        return this.orderService.createOrder(user.id, createOrderDto);
    }

    @Get()
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles(UserRole.ADMIN_UAC, UserRole.ADMIN_DBH)
    @ApiBearerAuth('JWT-auth')
    @ApiOperation({ summary: 'Get all orders (Admin only)' })
    @ApiQuery({ name: 'page', required: false, example: 1 })
    @ApiQuery({ name: 'limit', required: false, example: 20 })
    @ApiResponse({ status: 200, description: 'Orders retrieved successfully' })
    async getAllOrders(
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 20,
    ) {
        return this.orderService.findAllOrders(page, limit);
    }

    @Get('my-orders')
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth('JWT-auth')
    @ApiOperation({ summary: 'Get current user orders' })
    @ApiResponse({ status: 200, description: 'Orders retrieved successfully' })
    async getMyOrders(@CurrentUser() user: any) {
        return this.orderService.findOrdersByUser(user.id);
    }

    @Get(':id')
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth('JWT-auth')
    @ApiOperation({ summary: 'Get order by ID' })
    @ApiResponse({ status: 200, description: 'Order found' })
    @ApiResponse({ status: 404, description: 'Order not found' })
    async getOrderById(@Param('id') id: string) {
        return this.orderService.findOrderById(id);
    }

    @Patch(':id/status')
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles(UserRole.ADMIN_UAC, UserRole.ADMIN_DBH)
    @ApiBearerAuth('JWT-auth')
    @ApiOperation({ summary: 'Update order status (Admin only)' })
    @ApiResponse({ status: 200, description: 'Order status updated' })
    @ApiResponse({ status: 404, description: 'Order not found' })
    async updateOrderStatus(
        @Param('id') id: string,
        @Body() updateOrderStatusDto: UpdateOrderStatusDto,
    ) {
        return this.orderService.updateOrderStatus(id, updateOrderStatusDto);
    }
}
