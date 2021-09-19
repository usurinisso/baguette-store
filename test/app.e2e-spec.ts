// import { BadRequestException, INestApplication } from '@nestjs/common';
// import { Test, TestingModule } from '@nestjs/testing';
// import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
// import { BaguettesController } from 'controllers/baguettes.controller';
// import { CreateBaguetteDto } from 'dto/createBaguette.dto';
// import { UpdateBaguetteDto } from 'dto/updateBaguette.dto';
// import { BaguetteCondition } from 'enums/baguetteCondition.enum';
// import { BaguetteType } from 'enums/baguetteType.enum';
// import { DateTime } from 'luxon';
// import { AppModule } from 'modules/app.module';
// import { BaguettesService } from 'services/baguettes.service';
// import request from 'supertest';
// import { DeleteResult, Repository, UpdateResult } from 'typeorm';

// import { Baguette } from '../src/entities/baguette.entity';

// describe('AppController (e2e)', () => {
//   let app: INestApplication;
//   let baguettesRepository: Repository<Baguette>;

//   const baguette = {
//     id: 1,
//     price: 25.0,
//     sizeCm: 20,
//     type: BaguetteType['White'],
//     condition: BaguetteCondition['Fresh'],
//     bakedAt: DateTime.now(),
//   };

//   const createBaguette = {
//     price: 25.0,
//     sizeCm: 20,
//     type: BaguetteType['White'],
//     condition: BaguetteCondition['Fresh'],
//   };

//   const updateBaguette = {
//     price: 99.0,
//     sizeCm: 99,
//     type: BaguetteType['White'],
//   };

//   const getUpdateResult = (): UpdateResult => {
//     return Object.assign(new UpdateResult(), {
//       generatedMaps: [],
//       raw: [],
//       affected: 1,
//     });
//   };

//   const getNoUpdateResult = (): UpdateResult => {
//     return Object.assign(new UpdateResult(), {
//       generatedMaps: [],
//       raw: [],
//       affected: 0,
//     });
//   };

//   const getDeleteResult = (): DeleteResult => {
//     return Object.assign(new DeleteResult(), {
//       raw: [],
//       affected: 1,
//     });
//   };

//   const getNoDeleteResult = (): DeleteResult => {
//     return Object.assign(new DeleteResult(), {
//       raw: [],
//       affected: 0,
//     });
//   };

//   const getBaguette = (): Baguette => {
//     return Object.assign(new Baguette(), baguette);
//   };

//   const getCreateBaguetteDto = (): CreateBaguetteDto => {
//     return Object.assign(new CreateBaguetteDto(), createBaguette);
//   };

//   const getUpdateBaguetteDto = (): UpdateBaguetteDto => {
//     return Object.assign(new UpdateBaguetteDto(), updateBaguette);
//   };

//   beforeEach(async () => {
//     const moduleFixture: TestingModule = await Test.createTestingModule({
//       imports: [
//         AppModule,
//         // TypeOrmModule.forRoot({
//         //   type: 'mysql',
//         //   host: 'localhost',
//         //   username: 'baguette-user',
//         //   password: 'B4guett3-user',
//         //   database: 'test_baguette_db',
//         //   port: 3306,
//         //   entities: [__dirname + '../dist/**/*.entity.js'],
//         //   synchronize: false,
//         //   dropSchema: true,
//         // }),
//       ],
//       // controllers: [BaguettesController],
//       // providers: [
//       //   BaguettesService,
//       //   {
//       //     provide: getRepositoryToken(Baguette),
//       //     useClass: Repository,
//       //   },
//       // ],
//     }).compile();

//     app = moduleFixture.createNestApplication();
//     await app.init();
//     // baguettesRepository = moduleFixture.get('BaguettesRepositoryAccesPoint');
//   });

//   // afterAll(async () => {
//   //   await app.close();
//   // });

