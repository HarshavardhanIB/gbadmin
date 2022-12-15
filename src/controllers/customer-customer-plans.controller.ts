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
  CustomerPlans,
} from '../models';
import {CustomerRepository} from '../repositories';

export class CustomerCustomerPlansController {
  constructor(
    @repository(CustomerRepository) protected customerRepository: CustomerRepository,
  ) { }

  @get('/customers/{id}/customer-plans', {
    responses: {
      '200': {
        description: 'Array of Customer has many CustomerPlans',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(CustomerPlans)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<CustomerPlans>,
  ): Promise<CustomerPlans[]> {
    return this.customerRepository.customerPlans(id).find(filter);
  }

  @post('/customers/{id}/customer-plans', {
    responses: {
      '200': {
        description: 'Customer model instance',
        content: {'application/json': {schema: getModelSchemaRef(CustomerPlans)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Customer.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CustomerPlans, {
            title: 'NewCustomerPlansInCustomer',
            exclude: ['id'],
            optional: ['customerId']
          }),
        },
      },
    }) customerPlans: Omit<CustomerPlans, 'id'>,
  ): Promise<CustomerPlans> {
    return this.customerRepository.customerPlans(id).create(customerPlans);
  }

  @patch('/customers/{id}/customer-plans', {
    responses: {
      '200': {
        description: 'Customer.CustomerPlans PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CustomerPlans, {partial: true}),
        },
      },
    })
    customerPlans: Partial<CustomerPlans>,
    @param.query.object('where', getWhereSchemaFor(CustomerPlans)) where?: Where<CustomerPlans>,
  ): Promise<Count> {
    return this.customerRepository.customerPlans(id).patch(customerPlans, where);
  }

  @del('/customers/{id}/customer-plans', {
    responses: {
      '200': {
        description: 'Customer.CustomerPlans DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(CustomerPlans)) where?: Where<CustomerPlans>,
  ): Promise<Count> {
    return this.customerRepository.customerPlans(id).delete(where);
  }
}
