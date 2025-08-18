import { Injectable } from '@nestjs/common';
import type {
  ShortUrlParams,
  UrlRepository,
} from '@modules/url/domain/repositories/url-repository';
import { PrismaService } from '@prisma/prisma.service';
import type { UrlEntity } from '@modules/url/domain/entity/url.entity';

@Injectable()
export class PrismaRepository implements UrlRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async shortURL(params: ShortUrlParams): Promise<UrlEntity> {
    if (!params.shortUrl) {
      throw new Error('Error generating short URL');
    }

    const url = await this.prismaService.url.create({
      data: {
        originalUrl: params.originalUrl,
        shortUrl: params.shortUrl,
      },
    });

    return url;
  }

  async resolveUrl(shortUrl: string): Promise<UrlEntity> {
    const url = await this.prismaService.url.findUnique({
      where: {
        shortUrl,
      },
    });

    if (!url) {
      throw new Error('URL not found');
    }

    return url;
  }
}
