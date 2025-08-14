import { Module } from '@nestjs/common';
import { ShortUrlUseCase } from './application/use-cases/short-url';
import { UrlController } from './infrastructure/controller/url.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaRepository } from './infrastructure/prisma-repository';
import { resolveShortUrlUseCase } from './application/use-cases/resolve-short';
import { UrlRepository } from './domain/repositories/url-repositoy';

@Module({
  imports: [],
  controllers: [UrlController],
  providers: [
    PrismaService,
    ShortUrlUseCase,
    resolveShortUrlUseCase,
    {
      provide: UrlRepository,
      useClass: PrismaRepository,
    },
  ],
})
export class UrlModule {}
