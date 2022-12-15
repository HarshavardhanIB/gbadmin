import { DefaultCrudRepository } from '@loopback/repository';
import { GbadminDataSource } from '../datasources';
import { BrokerLicensedStatesAndProvinces, BrokerLicensedStatesAndProvincesRelations } from '../models';
export declare class BrokerLicensedStatesAndProvincesRepository extends DefaultCrudRepository<BrokerLicensedStatesAndProvinces, typeof BrokerLicensedStatesAndProvinces.prototype.id, BrokerLicensedStatesAndProvincesRelations> {
    constructor(dataSource: GbadminDataSource);
}
