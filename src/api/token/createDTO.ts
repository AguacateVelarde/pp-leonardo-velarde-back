import {Type} from 'class-transformer';
import {IsEmail, IsInt, IsOptional, IsString, Matches, Max, Min, MinLength} from 'class-validator';

export default class CreateTokenDTO {
  @IsEmail()
  @IsString()
  public readonly email: string;

  @MinLength(3)
  @IsString()
  public readonly password: string;
}
