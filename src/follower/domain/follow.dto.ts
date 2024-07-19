import { ApiProperty } from '@nestjs/swagger';

export class FollowDto {
  @ApiProperty({ example: 1 })
  followerId: number;

  @ApiProperty({ example: 1 })
  followeeId: number;
}

export class UnfollowDto {
  @ApiProperty({ example: 1 })
  followerId: number;

  @ApiProperty({ example: 2 })
  followeeId: number;
}
