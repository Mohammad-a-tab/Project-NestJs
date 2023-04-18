import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      host: 'localhost',
      port: 27017,
      database: 'my-nestjs-db',
      entities: [User],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([UserRepository]),
    AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
