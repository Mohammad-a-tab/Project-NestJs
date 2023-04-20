import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './auth/user.entity';
import { UserRepository } from './auth/auth.repository';
import { BlogController } from './blog/blog.controller';
import { BlogService } from './blog/blog.service';
import { BlogModule } from './blog/blog.module';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'mongodb',
      host: 'localhost',
      port: 27017,
      database: 'nest-course',
      entities: [User],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([UserRepository]),
    BlogModule
  ],
  controllers: [AppController, BlogController],
  providers: [AppService, BlogService]
})
export class AppModule {}
