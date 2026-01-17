import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { CatalogModule } from './modules/catalog/catalog.module';
import { InventoryModule } from './modules/inventory/inventory.module';
import { OrderModule } from './modules/order/order.module';
import { PaymentModule } from './modules/payment/payment.module';

@Module({
    imports: [
        // Configuration
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: '.env',
        }),

        // Database - Using SQLite for development (switch to PostgreSQL for production)
        TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST || 'db',
      port: parseInt(process.env.DATABASE_PORT || '5432', 10),
      username: process.env.DATABASE_USER || 'postgres',
      password: process.env.DATABASE_PASSWORD || 'TonMotDePasseSecret',
      database: process.env.DATABASE_NAME || 'uac_rdc',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),

        // Uncomment below for PostgreSQL (and comment out SQLite config above)
        // TypeOrmModule.forRootAsync({
        //   imports: [ConfigModule],
        //   useFactory: (configService: ConfigService) => ({
        //     type: 'postgres',
        //     host: configService.get('DB_HOST'),
        //     port: configService.get('DB_PORT'),
        //     username: configService.get('DB_USERNAME'),
        //     password: configService.get('DB_PASSWORD'),
        //     database: configService.get('DB_DATABASE'),
        //     entities: [__dirname + '/**/*.entity{.ts,.js}'],
        //     synchronize: configService.get('NODE_ENV') === 'development',
        //     logging: configService.get('NODE_ENV') === 'development',
        //   }),
        //   inject: [ConfigService],
        // }),

        // Feature Modules
        AuthModule,
        CatalogModule,
        InventoryModule,
        OrderModule,
        PaymentModule,
    ],
})
export class AppModule { }
