import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
    PaymentProvider,
    PaymentResponse,
} from '../interfaces/payment-provider.interface';

@Injectable()
export class MokoAfricaProvider implements PaymentProvider {
    private readonly apiKey: string;
    private readonly webhookSecret: string;
    private readonly apiUrl: string;

    constructor(private configService: ConfigService) {
        this.apiKey = this.configService.get<string>('MOKO_API_KEY', '');
        this.webhookSecret = this.configService.get<string>(
            'MOKO_WEBHOOK_SECRET',
            '',
        );
        this.apiUrl =
            this.configService.get<string>('MOKO_API_URL') ||
            'https://api.mokoafrica.com/v1';
    }

    async initiatePayment(orderData: any): Promise<PaymentResponse> {
        // TODO: Implement Moko Africa payment initiation
        // Reference: Moko Africa API documentation
        // https://docs.mokoafrica.com/

        const { order_id, amount, phone_number, currency = 'USD' } = orderData;

        try {
            // TODO: Make API call to Moko Africa
            // const response = await axios.post(
            //   `${this.apiUrl}/payments/initiate`,
            //   {
            //     amount,
            //     currency,
            //     phone_number,
            //     reference: order_id,
            //     callback_url: `${process.env.APP_URL}/api/payments/webhook/moko`,
            //   },
            //   {
            //     headers: {
            //       'Authorization': `Bearer ${this.apiKey}`,
            //       'Content-Type': 'application/json',
            //     },
            //   }
            // );

            // Placeholder response
            return {
                status: 'pending',
                transaction_id: `MOKO-${Date.now()}`,
                message:
                    'Payment initiated via Moko Africa. Please check your phone for confirmation.',
                provider: 'moko_africa',
                metadata: {
                    order_id,
                    phone_number,
                    amount,
                },
            };
        } catch (error) {
            return {
                status: 'failed',
                message: `Moko Africa payment failed: ${error.message}`,
                provider: 'moko_africa',
            };
        }
    }

    async verifyWebhook(payload: any, signature: string): Promise<boolean> {
        // TODO: Implement webhook signature verification
        // Reference: Moko Africa webhook security documentation

        try {
            // TODO: Verify HMAC signature
            // const crypto = require('crypto');
            // const expectedSignature = crypto
            //   .createHmac('sha256', this.webhookSecret)
            //   .update(JSON.stringify(payload))
            //   .digest('hex');
            //
            // return signature === expectedSignature;

            // Placeholder - always return true for development
            console.log('Moko Africa webhook received:', payload);
            return true;
        } catch (error) {
            console.error('Moko Africa webhook verification failed:', error);
            return false;
        }
    }

    getProviderName(): string {
        return 'moko_africa';
    }
}
