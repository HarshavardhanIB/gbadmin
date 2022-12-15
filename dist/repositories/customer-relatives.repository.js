"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerRelativesRepository = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const datasources_1 = require("../datasources");
const models_1 = require("../models");
let CustomerRelativesRepository = class CustomerRelativesRepository extends repository_1.DefaultCrudRepository {
    constructor(dataSource, customerRepositoryGetter) {
        super(models_1.CustomerRelatives, dataSource);
        this.customerRepositoryGetter = customerRepositoryGetter;
        this.customer = this.createBelongsToAccessorFor('customer', customerRepositoryGetter);
        this.registerInclusionResolver('customer', this.customer.inclusionResolver);
    }
};
CustomerRelativesRepository = tslib_1.__decorate([
    tslib_1.__param(0, (0, core_1.inject)('datasources.gbadmin')),
    tslib_1.__param(1, repository_1.repository.getter('CustomerRepository')),
    tslib_1.__metadata("design:paramtypes", [datasources_1.GbadminDataSource, Function])
], CustomerRelativesRepository);
exports.CustomerRelativesRepository = CustomerRelativesRepository;
//# sourceMappingURL=customer-relatives.repository.js.map