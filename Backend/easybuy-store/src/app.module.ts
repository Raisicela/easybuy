import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsController } from './controllers/products/products.controller';
import { CategoriesController } from './controllers/categories/categories.controller';
import { ProductsService } from './services/products/products.service';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { FakeStoreService } from './services/fake-store-service/fake-store-service.service';
import { CategoriesService } from './services/categories/categories.service';

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot({
      isGlobal: true, // Hace que el módulo esté disponible globalmente
    }),
  ],
  controllers: [AppController, ProductsController, CategoriesController],
  providers: [AppService, ProductsService, FakeStoreService, CategoriesService],
})
export class AppModule {}
