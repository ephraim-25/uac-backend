import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const configService = app.get(ConfigService);

    // Global prefix
    const apiPrefix = configService.get('API_PREFIX', 'api');
    app.setGlobalPrefix(apiPrefix);

    // CORS configuration
    app.enableCors({
        origin: [
            'http://localhost:5173',
            'https://uac-platform.lovable.app',
        ],
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true,
    });

    // Global validation pipe
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
            transform: true,
            transformOptions: {
                enableImplicitConversion: true,
            },
        }),
    );

    // Swagger documentation
    const config = new DocumentBuilder()
        .setTitle('UAC RDC API')
        .setDescription(
            'Enterprise E-commerce Backend for UAC RDC - Powered by Dark Business Hi-Tech',
        )
        .setVersion('1.0')
        .addBearerAuth(
            {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
                name: 'JWT',
                description: 'Enter JWT token',
                in: 'header',
            },
            'JWT-auth',
        )
        .addTag('Authentication', 'User authentication and authorization')
        .addTag('Catalog', 'Product catalog management')
        .addTag('Inventory', 'Multi-location inventory tracking')
        .addTag('Orders', 'Order lifecycle management')
        .addTag('Payments', 'Payment processing')
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup(`${apiPrefix}/docs`, app, document, {
        customSiteTitle: 'UAC RDC API Documentation',
        customCss: '.swagger-ui .topbar { display: none }',
    });

    const port = configService.get('PORT', 3000);
    await app.listen(port);

    console.log(`
  ╔═══════════════════════════════════════════════════════════╗
  ║                                                           ║
  ║   🚀 UAC RDC Backend - Dark Business Hi-Tech             ║
  ║                                                           ║
  ║   Server running on: http://localhost:${port}                ║
  ║   API Documentation: http://localhost:${port}/${apiPrefix}/docs      ║
  ║                                                           ║
  ╚═══════════════════════════════════════════════════════════╝
  `);
}

bootstrap();
