import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  PlansAvailability,
  InsurancePlans,
} from '../models';
import {PlansAvailabilityRepository} from '../repositories';

export class PlansAvailabilityInsurancePlansController {
  constructor(
    @repository(PlansAvailabilityRepository)
    public plansAvailabilityRepository: PlansAvailabilityRepository,
  ) { }

  @get('/plans-availabilities/{id}/insurance-plans', {
    responses: {
      '200': {
        description: 'InsurancePlans belonging to PlansAvailability',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(InsurancePlans)},
          },
        },
      },
    },
  })
  async getInsurancePlans(
    @param.path.number('id') id: typeof PlansAvailability.prototype.id,
  ): Promise<InsurancePlans> {
    return this.plansAvailabilityRepository.plan(id);
  }
}
