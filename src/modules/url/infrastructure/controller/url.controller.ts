import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Inject,
  HttpStatus,
} from '@nestjs/common';
import { ShortUrlUseCase } from '../../application/use-cases/short-url';
import { resolveShortUrlUseCase } from '../../application/use-cases/resolve-short';

@Controller('url')
export class UrlController {
  constructor(
    private readonly shortUrlUseCase: ShortUrlUseCase,
    private readonly resolveShortUrlUseCase: resolveShortUrlUseCase,
  ) {}

  @Post()
  async shortUrl(@Body() body: { originalUrl: string }) {
    const url = await this.shortUrlUseCase.execute({
      originalUrl: body.originalUrl,
    });
    return {
      shortUrl: url.shortUrl,
    };
  }

  @Get(':shortUrl')
  async getOriginalUrl(@Param('shortUrl') shortUrl: string) {
    const url = await this.resolveShortUrlUseCase.execute(shortUrl);
    return {
      originalUrl: url,
      statusCode: HttpStatus.MOVED_PERMANENTLY,
    };
  }
}
