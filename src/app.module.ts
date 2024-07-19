import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { CacheModule } from '@nestjs/cache-manager';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Follower } from './follower/domain/follower.entity';
import { UsersModule } from './users/users.module';
import { User } from './users/domain/user.entity';
import { FollowersModule } from './follower/followers.module';

@Module({
  imports: [
    CacheModule.register({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'postgres',
      entities: [Follower, User],
      synchronize: true,
    }),
    UsersModule,
    FollowersModule,
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
