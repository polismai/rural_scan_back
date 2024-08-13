import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Company } from 'src/companies/entities/company.entity';
import * as bcryptjs from 'bcryptjs';
import { ErrorManager } from 'src/utils/error.manager';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
  ) {}

  async create({ username, password, company, role, active }: CreateUserDto) {
    try {
      const userFound = await this.userRepository.findOneBy({
        username,
      });

      if (userFound) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'user already exists',
        });
      }

      const companyFound = await this.companyRepository.findOneBy({
        id: company,
      });
      if (!companyFound) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'company not found',
        });
      }

      return await this.userRepository.save({
        username,
        password: await bcryptjs.hash(password, 10),
        company: companyFound,
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
          type: 'BAD_REQUEST',
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
        select: ['id', 'username', 'password', 'role'],
      });
      if (!user) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'userr not found',
        });
      }
      return user;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  async findAll() {
    try {
      const users: User[] = await this.userRepository.find();

      if (users.length === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'users not found',
        });
      }
      return users;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  findOne(id: string) {
    return `This action returns a #${id} user`;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      const userFound = await this.userRepository.findOneBy({ id });

      if (!userFound) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'user not found',
        });
      }

      const updatedUser = Object.assign(userFound, updateUserDto);
      return this.userRepository.save(updatedUser);
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
