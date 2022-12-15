"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BrokerRepository = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const datasources_1 = require("../datasources");
const models_1 = require("../models");
let BrokerRepository = class BrokerRepository extends repository_1.DefaultCrudRepository {
    constructor(dataSource, usersRepositoryGetter) {
        super(models_1.Broker, dataSource);
        this.usersRepositoryGetter = usersRepositoryGetter;
        this.users = this.createHasOneRepositoryFactoryFor('users', usersRepositoryGetter);
        this.registerInclusionResolver('users', this.users.inclusionResolver);
    }
};
BrokerRepository = tslib_1.__decorate([
    tslib_1.__param(0, (0, core_1.inject)('datasources.gbadmin')),
    tslib_1.__param(1, repository_1.repository.getter('UsersRepository')),
    tslib_1.__metadata("design:paramtypes", [datasources_1.GbadminDataSource, Function])
], BrokerRepository);
exports.BrokerRepository = BrokerRepository;
//# sourceMappingURL=broker.repository.js.map