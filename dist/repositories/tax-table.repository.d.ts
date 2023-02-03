import { DefaultCrudRepository } from '@loopback/repository';
import { GroupBenefitzDataSource } from '../datasources';
import { TaxTable, TaxTableRelations } from '../models';
export declare class TaxTableRepository extends DefaultCrudRepository<TaxTable, typeof TaxTable.prototype.id, TaxTableRelations> {
    constructor(dataSource: GroupBenefitzDataSource);
}
