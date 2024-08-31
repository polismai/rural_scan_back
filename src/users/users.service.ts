import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcryptjs from 'bcryptjs';
import { ErrorManager } from '../utils/error.manager';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createUser({
    username,
    password,
    fieldId,
    role,
    active,
  }: CreateUserDto) {
    try {
      const userFound = await this.userRepository.findOne({
        where: {
          username,
          fieldId,
        },
      });

      if (userFound) {
        throw new ErrorManager({
          type: 'CONFLICT',
          message: 'user already exists',
        });
      }

      return await this.userRepository.save({
        username,
        password: await bcryptjs.hash(password, 10),
        fieldId,
        role,
        active,
      });
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  async findOneByUsername(username: string) {
    try {
      const user: User = await this.userRepository.findOneBy({ username });
      if (!user) {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: 'user not found',
        });
      }
      return user;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  async findByUsernameWithPassword(username: string) {
    try {
      const user = await this.userRepository.findOne({
        where: { username },
        select: ['id', 'username', 'password', 'role', 'fieldId'],
      });
      if (!user) {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: 'user not found',
        });
      }
      return user;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  async findAll(): Promise<User[]> {
    try {
      const users = await this.userRepository.find({
        relations: ['company'],
      });

      if (users.length === 0) {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: 'users not found',
        });
      }
      return users;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  async getUserById(id: string) {
    return await this.userRepository.findOne({ where: { id } });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      const userFound = await this.userRepository.findOneBy({ id });

      if (!userFound) {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: 'user not found',
        });
      }

      const updatedUser = this.userRepository.merge(userFound, updateUserDto);
      return await this.userRepository.save(updatedUser);
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  async remove(id: string) {
    try {
      const user = await this.userRepository.delete(id);
      if (user.affected === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se pudo eliminar',
        });
      }
      return user;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }
}
