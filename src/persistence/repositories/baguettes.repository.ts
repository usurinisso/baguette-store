import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaguetteDto } from 'dto/baguette.dto';
import { CreateBaguetteDto } from 'dto/createBaguette.dto';
import { UpdateBaguetteDto } from 'dto/updateBaguette.dto';
import { Baguette } from 'persistence/entities/baguette.entity';
import { DeleteResult, FindManyOptions, Repository, UpdateResult } from 'typeorm';

@Injectable()
export class BaguettesRepositoryAccesPoint {
  constructor(
    @InjectRepository(Baguette)
    private readonly baguettesRepository: Repository<Baguette>,
  ) {}
  private readonly logger = new Logger(BaguettesRepositoryAccesPoint.name);

  async findAllEntities(): Promise<BaguetteDto[]> {
    this.logger.debug('Repository findAllEntities()');
    return await this.baguettesRepository.find();
  }

  async findOneEntity(id: number): Promise<BaguetteDto> {
    this.logger.debug('Repository findOneEntity() id - ' + id);
    return await this.baguettesRepository.findOne(id);
  }

  async findSpecificEntity(options: FindManyOptions<BaguetteDto>): Promise<BaguetteDto[]> {
    return await this.baguettesRepository.find(options);
  }

  async createEntity(baguette: CreateBaguetteDto): Promise<BaguetteDto> {
    this.logger.debug('Repository save()');
    return await this.baguettesRepository.save(baguette);
  }

  async updateEntiy(id: number | number[], baguette: UpdateBaguetteDto): Promise<UpdateResult> {
    this.logger.debug('Repository update() id - ' + id, baguette);
    return await this.baguettesRepository.update(id, baguette);
  }

  async deleteEntity(id: number): Promise<DeleteResult> {
    this.logger.debug('Repository deleteEntity() id - ' + id);
    return await this.baguettesRepository.delete(id);
  }
}
