import { Follower } from 'src/follower/domain/follower.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @OneToMany((type) => Follower, (follower) => follower.followee)
  followers: Follower[];

  @OneToMany((type) => Follower, (follower) => follower.follower)
  following: Follower[];
}
