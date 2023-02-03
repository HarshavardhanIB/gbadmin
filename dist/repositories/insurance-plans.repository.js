"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InsurancePlansRepository = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const datasources_1 = require("../datasources");
const models_1 = require("../models");
let InsurancePlansRepository = class InsurancePlansRepository extends repository_1.DefaultCrudRepository {
    constructor(dataSource, 
    // @repository.getter('InsuranceProductsRepository') protected insuranceProductsRepositoryGetter: Getter<InsuranceProductsRepository>,
    plansAvailabilityRepositoryGetter, planLevelRepositoryGetter, insurancePlansOptionsRepositoryGetter, planOptionsRepositoryGetter) {
        super(models_1.InsurancePlans, dataSource);
        this.plansAvailabilityRepositoryGetter = plansAvailabilityRepositoryGetter;
        this.planLevelRepositoryGetter = planLevelRepositoryGetter;
        this.insurancePlansOptionsRepositoryGetter = insurancePlansOptionsRepositoryGetter;
        this.planOptionsRepositoryGetter = planOptionsRepositoryGetter;
        this.planOptions = this.createHasManyThroughRepositoryFactoryFor('planOptions', planOptionsRepositoryGetter, insurancePlansOptionsRepositoryGetter);
        this.registerInclusionResolver('planOptions', this.planOptions.inclusionResolver);
        this.planLevels = this.createBelongsToAccessorFor('planLevels', planLevelRepositoryGetter);
        this.registerInclusionResolver('planLevels', this.planLevels.inclusionResolver);
        this.stateTaxDetails = this.createHasManyRepositoryFactoryFor('stateTaxDetails', plansAvailabilityRepositoryGetter);
        this.registerInclusionResolver('stateTaxDetails', this.stateTaxDetails.inclusionResolver);
        //this.products = this.createHasManyRepositoryFactoryFor('products', insuranceProductsRepositoryGetter,);
        //this.registerInclusionResolver('products', this.products.inclusionResolver);
    }
};
InsurancePlansRepository = tslib_1.__decorate([
    tslib_1.__param(0, (0, core_1.inject)('datasources.groupBenefitz')),
    tslib_1.__param(1, repository_1.repository.getter('PlansAvailabilityRepository')),
    tslib_1.__param(2, repository_1.repository.getter('PlanLevelRepository')),
    tslib_1.__param(3, repository_1.repository.getter('InsurancePlansOptionsRepository')),
    tslib_1.__param(4, repository_1.repository.getter('PlanOptionsRepository')),
    tslib_1.__metadata("design:paramtypes", [datasources_1.GroupBenefitzDataSource, Function, Function, Function, Function])
], InsurancePlansRepository);
exports.InsurancePlansRepository = InsurancePlansRepository;
//# sourceMappingURL=insurance-plans.repository.js.map