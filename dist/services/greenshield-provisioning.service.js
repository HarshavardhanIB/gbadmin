"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GreenshieldProvisioningService = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const moment_1 = tslib_1.__importDefault(require("moment"));
const constants_1 = require("../constants");
const paths_1 = require("../paths");
const storage_helper_1 = require("../storage.helper");
const aitp_service_1 = require("./aitp.service");
const common_provisioning_service_1 = require("./common-provisioning.service");
let GreenshieldProvisioningService = class GreenshieldProvisioningService {
    constructor(/* Add @inject to inject parameters */ provision, aitp) {
        this.provision = provision;
        this.aitp = aitp;
    }
    /*
     * Add service methods here
     */
    async provisionGreenshield(customers) {
        // let greenshieldPlanPackages = [1] //health and dental
        var _a;
        let SCustomers = []; //single
        let C1Customers = []; //couple - customer and 1 dependent(spouse or a child)
        let F2Customers = []; //family - customer with/without spouse and children
        let SDCCustomers = []; // customer with atleast one child as special dependant
        for (let customer of customers) {
            //valid customer plans for grrenshield
            let greenshieldPlan = {};
            const greenshieldValidPlans = [];
            for (const cp of customer.customerPlans) {
                //if (GREENSHEILD_PACKAGES.indexOf(cp.plan.packageId) >= 0) {
                if (constants_1.GREENSHEILD_PLAN_LEVELS.indexOf(cp.plan.planLevel) >= 0) {
                    greenshieldValidPlans.push(cp);
                }
            }
            if (greenshieldValidPlans.length == 0) {
                //no plans
                //just skip....
                console.log("//no plans     //just skip....");
                continue;
            }
            else if (greenshieldValidPlans.length == 1) {
                greenshieldPlan = greenshieldValidPlans[0];
            }
            else {
                console.log('more than 1 plans??? something wrong');
                greenshieldPlan = greenshieldValidPlans[0];
            }
            if (!customer.contactInformations) {
                console.log(`no customer contact info.. ?? wrong data.. skip this customer ${customer.id}`);
                continue;
            }
            let coverage = this.provision.getCoverageValue(greenshieldPlan);
            // let enrollmentDate = moment(customer.customerSignup.enrollmentDate).format('YYYY');customer.customerSignup.enrollmentDate.split("-");
            // let enrollmentYear = enrollmentDate[0]
            // let enrollmentMonth = enrollmentDate[1]
            // let enrollmentDay = enrollmentDate[2]
            // let hiringDate = customer.customerSignup.hiringDate.split("-");
            // let hiringYear = hiringDate[0]
            // let hiringMonth = hiringDate[1]
            // let hiringDay = hiringDate[2]
            // let dob = customer.dob.split("-");
            // let dobYear = dob[0]
            // let dobMonth = dob[1]
            // let dobDay = dob[2]
            let extdataObj = {
                "Personal_Info-s2-req1": (0, moment_1.default)(customer.customerSignup.enrollmentDate).format('YYYY'),
                "Personal_Info-s2-req2": (0, moment_1.default)(customer.customerSignup.enrollmentDate).format('MM'),
                "Personal_Info-s2-req3": (0, moment_1.default)(customer.customerSignup.enrollmentDate).format('DD'),
                "Personal_Info-s3-req1": customer.lastName,
                "Personal_Info-s3-req2": customer.firstName,
                "Personal_Info-s3-req3": (0, moment_1.default)(customer.dob).format('YYYY'),
                "Personal_Info-s3-req4": (0, moment_1.default)(customer.dob).format('MM'),
                "Personal_Info-s3-req5": (0, moment_1.default)(customer.dob).format('DD'),
                "Personal_Info-s3-req6": customer.gender ? ((customer.gender == "NON-BINARY") ? 'X' : customer.gender[0]) : '',
                "Personal_Info-s3-req7": ((_a = customer.contactInformations[0].apt) !== null && _a !== void 0 ? _a : "") + customer.contactInformations[0].line1,
                "Personal_Info-s3-req8": customer.contactInformations[0].line2,
                "Personal_Info-s3-req9": customer.contactInformations[0].city,
                "Personal_Info-s3-req10": customer.contactInformations[0].state,
                "Personal_Info-s3-req11": greenshieldPlan.plan.stateTaxDetails[0].state.country.greenshieldCode,
                //this.provision.getCountryValue(customer.contactInformations[0].country),//ctl00$cphBody$ddlCountry
                "Personal_Info-s3-req12": customer.contactInformations[0].postalCode,
                "Personal_Info-s3-req13": customer.contactInformations[0].primaryEmail,
                "Personal_Info-s3-req14": customer.contactInformations[0].primaryEmail,
                "Personal_Info-s3-req15": this.provision.getPackageValue(greenshieldPlan.plan.planLevels.greenshieldPackages, greenshieldPlan.plan.stateTaxDetails[0].stateId),
                "Personal_Info-s4-req1": coverage
            };
            let dependantsInfo = {};
            let targetTestcases = [];
            //check condition and push this object to related array
            switch (coverage) {
                case "S":
                    SCustomers.push(extdataObj);
                    targetTestcases = ["Personal_Info"];
                    break;
                case "C2":
                    if (customer.customerRelatives) {
                        dependantsInfo = await this.provision.getDependantInfo(customer.customerRelatives);
                        //console.log(dependantsInfo);
                        extdataObj = { ...extdataObj, ...dependantsInfo.dependantsExtdataObject };
                    }
                    if (dependantsInfo.dependantsNumber > 0 && dependantsInfo.disabledChildrenNumber > 0) {
                        SDCCustomers.push(extdataObj);
                    }
                    else {
                        C1Customers.push(extdataObj);
                        targetTestcases = ["Personal_Info", "Dependants"];
                    }
                    break;
                case "F1":
                    if (customer.customerRelatives) {
                        dependantsInfo = await this.provision.getDependantsInfo(customer.customerRelatives);
                        //console.log(dependantsInfo);
                        extdataObj = { ...extdataObj, ...dependantsInfo.dependantsExtdataObject };
                        // extdataObj.dependantsInfo = dependantsInfo;
                    }
                    if (dependantsInfo.dependantsNumber > 0 && dependantsInfo.disabledChildrenNumber > 0) {
                        SDCCustomers.push(extdataObj);
                    }
                    else {
                        F2Customers.push(extdataObj);
                        targetTestcases = ["Personal_Info", "Dependants"];
                    }
                    break;
            }
        }
        const customerdataObject = {
            single: SCustomers,
            couple: C1Customers,
            family: F2Customers,
            specialChild: SDCCustomers
        };
        return customerdataObject;
        //return array_of_arrayCustomers or object_of_arrayCustomers
    }
    async provisionGreenshieldSingle(customer, greenshieldPlan) {
        var _a, _b;
        if (!customer.contactInformations) {
            console.log(`no customer contact info.. ?? wrong data.. skip this customer ${customer.id}`);
            return null;
        }
        let coverage = this.provision.getCoverageValueGreenshield(greenshieldPlan);
        let extdataObj = {
            "Personal_Info-s2-req1": (0, moment_1.default)(customer.customerSignup.enrollmentDate).format('YYYY'),
            "Personal_Info-s2-req2": (0, moment_1.default)(customer.customerSignup.enrollmentDate).format('MM'),
            "Personal_Info-s2-req3": (0, moment_1.default)(customer.customerSignup.enrollmentDate).format('DD'),
            "Personal_Info-s3-req1": customer.lastName,
            "Personal_Info-s3-req2": customer.firstName,
            "Personal_Info-s3-req3": (0, moment_1.default)(customer.dob).format('YYYY'),
            "Personal_Info-s3-req4": (0, moment_1.default)(customer.dob).format('MM'),
            "Personal_Info-s3-req5": (0, moment_1.default)(customer.dob).format('DD'),
            "Personal_Info-s3-req6": this.provision.getGenderGreenshield((_a = customer.gender) !== null && _a !== void 0 ? _a : ''),
            "Personal_Info-s3-req7": ((_b = customer.contactInformations[0].apt) !== null && _b !== void 0 ? _b : "") + customer.contactInformations[0].line1,
            "Personal_Info-s3-req8": customer.contactInformations[0].line2,
            "Personal_Info-s3-req9": customer.contactInformations[0].city,
            "Personal_Info-s3-req10": customer.contactInformations[0].state,
            "Personal_Info-s3-req11": greenshieldPlan.plan.stateTaxDetails[0].state.country.greenshieldCode,
            //this.provision.getCountryValue(customer.contactInformations[0].country),//ctl00$cphBody$ddlCountry
            "Personal_Info-s3-req12": customer.contactInformations[0].postalCode,
            "Personal_Info-s3-req13": customer.contactInformations[0].primaryEmail,
            "Personal_Info-s3-req14": customer.contactInformations[0].primaryEmail,
            "Personal_Info-s3-req15": this.provision.getPackageValue(greenshieldPlan.plan.planLevels.greenshieldPackages, greenshieldPlan.plan.stateTaxDetails[0].stateId),
            "Personal_Info-s4-req1": coverage
        };
        let dependantsInfo = [];
        let extdataArray = [];
        let Extdata; // = {...commonExecutionData, ...TestData.single};
        let result;
        switch (coverage) {
            case "S":
                extdataArray.push(extdataObj);
                await (0, storage_helper_1.createFile)(paths_1.TEMP_EXTDATA_FOLDER, "ExternalData_" + customer.id + "_S.json", JSON.stringify(extdataArray));
                constants_1.TestDataGreenshield.single.source.link = paths_1.SERVER_EXTDATA_PATH + "ExternalData_" + customer.id + "_S.json";
                constants_1.commonExecutionData.executeAll = 0;
                constants_1.commonExecutionData.testCases = constants_1.targetTestcasesGreenshield.single; //['OpenUrl', 'login', 'Personal_Info', 'SignOut']
                Extdata = { ...constants_1.commonExecutionData, ...constants_1.TestDataGreenshield.single };
                Extdata.customerId = customer.id;
                result = await this.aitp.soleExecution(Extdata, true, 'greenshield');
                //delete tempfile
                await (0, storage_helper_1.deleteFile)(paths_1.TEMP_EXTDATA_FOLDER + "/ExternalData_" + customer.id + "_S.json");
                break;
            case "C2":
                if (customer.customerRelatives) {
                    dependantsInfo = await this.provision.getDependantInfoGreenshield(customer.customerRelatives);
                    //console.log(dependantsInfo);
                    extdataObj = { ...extdataObj, ...dependantsInfo.dependantsExtdataObject };
                    extdataArray.push(extdataObj);
                    if (dependantsInfo.dependantsNumber > 0 && dependantsInfo.disabledChildrenNumber > 0) {
                        //mail related to special child
                    }
                    else {
                        await (0, storage_helper_1.createFile)(paths_1.TEMP_EXTDATA_FOLDER, "ExternalData_" + customer.id + "_C.json", JSON.stringify(extdataArray));
                        constants_1.TestDataGreenshield.couple.source.link = paths_1.SERVER_EXTDATA_PATH + "ExternalData_" + customer.id + "_C.json";
                        constants_1.commonExecutionData.executeAll = 0;
                        constants_1.commonExecutionData.testCases = constants_1.targetTestcasesGreenshield.couple; //['OpenUrl', 'login', 'Personal_Info', 'Dependents', 'SignOut']
                        Extdata = { ...constants_1.commonExecutionData, ...constants_1.TestDataGreenshield.couple };
                        Extdata.customerId = customer.id;
                        result = await this.aitp.soleExecution(Extdata, true, 'greenshield');
                        //delete tempfile
                        await (0, storage_helper_1.deleteFile)(paths_1.TEMP_EXTDATA_FOLDER + "/ExternalData_" + customer.id + "_C.json");
                    }
                }
                else {
                    console.log("no customer relatives.. wrong coverage C2");
                }
                break;
            case "F1":
                if (customer.customerRelatives) {
                    dependantsInfo = await this.provision.getDependantsInfoGreenshield(customer.customerRelatives);
                    //console.log(dependantsInfo);
                    extdataObj = { ...extdataObj, ...dependantsInfo.dependantsExtdataObject };
                    extdataArray.push(extdataObj);
                    if (dependantsInfo.dependantsNumber > 0 && dependantsInfo.disabledChildrenNumber > 0) {
                        //mail related to special child
                    }
                    else {
                        await (0, storage_helper_1.createFile)(paths_1.TEMP_EXTDATA_FOLDER, "ExternalData_" + customer.id + "_F.json", JSON.stringify(extdataArray));
                        constants_1.TestDataGreenshield.family.source.link = paths_1.SERVER_EXTDATA_PATH + "ExternalData_" + customer.id + "_F.json";
                        constants_1.commonExecutionData.executeAll = 0;
                        constants_1.commonExecutionData.testCases = constants_1.targetTestcasesGreenshield.family; //['OpenUrl', 'login', 'Personal_Info', 'Dependents', 'SignOut']
                        Extdata = { ...constants_1.commonExecutionData, ...constants_1.TestDataGreenshield.family };
                        Extdata.customerId = customer.id;
                        result = await this.aitp.soleExecution(Extdata, true, 'greenshield');
                        //delete tempfile
                        await (0, storage_helper_1.deleteFile)(paths_1.TEMP_EXTDATA_FOLDER + "/ExternalData_" + customer.id + "_F.json");
                    }
                }
                else {
                    console.log("no customer relatives.. wrong coverage F1");
                }
                break;
        }
        return result;
    }
    async terminateGreenshieldSingle(customer) {
        let extdata = [{
                "Terminate_Member-s3-req1": customer.greenshieldMemberId,
                "Terminate_Member-s4-req1": customer.greenshieldMemberId,
                "Terminate_Member-s6-req1": (0, moment_1.default)(customer.customerSignup.enrollmentDate).format('YYYY'),
                "Terminate_Member-s6-req2": (0, moment_1.default)(customer.customerSignup.enrollmentDate).format('MM'),
                "Terminate_Member-s6-req3": (0, moment_1.default)(customer.customerSignup.enrollmentDate).format('DD'),
                "Terminate_Member-s6-req4": "N",
                "Terminate_Member-s6-req5": "AU" //AUDIT
            }];
        let Extdata; // = {...commonExecutionData, ...TestData.single};
        await (0, storage_helper_1.createFile)(paths_1.TEMP_EXTDATA_FOLDER, "ExternalData_" + customer.id + "_Terminate.json", JSON.stringify(extdata));
        constants_1.TestDataGreenshield.terminate.source.link = paths_1.SERVER_EXTDATA_PATH + "ExternalData_" + customer.id + "_Terminate.json";
        constants_1.commonExecutionData.executeAll = 0;
        constants_1.commonExecutionData.testCases = constants_1.targetTestcasesGreenshield.terminate; //['OpenUrl', 'login', 'Terminate_Member', 'SignOut']
        Extdata = { ...constants_1.commonExecutionData, ...constants_1.TestDataGreenshield.terminate };
        Extdata.customerId = customer.id;
        const result = await this.aitp.soleExecution(Extdata, false, 'greenshield');
        //delete tempfile
        await (0, storage_helper_1.deleteFile)(paths_1.TEMP_EXTDATA_FOLDER + "/ExternalData_" + customer.id + "_Terminate.json");
        return result;
    }
};
GreenshieldProvisioningService = tslib_1.__decorate([
    (0, core_1.injectable)({ scope: core_1.BindingScope.TRANSIENT }),
    tslib_1.__param(0, (0, core_1.service)(common_provisioning_service_1.CommonProvisioningService)),
    tslib_1.__param(1, (0, core_1.service)(aitp_service_1.AitpService)),
    tslib_1.__metadata("design:paramtypes", [common_provisioning_service_1.CommonProvisioningService,
        aitp_service_1.AitpService])
], GreenshieldProvisioningService);
exports.GreenshieldProvisioningService = GreenshieldProvisioningService;
//# sourceMappingURL=greenshield-provisioning.service.js.map