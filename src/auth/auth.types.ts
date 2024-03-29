import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import mongoose from 'mongoose';
import { Location } from '../users/user.schema';

export class ChangeForgotPasswordDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail({}, { message: 'Please enter correct email' })
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  forgotPasswordToken: string;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(6)
  newPassword: string;
}

export class ChangePasswordDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail({}, { message: 'Please enter correct email' })
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  oldPassword: string;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(6)
  newPassword: string;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(6)
  confirmNewPassword: string;
}

export class ForgotPasswordDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail({}, { message: 'Please enter correct email' })
  email: string;
}

export class LoginUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail({}, { message: 'Please enter correct email' })
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password: string;
}

export class LoginResponseDto {
  @ApiProperty()
  token: string;
}

export class AuthUser {
  @ApiProperty()
  _id: string;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  role: string;

  @ApiProperty()
  createdAccountTimeStamp: string;

  @ApiProperty()
  location: Location;

  @ApiProperty()
  gender: string;

  @ApiProperty()
  preference: string;

  @ApiProperty()
  age: number;

  @ApiProperty()
  bio: string;

  @ApiProperty()
  hobbies: string[];

  @ApiProperty({ required: false })
  profilePicture: string;

  @ApiProperty({ required: false })
  gallery: string[];

  @ApiProperty({ required: false })
  lastPictureTaken: string;

  @ApiProperty({ required: false })
  prefferedAgeFrom: number;

  @ApiProperty({ required: false })
  prefferedAgeTo: number;

  @ApiProperty({ required: false })
  prefferedRadius: number;
}

export class AuthResponseDto {
  @ApiProperty()
  user: AuthUser;

  @ApiProperty()
  token: string;
}

export class ForgotPasswordResponseDto {
  @ApiProperty()
  forgotPasswordToken: string;
}
