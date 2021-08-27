import { Controller, Delete, Get, lazyInject, Post, ValidateBody, ValidatedJWT } from '@decorators';
import SearchRepository from '@services/searchRespository';
import UserRepository from '@services/userRepository';
import UnprocessableEntity from '@shared/unprocessable.error';
import { Http } from '@status/codes';
import { plainToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { TYPES } from '../../types';
import CreateUserDTO from './createDTO';

@Controller('/api/user')
export default class UserController {
  @lazyInject(TYPES.UserRepository) private userRepository: UserRepository;
  @lazyInject(TYPES.SearchRepository) private searchRespository: SearchRepository;

  @Post()
  @ValidateBody(CreateUserDTO)
  public async createdUser(req: Request, res: Response) {
    const dto = plainToClass(CreateUserDTO, req.body);
    const user = await this.userRepository.createUser(dto);
    return res.status(Http.Created).send(user);
  }

  @Get('/vip-users')
  @ValidatedJWT()
  public async getVIPUsers(req: Request, res: Response) {
    const hoobies = await this.userRepository.findByVIP();
    res.status(Http.Ok).json({ hoobies });
  }

  @Get('/search')
  @ValidatedJWT()
  public async searchUser(req: Request, res: Response) {
    const { q } = req.query;
    if (!q) {
      throw new UnprocessableEntity();
    }
    const users = await this.searchRespository.findBySearch(q.toString());
    res.send({users});
  }

  @Get()
  @ValidatedJWT()
  public async findAllUsers(req: Request, res: Response) {
    const users = await this.userRepository.find();
    res.status(Http.Ok).json({ users});
  }

  @Get('/:userId')
  @ValidatedJWT()
  public async findOneUser(req: Request, res: Response) {
    const { userId } = req.params;
    const user = await this.userRepository.findById(userId);
    res.status(Http.Ok).json({user});
  }

  @Delete('/:userId')
  // @ValidatedJWT()
  public async deleteOneUser(req: Request, res: Response) {
    const { userId } = req.params;
    const user = await this.userRepository.deleteById(userId);
    res.status(Http.Accepted).json({user});
  }

}
