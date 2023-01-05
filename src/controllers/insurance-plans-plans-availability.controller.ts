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
  InsurancePlans,
  PlansAvailability,
} from '../models';
import {InsurancePlansRepository} from '../repositories';

export class InsurancePlansPlansAvailabilityController {
  constructor(
    @repository(InsurancePlansRepository) protected insurancePlansRepository: InsurancePlansRepository,
  ) { }

  @get('/insurance-plans/{id}/plans-availabilities', {
    responses: {
      '200': {
        description: 'Array of InsurancePlans has many PlansAvailability',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(PlansAvailability)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<PlansAvailability>,
  ): Promise<PlansAvailability[]> {
    return this.insurancePlansRepository.stateTaxDetails(id).find(filter);
  }

  @post('/insurance-plans/{id}/plans-availabilities', {
    responses: {
      '200': {
        description: 'InsurancePlans model instance',
        content: {'application/json': {schema: getModelSchemaRef(PlansAvailability)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof InsurancePlans.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PlansAvailability, {
            title: 'NewPlansAvailabilityInInsurancePlans',
            exclude: ['id'],
            optional: ['plan_id']
          }),
        },
      },
    }) plansAvailability: Omit<PlansAvailability, 'id'>,
  ): Promise<PlansAvailability> {
    return this.insurancePlansRepository.stateTaxDetails(id).create(plansAvailability);
  }

  @patch('/insurance-plans/{id}/plans-availabilities', {
    responses: {
      '200': {
        description: 'InsurancePlans.PlansAvailability PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PlansAvailability, {partial: true}),
        },
      },
    })
    plansAvailability: Partial<PlansAvailability>,
    @param.query.object('where', getWhereSchemaFor(PlansAvailability)) where?: Where<PlansAvailability>,
  ): Promise<Count> {
    return this.insurancePlansRepository.stateTaxDetails(id).patch(plansAvailability, where);
  }

  @del('/insurance-plans/{id}/plans-availabilities', {
    responses: {
      '200': {
        description: 'InsurancePlans.PlansAvailability DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(PlansAvailability)) where?: Where<PlansAvailability>,
  ): Promise<Count> {
    return this.insurancePlansRepository.stateTaxDetails(id).delete(where);
  }
}
