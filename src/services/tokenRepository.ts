import { UserModel } from '@models/entity/user';
import { comparePasswords } from '@shared/cipher';
import { createJWT } from '@shared/jwt';
import NotFoundEntity from '@shared/notFoundEntity';
import UnprocessableEntity from '@shared/unprocessable.error';
import { injectable } from 'inversify';

@injectable()
class TokenRepository {
  public createToken = async (email: string, password: string) => {
    const user = await UserModel.findOne({ email }).select('+password').exec();
    if (!user || !user.password) {
      throw new NotFoundEntity('User don\'t found');
    }

    const isValid = await comparePasswords(user.password, password);

    if (!isValid) {
      throw new UnprocessableEntity();
    }

    return createJWT({
      email
    });
  }
}
export default TokenRepository;
