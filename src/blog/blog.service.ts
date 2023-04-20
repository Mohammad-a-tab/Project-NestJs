import { Injectable } from '@nestjs/common';
import { BlogRepository } from './blog.repository';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class BlogService {
    constructor(
        @InjectRepository(BlogRepository) private readonly blogRepository: BlogRepository
    ) {}
}
