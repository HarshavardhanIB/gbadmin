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
  BrokerEoInsurance,
} from '../models';
import {BrokerRepository} from '../repositories';

export class BrokerBrokerEoInsuranceController {
  constructor(
    @repository(BrokerRepository) protected brokerRepository: BrokerRepository,
  ) { }

  @get('/brokers/{id}/broker-eo-insurance', {
    responses: {
      '200': {
        description: 'Broker has one BrokerEoInsurance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(BrokerEoInsurance),
          },
        },
      },
    },
  })
  async get(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<BrokerEoInsurance>,
  ): Promise<BrokerEoInsurance> {
    return this.brokerRepository.brokerEoInsurance(id).get(filter);
  }

  @post('/brokers/{id}/broker-eo-insurance', {
    responses: {
      '200': {
        description: 'Broker model instance',
        content: {'application/json': {schema: getModelSchemaRef(BrokerEoInsurance)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Broker.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(BrokerEoInsurance, {
            title: 'NewBrokerEoInsuranceInBroker',
            exclude: ['id'],
            optional: ['broker_id']
          }),
        },
      },
    }) brokerEoInsurance: Omit<BrokerEoInsurance, 'id'>,
  ): Promise<BrokerEoInsurance> {
    return this.brokerRepository.brokerEoInsurance(id).create(brokerEoInsurance);
  }

  @patch('/brokers/{id}/broker-eo-insurance', {
    responses: {
      '200': {
        description: 'Broker.BrokerEoInsurance PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(BrokerEoInsurance, {partial: true}),
        },
      },
    })
    brokerEoInsurance: Partial<BrokerEoInsurance>,
    @param.query.object('where', getWhereSchemaFor(BrokerEoInsurance)) where?: Where<BrokerEoInsurance>,
  ): Promise<Count> {
    return this.brokerRepository.brokerEoInsurance(id).patch(brokerEoInsurance, where);
  }

  @del('/brokers/{id}/broker-eo-insurance', {
    responses: {
      '200': {
        description: 'Broker.BrokerEoInsurance DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(BrokerEoInsurance)) where?: Where<BrokerEoInsurance>,
  ): Promise<Count> {
    return this.brokerRepository.brokerEoInsurance(id).delete(where);
  }
}
