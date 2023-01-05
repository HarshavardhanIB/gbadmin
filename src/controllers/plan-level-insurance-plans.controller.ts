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
  PlanLevel,
  InsurancePlans,
} from '../models';
import {PlanLevelRepository} from '../repositories';

export class PlanLevelInsurancePlansController {
  constructor(
    @repository(PlanLevelRepository) protected planLevelRepository: PlanLevelRepository,
  ) { }

  @get('/plan-levels/{id}/insurance-plans', {
    responses: {
      '200': {
        description: 'Array of PlanLevel has many InsurancePlans',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(InsurancePlans)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<InsurancePlans>,
  ): Promise<InsurancePlans[]> {
    return this.planLevelRepository.plans(id).find(filter);
  }

  @post('/plan-levels/{id}/insurance-plans', {
    responses: {
      '200': {
        description: 'PlanLevel model instance',
        content: {'application/json': {schema: getModelSchemaRef(InsurancePlans)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof PlanLevel.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(InsurancePlans, {
            title: 'NewInsurancePlansInPlanLevel',
            exclude: ['id'],
            optional: ['plan_level']
          }),
        },
      },
    }) insurancePlans: Omit<InsurancePlans, 'id'>,
  ): Promise<InsurancePlans> {
    return this.planLevelRepository.plans(id).create(insurancePlans);
  }

  @patch('/plan-levels/{id}/insurance-plans', {
    responses: {
      '200': {
        description: 'PlanLevel.InsurancePlans PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(InsurancePlans, {partial: true}),
        },
      },
    })
    insurancePlans: Partial<InsurancePlans>,
    @param.query.object('where', getWhereSchemaFor(InsurancePlans)) where?: Where<InsurancePlans>,
  ): Promise<Count> {
    return this.planLevelRepository.plans(id).patch(insurancePlans, where);
  }

  @del('/plan-levels/{id}/insurance-plans', {
    responses: {
      '200': {
        description: 'PlanLevel.InsurancePlans DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(InsurancePlans)) where?: Where<InsurancePlans>,
  ): Promise<Count> {
    return this.planLevelRepository.plans(id).delete(where);
  }
}
