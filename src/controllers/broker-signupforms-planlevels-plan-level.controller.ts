import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  BrokerSignupformsPlanlevels,
  PlanLevel,
} from '../models';
import {BrokerSignupformsPlanlevelsRepository} from '../repositories';

export class BrokerSignupformsPlanlevelsPlanLevelController {
  constructor(
    @repository(BrokerSignupformsPlanlevelsRepository)
    public brokerSignupformsPlanlevelsRepository: BrokerSignupformsPlanlevelsRepository,
  ) { }

  @get('/broker-signupforms-planlevels/{id}/plan-level', {
    responses: {
      '200': {
        description: 'PlanLevel belonging to BrokerSignupformsPlanlevels',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(PlanLevel)},
          },
        },
      },
    },
  })
  async getPlanLevel(
    @param.path.number('id') id: typeof BrokerSignupformsPlanlevels.prototype.id,
  ): Promise<PlanLevel> {
    return this.brokerSignupformsPlanlevelsRepository.planLevels(id);
  }
}
