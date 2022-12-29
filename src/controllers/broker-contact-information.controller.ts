import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Broker,
  ContactInformation,
} from '../models';
import {BrokerRepository} from '../repositories';

export class BrokerContactInformationController {
  constructor(
    @repository(BrokerRepository)
    public brokerRepository: BrokerRepository,
  ) { }

  @get('/brokers/{id}/contact-information', {
    responses: {
      '200': {
        description: 'ContactInformation belonging to Broker',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(ContactInformation)},
          },
        },
      },
    },
  })
  async getContactInformation(
    @param.path.number('id') id: typeof Broker.prototype.id,
  ): Promise<ContactInformation> {
    return this.brokerRepository.contactInfo(id);
  }
}
