import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  BrokerLicensedStatesAndProvinces,
  StatesAndProvinces,
} from '../models';
import {BrokerLicensedStatesAndProvincesRepository} from '../repositories';

export class BrokerLicensedStatesAndProvincesStatesAndProvincesController {
  constructor(
    @repository(BrokerLicensedStatesAndProvincesRepository)
    public brokerLicensedStatesAndProvincesRepository: BrokerLicensedStatesAndProvincesRepository,
  ) { }

  @get('/broker-licensed-states-and-provinces/{id}/states-and-provinces', {
    responses: {
      '200': {
        description: 'StatesAndProvinces belonging to BrokerLicensedStatesAndProvinces',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(StatesAndProvinces)},
          },
        },
      },
    },
  })
  async getStatesAndProvinces(
    @param.path.number('id') id: typeof BrokerLicensedStatesAndProvinces.prototype.id,
  ): Promise<StatesAndProvinces> {
    return this.brokerLicensedStatesAndProvincesRepository.stateFullDetails(id);
  }
}
