import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { RefType } from 'src/enums/ref-type.enum';

@Injectable()
export class RefTypeValidationPipe implements PipeTransform {
  transform(value: any) {
    if (!Object.values(RefType).includes(value)) {
      throw new BadRequestException(`refType "${value}" نامعتبر است`);
    }
    return value;
  }
}
