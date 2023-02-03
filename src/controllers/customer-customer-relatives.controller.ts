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
  CustomerRelatives,
} from '../models';
import {CustomerRepository} from '../repositories';

export class CustomerCustomerRelativesController {
  constructor(
    @repository(CustomerRepository) protected customerRepository: CustomerRepository,
  ) { }

  @get('/customers/{id}/customer-relatives', {
    responses: {
      '200': {
        description: 'Array of Customer has many CustomerRelatives',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(CustomerRelatives)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<CustomerRelatives>,
  ): Promise<CustomerRelatives[]> {
    return this.customerRepository.customerRelatives(id).find(filter);
  }

  @post('/customers/{id}/customer-relatives', {
    responses: {
      '200': {
        description: 'Customer model instance',
        content: {'application/json': {schema: getModelSchemaRef(CustomerRelatives)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Customer.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CustomerRelatives, {
            title: 'NewCustomerRelativesInCustomer',
            exclude: ['id'],
            optional: ['customerId']
          }),
        },
      },
    }) customerRelatives: Omit<CustomerRelatives, 'id'>,
  ): Promise<CustomerRelatives> {
    return this.customerRepository.customerRelatives(id).create(customerRelatives);
  }

  @patch('/customers/{id}/customer-relatives', {
    responses: {
      '200': {
        description: 'Customer.CustomerRelatives PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CustomerRelatives, {partial: true}),
        },
      },
    })
    customerRelatives: Partial<CustomerRelatives>,
    @param.query.object('where', getWhereSchemaFor(CustomerRelatives)) where?: Where<CustomerRelatives>,
  ): Promise<Count> {
    return this.customerRepository.customerRelatives(id).patch(customerRelatives, where);
  }

  @del('/customers/{id}/customer-relatives', {
    responses: {
      '200': {
        description: 'Customer.CustomerRelatives DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(CustomerRelatives)) where?: Where<CustomerRelatives>,
  ): Promise<Count> {
    return this.customerRepository.customerRelatives(id).delete(where);
  }
}
