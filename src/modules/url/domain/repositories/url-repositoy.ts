import { UrlEntity } from '../entity/url.entity';

export interface ShortUrlParams {
  originalUrl: string;
  shortUrl?: string;
}

export abstract class UrlRepository {
  abstract shortURL(params: ShortUrlParams): Promise<UrlEntity>;
  abstract resolveUrl(shortUrl: string): Promise<UrlEntity>;
}
