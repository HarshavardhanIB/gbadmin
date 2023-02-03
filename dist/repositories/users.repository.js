"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersRepository = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const datasources_1 = require("../datasources");
const models_1 = require("../models");
let UsersRepository = class UsersRepository extends repository_1.DefaultCrudRepository {
    constructor(dataSource, customerRepositoryGetter) {
        super(models_1.Users, dataSource);
        this.customerRepositoryGetter = customerRepositoryGetter;
        this.customer = this.createHasOneRepositoryFactoryFor('customer', customerRepositoryGetter);
        this.registerInclusionResolver('customer', this.customer.inclusionResolver);
    }
};
UsersRepository = tslib_1.__decorate([
    tslib_1.__param(0, (0, core_1.inject)('datasources.groupBenefitz')),
    tslib_1.__param(1, repository_1.repository.getter('CustomerRepository')),
    tslib_1.__metadata("design:paramtypes", [datasources_1.GroupBenefitzDataSource, Function])
], UsersRepository);
exports.UsersRepository = UsersRepository;
//# sourceMappingURL=users.repository.js.map