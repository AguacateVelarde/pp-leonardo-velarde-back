import {
  IsEmail, IsEnum,
  IsNotEmpty, IsNumber,
  IsPhoneNumber,
  IsString, MinLength
} from 'class-validator';

export default class CreateUserDTO {
  @MinLength(3)
  @IsString()
  @IsNotEmpty()
  public readonly name: string;

  @IsPhoneNumber('MX')
  @IsNotEmpty()
  public readonly phoneNumber: string;

  @IsNumber({
    allowInfinity: false,
    allowNaN: false,
    maxDecimalPlaces: 99
  })
  @IsNotEmpty()
  public readonly age: number;

  @IsEnum(['other', 'male', 'female'])
  @IsNotEmpty()
  public readonly genre: 'other' | 'male' | 'female';

  @IsString()
  @IsNotEmpty()
  public readonly hobby: string;

  @MinLength(3)
  @IsEmail()
  @IsNotEmpty()
  public readonly email: string;

  @MinLength(3)
  @IsString()
  @IsNotEmpty()
  public readonly password: string;
}
