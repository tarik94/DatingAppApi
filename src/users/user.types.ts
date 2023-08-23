import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { Location, Message, User } from './user.schema';
import { PaginateDto, PaginatedRequestDto } from '../common/pagination.dto';

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail({}, { message: 'Please enter correct email' })
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;
}

export class UserRadiusDto {
  @ApiProperty()
  location: Location;
  @ApiProperty()
  radius: number;
}

export class UpdateUserDto {
  @ApiProperty({ required: false })
  name: string;
  @ApiProperty({ required: false })
  email: string;
  @ApiProperty({ required: false })
  password: string;
  @ApiProperty({ required: false })
  role: string;
  @ApiProperty({ required: false })
  forgotPasswordToken: string;
  @ApiProperty({ required: false })
  forgotPasswordTimestamp: string;
  @ApiProperty({ required: false })
  createdAccountTimestamp: string;
  @ApiProperty({ required: false })
  location: Location;
  @ApiProperty({ required: false })
  gender: string;
  @ApiProperty({ required: false })
  preference: string;
  @ApiProperty({ required: false })
  age: number;
  @ApiProperty({ required: false })
  bio: string;
  @ApiProperty({ required: false })
  hobbies: string[];
}

export class UserPaginateDto extends PaginateDto {
  @ApiProperty({ required: false })
  name: string;
  @ApiProperty({ required: false })
  email: string;
  @ApiProperty({ required: false })
  role: string;
  @ApiProperty({ required: false })
  forgotPasswordToken: string;
  @ApiProperty({ required: false })
  forgotPasswordTimestamp: string;
  @ApiProperty({ required: false })
  createdAccountTimestamp: string;
  @ApiProperty({ required: false })
  gender: string;
  @ApiProperty({ required: false })
  preference: string;
  @ApiProperty({ required: false })
  age: number;
  @ApiProperty({ required: false })
  hobbies: string[];
}

export class PaginatedUser extends PaginatedRequestDto(User) {}
