import { Http } from '@status/codes';
import BaseError from './baseError';

class NotFoundEntity  extends BaseError {
  constructor(error: string = 'NotFoundEntity error') {
    super(error, Http.NotFound);
  }
}

export default NotFoundEntity;
