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
InsurancePackages,
InsurancePlans,
PlanLevel,
} from '../models';
import {InsurancePackagesRepository} from '../repositories';

export class InsurancePackagesPlanLevelController {
  constructor(
    @repository(InsurancePackagesRepository) protected insurancePackagesRepository: InsurancePackagesRepository,
  ) { }

  @get('/insurance-packages/{id}/plan-levels', {
    responses: {
      '200': {
        description: 'Array of InsurancePackages has many PlanLevel through InsurancePlans',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(PlanLevel)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<PlanLevel>,
  ): Promise<PlanLevel[]> {
    return this.insurancePackagesRepository.planGroups(id).find(filter);
  }

  @post('/insurance-packages/{id}/plan-levels', {
    responses: {
      '200': {
        description: 'create a PlanLevel model instance',
        content: {'application/json': {schema: getModelSchemaRef(PlanLevel)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof InsurancePackages.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PlanLevel, {
            title: 'NewPlanLevelInInsurancePackages',
            exclude: ['id'],
          }),
        },
      },
    }) planLevel: Omit<PlanLevel, 'id'>,
  ): Promise<PlanLevel> {
    return this.insurancePackagesRepository.planGroups(id).create(planLevel);
  }

  @patch('/insurance-packages/{id}/plan-levels', {
    responses: {
      '200': {
        description: 'InsurancePackages.PlanLevel PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PlanLevel, {partial: true}),
        },
      },
    })
    planLevel: Partial<PlanLevel>,
    @param.query.object('where', getWhereSchemaFor(PlanLevel)) where?: Where<PlanLevel>,
  ): Promise<Count> {
    return this.insurancePackagesRepository.planGroups(id).patch(planLevel, where);
  }

  @del('/insurance-packages/{id}/plan-levels', {
    responses: {
      '200': {
        description: 'InsurancePackages.PlanLevel DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(PlanLevel)) where?: Where<PlanLevel>,
  ): Promise<Count> {
    return this.insurancePackagesRepository.planGroups(id).delete(where);
  }
}
