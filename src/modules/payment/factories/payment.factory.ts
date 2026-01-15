import { Injectable, BadRequestException } from '@nestjs/common';
import { PaymentProvider } from '../interfaces/payment-provider.interface';
import { MokoAfricaProvider } from '../providers/moko-africa.provider';
import { StripeProvider } from '../providers/stripe.provider';

export enum PaymentMethod {
    MOBILE_MONEY = 'MOBILE_MONEY',
    CARD = 'CARD',
}

@Injectable()
export class PaymentFactory {
    constructor(
        private readonly mokoAfricaProvider: MokoAfricaProvider,
        private readonly stripeProvider: StripeProvider,
    ) { }

    /**
     * Get the appropriate payment provider based on payment method
     * @param paymentMethod - Payment method selected by user
     * @returns PaymentProvider instance
     */
    getProvider(paymentMethod: string): PaymentProvider {
        switch (paymentMethod.toUpperCase()) {
            case PaymentMethod.MOBILE_MONEY:
                return this.mokoAfricaProvider;

            case PaymentMethod.CARD:
                return this.stripeProvider;

            default:
                throw new BadRequestException(
                    `Unsupported payment method: ${paymentMethod}. Supported methods: MOBILE_MONEY, CARD`,
                );
        }
    }

    /**
     * Get provider by name (useful for webhook routing)
     * @param providerName - Provider name (e.g., 'moko_africa', 'stripe')
     * @returns PaymentProvider instance
     */
    getProviderByName(providerName: string): PaymentProvider {
        switch (providerName.toLowerCase()) {
            case 'moko_africa':
            case 'moko':
                return this.mokoAfricaProvider;

            case 'stripe':
                return this.stripeProvider;

            default:
                throw new BadRequestException(
                    `Unknown payment provider: ${providerName}`,
                );
        }
    }

    /**
     * Get all available payment methods
     * @returns Array of supported payment methods
     */
    getAvailablePaymentMethods(): string[] {
        return Object.values(PaymentMethod);
    }
}
