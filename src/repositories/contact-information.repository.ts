import { inject } from '@loopback/core';
import { DefaultCrudRepository } from '@loopback/repository';
import { GbadminDataSource } from '../datasources';
import { ContactInformation, ContactInformationRelations } from '../models';

export class ContactInformationRepository extends DefaultCrudRepository<
  ContactInformation,
  typeof ContactInformation.prototype.id,
  ContactInformationRelations
> {
  constructor(
    @inject('datasources.gbadmin') dataSource: GbadminDataSource,
  ) {
    super(ContactInformation, dataSource);
  }
}
