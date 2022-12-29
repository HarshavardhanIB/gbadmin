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
  SignupForms,
  BrokerSignupformsPlanlevels,
} from '../models';
import {SignupFormsRepository} from '../repositories';

export class SignupFormsBrokerSignupformsPlanlevelsController {
  constructor(
    @repository(SignupFormsRepository) protected signupFormsRepository: SignupFormsRepository,
  ) { }

  @get('/signup-forms/{id}/broker-signupforms-planlevels', {
    responses: {
      '200': {
        description: 'Array of SignupForms has many BrokerSignupformsPlanlevels',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(BrokerSignupformsPlanlevels)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<BrokerSignupformsPlanlevels>,
  ): Promise<BrokerSignupformsPlanlevels[]> {
    return this.signupFormsRepository.signupFormPlanLevels(id).find(filter);
  }

  @post('/signup-forms/{id}/broker-signupforms-planlevels', {
    responses: {
      '200': {
        description: 'SignupForms model instance',
        content: {'application/json': {schema: getModelSchemaRef(BrokerSignupformsPlanlevels)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof SignupForms.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(BrokerSignupformsPlanlevels, {
            title: 'NewBrokerSignupformsPlanlevelsInSignupForms',
            exclude: ['id'],
            optional: ['form_id']
          }),
        },
      },
    }) brokerSignupformsPlanlevels: Omit<BrokerSignupformsPlanlevels, 'id'>,
  ): Promise<BrokerSignupformsPlanlevels> {
    return this.signupFormsRepository.signupFormPlanLevels(id).create(brokerSignupformsPlanlevels);
  }

  @patch('/signup-forms/{id}/broker-signupforms-planlevels', {
    responses: {
      '200': {
        description: 'SignupForms.BrokerSignupformsPlanlevels PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(BrokerSignupformsPlanlevels, {partial: true}),
        },
      },
    })
    brokerSignupformsPlanlevels: Partial<BrokerSignupformsPlanlevels>,
    @param.query.object('where', getWhereSchemaFor(BrokerSignupformsPlanlevels)) where?: Where<BrokerSignupformsPlanlevels>,
  ): Promise<Count> {
    return this.signupFormsRepository.signupFormPlanLevels(id).patch(brokerSignupformsPlanlevels, where);
  }

  @del('/signup-forms/{id}/broker-signupforms-planlevels', {
    responses: {
      '200': {
        description: 'SignupForms.BrokerSignupformsPlanlevels DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(BrokerSignupformsPlanlevels)) where?: Where<BrokerSignupformsPlanlevels>,
  ): Promise<Count> {
    return this.signupFormsRepository.signupFormPlanLevels(id).delete(where);
  }
}
