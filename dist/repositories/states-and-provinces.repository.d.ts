import { DefaultCrudRepository } from '@loopback/repository';
import { GbadminDataSource } from '../datasources';
import { StatesAndProvinces, StatesAndProvincesRelations } from '../models';
export declare class StatesAndProvincesRepository extends DefaultCrudRepository<StatesAndProvinces, typeof StatesAndProvinces.prototype.id, StatesAndProvincesRelations> {
    constructor(dataSource: GbadminDataSource);
}
