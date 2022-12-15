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
  Customer,
  CustomerSignup,
} from '../models';
import { CustomerRepository } from '../repositories';

export class CustomerCustomerSignupController {
  constructor(
    @repository(CustomerRepository) protected customerRepository: CustomerRepository,
  ) { }

  @get('/customers/{id}/customer-signup', {
    responses: {
      '200': {
        description: 'Customer has one CustomerSignup',
        content: {
          'application/json': {
            schema: getModelSchemaRef(CustomerSignup),
          },
        },
      },
    },
  })
  async get(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<CustomerSignup>,
  ): Promise<CustomerSignup> {
    return this.customerRepository.customerSignup(id).get(filter);
  }

  @post('/customers/{id}/customer-signup', {
    responses: {
      '200': {
        description: 'Customer model instance',
        content: { 'application/json': { schema: getModelSchemaRef(CustomerSignup) } },
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Customer.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CustomerSignup, {
            title: 'NewCustomerSignupInCustomer',
            exclude: ['id'],
            optional: ['customerId']
          }),
        },
      },
    }) customerSignup: Omit<CustomerSignup, 'id'>,
  ): Promise<CustomerSignup> {
    return this.customerRepository.customerSignup(id).create(customerSignup);
  }

  @patch('/customers/{id}/customer-signup', {
    responses: {
      '200': {
        description: 'Customer.CustomerSignup PATCH success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CustomerSignup, { partial: true }),
        },
      },
    })
    customerSignup: Partial<CustomerSignup>,
    @param.query.object('where', getWhereSchemaFor(CustomerSignup)) where?: Where<CustomerSignup>,
  ): Promise<Count> {
    return this.customerRepository.customerSignup(id).patch(customerSignup, where);
  }

  @del('/customers/{id}/customer-signup', {
    responses: {
      '200': {
        description: 'Customer.CustomerSignup DELETE success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(CustomerSignup)) where?: Where<CustomerSignup>,
  ): Promise<Count> {
    return this.customerRepository.customerSignup(id).delete(where);
  }
}
