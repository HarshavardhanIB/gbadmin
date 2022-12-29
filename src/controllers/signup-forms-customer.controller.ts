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
CustomerSignup,
Customer,
} from '../models';
import {SignupFormsRepository} from '../repositories';

export class SignupFormsCustomerController {
  constructor(
    @repository(SignupFormsRepository) protected signupFormsRepository: SignupFormsRepository,
  ) { }

  @get('/signup-forms/{id}/customers', {
    responses: {
      '200': {
        description: 'Array of SignupForms has many Customer through CustomerSignup',
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
    return this.signupFormsRepository.customers(id).find(filter);
  }

  @post('/signup-forms/{id}/customers', {
    responses: {
      '200': {
        description: 'create a Customer model instance',
        content: {'application/json': {schema: getModelSchemaRef(Customer)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof SignupForms.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Customer, {
            title: 'NewCustomerInSignupForms',
            exclude: ['id'],
          }),
        },
      },
    }) customer: Omit<Customer, 'id'>,
  ): Promise<Customer> {
    return this.signupFormsRepository.customers(id).create(customer);
  }

  @patch('/signup-forms/{id}/customers', {
    responses: {
      '200': {
        description: 'SignupForms.Customer PATCH success count',
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
    return this.signupFormsRepository.customers(id).patch(customer, where);
  }

  @del('/signup-forms/{id}/customers', {
    responses: {
      '200': {
        description: 'SignupForms.Customer DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Customer)) where?: Where<Customer>,
  ): Promise<Count> {
    return this.signupFormsRepository.customers(id).delete(where);
  }
}
