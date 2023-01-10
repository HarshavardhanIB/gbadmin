import { DefaultCrudRepository } from '@loopback/repository';
import { GbadminDataSource } from '../datasources';
import { TaxTable, TaxTableRelations } from '../models';
export declare class TaxTableRepository extends DefaultCrudRepository<TaxTable, typeof TaxTable.prototype.id, TaxTableRelations> {
    constructor(dataSource: GbadminDataSource);
}
