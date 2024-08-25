import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserActivity } from './entities/user_activities.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserActivityService {
  constructor(
    @InjectRepository(UserActivity)
    private readonly userActivityRepository: Repository<UserActivity>,
  ) {}

  async logActivity(userId: string, activity: string) {
    const userActivity = this.userActivityRepository.create({
      userId,
      activity,
    });
    return await this.userActivityRepository.save(userActivity);
  }
}
