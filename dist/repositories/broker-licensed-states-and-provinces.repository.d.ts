import { Getter } from '@loopback/core';
import { DefaultCrudRepository, BelongsToAccessor } from '@loopback/repository';
import { GbadminDataSource } from '../datasources';
import { BrokerLicensedStatesAndProvinces, BrokerLicensedStatesAndProvincesRelations, StatesAndProvinces } from '../models';
import { StatesAndProvincesRepository } from './states-and-provinces.repository';
export declare class BrokerLicensedStatesAndProvincesRepository extends DefaultCrudRepository<BrokerLicensedStatesAndProvinces, typeof BrokerLicensedStatesAndProvinces.prototype.id, BrokerLicensedStatesAndProvincesRelations> {
    protected statesAndProvincesRepositoryGetter: Getter<StatesAndProvincesRepository>;
    readonly stateFullDetails: BelongsToAccessor<StatesAndProvinces, typeof BrokerLicensedStatesAndProvinces.prototype.id>;
    constructor(dataSource: GbadminDataSource, statesAndProvincesRepositoryGetter: Getter<StatesAndProvincesRepository>);
}
