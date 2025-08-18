import { Module } from '@nestjs/common';
import { ShortUrlUseCase } from '@modules/url/application/use-cases/short-url';
import { UrlController } from '@modules/url/infrastructure/controller/url.controller';
import { PrismaService } from '@prisma/prisma.service';
import { PrismaRepository } from '@modules/url/infrastructure/prisma-repository';
import { resolveShortUrlUseCase } from '@modules/url/application/use-cases/resolve-short';
import { UrlRepository } from '@modules/url/domain/repositories/url-repository';

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
