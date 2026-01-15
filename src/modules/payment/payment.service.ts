import { Injectable, BadRequestException } from '@nestjs/common';
import { PaymentFactory } from './factories/payment.factory';
import { InitiatePaymentDto } from './dto/payment.dto';

@Injectable()
export class PaymentService {
    constructor(private readonly paymentFactory: PaymentFactory) { }

    /**
     * Initiate a payment using the appropriate provider
     * @param initiatePaymentDto - Payment initiation data
     * @returns Payment response from the selected provider
     */
    async initiatePayment(initiatePaymentDto: InitiatePaymentDto) {
        const { payment_method, order_id, amount, phone_number, customer_email } =
            initiatePaymentDto;

        // Get the appropriate payment provider
        const provider = this.paymentFactory.getProvider(payment_method);

        // Prepare order data for the provider
        const orderData = {
            order_id,
            amount,
            phone_number,
            customer_email,
            currency: 'USD', // TODO: Make this configurable
        };

        // Initiate payment through the provider
        return provider.initiatePayment(orderData);
    }

    /**
     * Handle webhook from payment provider
     * @param providerName - Name of the payment provider
     * @param payload - Webhook payload
     * @param signature - Webhook signature for verification
     * @returns Webhook processing result
     */
    async handleWebhook(
        providerName: string,
        payload: any,
        signature: string,
    ) {
        try {
            // Get the provider by name
            const provider = this.paymentFactory.getProviderByName(providerName);

            // Verify webhook signature
            const isValid = await provider.verifyWebhook(payload, signature);

            if (!isValid) {
                throw new BadRequestException('Invalid webhook signature');
            }

            // TODO: Process the webhook payload
            // - Update order status
            // - Send confirmation email
            // - Trigger inventory updates
            console.log(`Webhook from ${providerName} verified successfully:`, payload);

            return {
                status: 'received',
                message: 'Webhook processed successfully',
                provider: provider.getProviderName(),
            };
        } catch (error) {
            console.error(`Webhook processing failed for ${providerName}:`, error);
            throw error;
        }
    }

    /**
     * Get list of available payment methods
     * @returns Array of supported payment methods
     */
    getAvailablePaymentMethods() {
        return {
            payment_methods: this.paymentFactory.getAvailablePaymentMethods(),
        };
    }
}

