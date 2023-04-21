import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './auth/user.entity';
import { UserRepository } from './auth/auth.repository';
import { BlogModule } from './blog/blog.module';
import { Blog } from './blog/blog.entity';
import { BlogRepository } from './blog/blog.repository';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.stage.dev`]
    }),
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
