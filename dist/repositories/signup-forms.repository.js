"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignupFormsRepository = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const datasources_1 = require("../datasources");
const models_1 = require("../models");
let SignupFormsRepository = class SignupFormsRepository extends repository_1.DefaultCrudRepository {
    constructor(dataSource, brokerSignupformsPlanlevelsRepositoryGetter, customerSignupRepositoryGetter, customerRepositoryGetter) {
        super(models_1.SignupForms, dataSource);
        this.brokerSignupformsPlanlevelsRepositoryGetter = brokerSignupformsPlanlevelsRepositoryGetter;
        this.customerSignupRepositoryGetter = customerSignupRepositoryGetter;
        this.customerRepositoryGetter = customerRepositoryGetter;
        this.customers = this.createHasManyThroughRepositoryFactoryFor('customers', customerRepositoryGetter, customerSignupRepositoryGetter);
        this.registerInclusionResolver('customers', this.customers.inclusionResolver);
        this.signupFormPlanLevels = this.createHasManyRepositoryFactoryFor('signupFormPlanLevels', brokerSignupformsPlanlevelsRepositoryGetter);
        this.registerInclusionResolver('signupFormPlanLevels', this.signupFormPlanLevels.inclusionResolver);
    }
};
SignupFormsRepository = tslib_1.__decorate([
    tslib_1.__param(0, (0, core_1.inject)('datasources.gbadmin')),
    tslib_1.__param(1, repository_1.repository.getter('BrokerSignupformsPlanlevelsRepository')),
    tslib_1.__param(2, repository_1.repository.getter('CustomerSignupRepository')),
    tslib_1.__param(3, repository_1.repository.getter('CustomerRepository')),
    tslib_1.__metadata("design:paramtypes", [datasources_1.GbadminDataSource, Function, Function, Function])
], SignupFormsRepository);
exports.SignupFormsRepository = SignupFormsRepository;
//# sourceMappingURL=signup-forms.repository.js.map