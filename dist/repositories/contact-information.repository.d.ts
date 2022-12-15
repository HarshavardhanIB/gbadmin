import { DefaultCrudRepository } from '@loopback/repository';
import { GbadminDataSource } from '../datasources';
import { ContactInformation, ContactInformationRelations } from '../models';
export declare class ContactInformationRepository extends DefaultCrudRepository<ContactInformation, typeof ContactInformation.prototype.id, ContactInformationRelations> {
    constructor(dataSource: GbadminDataSource);
}
