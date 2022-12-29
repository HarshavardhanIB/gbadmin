import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Broker,
  BrokerLicensedStatesAndProvinces,
} from '../models';
import {BrokerRepository} from '../repositories';

export class BrokerBrokerLicensedStatesAndProvincesController {
  constructor(
    @repository(BrokerRepository) protected brokerRepository: BrokerRepository,
  ) { }

  @get('/brokers/{id}/broker-licensed-states-and-provinces', {
    responses: {
      '200': {
        description: 'Array of Broker has many BrokerLicensedStatesAndProvinces',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(BrokerLicensedStatesAndProvinces)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<BrokerLicensedStatesAndProvinces>,
  ): Promise<BrokerLicensedStatesAndProvinces[]> {
    return this.brokerRepository.brokerLicensedStatesAndProvinces(id).find(filter);
  }

  @post('/brokers/{id}/broker-licensed-states-and-provinces', {
    responses: {
      '200': {
        description: 'Broker model instance',
        content: {'application/json': {schema: getModelSchemaRef(BrokerLicensedStatesAndProvinces)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Broker.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(BrokerLicensedStatesAndProvinces, {
            title: 'NewBrokerLicensedStatesAndProvincesInBroker',
            exclude: ['id'],
            optional: ['broker_id']
          }),
        },
      },
    }) brokerLicensedStatesAndProvinces: Omit<BrokerLicensedStatesAndProvinces, 'id'>,
  ): Promise<BrokerLicensedStatesAndProvinces> {
    return this.brokerRepository.brokerLicensedStatesAndProvinces(id).create(brokerLicensedStatesAndProvinces);
  }

  @patch('/brokers/{id}/broker-licensed-states-and-provinces', {
    responses: {
      '200': {
        description: 'Broker.BrokerLicensedStatesAndProvinces PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(BrokerLicensedStatesAndProvinces, {partial: true}),
        },
      },
    })
    brokerLicensedStatesAndProvinces: Partial<BrokerLicensedStatesAndProvinces>,
    @param.query.object('where', getWhereSchemaFor(BrokerLicensedStatesAndProvinces)) where?: Where<BrokerLicensedStatesAndProvinces>,
  ): Promise<Count> {
    return this.brokerRepository.brokerLicensedStatesAndProvinces(id).patch(brokerLicensedStatesAndProvinces, where);
  }

  @del('/brokers/{id}/broker-licensed-states-and-provinces', {
    responses: {
      '200': {
        description: 'Broker.BrokerLicensedStatesAndProvinces DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(BrokerLicensedStatesAndProvinces)) where?: Where<BrokerLicensedStatesAndProvinces>,
  ): Promise<Count> {
    return this.brokerRepository.brokerLicensedStatesAndProvinces(id).delete(where);
  }
}
