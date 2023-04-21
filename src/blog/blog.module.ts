import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogService } from './blog.service';
import { BlogController } from './blog.controller';
import { BlogRepository } from './blog.repository';
import { AuthModule } from 'src/auth/auth.module';
import { Blog } from './blog.entity';

@Module({
    imports : [TypeOrmModule.forFeature([Blog]), AuthModule],
    controllers : [BlogController],
    providers : [BlogService, BlogRepository],
  })
export class BlogModule {}
