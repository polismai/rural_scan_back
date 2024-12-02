import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
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
  }: CreateUserDto): Promise<User> {
    try {
      const user = username.toLowerCase();
      const userFound = await this.userRepository.findOne({
        where: {
          username: user,
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
        username: user,
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
      const user: User = await this.userRepository.findOneBy({ username: username.toLowerCase() });
      if (!user) {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: 'Usuario no encontrado',
        });
      }
      return user;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  async findByUsernameWithPassword(username: string) {
    try {
      const user: User = await this.userRepository.findOne({
        where: { username: username.toLowerCase() },
        select: ['id', 'username', 'password', 'role', 'fieldId', 'active'],
      });
      
      if (!user) {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: 'Usuario no encontrado',
        });
      }

      if (!user.active) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'El usuario está inactivo y no puede iniciar sesión',
        });
      }

      return user;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  async findUsers(fieldId: string): Promise<User[]> {
    try {
      const users: User[] = await this.userRepository.find({
        relations: ['field'],
        where: {
          field: {
            id: fieldId,
          },
        },
      });

      if (users.length === 0) {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: 'Usuarios no encontrados',
        });
      }
      return users;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  async getUserById(id: string): Promise<User> {
    try {
      const user: User = await this.userRepository.findOneBy({ id });
      if (user) {
        return user;
      } else {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: 'Usuario no encontrado',
        });
      }
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  async updateUser(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UpdateResult> {
    try {
      const user: UpdateResult = await this.userRepository.update(
        id,
        updateUserDto,
      );
      if (user.affected === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'El usuario no se pudo actualizar',
        });
      }
      return user;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  async updatePassword(id: string, newPassword: string): Promise<UpdateResult> {
    try {
      const hashedPassword = await bcryptjs.hash(newPassword, 10);

      const result = await this.userRepository.update(id, {
        password: hashedPassword,
      });

      if (result.affected === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se pudo actualizar la contraseña del usuario',
        });
      }

      return result;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  async deleteUser(id: string): Promise<DeleteResult> {
    try {
      const user: DeleteResult = await this.userRepository.delete(id);
      if (user.affected === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se pudo eliminar el usuario',
        });
      }
      return user;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }
}
