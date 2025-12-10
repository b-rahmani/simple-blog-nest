import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ParseTagsPipe implements PipeTransform {
  transform(value: any) {
    if (!value) return [];
    if (Array.isArray(value)) return value.map(Number).filter((n) => !isNaN(n));
    if (typeof value === 'string') {
      try {
        const parsed = JSON.parse(value);
        if (Array.isArray(parsed)) {
          return parsed.map(Number).filter((n) => !isNaN(n));
        }
      } catch (error) {
        return value
          .split(',')
          .map((s) => Number(s.trim()))
          .filter((n) => !isNaN(n));
      }
    }
    throw new BadRequestException('فرمت تگ‌ها نامعتبر است');
  }
}
