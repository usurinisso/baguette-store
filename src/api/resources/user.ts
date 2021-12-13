import { ApiProperty } from '@nestjs/swagger';
import { FullUser } from 'models/users';
import { RoleType } from 'types/roleType';
export class User {
  @ApiProperty({ type: Number, example: 1 })
  id: number;

  @ApiProperty({ type: String, example: 'John' })
  firstName: string;

  @ApiProperty({ type: String, example: 'Snow' })
  lastName: string;

  @ApiProperty({ type: String, example: 'elma99' })
  userName: string;

  @ApiProperty({ enum: RoleType, example: RoleType.guest })
  roleType?: RoleType;

  constructor(id: number, firstName: string, lastName: string, userName: string, roleType?: RoleType) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.userName = userName;
    this.roleType = roleType;
  }

  public static from(user: FullUser): User {
    return new User(user.id, user.firstName, user.lastName, user.userName);
  }
}
