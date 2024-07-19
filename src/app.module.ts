import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Follower } from './follower/domain/follower.entity';
import { UsersModule } from './users/users.module';
import { User } from './users/domain/user.entity';
import { FollowersModule } from './follower/followers.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'db',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'postgres',
      synchronize: true,
      autoLoadEntities: true,
      entities: [Follower, User],
    }),
    UsersModule,
    FollowersModule,
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
