import CreateUserDTO from '@api/user/createDTO';
import { UserModel } from '@models/entity/user';
import NotFoundEntity from '@shared/notFoundEntity';
import UnprocessableEntity from '@shared/unprocessable.error';
import { injectable } from 'inversify';
import { isValidObjectId } from 'mongoose';

@injectable()
class UserRepository {
  public createUser = async (user: CreateUserDTO): Promise<any> => {
    const _user = await UserModel.create(user);
    return _user;
  }

  public findById = async (userId: string) => {
    if (!isValidObjectId(userId)) {
      throw new UnprocessableEntity();
    }

    const user = await UserModel.findOne({ _id: userId });

    if (!user) {
      throw new NotFoundEntity();
    }

    return user;
  }

  public deleteById = (userId: string) => {
    if (!isValidObjectId(userId)) {
      throw new UnprocessableEntity();
    }

    return UserModel.deleteOne({ _id: userId });
  }

  public find = () => {
    return UserModel.find();
  }

  public findByVIP = () => {
    const now = new Date();
    const threeYearsAgoTimestamp = now.getTime() - 1000 * 60 * 60 * 24 * 3;
    const threeYearsAgoDate = new Date(threeYearsAgoTimestamp);
    return UserModel.aggregate([
      {
        $match: {
          age: { $gte: 18 },
          genre: 'female',
          createdAt: { $gte: threeYearsAgoDate }
        }
      },
      {
        $group: {
          _id: '$hobby',
          total: { $sum: 1 },
          users: {
            $push: {
              name: '$name',
              hobby: '$hobby',
              phoneNumber: '$phoneNumber'
            }
          }

        }
      }
    ]);
  }

}

export default UserRepository;
