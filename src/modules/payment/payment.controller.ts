import { Controller, Post, Get, Body, Param, Headers, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
    ApiTags,
    ApiOperation,
    ApiResponse,
    ApiBearerAuth,
    ApiHeader,
} from '@nestjs/swagger';
import { PaymentService } from './payment.service';
import { InitiatePaymentDto } from './dto/payment.dto';

@ApiTags('Payments')
@Controller('payments')
export class PaymentController {
    constructor(private readonly paymentService: PaymentService) { }

    @Get('methods')
    @ApiOperation({ summary: 'Get available payment methods' })
    @ApiResponse({ status: 200, description: 'Payment methods retrieved' })
    async getPaymentMethods() {
        return this.paymentService.getAvailablePaymentMethods();
    }

    @Post('initiate')
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth('JWT-auth')
    @ApiOperation({ summary: 'Initiate a payment' })
    @ApiResponse({ status: 201, description: 'Payment initiated successfully' })
    @ApiResponse({ status: 400, description: 'Bad request' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    async initiatePayment(@Body() initiatePaymentDto: InitiatePaymentDto) {
        return this.paymentService.initiatePayment(initiatePaymentDto);
    }

    @Post('webhook/:provider')
    @ApiOperation({ summary: 'Payment webhook endpoint' })
    @ApiHeader({
        name: 'x-signature',
        description: 'Webhook signature for verification',
        required: true,
    })
    @ApiResponse({ status: 200, description: 'Webhook processed' })
    @ApiResponse({ status: 400, description: 'Invalid signature' })
    async handleWebhook(
        @Param('provider') provider: string,
        @Body() payload: any,
        @Headers('x-signature') signature: string,
    ) {
        return this.paymentService.handleWebhook(provider, payload, signature || '');
    }
}
