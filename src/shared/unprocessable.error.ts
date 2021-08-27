import { Http } from '@status/codes';
import BaseError from './baseError';

class UnprocessableEntity  extends BaseError {
  constructor() {
    super('UnprocessableEntity error', Http.UnprocessableEntity);
  }
}

export default UnprocessableEntity;
