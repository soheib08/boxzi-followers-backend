import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './domain/user.dto';
import { UsersListService } from './query/userList.service';
import { CreateUserService } from './command/createUser.service';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(
    private readonly usersListService: UsersListService,
    private readonly createUserService: CreateUserService,
  ) {}

  @Get()
  @ApiOperation({ description: 'Get all users', summary: 'Get all users' })
  async findAll() {
    return this.usersListService.execute();
  }

  @Post()
  @ApiOperation({
    description: 'Create a new user',
    summary: 'Create a new user',
  })
  async create(@Body() body: CreateUserDto) {
    return this.createUserService.execute(body);
  }
}
