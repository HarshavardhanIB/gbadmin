"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerSignupRepository = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const datasources_1 = require("../datasources");
const models_1 = require("../models");
let CustomerSignupRepository = class CustomerSignupRepository extends repository_1.DefaultCrudRepository {
    constructor(dataSource, signupFormsRepositoryGetter) {
        super(models_1.CustomerSignup, dataSource);
        this.signupFormsRepositoryGetter = signupFormsRepositoryGetter;
        this.form = this.createBelongsToAccessorFor('form', signupFormsRepositoryGetter);
        this.registerInclusionResolver('form', this.form.inclusionResolver);
    }
};
CustomerSignupRepository = tslib_1.__decorate([
    tslib_1.__param(0, (0, core_1.inject)('datasources.groupBenefitz')),
    tslib_1.__param(1, repository_1.repository.getter('SignupFormsRepository')),
    tslib_1.__metadata("design:paramtypes", [datasources_1.GroupBenefitzDataSource, Function])
], CustomerSignupRepository);
exports.CustomerSignupRepository = CustomerSignupRepository;
//# sourceMappingURL=customer-signup.repository.js.map