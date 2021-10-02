import { DateTime } from 'luxon';
import { BaguetteCondition } from 'types/baguetteCondition';
import { BaguetteType } from 'types/baguetteType';

export interface FullBaguette {
  id: number;

  price: number;

  sizeCm: number;

  type: BaguetteType;

  condition: BaguetteCondition;

  bakedAt: DateTime;
}
