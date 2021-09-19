import { BadRequestException, HttpStatus, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AllExceptionsFilter } from 'handlers/all-exceptions.filter';

describe('System header validation service', () => {
  let service: AllExceptionsFilter;

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [AllExceptionsFilter],
    }).compile();

    service = module.get<AllExceptionsFilter>(AllExceptionsFilter);
  });

  describe('All exception filter tests', () => {
    const requestParams = {
      url: '/haaa',
      method: 'POST',
    };

    const mockJson = jest.fn();
    const mockStatus = jest.fn().mockImplementation(() => ({
      json: mockJson,
    }));
    const mockGetResponse = jest.fn().mockImplementation(() => ({
      status: mockStatus,
    }));
    const mockGetRequest = jest
      .fn()
      .mockImplementationOnce(() => requestParams)
      .mockImplementation(() => undefined);
    const mockHttpArgumentsHost = jest.fn().mockImplementation(() => ({
      getResponse: mockGetResponse,
      getRequest: mockGetRequest,
    }));
    const mockArgumentsHost = {
      switchToHttp: mockHttpArgumentsHost,
      getArgByIndex: jest.fn(),
      getArgs: jest.fn(),
      getType: jest.fn(),
      switchToRpc: jest.fn(),
      switchToWs: jest.fn(),
    };

    it('should be defined', () => {
      expect(service).toBeDefined();
    });

    it('Bad Request on PATCH exception', () => {
      const responseJson = {
        error: 'BadRequestException',
        message: 'Patch must contain at least one updatable field',
        path: '/haaa',
        statusCode: 400,
        timestamp: expect.any(String),
      };
      const responseStatus = HttpStatus.BAD_REQUEST;

      service.catch(new BadRequestException('Patch must contain at least one updatable field'), mockArgumentsHost);

      expect(mockHttpArgumentsHost).toBeCalledTimes(1);
      expect(mockHttpArgumentsHost).toBeCalledWith();
      expect(mockGetResponse).toBeCalledTimes(1);
      expect(mockGetResponse).toBeCalledWith();
      expect(mockGetRequest).toBeCalledTimes(1);
      expect(mockGetRequest).toBeCalledWith();
      expect(mockStatus).toBeCalledTimes(1);
      expect(mockStatus).toBeCalledWith(responseStatus);
      expect(mockJson).toBeCalledTimes(1);
      expect(mockJson).toBeCalledWith(responseJson);
    });

    it('Bad Request on invalid parameters exception', () => {
      const responseJson = {
        error: 'BadRequestException',
        message: expect.any(Array),
        statusCode: 400,
        timestamp: expect.any(String),
      };
      const responseStatus = HttpStatus.BAD_REQUEST;

      service.catch(new BadRequestException([{ constraints: ['Price must be defined'] }]), mockArgumentsHost);

      expect(mockHttpArgumentsHost).toBeCalledTimes(1);
      expect(mockHttpArgumentsHost).toBeCalledWith();
      expect(mockGetResponse).toBeCalledTimes(1);
      expect(mockGetResponse).toBeCalledWith();
      expect(mockGetRequest).toBeCalledTimes(1);
      expect(mockGetRequest).toBeCalledWith();
      expect(mockStatus).toBeCalledTimes(1);
      expect(mockStatus).toBeCalledWith(responseStatus);
      expect(mockJson).toBeCalledTimes(1);
      expect(mockJson).toBeCalledWith(responseJson);
    });

    it('Not Found exception', () => {
      const responseJson = {
        error: 'NotFoundException',
        message: 'Not Found',
        statusCode: 404,
        timestamp: expect.any(String),
      };
      const responseStatus = HttpStatus.NOT_FOUND;

      service.catch(new NotFoundException(), mockArgumentsHost);

      expect(mockHttpArgumentsHost).toBeCalledTimes(1);
      expect(mockHttpArgumentsHost).toBeCalledWith();
      expect(mockGetResponse).toBeCalledTimes(1);
      expect(mockGetResponse).toBeCalledWith();
      expect(mockGetRequest).toBeCalledTimes(1);
      expect(mockGetRequest).toBeCalledWith();
      expect(mockStatus).toBeCalledTimes(1);
      expect(mockStatus).toBeCalledWith(responseStatus);
      expect(mockJson).toBeCalledTimes(1);
      expect(mockJson).toBeCalledWith(responseJson);
    });

    it('Unknown error', () => {
      const responseJson = {
        error: 'Internal Server Error',
        message: 'Oops! We might be having technical issues at the moment, try again later',
        statusCode: 500,
        timestamp: expect.any(String),
      };
      const responseStatus = HttpStatus.INTERNAL_SERVER_ERROR;

      service.catch(new Error(), mockArgumentsHost);

      expect(mockHttpArgumentsHost).toBeCalledTimes(1);
      expect(mockHttpArgumentsHost).toBeCalledWith();
      expect(mockGetResponse).toBeCalledTimes(1);
      expect(mockGetResponse).toBeCalledWith();
      expect(mockGetRequest).toBeCalledTimes(1);
      expect(mockGetRequest).toBeCalledWith();
      expect(mockStatus).toBeCalledTimes(1);
      expect(mockStatus).toBeCalledWith(responseStatus);
      expect(mockJson).toBeCalledTimes(1);
      expect(mockJson).toBeCalledWith(responseJson);
    });

    it('Not Found exception', () => {
      const responseJson = {
        error: 'NotFoundException',
        message: 'Not Found',
        statusCode: 404,
        timestamp: expect.any(String),
      };
      const responseStatus = HttpStatus.NOT_FOUND;

      service.catch(new NotFoundException(), mockArgumentsHost);

      expect(mockHttpArgumentsHost).toBeCalledTimes(1);
      expect(mockHttpArgumentsHost).toBeCalledWith();
      expect(mockGetResponse).toBeCalledTimes(1);
      expect(mockGetResponse).toBeCalledWith();
      expect(mockGetRequest).toBeCalledTimes(1);
      expect(mockGetRequest).toBeCalledWith();
      expect(mockStatus).toBeCalledTimes(1);
      expect(mockStatus).toBeCalledWith(responseStatus);
      expect(mockJson).toBeCalledTimes(1);
      expect(mockJson).toBeCalledWith(responseJson);
    });
  });
});
