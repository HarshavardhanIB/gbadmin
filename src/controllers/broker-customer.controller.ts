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
  Customer,
} from '../models';
import {BrokerRepository} from '../repositories';

export class BrokerCustomerController {
  constructor(
    @repository(BrokerRepository) protected brokerRepository: BrokerRepository,
  ) { }

  @get('/brokers/{id}/customers', {
    responses: {
      '200': {
        description: 'Array of Broker has many Customer',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Customer)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Customer>,
  ): Promise<Customer[]> {
    return this.brokerRepository.customers(id).find(filter);
  }

  @post('/brokers/{id}/customers', {
    responses: {
      '200': {
        description: 'Broker model instance',
        content: {'application/json': {schema: getModelSchemaRef(Customer)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Broker.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Customer, {
            title: 'NewCustomerInBroker',
            exclude: ['id'],
            optional: ['broker_id']
          }),
        },
      },
    }) customer: Omit<Customer, 'id'>,
  ): Promise<Customer> {
    return this.brokerRepository.customers(id).create(customer);
  }

  @patch('/brokers/{id}/customers', {
    responses: {
      '200': {
        description: 'Broker.Customer PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Customer, {partial: true}),
        },
      },
    })
    customer: Partial<Customer>,
    @param.query.object('where', getWhereSchemaFor(Customer)) where?: Where<Customer>,
  ): Promise<Count> {
    return this.brokerRepository.customers(id).patch(customer, where);
  }

  @del('/brokers/{id}/customers', {
    responses: {
      '200': {
        description: 'Broker.Customer DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Customer)) where?: Where<Customer>,
  ): Promise<Count> {
    return this.brokerRepository.customers(id).delete(where);
  }
}
