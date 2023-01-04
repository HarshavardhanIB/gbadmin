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
  SignupForms,
  SignupFormsPlanLevelMapping,
} from '../models';
import {SignupFormsRepository} from '../repositories';

export class SignupFormsSignupFormsPlanLevelMappingController {
  constructor(
    @repository(SignupFormsRepository) protected signupFormsRepository: SignupFormsRepository,
  ) { }

  @get('/signup-forms/{id}/signup-forms-plan-level-mappings', {
    responses: {
      '200': {
        description: 'Array of SignupForms has many SignupFormsPlanLevelMapping',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(SignupFormsPlanLevelMapping)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<SignupFormsPlanLevelMapping>,
  ): Promise<SignupFormsPlanLevelMapping[]> {
    return this.signupFormsRepository.signupFormsPlanLevelMappings(id).find(filter);
  }

  @post('/signup-forms/{id}/signup-forms-plan-level-mappings', {
    responses: {
      '200': {
        description: 'SignupForms model instance',
        content: {'application/json': {schema: getModelSchemaRef(SignupFormsPlanLevelMapping)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof SignupForms.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SignupFormsPlanLevelMapping, {
            title: 'NewSignupFormsPlanLevelMappingInSignupForms',
            exclude: ['id'],
            optional: ['form_id']
          }),
        },
      },
    }) signupFormsPlanLevelMapping: Omit<SignupFormsPlanLevelMapping, 'id'>,
  ): Promise<SignupFormsPlanLevelMapping> {
    return this.signupFormsRepository.signupFormsPlanLevelMappings(id).create(signupFormsPlanLevelMapping);
  }

  @patch('/signup-forms/{id}/signup-forms-plan-level-mappings', {
    responses: {
      '200': {
        description: 'SignupForms.SignupFormsPlanLevelMapping PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SignupFormsPlanLevelMapping, {partial: true}),
        },
      },
    })
    signupFormsPlanLevelMapping: Partial<SignupFormsPlanLevelMapping>,
    @param.query.object('where', getWhereSchemaFor(SignupFormsPlanLevelMapping)) where?: Where<SignupFormsPlanLevelMapping>,
  ): Promise<Count> {
    return this.signupFormsRepository.signupFormsPlanLevelMappings(id).patch(signupFormsPlanLevelMapping, where);
  }

  @del('/signup-forms/{id}/signup-forms-plan-level-mappings', {
    responses: {
      '200': {
        description: 'SignupForms.SignupFormsPlanLevelMapping DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(SignupFormsPlanLevelMapping)) where?: Where<SignupFormsPlanLevelMapping>,
  ): Promise<Count> {
    return this.signupFormsRepository.signupFormsPlanLevelMappings(id).delete(where);
  }
}
