
import { Controller, lazyInject, Post, ValidateBody, ValidatedJWT } from '@decorators';
import TokenRepository from '@services/tokenRepository';
import { Http } from '@status/codes';
import { plainToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { TYPES } from '../../types';
import CreateTokenDTO from './createDTO';

@Controller('/api/token')
export default class TokenController {
  @lazyInject(TYPES.TokenRepository) private tokenRepository: TokenRepository;

  @Post()
  @ValidateBody(CreateTokenDTO)
  public async createToken(req: Request, res: Response) {
    const dto = plainToClass(CreateTokenDTO, req.body);
    const token = await this.tokenRepository.createToken(dto.email, dto.password);
    res.setHeader('x-auth-pp', token);
    return res.status(Http.Ok).send({
      message: 'Auth complete',
      token
    });
  }
}
