import { Baguette } from 'infrastructure/persistence/entities/baguette.entity';
import { User } from 'infrastructure/persistence/entities/user.entity';
import { FullBaguette } from 'models/baguette';
import { Entity, ManyToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class Cart {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @OneToOne(() => User, (user) => user.cart)
  user: User;

  @ManyToMany(() => Baguette, (baguette) => baguette.carts, {
    nullable: true,
    cascade: ['insert', 'update', 'remove'],
  })
  baguettes?: FullBaguette[];

  constructor(user?: User, baguettes?: FullBaguette[]) {
    this.user = user;
    this.baguettes = baguettes;
  }
}
