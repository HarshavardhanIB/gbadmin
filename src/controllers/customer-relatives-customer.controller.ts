import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  CustomerRelatives,
  Customer,
} from '../models';
import {CustomerRelativesRepository} from '../repositories';

export class CustomerRelativesCustomerController {
  constructor(
    @repository(CustomerRelativesRepository)
    public customerRelativesRepository: CustomerRelativesRepository,
  ) { }

  @get('/customer-relatives/{id}/customer', {
    responses: {
      '200': {
        description: 'Customer belonging to CustomerRelatives',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Customer)},
          },
        },
      },
    },
  })
  async getCustomer(
    @param.path.number('id') id: typeof CustomerRelatives.prototype.id,
  ): Promise<Customer> {
    return this.customerRelativesRepository.customer(id);
  }
}
