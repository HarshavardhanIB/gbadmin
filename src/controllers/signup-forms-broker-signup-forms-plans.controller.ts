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
  BrokerSignupFormsPlans,
} from '../models';
import {SignupFormsRepository} from '../repositories';

export class SignupFormsBrokerSignupFormsPlansController {
  constructor(
    @repository(SignupFormsRepository) protected signupFormsRepository: SignupFormsRepository,
  ) { }

  @get('/signup-forms/{id}/broker-signup-forms-plans', {
    responses: {
      '200': {
        description: 'Array of SignupForms has many BrokerSignupFormsPlans',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(BrokerSignupFormsPlans)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<BrokerSignupFormsPlans>,
  ): Promise<BrokerSignupFormsPlans[]> {
    return this.signupFormsRepository.brokerSignupFormsPlans(id).find(filter);
  }

  @post('/signup-forms/{id}/broker-signup-forms-plans', {
    responses: {
      '200': {
        description: 'SignupForms model instance',
        content: {'application/json': {schema: getModelSchemaRef(BrokerSignupFormsPlans)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof SignupForms.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(BrokerSignupFormsPlans, {
            title: 'NewBrokerSignupFormsPlansInSignupForms',
            exclude: ['id'],
            optional: ['form_id']
          }),
        },
      },
    }) brokerSignupFormsPlans: Omit<BrokerSignupFormsPlans, 'id'>,
  ): Promise<BrokerSignupFormsPlans> {
    return this.signupFormsRepository.brokerSignupFormsPlans(id).create(brokerSignupFormsPlans);
  }

  @patch('/signup-forms/{id}/broker-signup-forms-plans', {
    responses: {
      '200': {
        description: 'SignupForms.BrokerSignupFormsPlans PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(BrokerSignupFormsPlans, {partial: true}),
        },
      },
    })
    brokerSignupFormsPlans: Partial<BrokerSignupFormsPlans>,
    @param.query.object('where', getWhereSchemaFor(BrokerSignupFormsPlans)) where?: Where<BrokerSignupFormsPlans>,
  ): Promise<Count> {
    return this.signupFormsRepository.brokerSignupFormsPlans(id).patch(brokerSignupFormsPlans, where);
  }

  @del('/signup-forms/{id}/broker-signup-forms-plans', {
    responses: {
      '200': {
        description: 'SignupForms.BrokerSignupFormsPlans DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(BrokerSignupFormsPlans)) where?: Where<BrokerSignupFormsPlans>,
  ): Promise<Count> {
    return this.signupFormsRepository.brokerSignupFormsPlans(id).delete(where);
  }
}