//   it('/baguettes (GET 200)', () => {
//     const baguette = getBaguette();
//     jest.spyOn(baguettesRepository, 'find').mockResolvedValueOnce([baguette]);
//     return request(app.getHttpServer())
//       .get('/baguettes')
//       .expect('Content-Type', /json/)
//       .set('Accept', 'application/json')
//       .expect(200)
//       .then((response) => {
//         expect(response.body).toEqual([Object.assign({}, { ...baguette, ...{ bakedAt: baguette.bakedAt.toISO() } })]);
//       });
//   });

//   // it('/baguettes (GET 500)', () => {
//   //   jest.spyOn(baguettesRepository, 'find').mockRejectedValueOnce(new Error());
//   //   return request(app.getHttpServer())
//   //     .get('/baguettes')
//   //     .set('Accept', 'application/json')
//   //     .expect('Content-Type', /json/)
//   //     .expect(500);
//   // });

//   // it('/baguettes/:id (GET 200)', () => {
//   //   const baguette = getBaguette();
//   //   jest.spyOn(baguettesRepository, 'findOne').mockResolvedValueOnce(baguette);
//   //   return request(app.getHttpServer())
//   //     .get(`/baguettes/${1}`)
//   //     .expect('Content-Type', /json/)
//   //     .set('Accept', 'application/json')
//   //     .expect(200)
//   //     .then((response) => {
//   //       expect(response.body).toEqual(Object.assign({}, { ...baguette, ...{ bakedAt: baguette.bakedAt.toISO() } }));
//   //     });
//   // });

//   // it('/baguettes/:id (GET 400)', () => {
//   //   jest.spyOn(baguettesRepository, 'findOne').mockResolvedValueOnce(undefined);
//   //   return request(app.getHttpServer())
//   //     .get(`/baguettes/${'THIS_SHOULD_BE_A_NUMBER'}`)
//   //     .expect('Content-Type', /json/)
//   //     .set('Accept', 'application/json')
//   //     .expect(400);
//   // });

//   // it('/baguettes/:id (GET 404)', () => {
//   //   jest.spyOn(baguettesRepository, 'findOne').mockResolvedValueOnce(undefined);
//   //   return request(app.getHttpServer())
//   //     .get(`/baguettes/${1}`)
//   //     .expect('Content-Type', /json/)
//   //     .set('Accept', 'application/json')
//   //     .expect(404);
//   // });

//   // it('/baguettes/:id (GET 500)', () => {
//   //   jest.spyOn(baguettesRepository, 'findOne').mockRejectedValueOnce(new Error());
//   //   return request(app.getHttpServer())
//   //     .get(`/baguettes/${1}`)
//   //     .set('Accept', 'application/json')
//   //     .expect('Content-Type', /json/)
//   //     .expect(500);
//   // });

//   // it('/baguettes (POST 201)', () => {
//   //   const baguette = getBaguette();
//   //   jest.spyOn(baguettesRepository, 'save').mockResolvedValueOnce(baguette);
//   //   return request(app.getHttpServer())
//   //     .post('/baguettes')
//   //     .set('Accept', 'application/json')
//   //     .expect('Content-Type', /json/)
//   //     .expect(201)
//   //     .then((response) => {
//   //       expect(response.body).toEqual(Object.assign({}, { ...baguette, ...{ bakedAt: baguette.bakedAt.toISO() } }));
//   //     });
//   // });

//   // it('/baguettes (POST 400)', () => {
//   //   const baguette = getCreateBaguetteDto();
//   //   jest.spyOn(baguettesRepository, 'save').mockRejectedValueOnce(new BadRequestException());
//   //   console.log({ ...baguette, ...{ price: 'Haa' } });
//   //   return (
//   //     request(app.getHttpServer())
//   //       .post('/baguettes')
//   //       // .send({ ...baguette, ...{ price: 'Haa' } })
//   //       .set('Accept', 'application/json')
//   //       .expect('Content-Type', /json/)
//   //       .expect(400)
//   //   );
//   // });

//   // it('/baguettes (POST 500)', () => {
//   //   jest.spyOn(baguettesRepository, 'save').mockRejectedValueOnce(new Error());
//   //   return request(app.getHttpServer())
//   //     .post('/baguettes')
//   //     .expect('Content-Type', /json/)
//   //     .set('Accept', 'application/json')
//   //     .expect(500);
//   // });
// });
