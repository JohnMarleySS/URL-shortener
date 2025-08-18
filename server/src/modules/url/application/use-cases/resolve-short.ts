import { Injectable } from '@nestjs/common';
import { UrlRepository } from '@modules/url/domain/repositories/url-repository';

@Injectable()
export class resolveShortUrlUseCase {
  constructor(private readonly urlRepository: UrlRepository) {}
  async execute(shortUrl: string) {
    const url = await this.urlRepository.resolveUrl(shortUrl);
    return url.originalUrl;
  }
}
