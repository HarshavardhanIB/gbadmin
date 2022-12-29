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
  SignupForms,
} from '../models';
import {BrokerRepository} from '../repositories';

export class BrokerSignupFormsController {
  constructor(
    @repository(BrokerRepository) protected brokerRepository: BrokerRepository,
  ) { }

  @get('/brokers/{id}/signup-forms', {
    responses: {
      '200': {
        description: 'Array of Broker has many SignupForms',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(SignupForms)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<SignupForms>,
  ): Promise<SignupForms[]> {
    return this.brokerRepository.signupForms(id).find(filter);
  }

  @post('/brokers/{id}/signup-forms', {
    responses: {
      '200': {
        description: 'Broker model instance',
        content: {'application/json': {schema: getModelSchemaRef(SignupForms)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Broker.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SignupForms, {
            title: 'NewSignupFormsInBroker',
            exclude: ['id'],
            optional: ['broker_id']
          }),
        },
      },
    }) signupForms: Omit<SignupForms, 'id'>,
  ): Promise<SignupForms> {
    return this.brokerRepository.signupForms(id).create(signupForms);
  }

  @patch('/brokers/{id}/signup-forms', {
    responses: {
      '200': {
        description: 'Broker.SignupForms PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SignupForms, {partial: true}),
        },
      },
    })
    signupForms: Partial<SignupForms>,
    @param.query.object('where', getWhereSchemaFor(SignupForms)) where?: Where<SignupForms>,
  ): Promise<Count> {
    return this.brokerRepository.signupForms(id).patch(signupForms, where);
  }

  @del('/brokers/{id}/signup-forms', {
    responses: {
      '200': {
        description: 'Broker.SignupForms DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(SignupForms)) where?: Where<SignupForms>,
  ): Promise<Count> {
    return this.brokerRepository.signupForms(id).delete(where);
  }
}
