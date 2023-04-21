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
import { Blog } from './blog/blog.entity';
import { BlogRepository } from './blog/blog.repository';

@Module({
  imports: [
    AuthModule,
    BlogModule,
    TypeOrmModule.forRoot({
      type: 'mongodb',
      host: 'localhost',
      port: 27017,
      database: 'nest-course',
      entities: [User, Blog],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([UserRepository, BlogRepository])
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
