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
  StatesAndProvinces,
} from '../models';
import {PlansAvailabilityRepository} from '../repositories';

export class PlansAvailabilityStatesAndProvincesController {
  constructor(
    @repository(PlansAvailabilityRepository)
    public plansAvailabilityRepository: PlansAvailabilityRepository,
  ) { }

  @get('/plans-availabilities/{id}/states-and-provinces', {
    responses: {
      '200': {
        description: 'StatesAndProvinces belonging to PlansAvailability',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(StatesAndProvinces)},
          },
        },
      },
    },
  })
  async getStatesAndProvinces(
    @param.path.number('id') id: typeof PlansAvailability.prototype.id,
  ): Promise<StatesAndProvinces> {
    return this.plansAvailabilityRepository.state(id);
  }
}
