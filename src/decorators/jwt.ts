import BaseError from '@shared/baseError';
import { validatedJWT } from '@shared/jwt';
import UnprocessableEntity from '@shared/unprocessable.error';
import { Http } from '@status/codes';

class UnauthorizedError extends BaseError {
  constructor() {
    super('Unauthorized error', Http.Unauthorized);
  }
}

export function ValidatedJWT(headerName: string = 'authorization') {
  return  (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<Function>) =>  {
    const method = descriptor.value;
    descriptor.value = async function(...args: any[]) {
      const auth = (args[0].headers as any)[headerName];

      if (!auth) {
        throw new UnprocessableEntity();
      }

      const token = auth
        .replace('Bearer ', '')
        .replace('Bearer', '');

      if (!validatedJWT(token)) {
        throw new UnauthorizedError();
      }
      return method.apply(target, args);
    };
  };
}
