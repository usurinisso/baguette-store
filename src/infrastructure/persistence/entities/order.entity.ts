import { Baguette } from 'infrastructure/persistence/entities/baguette.entity';
import { User } from 'infrastructure/persistence/entities/user.entity';
import { FullBaguette } from 'models/baguette';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column()
  deliveryAddress: string;

  @Column({ nullable: true })
  deliveryInfo: string;

  @Column({ default: false })
  delivered: boolean;

  @Column('decimal', { precision: 5, scale: 2 })
  price: number;

  @ManyToOne(() => User, (user) => user.orders, {
    nullable: false,
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete',
  })
  user: User;

  @OneToMany(() => Baguette, (baguette) => baguette.order, {
    nullable: true,
    cascade: ['insert', 'update', 'remove'],
  })
  baguettes: FullBaguette[];

  constructor(deliveryAddress: string, deliveryInfo: string, price: number, user: User, baguettes: FullBaguette[]) {
    this.deliveryAddress = deliveryAddress;
    this.deliveryInfo = deliveryInfo;
    this.price = price;
    this.user = user;
    this.baguettes = baguettes;
  }
}
