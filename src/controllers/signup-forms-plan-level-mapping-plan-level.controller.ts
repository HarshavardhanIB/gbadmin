import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  SignupFormsPlanLevelMapping,
  PlanLevel,
} from '../models';
import {SignupFormsPlanLevelMappingRepository} from '../repositories';

export class SignupFormsPlanLevelMappingPlanLevelController {
  constructor(
    @repository(SignupFormsPlanLevelMappingRepository)
    public signupFormsPlanLevelMappingRepository: SignupFormsPlanLevelMappingRepository,
  ) { }

  @get('/signup-forms-plan-level-mappings/{id}/plan-level', {
    responses: {
      '200': {
        description: 'PlanLevel belonging to SignupFormsPlanLevelMapping',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(PlanLevel)},
          },
        },
      },
    },
  })
  async getPlanLevel(
    @param.path.number('id') id: typeof SignupFormsPlanLevelMapping.prototype.id,
  ): Promise<PlanLevel> {
    return this.signupFormsPlanLevelMappingRepository.planLevels(id);
  }
}
