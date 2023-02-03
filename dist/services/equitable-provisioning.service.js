"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EquitableProvisioningService = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const moment_1 = tslib_1.__importDefault(require("moment"));
const constants_1 = require("../constants");
const paths_1 = require("../paths");
const storage_helper_1 = require("../storage.helper");
const aitp_service_1 = require("./aitp.service");
const common_provisioning_service_1 = require("./common-provisioning.service");
let EquitableProvisioningService = class EquitableProvisioningService {
    constructor(/* Add @inject to inject parameters */ provision, aitp) {
        this.provision = provision;
        this.aitp = aitp;
    }
    /*
     * Add service methods here
     */
    async provisionEquitable(customers) {
        // let greenshieldPlanPackages = [1] //health and dental
        var _a;
        let SCustomers = []; //single
        let C1Customers = []; //couple - customer and 1 dependent(spouse or a child)
        let F2Customers = []; //family - customer with/without spouse and children
        let SDCCustomers = []; // customer with atleast one child as special dependant
        for (let customer of customers) {
            //valid customer plans for grrenshield
            let equitablePlan = {};
            const equitableValidPlans = [];
            for (const cp of customer.customerPlans) {
                //if (GREENSHEILD_PACKAGES.indexOf(cp.plan.packageId) >= 0) {
                if (constants_1.EQUITABLE_PLAN_LEVELS.indexOf(cp.plan.planLevel) >= 0) {
                    equitableValidPlans.push(cp);
                }
            }
            if (equitableValidPlans.length == 0) {
                //no plans
                //just skip....
                console.log("//no plans     //just skip....");
                continue;
            }
            else if (equitableValidPlans.length == 1) {
                equitablePlan = equitableValidPlans[0];
            }
            else {
                console.log('more than 1 plans??? something wrong');
                equitablePlan = equitableValidPlans[0];
            }
            if (!customer.contactInformations) {
                console.log(`no customer contact info.. ?? wrong data.. skip this customer ${customer.id}`);
                continue;
            }
            let coverage = this.provision.getCoverageValueEquitable(equitablePlan);
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
                "Personal_Info-s3-req11": equitablePlan.plan.stateTaxDetails[0].state.country.id,
                //this.provision.getCountryValue(customer.contactInformations[0].country),//ctl00$cphBody$ddlCountry
                "Personal_Info-s3-req12": customer.contactInformations[0].postalCode,
                "Personal_Info-s3-req13": customer.contactInformations[0].primaryEmail,
                "Personal_Info-s3-req14": customer.contactInformations[0].primaryEmail,
                "Personal_Info-s3-req15": this.provision.getPackageValue(equitablePlan.plan.planLevels.equitablePackages, equitablePlan.plan.stateTaxDetails[0].stateId),
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
    //here single doesnt mean coverage but count of customers --- so 1 customer will be provisioned to Equitable
    async provisionEquitableSingle(customer, equitablePlan) {
        var _a, _b, _c, _d, _e, _f;
        if (!customer.contactInformations) {
            console.log(`no customer contact info.. ?? wrong data.. skip this customer ${customer.id}`);
            return null;
        }
        let coverage = this.provision.getCoverageValueEquitable(equitablePlan);
        console.log(`coverage: ${coverage}`);
        //coverage = "1";
        //console.log(`adjusted to coverage: ${coverage} to check eq single only; remove later`);
        let equitableDetails = this.provision.getPackageValueEquitable(equitablePlan.plan.planLevels.equitablePackages, equitablePlan.plan.stateTaxDetails[0].stateId);
        //let equitableStateId = this.provision.getStateIdEquitable()
        //Question only for division1
        let div1_choice = "";
        if (equitableDetails.division == "21514") { //21514 div1
            div1_choice = 'optPPMPYes'; //cntEmployeeDetail_Roc_optPPMPYes
            //cntEmployeeDetail_Roc_optPPMPNo
        }
        else {
            div1_choice = 'aitp_exec_false';
        }
        let gender = "";
        if (customer.gender) {
            switch (customer.gender) {
                case constants_1.GENDER.MALE:
                    gender = "2";
                    break;
                case constants_1.GENDER.FEMALE:
                    gender = "1";
                    break;
            }
        }
        let extdataObjSave = {
            "Personal_information_form-s3-req1": equitableDetails.division,
            "Personal_information_form-s4-req1": equitableDetails.class,
            "Personal_information_form-s5-req1": coverage,
            "Personal_information_form-s6-req1": customer.customerSignup.weeklyHours,
            "Personal_information_form-s6-req2": customer.customerSignup.jobTitle,
            "Personal_information_form-s6-req3": (0, moment_1.default)(customer.customerSignup.hiringDate).format('M/D/YYYY'),
            "Personal_information_form-s6-req5": customer.firstName,
            "Personal_information_form-s6-req6": customer.lastName,
            "Personal_information_form-s6-req7": (0, moment_1.default)(customer.dob).format('M/D/YYYY'),
            "Personal_information_form-s6-req8": gender,
            "Personal_information_form-s6-req10": ((_a = customer.contactInformations[0].apt) !== null && _a !== void 0 ? _a : "") + customer.contactInformations[0].line1,
            "Personal_information_form-s6-req11": customer.contactInformations[0].line2,
            "Personal_information_form-s6-req12": customer.contactInformations[0].city,
            "Personal_information_form-s6-req13": equitablePlan.plan.stateTaxDetails[0].state.country.id,
            "Personal_information_form-s6-req14": equitablePlan.plan.stateTaxDetails[0].state.equitableId,
            "Personal_information_form-s6-req15": (_b = customer.contactInformations[0].postalCode) === null || _b === void 0 ? void 0 : _b.replace(/ /g, ""),
            "Personal_information_form-s7-req1": div1_choice,
            "Personal_information_form-s7-req2": customer.contactInformations[0].primaryEmail,
            "Personal_information_form-s7-req3": customer.contactInformations[0].primaryEmail,
            "Personal_information_form-s8-req1": (0, moment_1.default)(customer.customerSignup.enrollmentDate).format('M/D/YYYY')
        };
        let extdataObjsSave = {
            "Personal_Info-s3-req1": equitableDetails.division,
            "Personal_Info-s4-req1": equitableDetails.class,
            "Personal_Info-s5-req1": coverage,
            "Personal_Info-s6-req1": customer.customerSignup.weeklyHours,
            "Personal_Info-s6-req2": customer.customerSignup.jobTitle,
            "Personal_Info-s6-req3": (0, moment_1.default)(customer.customerSignup.hiringDate).format('M/D/YYYY'),
            "Personal_Info-s6-req5": customer.firstName,
            "Personal_Info-s6-req6": customer.lastName,
            "Personal_Info-s6-req7": (0, moment_1.default)(customer.dob).format('M/D/YYYY'),
            "Personal_Info-s6-req8": gender,
            "Personal_Info-s6-req10": ((_c = customer.contactInformations[0].apt) !== null && _c !== void 0 ? _c : "") + customer.contactInformations[0].line1,
            "Personal_Info-s6-req11": customer.contactInformations[0].line2,
            "Personal_Info-s6-req12": customer.contactInformations[0].city,
            "Personal_Info-s6-req13": equitablePlan.plan.stateTaxDetails[0].state.country.id,
            "Personal_Info-s6-req14": equitablePlan.plan.stateTaxDetails[0].state.equitableId,
            "Personal_Info-s6-req15": (_d = customer.contactInformations[0].postalCode) === null || _d === void 0 ? void 0 : _d.replace(/ /g, ""),
            "Personal_Info-s6-req16": div1_choice,
            "Personal_Info-s6-req17": customer.contactInformations[0].primaryEmail,
            "Personal_Info-s6-req18": customer.contactInformations[0].primaryEmail,
            "Personal_Info-s8-req1": (0, moment_1.default)(customer.customerSignup.enrollmentDate).format('M/D/YYYY'),
        };
        let extdataObj = {
            "PersonalInfo-s2-req2": equitableDetails.division,
            "PersonalInfo-s2-req3": equitableDetails.class,
            "PersonalInfo-s2-req4": coverage,
            "PersonalInfo-s2-req5": customer.customerSignup.weeklyHours,
            "PersonalInfo-s2-req6": customer.customerSignup.jobTitle,
            "PersonalInfo-s2-req7": (0, moment_1.default)(customer.customerSignup.hiringDate).format('M/D/YYYY'),
            "PersonalInfo-s2-req9": customer.firstName,
            "PersonalInfo-s2-req10": customer.lastName,
            "PersonalInfo-s2-req11": (0, moment_1.default)(customer.dob).format('M/D/YYYY'),
            "PersonalInfo-s2-req12": gender,
            "PersonalInfo-s2-req13": ((_e = customer.contactInformations[0].apt) !== null && _e !== void 0 ? _e : "") + customer.contactInformations[0].line1,
            "PersonalInfo-s2-req14": customer.contactInformations[0].line2,
            "PersonalInfo-s2-req15": customer.contactInformations[0].city,
            //"PersonalInfo-s2-req16": equitablePlan.plan.stateTaxDetails[0].state.country.id, //cntEmployeeDetail_Roc_cmbPersonROCCountry,
            "PersonalInfo-s2-req16": equitablePlan.plan.stateTaxDetails[0].state.equitableId,
            "PersonalInfo-s2-req17": (_f = customer.contactInformations[0].postalCode) === null || _f === void 0 ? void 0 : _f.replace(/ /g, ""),
            "PersonalInfo-s2-req18": customer.contactInformations[0].primaryEmail,
            "PersonalInfo-s2-req19": customer.contactInformations[0].primaryEmail,
            "PersonalInfo-s2-req21": (0, moment_1.default)(customer.customerSignup.enrollmentDate).format('M/D/YYYY')
            //"PersonalInfo-s2-req22": div1_choice
        };
        /*  let extdataObj2C: any = {
    
           "PersonalInfo-s2-req3": equitableDetails.division, //cmbDivision,
           "PersonalInfo-s2-req4": equitableDetails.class,  //cmbClass,
           "PersonalInfo-s2-req5": coverage,  //cmbFamilyCategory,
           "PersonalInfo-s2-req6": customer.customerSignup.weeklyHours, //txtNumHrsWeek,
           "PersonalInfo-s2-req7": customer.customerSignup.jobTitle, //txtJobTitle,
           "PersonalInfo-s2-req8": moment(customer.customerSignup.hiringDate).format('M/D/YYYY'), //calHireDate,
           // "PersonalInfo-s2-req9": "5001" //employement type,
           "PersonalInfo-s2-req10": customer.firstName, //cntEmployeeDetail_Roc_txtFirstName,
           "PersonalInfo-s2-req11": customer.lastName, //cntEmployeeDetail_Roc_txtLastName,
           "PersonalInfo-s2-req12": moment(customer.dob).format('M/D/YYYY'), //cntEmployeeDetail_Roc_calBirthDate,
           "PersonalInfo-s2-req13": gender,//customer.gender ? ((customer.gender == "FEMALE" || customer.gender == "MALE") ? (customer.gender == "FEMALE" ? '1' : '2') : '') : '', //cntEmployeeDetail_Roc_cmbGender,
           "PersonalInfo-s2-req14": (customer.contactInformations[0].apt ?? "") + customer.contactInformations[0].line1, //cntEmployeeDetail_Roc_txtAddress1,
           "PersonalInfo-s2-req15": customer.contactInformations[0].line2, //cntEmployeeDetail_Roc_txtAddress2,
           "PersonalInfo-s2-req16": customer.contactInformations[0].city, //cntEmployeeDetail_Roc_txtCity,
           //"PersonalInfo-s2-req16": equitablePlan.plan.stateTaxDetails[0].state.country.id, //cntEmployeeDetail_Roc_cmbPersonROCCountry,
           "PersonalInfo-s2-req17": equitablePlan.plan.stateTaxDetails[0].state.equitableId, //(name|shortName) //cntEmployeeDetail_Roc$cmbPersonROCProvince,
           "PersonalInfo-s2-req18": customer.contactInformations[0].postalCode?.replace(/ /g, ""), //cntEmployeeDetail_Roc_txtPostalCode,
           "PersonalInfo-s2-req19": customer.contactInformations[0].primaryEmail, //cntEmployeeDetail_Roc$txtHomeEmail,
           "PersonalInfo-s2-req20": customer.contactInformations[0].primaryEmail, //cntEmployeeDetail_Roc$txtConfirmHomeEmail,
           "PersonalInfo-s2-req29": moment(customer.customerSignup.enrollmentDate).format('M/D/YYYY'),
           //dependant info
    
           //"PersonalInfo-s2-req22": div1_choice
         } */
        /*   [
            {
              "PersonalInfo-s2-req2": "21514",
              "PersonalInfo-s2-req3": "25337",
              "PersonalInfo-s2-req4": "2",
              "PersonalInfo-s2-req5": "40",
              "PersonalInfo-s2-req6": "Employee",
              "PersonalInfo-s2-req7": "1/10/2023",
              //"PersonalInfo-s2-req8": "5001",
              "PersonalInfo-s2-req9": "CoTest",
              "PersonalInfo-s2-req10": "CoTest",
              "PersonalInfo-s2-req11": "7/26/1991",
              "PersonalInfo-s2-req12": "2",
              "PersonalInfo-s2-req13": "1000 Innovation Drive",
              "PersonalInfo-s2-req14": "580",
              "PersonalInfo-s2-req15": "Nepean",
              "PersonalInfo-s2-req16": "8",
              "PersonalInfo-s2-req17": "K2K3E7",
              "PersonalInfo-s2-req18": "cotest@gmail.com",
              "PersonalInfo-s2-req19": "cotest@gmail.com",
              //"PersonalInfo-s2-req20": "on",
              "PersonalInfo-s2-req21": "1/10/2023",
              //"PersonalInfo-s2-req22": "5016",
              "PersonalInfo-s2-req23": "sidTest",
              "PersonalInfo-s2-req24": "sidTest",
              "PersonalInfo-s2-req25": "1/2/1996",
              "PersonalInfo-s2-req26": "1",
              "PersonalInfo-s2-req27": "2",
              "PersonalInfo-s2-req28": "5",
              "PersonalInfo-s2-req29": "1/10/2023",
              "PersonalInfo-s2-req31": "1",
              "PersonalInfo-s2-req32": "50",
              "PersonalInfo-s2-req33": "1",
              "PersonalInfo-s2-req34": "Coupletest"
    
            }
          ] */
        let extdataObjs = extdataObj;
        let dependantsInfo = [];
        let extdataArray = [];
        let Extdata; // = {...commonExecutionData, ...TestData.single};
        let result;
        switch (coverage) {
            case "1":
                extdataArray.push(extdataObj);
                await (0, storage_helper_1.createFile)(paths_1.TEMP_EXTDATA_FOLDER, "ExternalData_" + customer.id + "_S.json", JSON.stringify(extdataArray));
                constants_1.TestDataEquitable.single.source.link = paths_1.SERVER_EXTDATA_PATH + "ExternalData_" + customer.id + "_S.json";
                constants_1.commonExecutionData.executeAll = 0;
                constants_1.commonExecutionData.testCases = constants_1.targetTestcasesEquitable.single; //['OpenUrl', 'login', 'Personal_Info', 'SignOut']
                Extdata = { ...constants_1.commonExecutionData, ...constants_1.TestDataEquitable.single };
                Extdata.customerId = customer.id;
                Extdata.equitableDivision = equitableDetails.division;
                Extdata.equitableClass = equitableDetails.class;
                Extdata.equitableDivisionName = equitableDetails.divisionName;
                Extdata.equitableClassName = equitableDetails.className;
                Extdata.customerFN = customer.firstName;
                Extdata.customerLN = customer.lastName;
                Extdata.customerDob = (0, moment_1.default)(customer.dob).format('M/D/YYYY');
                result = await this.aitp.soleExecution(Extdata, true, 'equitable');
                //delete tempfile
                await (0, storage_helper_1.deleteFile)(paths_1.TEMP_EXTDATA_FOLDER + "/ExternalData_" + customer.id + "_S.json");
                break;
            case "2": //couple
                if (customer.customerRelatives) {
                    dependantsInfo = await this.provision.getDependantInfoEquitable(customer.customerRelatives);
                    //console.log(dependantsInfo);
                    extdataObj = { ...extdataObjs, ...dependantsInfo.dependantsExtdataObject };
                    extdataArray.push(extdataObj);
                    if (dependantsInfo.dependantsNumber > 0 && dependantsInfo.disabledChildrenNumber > 0) {
                        //mail related to special child
                    }
                    else {
                        await (0, storage_helper_1.createFile)(paths_1.TEMP_EXTDATA_FOLDER, "ExternalData_" + customer.id + "_C.json", JSON.stringify(extdataArray));
                        constants_1.TestDataEquitable.couple.source.link = paths_1.SERVER_EXTDATA_PATH + "ExternalData_" + customer.id + "_C.json";
                        constants_1.commonExecutionData.executeAll = 0;
                        constants_1.commonExecutionData.testCases = constants_1.targetTestcasesEquitable.couple; //['OpenUrl', 'login', 'Personal_Info', 'Dependents', 'SignOut']
                        Extdata = { ...constants_1.commonExecutionData, ...constants_1.TestDataEquitable.couple };
                        Extdata.customerId = customer.id;
                        Extdata.equitableDivision = equitableDetails.division;
                        Extdata.equitableClass = equitableDetails.class;
                        Extdata.equitableDivisionName = equitableDetails.divisionName;
                        Extdata.equitableClassName = equitableDetails.className;
                        Extdata.customerFN = customer.firstName;
                        Extdata.customerLN = customer.lastName;
                        Extdata.customerDob = (0, moment_1.default)(customer.dob).format('M/D/YYYY');
                        result = await this.aitp.soleExecution(Extdata, true, 'equitable');
                        //delete tempfile
                        await (0, storage_helper_1.deleteFile)(paths_1.TEMP_EXTDATA_FOLDER + "/ExternalData_" + customer.id + "_C.json");
                    }
                }
                else {
                    console.log("no customer relatives.. wrong coverage Couple-2");
                }
                break;
            case "3": //family
                if (customer.customerRelatives) {
                    dependantsInfo = await this.provision.getDependantsInfoEquitable(customer.customerRelatives);
                    //console.log(dependantsInfo);
                    extdataObj = { ...extdataObjs, ...dependantsInfo.dependantsExtdataObject };
                    extdataArray.push(extdataObj);
                    if (dependantsInfo.dependantsNumber > 0 && dependantsInfo.disabledChildrenNumber > 0) {
                        //mail related to special child
                    }
                    else {
                        console.log(`eq-family extdata object`);
                        console.log(JSON.stringify(extdataArray));
                        await (0, storage_helper_1.createFile)(paths_1.TEMP_EXTDATA_FOLDER, "ExternalData_" + customer.id + "_F.json", JSON.stringify(extdataArray));
                        constants_1.TestDataEquitable.family.source.link = paths_1.SERVER_EXTDATA_PATH + "ExternalData_" + customer.id + "_F.json";
                        constants_1.commonExecutionData.executeAll = 0;
                        constants_1.commonExecutionData.testCases = constants_1.targetTestcasesEquitable.family; //['OpenUrl', 'login', 'Personal_Info', 'Dependents', 'SignOut']
                        Extdata = { ...constants_1.commonExecutionData, ...constants_1.TestDataEquitable.family };
                        Extdata.customerId = customer.id;
                        Extdata.equitableDivision = equitableDetails.division;
                        Extdata.equitableClass = equitableDetails.class;
                        Extdata.equitableDivisionName = equitableDetails.divisionName;
                        Extdata.equitableClassName = equitableDetails.className;
                        Extdata.customerFN = customer.firstName;
                        Extdata.customerLN = customer.lastName;
                        Extdata.customerDob = (0, moment_1.default)(customer.dob).format('M/D/YYYY');
                        result = await this.aitp.soleExecution(Extdata, true, 'equitable');
                        //delete tempfile
                        await (0, storage_helper_1.deleteFile)(paths_1.TEMP_EXTDATA_FOLDER + "/ExternalData_" + customer.id + "_F.json");
                    }
                }
                else {
                    console.log("no customer relatives.. wrong coverage Family-3");
                }
                break;
        }
        return result;
    }
    async terminateEquitableSingle(customer) {
        let extdata = [
            {
                "Termination-s2-req1": customer.customerFN || customer.firstName,
                "Termination-s2-req2": customer.customerLN || customer.lastName,
                //"Termination-s2-req3": "2", //Search Status -- inforce
                "Termination-s2-req4": customer.customerDob || (0, moment_1.default)(customer.dob).format('M/D/YYYY'),
                "Termination-s2-req5": customer.equitableDivisionName || customer.equitableDivision,
                "Termination-s2-req6": customer.equitableClassName || customer.equitableClass,
                "Termination-s3-req6": (0, moment_1.default)().format('M/D/YYYY'),
                //"Termination-s3-req7":"5014" //termination reason -- 5014 -- added by mistake
                "Termination-s4-req4": customer.customerFN || customer.firstName,
                "Termination-s4-req5": customer.customerLN || customer.lastName,
                "Termination-s4-req6": customer.equitableMemberId || customer.equitableCertificateId,
                //"Termination-s2-req7": "2", //Search status -- terminated
                "Termination-s4-req8": customer.customerDob || (0, moment_1.default)(customer.dob).format('M/D/YYYY'),
                "Termination-s4-req9": customer.equitableDivisionName || customer.equitableDivision,
                "Termination-s4-req10": customer.equitableClassName || customer.equitableClass
            }
        ];
        let Extdata; // = {...commonExecutionData, ...TestData.single};
        await (0, storage_helper_1.createFile)(paths_1.TEMP_EXTDATA_FOLDER, "ExternalData_" + customer.id + "_Terminate.json", JSON.stringify(extdata));
        constants_1.TestDataEquitable.terminate.source.link = paths_1.SERVER_EXTDATA_PATH + "ExternalData_" + customer.id + "_Terminate.json";
        constants_1.commonExecutionData.executeAll = 0;
        constants_1.commonExecutionData.testCases = constants_1.targetTestcasesEquitable.terminate; //['OpenUrl', 'login', 'Terminate_Member', 'SignOut']
        Extdata = { ...constants_1.commonExecutionData, ...constants_1.TestDataEquitable.terminate };
        Extdata.customerId = customer.id;
        Extdata.equitableDivision = customer.equitableDivision;
        Extdata.equitableClass = customer.equitableClass;
        Extdata.equitableDivisionName = customer.equitableDivisionName;
        Extdata.equitableClassName = customer.equitableClassName;
        Extdata.customerFN = customer.customerFN;
        Extdata.customerLN = customer.customerLN;
        Extdata.equitableMemberId = customer.equitableMemberId || customer.equitableCertificateId;
        Extdata.customerDob = (0, moment_1.default)(customer.dob).format('M/D/YYYY');
        const result = await this.aitp.soleExecution(Extdata, false, 'equitable');
        //delete tempfile
        await (0, storage_helper_1.deleteFile)(paths_1.TEMP_EXTDATA_FOLDER + "/ExternalData_" + customer.id + "_Terminate.json");
        return result;
    }
};
EquitableProvisioningService = tslib_1.__decorate([
    (0, core_1.injectable)({ scope: core_1.BindingScope.TRANSIENT }),
    tslib_1.__param(0, (0, core_1.service)(common_provisioning_service_1.CommonProvisioningService)),
    tslib_1.__param(1, (0, core_1.service)(aitp_service_1.AitpService)),
    tslib_1.__metadata("design:paramtypes", [common_provisioning_service_1.CommonProvisioningService,
        aitp_service_1.AitpService])
], EquitableProvisioningService);
exports.EquitableProvisioningService = EquitableProvisioningService;
//# sourceMappingURL=equitable-provisioning.service.js.map