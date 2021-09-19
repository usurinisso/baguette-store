import { BaguetteDto } from 'api/dto/baguette.dto';
import { CreateBaguetteDto } from 'dto/createBaguette.dto';
import { UpdateBaguetteDto } from 'dto/updateBaguette.dto';
import { DateTime } from 'luxon';
import { BaguetteCondition } from 'persistence/entities/enums/baguetteCondition.enum';
import { BaguetteType } from 'persistence/entities/enums/baguetteType.enum';

const baguette = {
  id: 1,
  price: 25.0,
  sizeCm: 20,
  type: BaguetteType['White'],
  condition: BaguetteCondition['Fresh'],
  bakedAt: DateTime.now(),
};

const createBaguette = {
  price: 25.0,
  sizeCm: 20,
  type: BaguetteType['White'],
  condition: BaguetteCondition['Fresh'],
};

const updateBaguette = {
  price: 99.0,
  sizeCm: 99,
  type: BaguetteType['White'],
};

const getBaguette = (): BaguetteDto => {
  return Object.assign(new BaguetteDto(), baguette);
};

const getCreateBaguetteDto = (): CreateBaguetteDto => {
  return Object.assign(new CreateBaguetteDto(), createBaguette);
};

const getUpdateBaguetteDto = (): UpdateBaguetteDto => {
  return Object.assign(new UpdateBaguetteDto(), updateBaguette);
};

export { getBaguette, getCreateBaguetteDto, getUpdateBaguetteDto };
