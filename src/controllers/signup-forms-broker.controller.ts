import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  SignupForms,
  Broker,
} from '../models';
import {SignupFormsRepository} from '../repositories';

export class SignupFormsBrokerController {
  constructor(
    @repository(SignupFormsRepository)
    public signupFormsRepository: SignupFormsRepository,
  ) { }

  @get('/signup-forms/{id}/broker', {
    responses: {
      '200': {
        description: 'Broker belonging to SignupForms',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Broker)},
          },
        },
      },
    },
  })
  async getBroker(
    @param.path.number('id') id: typeof SignupForms.prototype.id,
  ): Promise<Broker> {
    return this.signupFormsRepository.broker(id);
  }
}
