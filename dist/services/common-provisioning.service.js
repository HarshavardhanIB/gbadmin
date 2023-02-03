"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommonProvisioningService = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const moment_1 = tslib_1.__importDefault(require("moment"));
const constants_1 = require("../constants");
//import {CommonRegistrationService} from './common-registration.service';
let CommonProvisioningService = class CommonProvisioningService {
    getPackageValueExecutive //SP
    (equitablePackages, stateId) {
        throw new Error('Method not implemented.');
    }
    getDependantsInfoExecutive(customerRelatives) {
        throw new Error('Method not implemented.');
    }
    getDependantInfoExecutive(customerRelatives) {
        throw new Error('Method not implemented.');
    }
    constructor( /* Add @inject to inject parameters */
    //@service(CommonRegistrationService) private creg: CommonRegistrationService
    ) { }
    /*
     * Add service methods here
     */
    getPackageValue(greenshieldPackages, stateId) {
        //throw new Error('Function not implemented.');
        //  [
        //   {
        //     "id": 14,
        //     "planLevelId": 2,
        //     "stateId": 2,
        //     "name": "H"
        //   }
        // ]
        let gspName = "";
        for (const gsp of greenshieldPackages) {
            if (gsp.stateId == parseInt(stateId)) {
                gspName = gsp.name;
                break;
            }
        }
        return gspName;
    }
    getPackageValueGreenshield(greenshieldPackages, stateId) {
        let gspName = "";
        for (const gsp of greenshieldPackages) {
            if (gsp.stateId == parseInt(stateId)) {
                gspName = gsp.name;
                break;
            }
        }
        return gspName;
    }
    getPackageValueEquitable(equitablePackages, stateId) {
        var _a, _b, _c, _d;
        //return division_code and class_code
        let espDivisionCode = "", espClassCode = "";
        let espDivisionName = "", espClassName = "";
        for (const esp of equitablePackages) {
            if (esp.stateId == parseInt(stateId)) {
                espDivisionCode = esp.divisionCode;
                espClassCode = esp.classCode;
                //002 - Provinces and Territories without Pharmacare (Classes D, E & F)
                espDivisionName = (_b = (_a = esp.divisionName) === null || _a === void 0 ? void 0 : _a.split(" - ")[0]) === null || _b === void 0 ? void 0 : _b.trim();
                //D - outside BC/MB/SK who selected GoldPlan (Div2)
                espClassName = (_d = (_c = esp.className) === null || _c === void 0 ? void 0 : _c.split(" - ")[0]) === null || _d === void 0 ? void 0 : _d.trim();
                break;
            }
        }
        return { "division": espDivisionCode, "class": espClassCode, "divisionName": espDivisionName, "className": espClassName };
    }
    getCountryValue(country) {
        throw new Error('Function not implemented.');
    }
    getGenderGreenshield(gender) {
        let greenshieldGender;
        switch (gender) {
            case constants_1.GENDER.MALE:
                greenshieldGender = 'M';
                break;
            case constants_1.GENDER.FEMALE:
                greenshieldGender = 'F';
                break;
            case constants_1.GENDER.UNDISCLOSED:
                greenshieldGender = 'U';
                break;
            case constants_1.GENDER.NONBINARY:
                greenshieldGender = 'X';
                break;
            default:
                greenshieldGender = 'M';
        }
        return greenshieldGender;
    }
    getCoverageValue(greenshieldPlan) {
        //S, C1, F2
        let coverage;
        if (greenshieldPlan.plan) {
            coverage = greenshieldPlan.plan.planCoverage;
        }
        else {
            coverage = greenshieldPlan.planCoverage;
        }
        console.log(`coverage:${coverage}`);
        let gsCoverage = "";
        switch (coverage) {
            case "FAMILY":
                gsCoverage = "F1";
                break;
            case "COUPLE":
                gsCoverage = "C2";
                break;
            case "SINGLE":
                gsCoverage = "S";
                break;
            default:
        }
        return gsCoverage;
        //  throw new Error('Function not implemented.');
        //having_spouse: boolean, spouse_coverage: boolean, no_of_children: number, children_coverage: string
    }
    getCoverageValueGreenshield(greenshieldPlan) {
        //S, C1, F2
        let coverage;
        if (greenshieldPlan.plan) {
            coverage = greenshieldPlan.plan.planCoverage;
        }
        else {
            coverage = greenshieldPlan.planCoverage;
        }
        console.log(`coverage:${coverage}`);
        let gsCoverage = "";
        switch (coverage) {
            case "FAMILY":
                gsCoverage = "F1";
                break;
            case "COUPLE":
                gsCoverage = "C2";
                break;
            case "SINGLE":
                gsCoverage = "S";
                break;
            default:
        }
        return gsCoverage;
        //  throw new Error('Function not implemented.');
        //having_spouse: boolean, spouse_coverage: boolean, no_of_children: number, children_coverage: string
    }
    getGenderEquitable(gender) {
        let equitableGender;
        switch (gender) {
            case constants_1.GENDER.MALE:
                equitableGender = '2';
                break;
            case constants_1.GENDER.FEMALE:
                equitableGender = '1';
                break;
            case constants_1.GENDER.UNDISCLOSED:
                equitableGender = '3';
            case constants_1.GENDER.NONBINARY:
                equitableGender = '4';
            default:
                equitableGender = '1';
        }
        return equitableGender;
    }
    getCoverageValueEquitable(equitablePlan) {
        //1, 2, 3
        let coverage;
        if (equitablePlan.plan) {
            coverage = equitablePlan.plan.planCoverage;
        }
        else {
            coverage = equitablePlan.planCoverage;
        }
        console.log(`coverage:${coverage}`);
        let eqCoverage = "";
        switch (coverage) {
            case "FAMILY":
                eqCoverage = "3";
                break;
            case "COUPLE":
                eqCoverage = "2";
                break;
            case "SINGLE":
                eqCoverage = "1";
                break;
            default:
        }
        return eqCoverage;
    }
    getYearMonthDateSplit(date) {
        let dateObj = {};
        let dateArray = date.split("-");
        dateObj.Year = dateArray[0];
        dateObj.Month = dateArray[1];
        dateObj.Day = dateArray[2];
        return dateObj;
    }
    async getDependantInfo(customerRelatives) {
        //single dependant -- spouse or child
        let dependantsExtdataObject = {};
        let dependantsInfo = {};
        let spouse = {};
        let children = [];
        let dependants = [];
        let schoolChildren = [];
        let disabledChildren = [];
        let no_of_children = 0; //max15
        let no_of_dependants = 0; //max16
        let no_of_schoolChildren = 0;
        let no_of_specialChildren = 0;
        let index = 1;
        for (let cr of customerRelatives) {
            if (cr.relationshipType == "CHILDREN") {
                //18years??
                if (cr.isDisabled) {
                    //SN
                    no_of_specialChildren++;
                    disabledChildren.push(cr);
                    if (cr.enrolledInUniversity) {
                        no_of_schoolChildren++;
                        schoolChildren.push(cr);
                    }
                }
                else {
                    //DE
                    dependantsExtdataObject["Dependents-s2-req" + index++] = 'DE';
                    dependantsExtdataObject["Dependents-s2-req" + index++] = cr.lastName;
                    dependantsExtdataObject["Dependents-s2-req" + index++] = cr.firstName;
                    dependantsExtdataObject["Dependents-s2-req" + index++] = (0, moment_1.default)(cr.dob).format('YYYY');
                    dependantsExtdataObject["Dependents-s2-req" + index++] = (0, moment_1.default)(cr.dob).format('MM');
                    dependantsExtdataObject["Dependents-s2-req" + index++] = (0, moment_1.default)(cr.dob).format('DD');
                    dependantsExtdataObject["Dependents-s2-req" + index++] = this.getGenderGreenshield(cr.gender); //cr.gender ? ((cr.gender == "NON-BINARY") ? 'X' : cr.gender[0]) : '' //ctl00$cphBody$ddlGender //if Male --> M, F, X, U
                    let childAge = calculateAge(cr.dob);
                    if (childAge >= 18) {
                        if (cr.enrolledInUniversity) {
                            dependantsExtdataObject["Dependents-s3-req1"] = 'Y';
                        }
                        else {
                            dependantsExtdataObject["Dependents-s3-req1"] = 'N';
                        }
                        dependantsExtdataObject["Dependents-s3-req2"] = 'Next Step';
                    }
                    else {
                        dependantsExtdataObject["Dependents-s3-req1"] = 'aitp_exec_false';
                        dependantsExtdataObject["Dependents-s3-req2"] = 'aitp_exec_false';
                    }
                    if (cr.enrolledInUniversity) {
                        no_of_schoolChildren++;
                        schoolChildren.push(cr);
                    }
                }
                no_of_children++;
                children.push(cr);
            }
            else if (cr.relationshipType == "SPOUSE") {
                //SP
                dependantsExtdataObject["Dependents-s2-req" + index++] = 'SP';
                dependantsExtdataObject["Dependents-s2-req" + index++] = cr.lastName;
                dependantsExtdataObject["Dependents-s2-req" + index++] = cr.firstName;
                dependantsExtdataObject["Dependents-s2-req" + index++] = (0, moment_1.default)(cr.dob).format('YYYY');
                dependantsExtdataObject["Dependents-s2-req" + index++] = (0, moment_1.default)(cr.dob).format('MM');
                dependantsExtdataObject["Dependents-s2-req" + index++] = (0, moment_1.default)(cr.dob).format('DD');
                dependantsExtdataObject["Dependents-s2-req" + index++] = this.getGenderGreenshield(cr.gender); //cr.gender ? ((cr.gender == "NON-BINARY") ? 'X' : cr.gender[0]) : '' //ctl00$cphBody$ddlGender //if Male --> M, F, X, U
                dependantsExtdataObject["Dependents-s3-req1"] = 'aitp_exec_false';
                dependantsExtdataObject["Dependents-s3-req2"] = 'aitp_exec_false';
                //no_of_dependants++;
                spouse = cr;
            }
            else {
                console.log(cr.relationshipType);
            }
            no_of_dependants++;
            dependants.push(cr);
        }
        //
        dependantsInfo.dependantsNumber = no_of_dependants;
        dependantsInfo.dependants = dependants;
        dependantsInfo.childrenNumber = no_of_children;
        dependantsInfo.children = dependants;
        dependantsInfo.disabledChildrenNumber = no_of_specialChildren;
        dependantsInfo.disabledChildren = disabledChildren;
        dependantsInfo.schoolChildrenNumber = no_of_schoolChildren;
        dependantsInfo.schoolChildren = schoolChildren;
        dependantsInfo.spouse = spouse;
        dependantsInfo.dependantsExtdataObject = dependantsExtdataObject;
        return dependantsInfo;
    }
    async getDependantsInfo(customerRelatives) {
        let dependantsExtdataObject = {};
        let dependantsInfo = {};
        let spouse = {};
        let children = [];
        let dependants = [];
        let schoolChildren = [];
        let disabledChildren = [];
        let no_of_children = 0; //max15
        let no_of_dependants = 0; //max16
        let no_of_schoolChildren = 0;
        let no_of_specialChildren = 0;
        let index = 1;
        let indexs7 = 1;
        let childAge;
        let childAge18 = 0;
        for (let cr of customerRelatives) {
            if (cr.relationshipType == "CHILDREN") {
                //18years??
                if (cr.isDisabled) {
                    //SN
                    no_of_specialChildren++;
                    disabledChildren.push(cr);
                    if (cr.enrolledInUniversity) {
                        no_of_schoolChildren++;
                        schoolChildren.push(cr);
                    }
                }
                else {
                    //DE
                    dependantsExtdataObject["Dependents-s5-req" + index++] = 'DE';
                    dependantsExtdataObject["Dependents-s5-req" + index++] = cr.lastName;
                    dependantsExtdataObject["Dependents-s5-req" + index++] = cr.firstName;
                    dependantsExtdataObject["Dependents-s5-req" + index++] = (0, moment_1.default)(cr.dob).format('YYYY');
                    dependantsExtdataObject["Dependents-s5-req" + index++] = (0, moment_1.default)(cr.dob).format('MM');
                    dependantsExtdataObject["Dependents-s5-req" + index++] = (0, moment_1.default)(cr.dob).format('DD');
                    dependantsExtdataObject["Dependents-s5-req" + index++] = this.getGenderGreenshield(cr.gender); //cr.gender ? ((cr.gender == "NON-BINARY") ? 'X' : cr.gender[0]) : '' //ctl00$cphBody$ddlGender //if Male --> M, F, X, U
                    childAge = calculateAge(cr.dob);
                    if (childAge >= 18) {
                        childAge18++;
                        if (cr.enrolledInUniversity) {
                            dependantsExtdataObject["Dependents-s6-req" + indexs7++] = 'Y';
                        }
                        else {
                            dependantsExtdataObject["Dependents-s6-req" + indexs7++] = 'N';
                        }
                    }
                    if (cr.enrolledInUniversity) {
                        no_of_schoolChildren++;
                        schoolChildren.push(cr);
                    }
                }
                no_of_children++;
                children.push(cr);
            }
            else if (cr.relationshipType == "SPOUSE") {
                //SP
                dependantsExtdataObject["Dependents-s5-req" + index++] = 'SP';
                dependantsExtdataObject["Dependents-s5-req" + index++] = cr.lastName;
                dependantsExtdataObject["Dependents-s5-req" + index++] = cr.firstName;
                dependantsExtdataObject["Dependents-s5-req" + index++] = (0, moment_1.default)(cr.dob).format('YYYY');
                dependantsExtdataObject["Dependents-s5-req" + index++] = (0, moment_1.default)(cr.dob).format('MM');
                dependantsExtdataObject["Dependents-s5-req" + index++] = (0, moment_1.default)(cr.dob).format('DD');
                dependantsExtdataObject["Dependents-s5-req" + index++] = this.getGenderGreenshield(cr.gender); //cr.gender ? ((cr.gender == "NON-BINARY") ? 'X' : cr.gender[0]) : '' //ctl00$cphBody$ddlGender //if Male --> M, F, X, U
                no_of_dependants++;
                spouse = cr;
            }
            else {
                console.log(cr.relationshipType);
            }
            no_of_dependants++;
            dependants.push(cr);
        }
        console.log(index);
        let max_no_s5 = 112;
        console.log(`index: ${index}`);
        for (let i = index; i <= max_no_s5; i++) {
            dependantsExtdataObject["Dependents-s5-req" + i] = 'aitp_exec_false';
        }
        let max_no_s6 = 15;
        console.log(`indexs7: ${indexs7}`);
        for (let i = indexs7; i <= max_no_s6; i++) {
            dependantsExtdataObject["Dependents-s6-req" + i] = 'aitp_exec_false';
        }
        //
        dependantsInfo.dependantsNumber = no_of_dependants;
        dependantsInfo.dependants = dependants;
        dependantsInfo.childrenNumber = no_of_children;
        dependantsInfo.children = dependants;
        dependantsInfo.disabledChildrenNumber = no_of_specialChildren;
        dependantsInfo.disabledChildren = disabledChildren;
        dependantsInfo.schoolChildrenNumber = no_of_schoolChildren;
        dependantsInfo.schoolChildren = schoolChildren;
        dependantsInfo.spouse = spouse;
        console.log(`no. of children > 18: ${childAge18}`);
        if (childAge18 > 0) {
            dependantsExtdataObject["Dependents-s6-req16"] = 'Next Step';
        }
        else {
            dependantsExtdataObject["Dependents-s6-req16"] = 'aitp_exec_false';
        }
        dependantsInfo.dependantsExtdataObject = dependantsExtdataObject;
        return dependantsInfo;
    }
    async getDependantInfoGreenshield(customerRelatives) {
        //single dependant -- spouse or child
        let dependantsExtdataObject = {};
        let dependantsInfo = {};
        let spouse = {};
        let children = [];
        let dependants = [];
        let schoolChildren = [];
        let disabledChildren = [];
        let no_of_children = 0; //max15
        let no_of_dependants = 0; //max16
        let no_of_schoolChildren = 0;
        let no_of_specialChildren = 0;
        let index = 1;
        for (let cr of customerRelatives) {
            if (cr.relationshipType == "CHILDREN") {
                //18years??
                if (cr.isDisabled) {
                    //SN
                    no_of_specialChildren++;
                    disabledChildren.push(cr);
                    if (cr.enrolledInUniversity) {
                        no_of_schoolChildren++;
                        schoolChildren.push(cr);
                    }
                }
                else {
                    //DE
                    dependantsExtdataObject["Dependents-s2-req" + index++] = 'DE';
                    dependantsExtdataObject["Dependents-s2-req" + index++] = cr.lastName;
                    dependantsExtdataObject["Dependents-s2-req" + index++] = cr.firstName;
                    dependantsExtdataObject["Dependents-s2-req" + index++] = (0, moment_1.default)(cr.dob).format('YYYY');
                    dependantsExtdataObject["Dependents-s2-req" + index++] = (0, moment_1.default)(cr.dob).format('MM');
                    dependantsExtdataObject["Dependents-s2-req" + index++] = (0, moment_1.default)(cr.dob).format('DD');
                    dependantsExtdataObject["Dependents-s2-req" + index++] = this.getGenderGreenshield(cr.gender); //cr.gender ? ((cr.gender == "NON-BINARY") ? 'X' : cr.gender[0]) : '' //ctl00$cphBody$ddlGender //if Male --> M, F, X, U
                    let childAge = calculateAge(cr.dob);
                    //if (childAge >= 18) {
                    if (childAge >= (process.env.GS_CHILD_AGE || 21)) {
                        if (cr.enrolledInUniversity) {
                            dependantsExtdataObject["Dependents-s3-req1"] = 'aitp_exec_false';
                            dependantsExtdataObject["Dependents-s3-req2"] = 'Y';
                        }
                        else {
                            dependantsExtdataObject["Dependents-s3-req1"] = 'N';
                            dependantsExtdataObject["Dependents-s3-req2"] = 'aitp_exec_false';
                        }
                        dependantsExtdataObject["Dependents-s3-req3"] = 'Next Step';
                    }
                    else {
                        dependantsExtdataObject["Dependents-s3-req1"] = 'aitp_exec_false';
                        dependantsExtdataObject["Dependents-s3-req2"] = 'aitp_exec_false';
                        dependantsExtdataObject["Dependents-s3-req3"] = 'aitp_exec_false';
                    }
                    if (cr.enrolledInUniversity) {
                        no_of_schoolChildren++;
                        schoolChildren.push(cr);
                    }
                }
                no_of_children++;
                children.push(cr);
            }
            else if (cr.relationshipType == "SPOUSE") {
                //SP
                dependantsExtdataObject["Dependents-s2-req" + index++] = 'SP';
                dependantsExtdataObject["Dependents-s2-req" + index++] = cr.lastName;
                dependantsExtdataObject["Dependents-s2-req" + index++] = cr.firstName;
                dependantsExtdataObject["Dependents-s2-req" + index++] = (0, moment_1.default)(cr.dob).format('YYYY');
                dependantsExtdataObject["Dependents-s2-req" + index++] = (0, moment_1.default)(cr.dob).format('MM');
                dependantsExtdataObject["Dependents-s2-req" + index++] = (0, moment_1.default)(cr.dob).format('DD');
                dependantsExtdataObject["Dependents-s2-req" + index++] = this.getGenderGreenshield(cr.gender); //cr.gender ? ((cr.gender == "NON-BINARY") ? 'X' : cr.gender[0]) : '' //ctl00$cphBody$ddlGender //if Male --> M, F, X, U
                dependantsExtdataObject["Dependents-s3-req1"] = 'aitp_exec_false';
                dependantsExtdataObject["Dependents-s3-req2"] = 'aitp_exec_false';
                dependantsExtdataObject["Dependents-s3-req3"] = 'aitp_exec_false';
                //no_of_dependants++;
                spouse = cr;
            }
            else {
                console.log(cr.relationshipType);
            }
            no_of_dependants++;
            dependants.push(cr);
        }
        //
        dependantsInfo.dependantsNumber = no_of_dependants;
        dependantsInfo.dependants = dependants;
        dependantsInfo.childrenNumber = no_of_children;
        dependantsInfo.children = dependants;
        dependantsInfo.disabledChildrenNumber = no_of_specialChildren;
        dependantsInfo.disabledChildren = disabledChildren;
        dependantsInfo.schoolChildrenNumber = no_of_schoolChildren;
        dependantsInfo.schoolChildren = schoolChildren;
        dependantsInfo.spouse = spouse;
        dependantsInfo.dependantsExtdataObject = dependantsExtdataObject;
        return dependantsInfo;
    }
    async getDependantsInfoGreenshield(customerRelatives) {
        let dependantsExtdataObject = {};
        let dependantsInfo = {};
        let spouse = {};
        let children = [];
        let dependants = [];
        let schoolChildren = [];
        let disabledChildren = [];
        let no_of_children = 0; //max15
        let no_of_dependants = 0; //max16
        let no_of_schoolChildren = 0;
        let no_of_specialChildren = 0;
        let index = 1;
        let indexs7 = 1;
        let childAge;
        let childAge18 = 0;
        for (let cr of customerRelatives) {
            if (cr.relationshipType == "CHILDREN") {
                //18years??
                if (cr.isDisabled) {
                    //SN
                    no_of_specialChildren++;
                    disabledChildren.push(cr);
                    if (cr.enrolledInUniversity) {
                        no_of_schoolChildren++;
                        schoolChildren.push(cr);
                    }
                }
                else {
                    //DE
                    dependantsExtdataObject["Dependents-s5-req" + index++] = 'DE';
                    dependantsExtdataObject["Dependents-s5-req" + index++] = cr.lastName;
                    dependantsExtdataObject["Dependents-s5-req" + index++] = cr.firstName;
                    dependantsExtdataObject["Dependents-s5-req" + index++] = (0, moment_1.default)(cr.dob).format('YYYY');
                    dependantsExtdataObject["Dependents-s5-req" + index++] = (0, moment_1.default)(cr.dob).format('MM');
                    dependantsExtdataObject["Dependents-s5-req" + index++] = (0, moment_1.default)(cr.dob).format('DD');
                    dependantsExtdataObject["Dependents-s5-req" + index++] = this.getGenderGreenshield(cr.gender); //cr.gender ? ((cr.gender == "NON-BINARY") ? 'X' : cr.gender[0]) : '' //ctl00$cphBody$ddlGender //if Male --> M, F, X, U
                    childAge = calculateAge(cr.dob);
                    //if (childAge >= 18) {
                    if (childAge >= (process.env.GS_CHILD_AGE || 21)) {
                        childAge18++;
                        if (cr.enrolledInUniversity) {
                            dependantsExtdataObject["Dependents-s6-req" + indexs7++] = 'aitp_exec_false';
                            dependantsExtdataObject["Dependents-s6-req" + indexs7++] = 'Y';
                        }
                        else {
                            dependantsExtdataObject["Dependents-s6-req" + indexs7++] = 'N';
                            dependantsExtdataObject["Dependents-s6-req" + indexs7++] = 'aitp_exec_false';
                        }
                    }
                    if (cr.enrolledInUniversity) {
                        no_of_schoolChildren++;
                        schoolChildren.push(cr);
                    }
                }
                no_of_children++;
                children.push(cr);
            }
            else if (cr.relationshipType == "SPOUSE") {
                //SP
                dependantsExtdataObject["Dependents-s5-req" + index++] = 'SP';
                dependantsExtdataObject["Dependents-s5-req" + index++] = cr.lastName;
                dependantsExtdataObject["Dependents-s5-req" + index++] = cr.firstName;
                dependantsExtdataObject["Dependents-s5-req" + index++] = (0, moment_1.default)(cr.dob).format('YYYY');
                dependantsExtdataObject["Dependents-s5-req" + index++] = (0, moment_1.default)(cr.dob).format('MM');
                dependantsExtdataObject["Dependents-s5-req" + index++] = (0, moment_1.default)(cr.dob).format('DD');
                dependantsExtdataObject["Dependents-s5-req" + index++] = this.getGenderGreenshield(cr.gender); //cr.gender ? ((cr.gender == "NON-BINARY") ? 'X' : cr.gender[0]) : '' //ctl00$cphBody$ddlGender //if Male --> M, F, X, U
                no_of_dependants++;
                spouse = cr;
            }
            else {
                console.log(cr.relationshipType);
            }
            no_of_dependants++;
            dependants.push(cr);
        }
        console.log(index);
        let max_no_s5 = 112;
        console.log(`index: ${index}`);
        for (let i = index; i <= max_no_s5; i++) {
            dependantsExtdataObject["Dependents-s5-req" + i] = 'aitp_exec_false';
        }
        let max_no_s6 = 30; //15
        console.log(`indexs7: ${indexs7}`);
        for (let i = indexs7; i <= max_no_s6; i++) {
            dependantsExtdataObject["Dependents-s6-req" + i] = 'aitp_exec_false';
        }
        //
        dependantsInfo.dependantsNumber = no_of_dependants;
        dependantsInfo.dependants = dependants;
        dependantsInfo.childrenNumber = no_of_children;
        dependantsInfo.children = dependants;
        dependantsInfo.disabledChildrenNumber = no_of_specialChildren;
        dependantsInfo.disabledChildren = disabledChildren;
        dependantsInfo.schoolChildrenNumber = no_of_schoolChildren;
        dependantsInfo.schoolChildren = schoolChildren;
        dependantsInfo.spouse = spouse;
        console.log(`no. of children > 18: ${childAge18}`);
        if (childAge18 > 0) {
            //dependantsExtdataObject["Dependents-s6-req16"] = 'Next Step'
            dependantsExtdataObject["Dependents-s6-req31"] = 'Next Step';
        }
        else {
            //dependantsExtdataObject["Dependents-s6-req16"] = 'aitp_exec_false'
            dependantsExtdataObject["Dependents-s6-req31"] = 'Next Step';
        }
        dependantsInfo.dependantsExtdataObject = dependantsExtdataObject;
        return dependantsInfo;
    }
    async getDependantInfoEquitable(customerRelatives) {
        // {
        //   "Dependents_info-s2-req1": "Child2F",
        //     "Dependents_info-s2-req2": "Child2L",
        //       "Dependents_info-s2-req4": "8/22/2009",
        //         "Dependents_info-s2-req5": "2",
        var _a, _b, _c;
        //           "Dependents_info-s2-req6": "2",
        //             "Dependents_info-s3-req1": "5",
        //               "Dependents_info-s3-req2": "8/22/2009", //universityGraduationDay // coverageExpiry
        //                 "Dependents_info-s4-req1": "1",
        //                   "Dependents_info-s4-req2": "50",
        //                     "Dependents_info-s4-req3": "1",
        //                       "Dependents_info-s4-req4": ""
        //"21",
        //"22",
        //"23",
        // "24",
        //// "25",
        //"26",
        // }
        /*  "PersonalInfo-s2-req23": "sidTest",
             "PersonalInfo-s2-req24": "sidTest",
             "PersonalInfo-s2-req25": "1/2/1996",
             "PersonalInfo-s2-req26": "1",
    
             "PersonalInfo-s2-req27": "2",
             "PersonalInfo-s2-req28": "5",
    
             "PersonalInfo-s2-req29": "1/10/2023",
    
             "PersonalInfo-s2-req31": "1",
             "PersonalInfo-s2-req32": "50",
             "PersonalInfo-s2-req33": "1",
             "PersonalInfo-s2-req34": "Coupletest" */
        //single dependant -- spouse or child
        let dependantsExtdataObject = {};
        let dependantsInfo = {};
        let spouse = {};
        let children = [];
        let dependants = [];
        let schoolChildren = [];
        let disabledChildren = [];
        let no_of_children = 0; //max15
        let no_of_dependants = 0; //max16
        let no_of_schoolChildren = 0;
        let no_of_specialChildren = 0;
        let index = 1;
        for (let cr of customerRelatives) {
            dependantsExtdataObject["PersonalInfo-s2-req23"] = cr.firstName;
            dependantsExtdataObject["PersonalInfo-s2-req24"] = cr.lastName;
            dependantsExtdataObject["PersonalInfo-s2-req25"] = (0, moment_1.default)(cr.dob).format('M/D/YYYY');
            dependantsExtdataObject["PersonalInfo-s2-req26"] = this.getGenderEquitable(cr.gender);
            if (cr.relationshipType == "CHILDREN") {
                //18years??
                if (cr.isDisabled) {
                    //SN
                    no_of_specialChildren++;
                    disabledChildren.push(cr);
                    if (cr.enrolledInUniversity) {
                        no_of_schoolChildren++;
                        schoolChildren.push(cr);
                    }
                }
                else {
                    dependantsExtdataObject["PersonalInfo-s2-req27"] = '2'; //child //relationship (relative-type)
                    let childAge = calculateAge(cr.dob);
                    if (childAge >= 21) { //21 for equitable
                        dependantsExtdataObject["PersonalInfo-s2-req28"] = '5'; //student //relationship-type (relative sub type)
                        // if (cr.enrolledInUniversity) {
                        //   dependantsExtdataObject["Dependents-s3-req1"] = 'Y'
                        // } else {
                        //   dependantsExtdataObject["Dependents-s3-req1"] = 'N'
                        // }
                        dependantsExtdataObject["PersonalInfo-s2-req29"] = (0, moment_1.default)(cr.universityGraduationDay).format('M/D/YYYY');
                    }
                    else {
                        dependantsExtdataObject["PersonalInfo-s2-req28"] = '4'; //minor //relationship-type (relative sub type)
                        dependantsExtdataObject["PersonalInfo-s2-req29"] = 'aitp_exec_false';
                    }
                    if (cr.enrolledInUniversity) {
                        no_of_schoolChildren++;
                        schoolChildren.push(cr);
                    }
                }
                no_of_children++;
                children.push(cr);
                dependantsExtdataObject["PersonalInfo-s2-req33"] = '1'; //SINGLE always for children
            }
            else if (cr.relationshipType == "SPOUSE") {
                dependantsExtdataObject["PersonalInfo-s2-req27"] = '1'; //spouse //relationship (relative-type)
                dependantsExtdataObject["PersonalInfo-s2-req28"] = '1'; //Married (always) //relationship-type (relative sub type)
                dependantsExtdataObject["PersonalInfo-s2-req29"] = 'aitp_exec_false';
                no_of_dependants++;
                spouse = cr;
                dependantsExtdataObject["PersonalInfo-s2-req33"] = (((_a = cr.cobCoverage) === null || _a === void 0 ? void 0 : _a.toLowerCase()) == "couple" || ((_b = cr.cobCoverage) === null || _b === void 0 ? void 0 : _b.toLowerCase()) == "family") ? "2" : "1"; //SINGLE always //3
            }
            else {
                console.log(cr.relationshipType);
            }
            //cob
            dependantsExtdataObject["PersonalInfo-s2-req31"] = '1'; //1st value --> 1st name
            dependantsExtdataObject["PersonalInfo-s2-req32"] = '50'; //all-benefits //cob type
            dependantsExtdataObject["PersonalInfo-s2-req34"] = (_c = cr.carrierName) !== null && _c !== void 0 ? _c : '';
            no_of_dependants++;
            dependants.push(cr);
        }
        //
        dependantsInfo.dependantsNumber = no_of_dependants;
        dependantsInfo.dependants = dependants;
        dependantsInfo.childrenNumber = no_of_children;
        dependantsInfo.children = dependants;
        dependantsInfo.disabledChildrenNumber = no_of_specialChildren;
        dependantsInfo.disabledChildren = disabledChildren;
        dependantsInfo.schoolChildrenNumber = no_of_schoolChildren;
        dependantsInfo.schoolChildren = schoolChildren;
        dependantsInfo.spouse = spouse;
        dependantsInfo.dependantsExtdataObject = dependantsExtdataObject;
        return dependantsInfo;
    }
    async getDependantsInfoEquitable(customerRelatives) {
        /*    ["2", "3", "4", "5", "6", "7", //"8",
                  "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", //"20",
                  "21",//"22",
                  "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36",
                  "37", "38", "39", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "50",
                  "51", "52", "53", "54", "55", "56", "57", "58", "59", "60", "61", "62", "63", "64",
                  "65", "66", "67", "68", "69", "70", "71", "72", "73", "74", "75", "76", "77", "78",
                  "79", "80", "81", "82", "83", "84", "85", "86", "87", "88", "89", "90", "91", "92",
                  "93", "94", "95", "96", "97", "98", "99", "100", "101", "102", "103", "104", "105", "106",
                  "107", "108", "109", "110", "111", "112", "113", "114", "115", "116", "117", "118", "119", "120",
                  "121", "122", "123", "124", "125", "126", "127", "128", "129", "130", "131", "132", "133", "134",
                  "135", "136", "137", "138", "139", "140", "141", "142", "143", "144", "145", "146", "147", "148",
                  "149", "150", "151", "152", "153", "154", "155", "156", "157", "158", "159", "160", "161", "162"
                ] */
        var _a, _b, _c;
        let dependantsExtdataObject = {};
        let dependantsInfo = {};
        let spouse = {};
        let children = [];
        let dependants = [];
        let schoolChildren = [];
        let disabledChildren = [];
        let no_of_children = 0; //max15 //max9
        let no_of_dependants = 0; //max16 //max10
        let no_of_schoolChildren = 0;
        let no_of_specialChildren = 0;
        let indexs2 = 23;
        let childAge;
        let childAge21 = 0;
        for (let cr of customerRelatives) {
            dependantsExtdataObject["PersonalInfo-s2-req" + indexs2++] = cr.firstName; //23
            dependantsExtdataObject["PersonalInfo-s2-req" + indexs2++] = cr.lastName; //24
            dependantsExtdataObject["PersonalInfo-s2-req" + indexs2++] = (0, moment_1.default)(cr.dob).format('M/D/YYYY'); //25
            dependantsExtdataObject["PersonalInfo-s2-req" + indexs2++] = this.getGenderEquitable(cr.gender); //26
            if (cr.relationshipType == "CHILDREN") {
                dependantsExtdataObject["PersonalInfo-s2-req" + indexs2++] = '2'; //27 //relation
                //18years??
                if (cr.isDisabled) {
                    //SN
                    no_of_specialChildren++;
                    disabledChildren.push(cr);
                    if (cr.enrolledInUniversity) {
                        no_of_schoolChildren++;
                        schoolChildren.push(cr);
                    }
                }
                else {
                    //DE
                    childAge = calculateAge(cr.dob);
                    if (childAge >= 21) { //21 for eq.
                        dependantsExtdataObject["PersonalInfo-s2-req" + indexs2++] = '5'; //28 Student
                        //dependantsExtdataObject["Dependents_info-s2-req" + indexs2++] = moment(cr.universityGraduationDay).format('M/D/YYYY')
                        childAge21++;
                        if (cr.enrolledInUniversity) {
                        }
                        else {
                        }
                        dependantsExtdataObject["PersonalInfo-s2-req"] = (0, moment_1.default)(cr.universityGraduationDay).format('M/D/YYYY'); //29 //coverageExpiry/unviersaty lastdate
                    }
                    else {
                        dependantsExtdataObject["PersonalInfo-s2-req" + indexs2++] = '4'; //28 Minor
                        dependantsExtdataObject["PersonalInfo-s2-req" + indexs2++] = 'aitp_exec_false'; //29
                    }
                    dependantsExtdataObject["PersonalInfo-s2-req" + indexs2++] = ''; //30 //add dependant
                    dependantsExtdataObject["PersonalInfo-s2-req" + indexs2++] = no_of_dependants + 1; //31
                    dependantsExtdataObject["PersonalInfo-s2-req" + indexs2++] = '50'; //32 //all benefits
                    dependantsExtdataObject["PersonalInfo-s2-req" + indexs2++] = '1'; //33 //always single  //all benefits //3
                    if (cr.enrolledInUniversity) {
                        no_of_schoolChildren++;
                        schoolChildren.push(cr);
                    }
                }
                no_of_children++;
                children.push(cr);
            }
            else if (cr.relationshipType == "SPOUSE") {
                //SP
                dependantsExtdataObject["PersonalInfo-s2-req" + indexs2++] = '1'; //27 //relation
                dependantsExtdataObject["PersonalInfo-s2-req" + indexs2++] = '1'; //28 Married
                dependantsExtdataObject["PersonalInfo-s2-req" + indexs2++] = 'aitp_exec_false'; //29
                dependantsExtdataObject["PersonalInfo-s2-req" + indexs2++] = ''; //30 //add dependant
                dependantsExtdataObject["PersonalInfo-s2-req" + indexs2++] = no_of_dependants + 1; //31
                dependantsExtdataObject["PersonalInfo-s2-req" + indexs2++] = '50'; //32 //all benefits
                dependantsExtdataObject["PersonalInfo-s2-req" + indexs2++] = (((_a = cr.cobCoverage) === null || _a === void 0 ? void 0 : _a.toLowerCase()) == "couple" || ((_b = cr.cobCoverage) === null || _b === void 0 ? void 0 : _b.toLowerCase()) == "family") ? "2" : "1"; //SINGLE always //3
                //no_of_dependants++;
                spouse = cr;
            }
            else {
                console.log(cr.relationshipType);
            }
            dependantsExtdataObject["PersonalInfo-s2-req" + indexs2++] = (_c = cr.carrierName) !== null && _c !== void 0 ? _c : ''; //34
            dependantsExtdataObject["PersonalInfo-s2-req" + indexs2++] = ''; //employer always empty   //35
            dependantsExtdataObject["PersonalInfo-s2-req" + indexs2++] = ''; // 36 Add cob details for the added dependant
            no_of_dependants++;
            dependants.push(cr);
        }
        console.log(indexs2);
        let max_no_s2 = 162;
        console.log(`index: ${indexs2}`); //37
        for (let i = indexs2; i <= max_no_s2; i++) {
            dependantsExtdataObject["PersonalInfo-s2-req" + i] = 'aitp_exec_false';
        }
        //
        dependantsInfo.dependantsNumber = no_of_dependants;
        dependantsInfo.dependants = dependants;
        dependantsInfo.childrenNumber = no_of_children;
        dependantsInfo.children = dependants;
        dependantsInfo.disabledChildrenNumber = no_of_specialChildren;
        dependantsInfo.disabledChildren = disabledChildren;
        dependantsInfo.schoolChildrenNumber = no_of_schoolChildren;
        dependantsInfo.schoolChildren = schoolChildren;
        dependantsInfo.spouse = spouse;
        console.log(`no. of children >= 21: ${childAge21}`);
        // if (childAge18 > 0) {
        //   dependantsExtdataObject["Dependents-s6-req16"] = 'Next Step'
        // } else {
        //   dependantsExtdataObject["Dependents-s6-req16"] = 'aitp_exec_false'
        // }
        dependantsInfo.dependantsExtdataObject = dependantsExtdataObject;
        return dependantsInfo;
    }
    /*
  [
    {
      "Dependents-s5-req1": "SP",
      "Dependents-s5-req2": "Bhavana",
      "Dependents-s5-req3": "1997",
      "Dependents-s5-req4": "08",
      "Dependents-s5-req5": "02",
      "Dependents-s5-req6": "F",
      "Dependents-s5-req7": "DE",
      "Dependents-s5-req8": "Kavya",
      "Dependents-s5-req9": "2000",
      "Dependents-s5-req10": "08",
      "Dependents-s5-req11": "04",
      "Dependents-s5-req12": "F",
      "Dependents-s5-req13": "DE",
      "Dependents-s5-req14": "Ram",
      "Dependents-s5-req15": "1998",
      "Dependents-s5-req16": "08",
      "Dependents-s5-req17": "06",
      "Dependents-s5-req18": "M",
      "Dependents-s5-req19": "DE",
      "Dependents-s5-req20": "Viaan",
      "Dependents-s5-req21": "2000",
      "Dependents-s5-req22": "08",
      "Dependents-s5-req23": "04",
      "Dependents-s5-req24": "M",
      "Dependents-s5-req25": "DE",
      "Dependents-s5-req26": "Priya",
      "Dependents-s5-req27": "1998",
      "Dependents-s5-req28": "08",
      "Dependents-s5-req29": "06",
      "Dependents-s5-req30": "F",
      "Dependents-s5-req31": "DE",
      "Dependents-s5-req32": "Ramesh",
      "Dependents-s5-req33": "2000",
      "Dependents-s5-req34": "08",
      "Dependents-s5-req35": "05",
      "Dependents-s5-req36": "M",
      "Dependents-s5-req37": "DE",
      "Dependents-s5-req38": "Suresh",
      "Dependents-s5-req39": "2000",
      "Dependents-s5-req40": "08",
      "Dependents-s5-req41": "06",
      "Dependents-s5-req42": "M",
      "Dependents-s5-req43": "DE",
      "Dependents-s5-req44": "Virat",
      "Dependents-s5-req45": "1997",
      "Dependents-s5-req46": "08",
      "Dependents-s5-req47": "09",
      "Dependents-s5-req48": "M",
      "Dependents-s5-req49": "DE",
      "Dependents-s5-req50": "Prabhas",
      "Dependents-s5-req51": "1996",
      "Dependents-s5-req52": "07",
      "Dependents-s5-req53": "09",
      "Dependents-s5-req54": "M",
      "Dependents-s5-req55": "DE",
      "Dependents-s5-req56": "Shree",
      "Dependents-s5-req57": "1997",
      "Dependents-s5-req58": "07",
      "Dependents-s5-req59": "09",
      "Dependents-s5-req60": "F",
      "Dependents-s5-req61": "DE",
      "Dependents-s5-req62": "Raj",
      "Dependents-s5-req63": "1998",
      "Dependents-s5-req64": "07",
      "Dependents-s5-req65": "09",
      "Dependents-s5-req66": "M",
      "Dependents-s5-req67": "DE",
      "Dependents-s5-req68": "Samantha",
      "Dependents-s5-req69": "1998",
      "Dependents-s5-req70": "09",
      "Dependents-s5-req71": "09",
      "Dependents-s5-req72": "F",
      "Dependents-s5-req73": "DE",
      "Dependents-s5-req74": "Kajal",
      "Dependents-s5-req75": "1995",
      "Dependents-s5-req76": "05",
      "Dependents-s5-req77": "08",
      "Dependents-s5-req78": "F",
      "Dependents-s5-req79": "DE",
      "Dependents-s5-req80": "Tej",
      "Dependents-s5-req81": "1997",
      "Dependents-s5-req82": "07",
      "Dependents-s5-req83": "07",
      "Dependents-s5-req84": "M",
      "Dependents-s5-req85": "DE",
      "Dependents-s5-req86": "Krish",
      "Dependents-s5-req87": "1997",
      "Dependents-s5-req88": "08",
      "Dependents-s5-req89": "08",
      "Dependents-s5-req90": "M",
      "Dependents-s5-req91": "DE",
      "Dependents-s5-req92": "Allu",
      "Dependents-s5-req93": "1998",
      "Dependents-s5-req94": "08",
      "Dependents-s5-req95": "09",
      "Dependents-s5-req96": "M"
  
       "Dependents-s6-req1": "Y",
      "Dependents-s6-req2": "Y",
      "Dependents-s6-req3": "Y",
      "Dependents-s6-req4": "Y",
      "Dependents-s6-req5": "Y",
      "Dependents-s6-req6": "Y",
      "Dependents-s6-req7": "Y",
      "Dependents-s6-req8": "Y",
      "Dependents-s6-req9": "Y",
      "Dependents-s6-req10": "Y",
      "Dependents-s6-req11": "Y",
      "Dependents-s6-req12": "N",
      "Dependents-s6-req13": "N",
      "Dependents-s6-req14": "Y",
      "Dependents-s6-req15": "NA"
    }
    ]
  
    */
    getCoverageValueExecutive(executivePlan) {
        let coverage;
        if (executivePlan.plan) {
            coverage = executivePlan.plan.planCoverage;
        }
        else {
            coverage = executivePlan.planCoverage;
        }
        console.log(`coverage:${coverage}`);
        let execCoverage = "";
        switch (coverage) {
            case "FAMILY":
                execCoverage = "3";
                break;
            case "COUPLE":
                execCoverage = "2";
                break;
            case "SINGLE":
                execCoverage = "1";
                break;
            default:
        }
        return execCoverage;
    }
};
CommonProvisioningService = tslib_1.__decorate([
    (0, core_1.injectable)({ scope: core_1.BindingScope.TRANSIENT }),
    tslib_1.__metadata("design:paramtypes", [])
], CommonProvisioningService);
exports.CommonProvisioningService = CommonProvisioningService;
function calculateAge(dob) {
    //moment([2017, 01, 05]).fromNow();
    //return moment(dob).fromNow(true);
    return (0, moment_1.default)().diff(dob, 'years', false); //years
}
//# sourceMappingURL=common-provisioning.service.js.map