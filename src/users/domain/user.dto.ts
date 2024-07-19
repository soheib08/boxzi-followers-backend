import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'username' })
  username: string;
}

export class UserDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'username' })
  username: string;

  @ApiProperty({ isArray: true, example: [{ id: 1, username: 'username' }] })
  followers: Array<{ id: number; username: string }>;

  @ApiProperty({ isArray: true, example: [{ id: 2, username: 'username' }] })
  followings: Array<{ id: number; username: string }>;
}
