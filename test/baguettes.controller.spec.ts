import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Baguette } from 'entities/baguette.entity';
import { BaguettesRepositoryAccesPoint } from 'repositories/baguettes.repository';
import { Repository } from 'typeorm';

import { BaguettesController } from '../src/api/controllers/baguettes.controller';
import { BaguettesService } from '../src/domain/services/baguettes.service';
import { getBaguette, getCreateBaguetteDto, getUpdateBaguetteDto } from './stubs/baguette.stub';
import { getDeleteResult, getNoDeleteResult, getNoUpdateResult, getUpdateResult } from './stubs/result.stub';

describe('BaguettesController', () => {
  let baguettesController: BaguettesController;
  let baguettesRepository: Repository<Baguette>;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [BaguettesController],
      providers: [
        BaguettesService,
        BaguettesRepositoryAccesPoint,
        {
          provide: getRepositoryToken(Baguette),
          useClass: Repository,
        },
      ],
    }).compile();

    baguettesController = moduleRef.get<BaguettesController>(BaguettesController);
    baguettesRepository = moduleRef.get<Repository<Baguette>>(getRepositoryToken(Baguette));
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(baguettesController).toBeDefined();
  });

  describe('GET(:id)', () => {
    it('should get specified baguette', () => {
      const returnValue = getBaguette();

      jest.spyOn(baguettesRepository, 'findOne').mockResolvedValueOnce(returnValue);
      const result = baguettesController.getOne(1);

      return expect(result).resolves.toEqual(returnValue);
    });
    it('should try to get a specified baguette and throw 404', () => {
      const rejectValue = new NotFoundException('Baguette resource not found');

      jest.spyOn(baguettesRepository, 'findOne').mockResolvedValueOnce(undefined);
      const result = baguettesController.getOne(1);

      return expect(result).rejects.toEqual(rejectValue);
    });
    it('should try to get a specified baguette and throw error', () => {
      const rejectError = new Error();

      jest.spyOn(baguettesRepository, 'findOne').mockRejectedValueOnce(rejectError);
      const result = baguettesController.getOne(1);

      return expect(result).rejects.toEqual(rejectError);
    });
  });

  describe('GET()', () => {
    it('should get all baguettes', () => {
      const returnValue = [getBaguette()];

      jest.spyOn(baguettesRepository, 'find').mockResolvedValueOnce(returnValue);
      const result = baguettesController.getAll();

      return expect(result).resolves.toEqual(returnValue);
    });

    it('should try to get all baguettes and throw error', () => {
      const rejectValue = new Error();

      jest.spyOn(baguettesRepository, 'find').mockRejectedValueOnce(rejectValue);
      const result = baguettesController.getAll();

      return expect(result).rejects.toEqual(rejectValue);
    });
  });

  describe('POST()', () => {
    it('should create a baguette', () => {
      const returnValue = getBaguette();
      const postBaguette = getCreateBaguetteDto();

      jest.spyOn(baguettesRepository, 'save').mockResolvedValueOnce(returnValue);
      const result = baguettesController.post(postBaguette);

      return expect(result).resolves.toEqual(returnValue);
    });
    it('should try to create a baguette and throw error', () => {
      const rejectValue = new Error();
      const postBaguette = getCreateBaguetteDto();

      jest.spyOn(baguettesRepository, 'save').mockRejectedValueOnce(rejectValue);
      const result = baguettesController.post(postBaguette);

      return expect(result).rejects.toEqual(rejectValue);
    });
  });

  describe('PATCH(:id)', () => {
    it('should update a baguette', () => {
      const returnValue = getUpdateResult();
      const patchBaguette = getUpdateBaguetteDto();

      jest.spyOn(baguettesRepository, 'update').mockResolvedValueOnce(returnValue);
      const result = baguettesController.patch(2, patchBaguette);

      return expect(result).resolves.toEqual(returnValue);
    });

    it('should try to update a baguette and throw 404', () => {
      const returnValue = getNoUpdateResult();
      const patchBaguette = getUpdateBaguetteDto();
      const rejectError = new NotFoundException('Baguette resource not found');

      jest.spyOn(baguettesRepository, 'update').mockResolvedValueOnce(returnValue);
      const result = baguettesController.patch(2, patchBaguette);

      return expect(result).rejects.toEqual(rejectError);
    });

    it('should try to update a baguette and throw 400', () => {
      const messageText = 'Patch must contain at least one updatable field';

      try {
        baguettesController.patch(1, {});
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        expect(error).toHaveProperty('message', messageText);
      }
    });

    it('should try to update a baguette and throw error', () => {
      const rejectValue = new Error();
      const patchBaguette = getUpdateBaguetteDto();

      jest.spyOn(baguettesRepository, 'update').mockRejectedValueOnce(rejectValue);
      const result = baguettesController.patch(2, patchBaguette);

      return expect(result).rejects.toEqual(rejectValue);
    });
  });

  describe('DELETE(:id)', () => {
    it('should delete a baguette', () => {
      const returnValue = getDeleteResult();

      jest.spyOn(baguettesRepository, 'delete').mockResolvedValueOnce(returnValue);
      const result = baguettesController.delete(1);

      return expect(result).resolves.toEqual(returnValue);
    });

    it('should try to update a baguette and throw 404', () => {
      const returnValue = getNoDeleteResult();
      const rejectError = new NotFoundException('Baguette resource not found');

      jest.spyOn(baguettesRepository, 'delete').mockResolvedValueOnce(returnValue);
      const result = baguettesController.delete(1);

      return expect(result).rejects.toEqual(rejectError);
    });

    it('should try to update a baguette and throw error', () => {
      const rejectError = new Error();

      jest.spyOn(baguettesRepository, 'delete').mockRejectedValueOnce(rejectError);
      const result = baguettesController.delete(1);

      return expect(result).rejects.toEqual(rejectError);
    });
  });

  describe('PUT(:id)', () => {
    it('should replace or create a baguette', () => {
      const returnValue = getBaguette();
      const putBaguette = getCreateBaguetteDto();

      jest.spyOn(baguettesRepository, 'merge').mockReturnValueOnce(returnValue);
      jest.spyOn(baguettesRepository, 'save').mockResolvedValueOnce(returnValue);
      const result = baguettesController.put(1, putBaguette);

      return expect(result).resolves.toEqual(returnValue);
    });

    it('should try to create a baguette and throw error', () => {
      const returnValue = getBaguette();
      const rejectError = new Error();
      const putBaguette = getCreateBaguetteDto();

      jest.spyOn(baguettesRepository, 'merge').mockReturnValueOnce(returnValue);
      jest.spyOn(baguettesRepository, 'save').mockRejectedValueOnce(rejectError);
      const result = baguettesController.put(1, putBaguette);

      return expect(result).rejects.toEqual(rejectError);
    });
  });
});
