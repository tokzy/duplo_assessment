import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class RemoveNullInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((response) => {
        // Remove null or undefined fields and date fields with null values from the response
        const cleanResponse = this.removeNullAndDateFields(response);
        return cleanResponse;
      }),
    );
  }

  private removeNullAndDateFields(data: any): any {
    if (typeof data !== 'object' || data === null) {
      return data;
    }

    if (data instanceof Date) {
      return data;
    }

    if (Array.isArray(data)) {
      return data.map((item) => this.removeNullAndDateFields(item));
    }

    const cleanData = {};
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        const cleanedValue = this.removeNullAndDateFields(data[key]);
        if (cleanedValue !== null) {
          cleanData[key] = cleanedValue;
        }
      }
    }

    return cleanData;
  }
}
