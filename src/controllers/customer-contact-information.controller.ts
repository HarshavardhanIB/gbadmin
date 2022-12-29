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
CustomerContactInfo,
ContactInformation,
} from '../models';
import {CustomerRepository} from '../repositories';

export class CustomerContactInformationController {
  constructor(
    @repository(CustomerRepository) protected customerRepository: CustomerRepository,
  ) { }

  @get('/customers/{id}/contact-informations', {
    responses: {
      '200': {
        description: 'Array of Customer has many ContactInformation through CustomerContactInfo',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(ContactInformation)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<ContactInformation>,
  ): Promise<ContactInformation[]> {
    return this.customerRepository.contactInformations(id).find(filter);
  }

  @post('/customers/{id}/contact-informations', {
    responses: {
      '200': {
        description: 'create a ContactInformation model instance',
        content: {'application/json': {schema: getModelSchemaRef(ContactInformation)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Customer.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ContactInformation, {
            title: 'NewContactInformationInCustomer',
            exclude: ['id'],
          }),
        },
      },
    }) contactInformation: Omit<ContactInformation, 'id'>,
  ): Promise<ContactInformation> {
    return this.customerRepository.contactInformations(id).create(contactInformation);
  }

  @patch('/customers/{id}/contact-informations', {
    responses: {
      '200': {
        description: 'Customer.ContactInformation PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ContactInformation, {partial: true}),
        },
      },
    })
    contactInformation: Partial<ContactInformation>,
    @param.query.object('where', getWhereSchemaFor(ContactInformation)) where?: Where<ContactInformation>,
  ): Promise<Count> {
    return this.customerRepository.contactInformations(id).patch(contactInformation, where);
  }

  @del('/customers/{id}/contact-informations', {
    responses: {
      '200': {
        description: 'Customer.ContactInformation DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(ContactInformation)) where?: Where<ContactInformation>,
  ): Promise<Count> {
    return this.customerRepository.contactInformations(id).delete(where);
  }
}
