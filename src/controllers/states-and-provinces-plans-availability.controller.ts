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
  StatesAndProvinces,
  PlansAvailability,
} from '../models';
import {StatesAndProvincesRepository} from '../repositories';

export class StatesAndProvincesPlansAvailabilityController {
  constructor(
    @repository(StatesAndProvincesRepository) protected statesAndProvincesRepository: StatesAndProvincesRepository,
  ) { }

  @get('/states-and-provinces/{id}/plans-availabilities', {
    responses: {
      '200': {
        description: 'Array of StatesAndProvinces has many PlansAvailability',
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
    return this.statesAndProvincesRepository.planAvailability(id).find(filter);
  }

  @post('/states-and-provinces/{id}/plans-availabilities', {
    responses: {
      '200': {
        description: 'StatesAndProvinces model instance',
        content: {'application/json': {schema: getModelSchemaRef(PlansAvailability)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof StatesAndProvinces.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PlansAvailability, {
            title: 'NewPlansAvailabilityInStatesAndProvinces',
            exclude: ['id'],
            optional: ['state_id']
          }),
        },
      },
    }) plansAvailability: Omit<PlansAvailability, 'id'>,
  ): Promise<PlansAvailability> {
    return this.statesAndProvincesRepository.planAvailability(id).create(plansAvailability);
  }

  @patch('/states-and-provinces/{id}/plans-availabilities', {
    responses: {
      '200': {
        description: 'StatesAndProvinces.PlansAvailability PATCH success count',
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
    return this.statesAndProvincesRepository.planAvailability(id).patch(plansAvailability, where);
  }

  @del('/states-and-provinces/{id}/plans-availabilities', {
    responses: {
      '200': {
        description: 'StatesAndProvinces.PlansAvailability DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(PlansAvailability)) where?: Where<PlansAvailability>,
  ): Promise<Count> {
    return this.statesAndProvincesRepository.planAvailability(id).delete(where);
  }
}
