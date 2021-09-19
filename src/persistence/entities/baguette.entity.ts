import { DateTime } from 'luxon';
import { BaguetteCondition } from 'persistence/entities/enums/baguetteCondition.enum';
import { BaguetteType } from 'persistence/entities/enums/baguetteType.enum';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class Baguette {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('decimal', { precision: 5, scale: 2 })
  price: number;

  @Column('int', { width: 3 })
  sizeCm: number;

  @Column('enum', { enum: BaguetteType, default: BaguetteType['White'] })
  type: BaguetteType;

  @Column('enum', { enum: BaguetteCondition, default: BaguetteCondition['Hot and fresh'] })
  condition: BaguetteCondition;

  @CreateDateColumn({ type: 'timestamp' })
  bakedAt: DateTime;
}
