export interface PaymentResponse {
    status: 'pending' | 'success' | 'failed';
    transaction_id?: string;
    checkout_url?: string;
    message: string;
    provider: string;
    metadata?: Record<string, any>;
}

export interface PaymentProvider {
    /**
     * Initiate a payment transaction
     * @param orderData - Order and payment details
     * @returns Payment response with transaction details
     */
    initiatePayment(orderData: any): Promise<PaymentResponse>;

    /**
     * Verify webhook signature and payload
     * @param payload - Webhook payload from payment provider
     * @param signature - Signature header for verification
     * @returns True if webhook is valid, false otherwise
     */
    verifyWebhook(payload: any, signature: string): Promise<boolean>;

    /**
     * Get the provider name
     */
    getProviderName(): string;
}
