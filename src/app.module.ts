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
            type: 'better-sqlite3',
            database: 'uac_rdc.db',
            entities: [__dirname + '/**/*.entity{.ts,.js}'],
            synchronize: true, // Auto-create tables in development
            logging: true,
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
