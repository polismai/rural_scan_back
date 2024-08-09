import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Company } from 'src/companies/entities/company.entity';
import * as bcryptjs from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
  ) {}

  async create({ username, password, company, role, active }: CreateUserDto) {
    const userFound = await this.userRepository.findOneBy({
      username,
    });

    if (userFound) {
      throw new BadRequestException('User already exists');
    }

    const companyFound = await this.companyRepository.findOneBy({
      id: company,
    });
    if (!companyFound) {
      throw new BadRequestException('Company not found');
    }

    return await this.userRepository.save({
      username,
      password: await bcryptjs.hash(password, 10),
      company: companyFound,
      role,
      active,
    });
  }

  findOneByUsername(username: string) {
    return this.userRepository.findOneBy({ username });
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const userFound = await this.userRepository.findOneBy({ id });

    if (!userFound) {
      throw new BadRequestException('user not found');
    }

    const updatedUser = Object.assign(userFound, updateUserDto);
    return this.userRepository.save(updatedUser);
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
