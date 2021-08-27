
import { RouteDefinition } from '@models/RouteDefinition';

export function Delete(path: string = '/' ): MethodDecorator {
  return  (target, propertyKey: string): void | TypedPropertyDescriptor<any> =>  {
    if (! Reflect.hasMetadata('routes', target.constructor)) {
      Reflect.defineMetadata('routes', [], target.constructor);
    }
    const routes = Reflect.getMetadata('routes', target.constructor) as RouteDefinition[];

    routes.push({
      requestMethod: 'delete',
      path,
      methodName: propertyKey
    });
    Reflect.defineMetadata('routes', routes, target.constructor);
  };
}
