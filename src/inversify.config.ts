import SearchRepository from '@services/searchRespository';
import TokenRepository from '@services/tokenRepository';
import UserRepository from '@services/userRepository';
import { Container } from 'inversify';
import 'reflect-metadata';
import { TYPES } from './types';

const container = new Container();
container.bind<UserRepository>(TYPES.UserRepository).to(UserRepository);
container.bind<SearchRepository>(TYPES.SearchRepository).to(SearchRepository);
container.bind<TokenRepository>(TYPES.TokenRepository).to(TokenRepository);

export { container };
