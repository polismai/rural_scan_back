import { Module } from '@nestjs/common';
import { UserActivityService } from './user-activity.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserActivity } from './entities/user_activities.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserActivity])],
  providers: [UserActivityService],
  exports: [UserActivityService],
})
export class UserActivityModule {}
