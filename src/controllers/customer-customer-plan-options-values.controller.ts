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
  CustomerPlanOptionsValues,
} from '../models';
import {CustomerRepository} from '../repositories';

export class CustomerCustomerPlanOptionsValuesController {
  constructor(
    @repository(CustomerRepository) protected customerRepository: CustomerRepository,
  ) { }

  @get('/customers/{id}/customer-plan-options-values', {
    responses: {
      '200': {
        description: 'Array of Customer has many CustomerPlanOptionsValues',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(CustomerPlanOptionsValues)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<CustomerPlanOptionsValues>,
  ): Promise<CustomerPlanOptionsValues[]> {
    return this.customerRepository.customerPlanOptionsValues(id).find(filter);
  }

  @post('/customers/{id}/customer-plan-options-values', {
    responses: {
      '200': {
        description: 'Customer model instance',
        content: {'application/json': {schema: getModelSchemaRef(CustomerPlanOptionsValues)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Customer.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CustomerPlanOptionsValues, {
            title: 'NewCustomerPlanOptionsValuesInCustomer',
            exclude: ['id'],
            optional: ['customer_id']
          }),
        },
      },
    }) customerPlanOptionsValues: Omit<CustomerPlanOptionsValues, 'id'>,
  ): Promise<CustomerPlanOptionsValues> {
    return this.customerRepository.customerPlanOptionsValues(id).create(customerPlanOptionsValues);
  }

  @patch('/customers/{id}/customer-plan-options-values', {
    responses: {
      '200': {
        description: 'Customer.CustomerPlanOptionsValues PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CustomerPlanOptionsValues, {partial: true}),
        },
      },
    })
    customerPlanOptionsValues: Partial<CustomerPlanOptionsValues>,
    @param.query.object('where', getWhereSchemaFor(CustomerPlanOptionsValues)) where?: Where<CustomerPlanOptionsValues>,
  ): Promise<Count> {
    return this.customerRepository.customerPlanOptionsValues(id).patch(customerPlanOptionsValues, where);
  }

  @del('/customers/{id}/customer-plan-options-values', {
    responses: {
      '200': {
        description: 'Customer.CustomerPlanOptionsValues DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(CustomerPlanOptionsValues)) where?: Where<CustomerPlanOptionsValues>,
  ): Promise<Count> {
    return this.customerRepository.customerPlanOptionsValues(id).delete(where);
  }
}
