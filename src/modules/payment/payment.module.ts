import { Module } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { PaymentFactory } from './factories/payment.factory';
import { MokoAfricaProvider } from './providers/moko-africa.provider';
import { StripeProvider } from './providers/stripe.provider';

@Module({
    controllers: [PaymentController],
    providers: [
        PaymentService,
        PaymentFactory,
        MokoAfricaProvider,
        StripeProvider,
    ],
    exports: [PaymentService, PaymentFactory],
})
export class PaymentModule { }
