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
  Users,
} from '../models';
import {BrokerRepository} from '../repositories';

export class BrokerUsersController {
  constructor(
    @repository(BrokerRepository) protected brokerRepository: BrokerRepository,
  ) { }

  @get('/brokers/{id}/users', {
    responses: {
      '200': {
        description: 'Broker has one Users',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Users),
          },
        },
      },
    },
  })
  async get(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Users>,
  ): Promise<Users> {
    return this.brokerRepository.users(id).get(filter);
  }

  @post('/brokers/{id}/users', {
    responses: {
      '200': {
        description: 'Broker model instance',
        content: {'application/json': {schema: getModelSchemaRef(Users)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Broker.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Users, {
            title: 'NewUsersInBroker',
            exclude: ['id'],
            optional: ['id']
          }),
        },
      },
    }) users: Omit<Users, 'id'>,
  ): Promise<Users> {
    return this.brokerRepository.users(id).create(users);
  }

  @patch('/brokers/{id}/users', {
    responses: {
      '200': {
        description: 'Broker.Users PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Users, {partial: true}),
        },
      },
    })
    users: Partial<Users>,
    @param.query.object('where', getWhereSchemaFor(Users)) where?: Where<Users>,
  ): Promise<Count> {
    return this.brokerRepository.users(id).patch(users, where);
  }

  @del('/brokers/{id}/users', {
    responses: {
      '200': {
        description: 'Broker.Users DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Users)) where?: Where<Users>,
  ): Promise<Count> {
    return this.brokerRepository.users(id).delete(where);
  }
}
