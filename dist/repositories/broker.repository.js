"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BrokerRepository = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const datasources_1 = require("../datasources");
const models_1 = require("../models");
let BrokerRepository = class BrokerRepository extends repository_1.DefaultCrudRepository {
    constructor(dataSource, usersRepositoryGetter, contactInformationRepositoryGetter, brokerEoInsuranceRepositoryGetter, brokerLicensedStatesAndProvincesRepositoryGetter, signupFormsRepositoryGetter, customerRepositoryGetter) {
        super(models_1.Broker, dataSource);
        this.usersRepositoryGetter = usersRepositoryGetter;
        this.contactInformationRepositoryGetter = contactInformationRepositoryGetter;
        this.brokerEoInsuranceRepositoryGetter = brokerEoInsuranceRepositoryGetter;
        this.brokerLicensedStatesAndProvincesRepositoryGetter = brokerLicensedStatesAndProvincesRepositoryGetter;
        this.signupFormsRepositoryGetter = signupFormsRepositoryGetter;
        this.customerRepositoryGetter = customerRepositoryGetter;
        this.customers = this.createHasManyRepositoryFactoryFor('customers', customerRepositoryGetter);
        this.registerInclusionResolver('customers', this.customers.inclusionResolver);
        this.parent = this.createBelongsToAccessorFor('parent', core_1.Getter.fromValue(this));
        this.registerInclusionResolver('parent', this.parent.inclusionResolver);
        this.subBrokers = this.createHasManyRepositoryFactoryFor('subBrokers', core_1.Getter.fromValue(this));
        this.registerInclusionResolver('subBrokers', this.subBrokers.inclusionResolver);
        this.signupForms = this.createHasManyRepositoryFactoryFor('signupForms', signupFormsRepositoryGetter);
        this.registerInclusionResolver('signupForms', this.signupForms.inclusionResolver);
        this.brokerLicensedStatesAndProvinces = this.createHasManyRepositoryFactoryFor('brokerLicensedStatesAndProvinces', brokerLicensedStatesAndProvincesRepositoryGetter);
        this.registerInclusionResolver('brokerLicensedStatesAndProvinces', this.brokerLicensedStatesAndProvinces.inclusionResolver);
        this.brokerEoInsurance = this.createHasOneRepositoryFactoryFor('brokerEoInsurance', brokerEoInsuranceRepositoryGetter);
        this.registerInclusionResolver('brokerEoInsurance', this.brokerEoInsurance.inclusionResolver);
        this.contactInfo = this.createBelongsToAccessorFor('contactInfo', contactInformationRepositoryGetter);
        this.registerInclusionResolver('contactInfo', this.contactInfo.inclusionResolver);
        // this.users = this.createHasOneRepositoryFactoryFor('users', usersRepositoryGetter);
        // this.registerInclusionResolver('users', this.users.inclusionResolver);
        this.user = this.createBelongsToAccessorFor('user', usersRepositoryGetter);
        this.registerInclusionResolver('user', this.user.inclusionResolver);
    }
};
BrokerRepository = tslib_1.__decorate([
    tslib_1.__param(0, (0, core_1.inject)('datasources.groupBenefitz')),
    tslib_1.__param(1, repository_1.repository.getter('UsersRepository')),
    tslib_1.__param(2, repository_1.repository.getter('ContactInformationRepository')),
    tslib_1.__param(3, repository_1.repository.getter('BrokerEoInsuranceRepository')),
    tslib_1.__param(4, repository_1.repository.getter('BrokerLicensedStatesAndProvincesRepository')),
    tslib_1.__param(5, repository_1.repository.getter('SignupFormsRepository')),
    tslib_1.__param(6, repository_1.repository.getter('CustomerRepository')),
    tslib_1.__metadata("design:paramtypes", [datasources_1.GroupBenefitzDataSource, Function, Function, Function, Function, Function, Function])
], BrokerRepository);
exports.BrokerRepository = BrokerRepository;
//# sourceMappingURL=broker.repository.js.map