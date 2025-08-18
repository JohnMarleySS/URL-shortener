import { Injectable } from '@nestjs/common';
import {
  ShortUrlParams,
  UrlRepository,
} from '@modules/url/domain/repositories/url-repository';
import * as shortId from 'shortid';

@Injectable()
export class ShortUrlUseCase {
  constructor(private readonly urlRepository: UrlRepository) {}

  async execute(params: ShortUrlParams) {
    const shortUrl = shortId.generate();

    if (!shortUrl) {
      throw new Error('Error generating short URL');
    }

    return this.urlRepository.shortURL({
      originalUrl: params.originalUrl,
      shortUrl,
    });
  }
}
