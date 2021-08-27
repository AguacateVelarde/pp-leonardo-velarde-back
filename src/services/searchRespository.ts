import { UserModel } from '@models/entity/user';
import { injectable } from 'inversify';

@injectable()
class SearchRepository {
  public findBySearch = (search: string) => {
    const searchUpper = this._transformSearchToUpper(search);
    const query = [
      this._getProjection(),
      this._getMatch(searchUpper),
      this._getLastProjection()
    ];
    return UserModel.aggregate(query);
  }

  private _transformSearchToUpper(search: string) {
    return search
      .split(' ')
      .join('(?:\\n\\s*)?')
      .replace(
        /[a-z]/g,
        Function.prototype.call.bind(String.prototype.toUpperCase)
      )
      .replace(/ /g, '');
  }

  private _getLastProjection() {
    return {
      $project: {
        email: true,
        name: true,
        hobby: true,
        genre: true,
      }
    };
  }

  private _getProjection() {
    return {
      $project: {
        email: true,
        name: true,
        hobby: true,
        genre: true,
        emailUpper: {
          $toUpper: '$email'
        },
        hobbyUpper: {
          $toUpper: '$hobby'
        }
      }
    };
  }

  private _getMatch(search: string) {
    return {
      $match: {
        $or: [
          {
            emailUpper: {
              $regex: `.*${search}.*`,
            },
          },
          {
            hobbyUpper: {
              $regex: `.*${search}.*`,
            },
          }
        ]
      }
    };
  }
}
export default SearchRepository;
