import { Logger } from '@nestjs/common';
import { CreateUser, UpdateUser, Users } from 'capabilities/users';
import { UserInUseError } from 'exceptions/user-in-use';
import { FullUser, UserWithCartAndOrders } from 'models/users';

export class UserService {
  constructor(private readonly users: Users) {}
  private readonly logger = new Logger();

  async deleteUser(id: number): Promise<void> {
    this.logger.debug('Service deleteUser() id - ' + id);

    await this.users.deleteEntity(id);
  }

  async updateUser(id: number, user: UpdateUser): Promise<FullUser> {
    this.logger.debug('Service updateUser() id - ' + id, user);

    return await this.users.updateEntity(id, user);
  }

  async createUser(user: CreateUser): Promise<FullUser> {
    this.logger.debug('Service createUser()');
    try {
      const existing = await this.users.findOneEntityByName(user.userName);
      if (existing) {
        throw new UserInUseError();
      }
    } catch (err) {
      return await this.users.createEntity(user);
    }
  }

  async findOneUser(id: number): Promise<UserWithCartAndOrders> {
    this.logger.debug('Service findOneUser() id - ' + id);
    return await this.users.findOneEntity(id);
  }

  async findOneByName(username: string): Promise<UserWithCartAndOrders> {
    this.logger.debug('Service findOneEntityByName() username - ' + username);
    return await this.users.findOneEntityByName(username);
  }

  async findAllUsers(): Promise<FullUser[]> {
    this.logger.debug('Service findAllUsers()');

    return await this.users.findAllEntities();
  }
}
