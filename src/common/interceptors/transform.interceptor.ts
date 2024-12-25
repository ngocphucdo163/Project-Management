import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { instanceToPlain } from 'class-transformer';
import { BaseResponse } from '../interface';

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, BaseResponse<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler
  ): Observable<BaseResponse<T>> {
    return next.handle().pipe(
      map(
        (data): BaseResponse<T> => ({
          message: 'success',
          statusCode: context.switchToHttp().getResponse().statusCode,
          data: data ? (instanceToPlain(data) as T) : ([] as T),
        })
      )
    );
  }
}
