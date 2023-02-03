// import {inject} from '@loopback/core';
// import {DefaultCrudRepository} from '@loopback/repository';
// import {GroupBenefitzDataSource} from '../datasources';
// import {BrokerSignupFormsPlans, BrokerSignupFormsPlansRelations} from '../models';
// //import {BrokerPlanOptionsRepository} from './broker-plan-options.repository';

// export class BrokerSignupFormsPlansRepository extends DefaultCrudRepository<
//   BrokerSignupFormsPlans,
//   typeof BrokerSignupFormsPlans.prototype.id,
//   BrokerSignupFormsPlansRelations
// > {


//   constructor(
//     @inject('datasources.groupBenefitz') dataSource: GroupBenefitzDataSource,
//     //@repository.getter('BrokerPlanOptionsRepository') protected brokerPlanOptionsRepositoryGetter: Getter<BrokerPlanOptionsRepository>,
//     //@repository.getter('PlanOptionsRepository') protected planOptionsRepositoryGetter: Getter<PlanOptionsRepository>,
//   ) {
//     super(BrokerSignupFormsPlans, dataSource);
//     //this.planOptions = this.createHasManyThroughRepositoryFactoryFor('planOptions', planOptionsRepositoryGetter, brokerPlanOptionsRepositoryGetter,);
//     //this.registerInclusionResolver('planOptions', this.planOptions.inclusionResolver);
//   }
// }
