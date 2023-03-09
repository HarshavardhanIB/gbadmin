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
Users,
BrokerAdmins,
Broker,
} from '../models';
import {UsersRepository} from '../repositories';

export class UsersBrokerController {
  constructor(
    @repository(UsersRepository) protected usersRepository: UsersRepository,
  ) { }

  @get('/users/{id}/brokers', {
    responses: {
      '200': {
        description: 'Array of Users has many Broker through BrokerAdmins',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Broker)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Broker>,
  ): Promise<Broker[]> {
    return this.usersRepository.broker(id).find(filter);
  }

  @post('/users/{id}/brokers', {
    responses: {
      '200': {
        description: 'create a Broker model instance',
        content: {'application/json': {schema: getModelSchemaRef(Broker)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Users.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Broker, {
            title: 'NewBrokerInUsers',
            exclude: ['id'],
          }),
        },
      },
    }) broker: Omit<Broker, 'id'>,
  ): Promise<Broker> {
    return this.usersRepository.broker(id).create(broker);
  }

  @patch('/users/{id}/brokers', {
    responses: {
      '200': {
        description: 'Users.Broker PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Broker, {partial: true}),
        },
      },
    })
    broker: Partial<Broker>,
    @param.query.object('where', getWhereSchemaFor(Broker)) where?: Where<Broker>,
  ): Promise<Count> {
    return this.usersRepository.broker(id).patch(broker, where);
  }

  @del('/users/{id}/brokers', {
    responses: {
      '200': {
        description: 'Users.Broker DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Broker)) where?: Where<Broker>,
  ): Promise<Count> {
    return this.usersRepository.broker(id).delete(where);
  }
}
