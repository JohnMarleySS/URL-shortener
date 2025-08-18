import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  HttpStatus,
  NotFoundException,
  Redirect,
} from '@nestjs/common';
import { ShortUrlUseCase } from '@modules/url/application/use-cases/short-url';
import { resolveShortUrlUseCase } from '@modules/url/application/use-cases/resolve-short';

@Controller()
export class UrlController {
  constructor(
    private readonly shortUrlUseCase: ShortUrlUseCase,
    private readonly resolveShortUrlUseCase: resolveShortUrlUseCase,
  ) {}

  @Post('url')
  async shortUrl(@Body() body: { originalUrl: string }) {
    const url = await this.shortUrlUseCase.execute({
      originalUrl: body.originalUrl,
    });
    return {
      shortUrl: url.shortUrl,
    };
  }

  @Get(':shortUrl')
  @Redirect('', HttpStatus.TEMPORARY_REDIRECT)
  async redirectToOriginalUrl(@Param('shortUrl') shortUrl: string) {
    const url = await this.resolveShortUrlUseCase.execute(shortUrl);

    if (!url) {
      throw new NotFoundException('URL encurtada não encontrada.');
    }

    return { url: url };
  }
}
