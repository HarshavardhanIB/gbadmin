"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerRepository = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const datasources_1 = require("../datasources");
const models_1 = require("../models");
let CustomerRepository = class CustomerRepository extends repository_1.DefaultCrudRepository {
    constructor(dataSource, usersRepositoryGetter, customerRelativesRepositoryGetter, customerPlansRepositoryGetter, customerSignupRepositoryGetter, contactInformationRepositoryGetter, customerContactInfoRepositoryGetter, insurancePlansRepositoryGetter) {
        super(models_1.Customer, dataSource);
        this.usersRepositoryGetter = usersRepositoryGetter;
        this.customerRelativesRepositoryGetter = customerRelativesRepositoryGetter;
        this.customerPlansRepositoryGetter = customerPlansRepositoryGetter;
        this.customerSignupRepositoryGetter = customerSignupRepositoryGetter;
        this.contactInformationRepositoryGetter = contactInformationRepositoryGetter;
        this.customerContactInfoRepositoryGetter = customerContactInfoRepositoryGetter;
        this.insurancePlansRepositoryGetter = insurancePlansRepositoryGetter;
        this.customerSignup = this.createHasOneRepositoryFactoryFor('customerSignup', customerSignupRepositoryGetter);
        this.registerInclusionResolver('customerSignup', this.customerSignup.inclusionResolver);
        this.customerPlans = this.createHasManyRepositoryFactoryFor('customerPlans', customerPlansRepositoryGetter);
        this.registerInclusionResolver('customerPlans', this.customerPlans.inclusionResolver);
        this.customerRelativeRelation = this.createHasManyRepositoryFactoryFor('customerRelativeRelation', customerRelativesRepositoryGetter);
        this.registerInclusionResolver('customerRelativeRelation', this.customerRelativeRelation.inclusionResolver);
        this.user = this.createBelongsToAccessorFor('user', usersRepositoryGetter);
        this.registerInclusionResolver('user', this.user.inclusionResolver);
        this.contactInformations = this.createHasManyThroughRepositoryFactoryFor('contactInformations', contactInformationRepositoryGetter, customerContactInfoRepositoryGetter);
        this.registerInclusionResolver('contactInformations', this.contactInformations.inclusionResolver);
        this.subscriptionPlans = this.createHasManyThroughRepositoryFactoryFor('subscriptionPlans', insurancePlansRepositoryGetter, customerPlansRepositoryGetter);
        this.registerInclusionResolver('subscriptionPlans', this.subscriptionPlans.inclusionResolver);
    }
};
CustomerRepository = tslib_1.__decorate([
    tslib_1.__param(0, (0, core_1.inject)('datasources.gbadmin')),
    tslib_1.__param(1, repository_1.repository.getter('UsersRepository')),
    tslib_1.__param(2, repository_1.repository.getter('CustomerRelativesRepository')),
    tslib_1.__param(3, repository_1.repository.getter('CustomerPlansRepository')),
    tslib_1.__param(4, repository_1.repository.getter('CustomerSignupRepository')),
    tslib_1.__param(5, repository_1.repository.getter('ContactInformationRepository')),
    tslib_1.__param(6, repository_1.repository.getter('CustomerContactInfoRepository')),
    tslib_1.__param(7, repository_1.repository.getter('InsurancePlansRepository')),
    tslib_1.__metadata("design:paramtypes", [datasources_1.GbadminDataSource, Function, Function, Function, Function, Function, Function, Function])
], CustomerRepository);
exports.CustomerRepository = CustomerRepository;
//# sourceMappingURL=customer.repository.js.map