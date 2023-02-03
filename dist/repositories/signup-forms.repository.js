"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignupFormsRepository = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const datasources_1 = require("../datasources");
const models_1 = require("../models");
//import {BrokerSignupFormsPlansRepository} from './broker-signup-forms-plans.repository';
let SignupFormsRepository = class SignupFormsRepository extends repository_1.DefaultCrudRepository {
    // public readonly brokerSignupFormsPlans: HasManyRepositoryFactory<BrokerSignupFormsPlans, typeof SignupForms.prototype.id>;
    // public readonly signupFormPlanLevels: HasManyRepositoryFactory<SignupFormsPlanLevelMapping, typeof SignupForms.prototype.id>;
    constructor(dataSource, SignupFormsPlanLevelMappingRepositoryGetter, customerSignupRepositoryGetter, customerRepositoryGetter, signupFormsPlanLevelMappingRepositoryGetter, brokerRepositoryGetter) {
        super(models_1.SignupForms, dataSource);
        this.SignupFormsPlanLevelMappingRepositoryGetter = SignupFormsPlanLevelMappingRepositoryGetter;
        this.customerSignupRepositoryGetter = customerSignupRepositoryGetter;
        this.customerRepositoryGetter = customerRepositoryGetter;
        this.signupFormsPlanLevelMappingRepositoryGetter = signupFormsPlanLevelMappingRepositoryGetter;
        this.brokerRepositoryGetter = brokerRepositoryGetter;
        // this.brokerSignupFormsPlans = this.createHasManyRepositoryFactoryFor('brokerSignupFormsPlans', brokerSignupFormsPlansRepositoryGetter,);
        // this.registerInclusionResolver('brokerSignupFormsPlans', this.brokerSignupFormsPlans.inclusionResolver);
        // this.signupFormPlanLevels = this.createHasManyRepositoryFactoryFor('signupFormPlanLevels', signupFormsPlanLevelMappingRepositoryGetter,);
        // this.registerInclusionResolver('signupFormPlanLevels', this.signupFormPlanLevels.inclusionResolver);
        this.broker = this.createBelongsToAccessorFor('broker', brokerRepositoryGetter);
        this.registerInclusionResolver('broker', this.broker.inclusionResolver);
        this.signupFormPlanLevels = this.createHasManyRepositoryFactoryFor('signupFormPlanLevels', signupFormsPlanLevelMappingRepositoryGetter);
        this.registerInclusionResolver('signupFormPlanLevels', this.signupFormPlanLevels.inclusionResolver);
        this.customers = this.createHasManyThroughRepositoryFactoryFor('customers', customerRepositoryGetter, customerSignupRepositoryGetter);
        this.registerInclusionResolver('customers', this.customers.inclusionResolver);
    }
};
SignupFormsRepository = tslib_1.__decorate([
    tslib_1.__param(0, (0, core_1.inject)('datasources.groupBenefitz')),
    tslib_1.__param(1, repository_1.repository.getter('SignupFormsPlanLevelMappingRepository')),
    tslib_1.__param(2, repository_1.repository.getter('CustomerSignupRepository')),
    tslib_1.__param(3, repository_1.repository.getter('CustomerRepository')),
    tslib_1.__param(4, repository_1.repository.getter('SignupFormsPlanLevelMappingRepository')),
    tslib_1.__param(5, repository_1.repository.getter('BrokerRepository')),
    tslib_1.__metadata("design:paramtypes", [datasources_1.GroupBenefitzDataSource, Function, Function, Function, Function, Function])
], SignupFormsRepository);
exports.SignupFormsRepository = SignupFormsRepository;
//# sourceMappingURL=signup-forms.repository.js.map