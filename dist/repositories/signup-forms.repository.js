"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignupFormsRepository = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const datasources_1 = require("../datasources");
const models_1 = require("../models");
let SignupFormsRepository = class SignupFormsRepository extends repository_1.DefaultCrudRepository {
    constructor(dataSource, SignupFormsPlanLevelMappingRepositoryGetter, customerSignupRepositoryGetter, customerRepositoryGetter, signupFormsPlanLevelMappingRepositoryGetter, brokerRepositoryGetter, brokerSignupFormsPlansRepositoryGetter) {
        super(models_1.SignupForms, dataSource);
        this.SignupFormsPlanLevelMappingRepositoryGetter = SignupFormsPlanLevelMappingRepositoryGetter;
        this.customerSignupRepositoryGetter = customerSignupRepositoryGetter;
        this.customerRepositoryGetter = customerRepositoryGetter;
        this.signupFormsPlanLevelMappingRepositoryGetter = signupFormsPlanLevelMappingRepositoryGetter;
        this.brokerRepositoryGetter = brokerRepositoryGetter;
        this.brokerSignupFormsPlansRepositoryGetter = brokerSignupFormsPlansRepositoryGetter;
        this.brokerSignupFormsPlans = this.createHasManyRepositoryFactoryFor('brokerSignupFormsPlans', brokerSignupFormsPlansRepositoryGetter);
        this.registerInclusionResolver('brokerSignupFormsPlans', this.brokerSignupFormsPlans.inclusionResolver);
        this.broker = this.createBelongsToAccessorFor('broker', brokerRepositoryGetter);
        this.registerInclusionResolver('broker', this.broker.inclusionResolver);
        this.signupFormsPlanLevelMappings = this.createHasManyRepositoryFactoryFor('signupFormsPlanLevelMappings', signupFormsPlanLevelMappingRepositoryGetter);
        this.registerInclusionResolver('signupFormsPlanLevelMappings', this.signupFormsPlanLevelMappings.inclusionResolver);
        this.customers = this.createHasManyThroughRepositoryFactoryFor('customers', customerRepositoryGetter, customerSignupRepositoryGetter);
        this.registerInclusionResolver('customers', this.customers.inclusionResolver);
    }
};
SignupFormsRepository = tslib_1.__decorate([
    tslib_1.__param(0, (0, core_1.inject)('datasources.gbadmin')),
    tslib_1.__param(1, repository_1.repository.getter('SignupFormsPlanLevelMappingRepository')),
    tslib_1.__param(2, repository_1.repository.getter('CustomerSignupRepository')),
    tslib_1.__param(3, repository_1.repository.getter('CustomerRepository')),
    tslib_1.__param(4, repository_1.repository.getter('SignupFormsPlanLevelMappingRepository')),
    tslib_1.__param(5, repository_1.repository.getter('BrokerRepository')),
    tslib_1.__param(6, repository_1.repository.getter('BrokerSignupFormsPlansRepository')),
    tslib_1.__metadata("design:paramtypes", [datasources_1.GbadminDataSource, Function, Function, Function, Function, Function, Function])
], SignupFormsRepository);
exports.SignupFormsRepository = SignupFormsRepository;
//# sourceMappingURL=signup-forms.repository.js.map