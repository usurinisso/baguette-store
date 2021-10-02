import { Abstract, FactoryProvider, Module } from '@nestjs/common';
import { Type } from '@nestjs/common/interfaces/type.interface';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BaguettesController } from 'api/controllers/baguettes.controller';
import { BaguetteRepository } from 'infrastructure/persistence/repositories/baguettes.repository';
import { BaguetteService } from 'services/baguette';

@Module({
  imports: [ConfigModule.forRoot(), TypeOrmModule.forRoot(), TypeOrmModule.forFeature([BaguetteRepository])],
  providers: [factory(BaguetteService, [BaguetteRepository])],
  controllers: [BaguettesController],
})
export class AppModule {}

// eslint-disable-next-line @typescript-eslint/ban-types
type Deps = Array<Type<unknown> | string | symbol | Abstract<unknown> | Function>;

function factory<T>(Clazz: Type<T>, deps: Deps): FactoryProvider<T> {
  return {
    provide: Clazz,
    useFactory: (...args) => new Clazz(...args),
    inject: deps,
  };
}
