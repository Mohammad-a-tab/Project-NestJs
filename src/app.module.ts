import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserRepository } from './repositories/auth.repository';

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
    TypeOrmModule.forFeature([UserRepository])
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
