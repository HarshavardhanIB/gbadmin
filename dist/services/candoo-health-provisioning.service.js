"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CandooHealthProvisioningService = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const configurations_1 = require("../configurations");
const constants_1 = require("../constants");
const paths_1 = require("../paths");
const storage_helper_1 = require("../storage.helper");
const aitp_service_1 = require("./aitp.service");
const common_provisioning_service_1 = require("./common-provisioning.service");
const email_service_1 = require("./email.service");
const mail_helper_service_1 = require("./mail-helper.service");
let CandooHealthProvisioningService = class CandooHealthProvisioningService {
    constructor(provision, aitp, mail, mailHelper) {
        this.provision = provision;
        this.aitp = aitp;
        this.mail = mail;
        this.mailHelper = mailHelper;
    }
    /*
     * Add service methods here
     */
    async provisionCandooRegistration(customers) {
        let extdataArray = [];
        for (let customer of customers) {
            let executivePlan = {};
            const executiveValidPlans = [];
            if (!customer.customerPlans || customer.customerPlans.length <= 0) {
                console.log(`No customer plans for this customer... !?... goto next customer`);
                continue;
            }
            for (const cp of customer.customerPlans) {
                //if (EXECUTIVE_PACKAGES.indexOf(cp.plan.packageId) >= 0) {
                //}
                if (constants_1.EXECUTIVE_CARE_COMPLETE_PLAN_LEVELS.indexOf(cp.plan.planLevel) >= 0) {
                    executiveValidPlans.push(cp);
                }
            }
            if (executiveValidPlans.length == 0) {
                //no plans
                //just skip....
                console.log("//no plans     //just skip....");
                continue;
            }
            else if (executiveValidPlans.length == 1) {
                executivePlan = executiveValidPlans[0];
            }
            else {
                console.log(`executiveValidPlans.length: ${executiveValidPlans.length}`);
                console.log('more than 1 plans??? something wrong');
                executivePlan = executiveValidPlans[0];
            }
            if (!customer.contactInformations) {
                console.log(`no customer contact info.. ?? wrong data.. skip this customer ${customer.id}`);
                continue;
            }
            let extdataObj = {
                "Add_Employee-s3-req1": customer.contactInformations[0].primaryEmail,
                "Add_Employee-s3-req2": customer.firstName,
                "Add_Employee-s3-req3": customer.lastName,
                "Add_Employee-s4-req1": customer.contactInformations[0].primaryEmail,
                "Add_Employee-s4-resp1": [customer.firstName, customer.lastName].join(" "),
                "Add_Employee-s4-resp2": "VIEW"
            };
            extdataArray.push(extdataObj);
        }
        let Extdata, result;
        await (0, storage_helper_1.createFile)(paths_1.TEMP_EXTDATA_FOLDER, "ExternalData_execAll" + "_S.json", JSON.stringify(extdataArray));
        constants_1.TestDataExecutive.single.source.link = paths_1.SERVER_EXTDATA_PATH + "ExternalData_execAll" + "_S.json";
        constants_1.commonExecutionData.executeAll = 0;
        constants_1.commonExecutionData.testCases = constants_1.targetTestcasesExecutive.single; //['OpenUrl', 'login', 'Personal_Info', 'SignOut']
        Extdata = { ...constants_1.commonExecutionData, ...constants_1.TestDataExecutive.single };
        Extdata.datasets = extdataArray.length;
        result = await this.aitp.soleExecution(Extdata, true, 'executive');
        await (0, storage_helper_1.deleteFile)(paths_1.TEMP_EXTDATA_FOLDER + "/ExternalData_execAll" + "_S.json");
        result.customers = customers;
        return result;
        //return array_of_arrayCustomers or object_of_arrayCustomers
    }
    async provisionCandooTermination(customers) {
        let extdataArray = [];
        for (let customer of customers) {
            let executivePlan = {};
            const executiveValidPlans = [];
            for (const cp of customer.customerPlans) {
                //if (EXECUTIVE_PACKAGES.indexOf(cp.plan.packageId) >= 0) {
                //}
                if (constants_1.EXECUTIVE_CARE_COMPLETE_PLAN_LEVELS.indexOf(cp.plan.planLevel) >= 0) {
                    executiveValidPlans.push(cp);
                }
            }
            if (executiveValidPlans.length == 0) {
                //no plans
                //just skip....
                console.log("//no plans     //just skip....");
                continue;
            }
            else if (executiveValidPlans.length == 1) {
                executivePlan = executiveValidPlans[0];
            }
            else {
                console.log('more than 1 plans??? something wrong');
                executivePlan = executiveValidPlans[0];
            }
            if (!customer.contactInformations) {
                console.log(`no customer contact info.. ?? wrong data.. skip this customer ${customer.id}`);
                continue;
            }
            let extdataObj = {
                "Termination-s2-req1": customer.contactInformations[0].primaryEmail,
                "Termination-s2-resp1": [customer.firstName, customer.lastName].join(" ") + customer.contactInformations[0].primaryEmail,
                "Termination-s2-resp2": "VIEW"
            };
            extdataArray.push(extdataObj);
        }
        let Extdata; // = {...commonExecutionData, ...TestData.single};
        await (0, storage_helper_1.createFile)(paths_1.TEMP_EXTDATA_FOLDER, "ExternalData_execAll" + "_Terminate.json", JSON.stringify(extdataArray));
        constants_1.TestDataExecutive.terminate.source.link = paths_1.SERVER_EXTDATA_PATH + "ExternalData_execAll" + "_Terminate.json";
        constants_1.commonExecutionData.executeAll = 0;
        constants_1.commonExecutionData.testCases = constants_1.targetTestcasesExecutive.terminate; //['OpenUrl', 'login', 'Terminate_Member', 'SignOut']
        Extdata = { ...constants_1.commonExecutionData, ...constants_1.TestDataExecutive.terminate };
        Extdata.datasets = extdataArray.length;
        //Extdata.customerId = customer.id;
        const result = await this.aitp.soleExecution(Extdata, false, 'executive');
        //delete tempfile
        await (0, storage_helper_1.deleteFile)(paths_1.TEMP_EXTDATA_FOLDER + "/ExternalData_execAll" + "_Terminate.json");
        result.customers = customers;
        return result;
        //return array_of_arrayCustomers or object_of_arrayCustomers
    }
    async provisionExecutiveSingle(customer, executivePlan) {
        if (!customer.contactInformations) {
            console.log(`no customer contact info.. ?? wrong data.. skip this customer ${customer.id}`);
            return null;
        }
        let coverage = this.provision.getCoverageValueExecutive(executivePlan);
        //let executiveUserDetails = this.provision.getPackageValueExecutive(executivePlan.plan.planLevels.executivePackages, executivePlan.plan.stateTaxDetails[0].stateId);
        // let gender = ""
        // if (customer.gender) {
        //   switch (customer.gender) {
        //     case GENDER.MALE:
        //       gender = "2"
        //       break;
        //     case GENDER.FEMALE:
        //       gender = "1"
        //       break;
        //   }
        // }
        let extdataObj = {
            "Add_Employee-s3-req1": customer.contactInformations[0].primaryEmail,
            "Add_Employee-s3-req2": customer.firstName,
            "Add_Employee-s3-req3": customer.lastName,
            "Add_Employee-s4-req1": customer.contactInformations[0].primaryEmail,
            "Add_Employee-s4-resp1": [customer.firstName, customer.lastName].join(" "),
            "Add_Employee-s4-resp2": "VIEW"
        };
        let extdataObjs = {
            "Add_Employee-s3-req1": customer.contactInformations[0].primaryEmail,
            "Add_Employee-s3-req2": customer.firstName,
            "Add_Employee-s3-req3": customer.lastName,
            "Add_Employee-s4-req1": customer.contactInformations[0].primaryEmail,
            "Add_Employee-s4-resp1": [customer.firstName, customer.lastName].join(" "),
            "Add_Employee-s4-resp2": "VIEW"
        };
        let dependantsInfo = [];
        let extdataArray = [];
        let Extdata; // = {...commonExecutionData, ...TestData.single};
        let result;
        coverage = "1"; //always single for now
        switch (coverage) {
            case "1":
                extdataArray.push(extdataObj);
                await (0, storage_helper_1.createFile)(paths_1.TEMP_EXTDATA_FOLDER, "ExternalData_ex" + customer.id + "_S.json", JSON.stringify(extdataArray));
                constants_1.TestDataExecutive.single.source.link = paths_1.SERVER_EXTDATA_PATH + "ExternalData_ex" + customer.id + "_S.json";
                constants_1.commonExecutionData.executeAll = 0;
                constants_1.commonExecutionData.testCases = constants_1.targetTestcasesExecutive.single; //['OpenUrl', 'login', 'Personal_Info', 'SignOut']
                Extdata = { ...constants_1.commonExecutionData, ...constants_1.TestDataExecutive.single };
                Extdata.customerId = customer.id;
                result = await this.aitp.soleExecution(Extdata, true, 'executive');
                //delete tempfile
                await (0, storage_helper_1.deleteFile)(paths_1.TEMP_EXTDATA_FOLDER + "/ExternalData_ex" + customer.id + "_S.json");
                break;
            case "2": //couple
                if (customer.customerRelatives) {
                    dependantsInfo = await this.provision.getDependantInfoExecutive(customer.customerRelatives);
                    //console.log(dependantsInfo);
                    extdataObj = { ...extdataObjs, ...dependantsInfo.dependantsExtdataObject };
                    extdataArray.push(extdataObj);
                    if (dependantsInfo.dependantsNumber > 0 && dependantsInfo.disabledChildrenNumber > 0) {
                        //mail related to special child
                    }
                    else {
                        await (0, storage_helper_1.createFile)(paths_1.TEMP_EXTDATA_FOLDER, "ExternalData_ex" + customer.id + "_C.json", JSON.stringify(extdataArray));
                        constants_1.TestDataExecutive.couple.source.link = paths_1.SERVER_EXTDATA_PATH + "ExternalData_ex" + customer.id + "_C.json";
                        constants_1.commonExecutionData.executeAll = 0;
                        constants_1.commonExecutionData.testCases = constants_1.targetTestcasesExecutive.couple; //['OpenUrl', 'login', 'Personal_Info', 'Dependents', 'SignOut']
                        Extdata = { ...constants_1.commonExecutionData, ...constants_1.TestDataExecutive.couple };
                        Extdata.customerId = customer.id;
                        result = await this.aitp.soleExecution(Extdata, true, 'executive');
                        //delete tempfile
                        await (0, storage_helper_1.deleteFile)(paths_1.TEMP_EXTDATA_FOLDER + "/ExternalData_ex" + customer.id + "_C.json");
                    }
                }
                else {
                    console.log("no customer relatives.. wrong coverage Couple-2");
                }
                break;
            case "3": //family
                if (customer.customerRelatives) {
                    dependantsInfo = await this.provision.getDependantsInfoExecutive(customer.customerRelatives);
                    //console.log(dependantsInfo);
                    extdataObj = { ...extdataObjs, ...dependantsInfo.dependantsExtdataObject };
                    extdataArray.push(extdataObj);
                    if (dependantsInfo.dependantsNumber > 0 && dependantsInfo.disabledChildrenNumber > 0) {
                        //mail related to special child
                    }
                    else {
                        await (0, storage_helper_1.createFile)(paths_1.TEMP_EXTDATA_FOLDER, "ExternalData_ex" + customer.id + "_F.json", JSON.stringify(extdataArray));
                        constants_1.TestDataExecutive.family.source.link = paths_1.SERVER_EXTDATA_PATH + "ExternalData_ex" + customer.id + "_F.json";
                        constants_1.commonExecutionData.executeAll = 0;
                        constants_1.commonExecutionData.testCases = constants_1.targetTestcasesExecutive.family; //['OpenUrl', 'login', 'Personal_Info', 'Dependents', 'SignOut']
                        Extdata = { ...constants_1.commonExecutionData, ...constants_1.TestDataExecutive.family };
                        Extdata.customerId = customer.id;
                        result = await this.aitp.soleExecution(Extdata, true, 'executive');
                        //delete tempfile
                        await (0, storage_helper_1.deleteFile)(paths_1.TEMP_EXTDATA_FOLDER + "/ExternalData_ex" + customer.id + "_F.json");
                    }
                }
                else {
                    console.log("no customer relatives.. wrong coverage Family-3");
                }
                break;
        }
        return result;
    }
    async terminateExecutiveSingle(customer) {
        let extdata = [{
                "Termination-s2-req1": customer.contactInformations[0].primaryEmail,
                "Termination-s2-resp1": [customer.firstName, customer.lastName].join(" ") + customer.contactInformations[0].primaryEmail,
                "Termination-s2-resp2": "VIEW"
            }];
        let Extdata; // = {...commonExecutionData, ...TestData.single};
        await (0, storage_helper_1.createFile)(paths_1.TEMP_EXTDATA_FOLDER, "ExternalData_exec" + customer.id + "_Terminate.json", JSON.stringify(extdata));
        constants_1.TestDataExecutive.terminate.source.link = paths_1.SERVER_EXTDATA_PATH + "ExternalData_exec" + customer.id + "_Terminate.json";
        constants_1.commonExecutionData.executeAll = 0;
        constants_1.commonExecutionData.testCases = constants_1.targetTestcasesExecutive.terminate; //['OpenUrl', 'login', 'Terminate_Member', 'SignOut']
        Extdata = { ...constants_1.commonExecutionData, ...constants_1.TestDataExecutive.terminate };
        Extdata.customerId = customer.id;
        const result = await this.aitp.soleExecution(Extdata, false, 'executive');
        //delete tempfile
        await (0, storage_helper_1.deleteFile)(paths_1.TEMP_EXTDATA_FOLDER + "/ExternalData_exec" + customer.id + "_Terminate.json");
        return result;
    }
    async executiveUsersProvisionProcess(customers, result, success, scenario, registerTermination) {
        var _a;
        let mailOptions = {};
        mailOptions.to = configurations_1.SYS_ADMIN.email;
        if (registerTermination) {
            console.log(`exec reg`);
            if (result.executiveRegistration) {
                if (result.executiveRegistrationDatasets && result.executiveRegistrationDatasets.lnegth > 2) {
                    for (const ds of result.executiveRegistrationDatasets) {
                        console.log(`Dataset:${ds} - ${result.executiveRegistrationDatasets[ds]}`);
                    }
                }
            }
        }
        else {
            console.log(`exec term`);
            if (result.executiveTermination) {
                if (result.executiveTerminationDatasets && result.executiveTerminationDatasets.lnegth > 2) {
                    for (const ds of result.executiveTerminationDatasets) {
                        console.log(`Dataset:${ds} - ${result.executiveTerminationDatasets[ds]}`);
                    }
                }
            }
        }
        let plansInfo = ``;
        let index = 2;
        let usertable = `<table>` +
            `<caption>Customers</caption>` +
            `<tbody>` +
            `<tr>` +
            //`<th>ID</th>` +
            // `{{executiveHeader}}` +
            // `<th>Enrolment date</th>` +
            `<th>First name</th>` +
            `<th>Last name</th>` +
            `<th>Email address</th>` +
            // `<th>Gender</th>` +
            // `<th>Date of birth</th>` +
            // `<th>Address</th>` +
            `<th>{{registerTerminationHeader}}</th>` +
            `</tr>`;
        if (registerTermination) {
            usertable = usertable.replace("{{registerTerminationHeader}}", "Registration Status");
        }
        else {
            usertable = usertable.replace("{{registerTerminationHeader}}", "Termination Status");
        }
        for (const customer of customers) {
            if (customer.customerPlans) {
                for (const cp of customer.customerPlans) {
                    //filter for only executive plans
                    if (constants_1.EXECUTIVE_CARE_COMPLETE_PLAN_LEVELS.indexOf(cp.plan.planLevel) >= 0) {
                        plansInfo += `<tr>`;
                        plansInfo += `<td>` + cp.plan.name + `</td>`;
                        plansInfo += `</tr>`;
                    }
                }
            }
            else {
                console.log(`cust_no_${customer.id}: no customer plans`);
            }
            let plansTable = `<table>` +
                `<caption>Plans</caption>` +
                `<tbody>` +
                plansInfo +
                `</tbody>` +
                `</table>`;
            let planDetails = `<div class='userdetails-wrapper'>` +
                // plansTable +
                `<br>` +
                `</div>`;
            if (customer.customerSignup) {
                console.log(`cust_no_${customer.id}: signup exists`);
            }
            else {
                continue;
            }
            // const broker = customer.customerSignup.form.broker;
            // const brokerEmailid = broker.contactInfo.primaryEmail
            // if (brokerEmailid != SYS_ADMIN.email) {
            //   let brokerEmailids = [SYS_ADMIN.email, brokerEmailid]
            //   if (broker.contactInfo.secondaryEmail != null && broker.contactInfo.secondaryEmail != '') {
            //     brokerEmailids = brokerEmailids.concat(broker.contactInfo.secondaryEmail.split(","));
            //   }
            //   let brokerTable = `<table>` +
            //   `<caption>Broker</caption>` +
            //   `<tbody>` +
            //   `<tr>` +
            //   `<td>Name</td>` +
            //   `<td>` + broker.name + `</td>` +
            //   `</tr>` +
            //   // `<tr>` +
            //   // `<td>Email</td>` +
            //   // `<td>` + brokerEmailid + `</td>` +
            //   // `</tr>` +
            //   `</tbody>` +
            //   `</table>`
            // let brokerDetails = `<div class='userdetails-wrapper'>` +
            //   //  brokerTable +
            //   `</div>`
            const customer_contact = customer.contactInformations.filter((contact) => {
                return contact.contactType == constants_1.CONTACT_TYPE.CUSTOMER && contact.addressType == constants_1.ADDRESS_TYPE.HOME_ADDRESS;
            });
            const customer_home_contact = customer_contact[0];
            const customer_home_address = [(_a = customer_home_contact.apt) !== null && _a !== void 0 ? _a : "" + " " + customer_home_contact.line1 + " " + customer_home_contact.line2, customer_home_contact.city, customer_home_contact.state, customer_home_contact.postalCode].join(', ');
            usertable +=
                `<tr>` +
                    //`<td>` + customer.id + `</td>` +
                    //`{{executiveValue}}` +
                    // `<td>` + moment(customer.customerSignup.enrollmentDate).format('MM/DD/YYYY') + `</td>` +
                    `<td>` + customer.firstName + `</td>` +
                    `<td>` + customer.lastName + `</td>` +
                    `<td>` + customer_home_contact.primaryEmail + `</td>` +
                    // `<td>` + customer.gender + `</td>` +
                    //  `<td>` + moment(customer.dob).format('MM/DD/YYYY') + `</td>` +
                    // `<td>` + customer_home_address + `</td>` +
                    //`<td>` + customer_home_contact.primaryPhone + `</td>` +
                    `<td>{{registerTerminationValue}}</td>` +
                    `</tr>`;
            // let dependantsTable = ``
            // let specialNeedsChild = false;
            // if (customer.customerRelatives && customer.customerRelatives.length > 0) {
            //   let dependantsInfo = ``
            //   //Child	Jhonson	Doe	Male	11/22/2011		No	Yes
            //   for (const cr of customer.customerRelatives) {
            //     dependantsInfo += `<tr>`
            //     dependantsInfo += `<td>` + cr.relationshipType + `</td>`
            //     dependantsInfo += `<td>` + cr.firstName + `</td>`
            //     dependantsInfo += `<td>` + cr.lastName + `</td>`
            //     dependantsInfo += `<td>` + cr.gender + `</td>`
            //     dependantsInfo += `<td>` + moment(cr.dob).format('MM/DD/YYYY') + `</td>`
            //     dependantsInfo += `<td>` + cr.carrierName + `</td>`
            //     if (cr.relationshipType == RELATIONSHIP_TYPE.SPOUSE) {
            //       //console.log(`cr.cobCoverage : ${cr.cobCoverage}`)
            //       //console.log(`MARITAL_STATUS_LIST.indexOf(cr.cobCoverage):` + MARITAL_STATUS_LIST.indexOf(cr.cobCoverage))
            //       // dependantsInfo += `<td>` + ((MARITAL_STATUS_LIST.indexOf(cr.cobCoverage) >= 0) ? cr.cobCoverage : '') + `</td>`
            //       dependantsInfo += `<td>` + cr.email + `</td>`
            //       dependantsInfo += `<td>` + '' + `</td>`
            //       dependantsInfo += `<td>` + '' + `</td>`
            //       dependantsInfo += `<td>` + '' + `</td>`
            //     } else {
            //       // console.log(`cr.universityGraduationDay:${cr.universityGraduationDay}`)
            //       // console.log(`cr.universityGraduationDay != null && cr.universityGraduationDay != '0000-00-00'` + cr.universityGraduationDay != null && cr.universityGraduationDay != '0000-00-00')
            //       dependantsInfo += `<td>` + '' + `</td>`
            //       dependantsInfo += `<td>` + (cr.enrolledInUniversity ? 'Yes' : 'No') + `</td>`
            //       dependantsInfo += `<td>` + ((cr.universityGraduationDay == null || cr.universityGraduationDay == '0000-00-00') ? '' : moment(cr.universityGraduationDay).format('MM/DD/YYYY')) + `</td>`
            //       dependantsInfo += `<td>` + (cr.isDisabled ? 'Yes' : 'No') + `</td>`
            //     }
            //     dependantsInfo += `</tr>`
            //     specialNeedsChild = specialNeedsChild || (cr.isDisabled ?? false)
            //   }
            //   //Type	First name	Last Name	Gender	Date of birth	Coverage with another plan	Post secondary student	With Special needs
            //   dependantsTable = `<table>` +
            //     `<caption>Dependants</caption>` +
            //     `<tbody>` +
            //     `<tr>` +
            //     `<th>Type</th>` +
            //     `<th>First name</th>` +
            //     `<th>Last name</th>` +
            //     `<th>Gender</th>` +
            //     `<th>Date of birth</th>` +
            //     `<th>Coverage with another plan</th>` +
            //     `<th>Email </th>` +
            //     `<th>Post secondary student</th>` +
            //     `<th>Graduation Day</th>` +
            //     `<th> With Special needs</th>` +
            //     `</tr>` +
            //     dependantsInfo +
            //     `</tbody>` +
            //     `</table>`
            // }
            if (registerTermination) {
                usertable = usertable.replace("{{registerTerminationValue}}", result.executiveRegistrationDatasets[index] == "Passed" ? "Success" : "Failed");
            }
            else {
                usertable = usertable.replace("{{registerTerminationValue}}", result.executiveTerminationDatasets[index] == "Passed" ? "Success" : "Failed");
            }
        }
        usertable += `</tbody>` +
            `</table>`;
        let brokerEmailids = [configurations_1.SYS_ADMIN.email];
        mailOptions.to = brokerEmailids;
        let userdetails = `<div class='userdetails-wrapper'>` +
            usertable +
            `<br>` +
            //dependantsTable +
            `</div>`;
        if (success) {
            if (result.executive_employee_id != null) {
                usertable = usertable.replace('{{executiveHeader}}', `<th>Executive Employee Id</th>`);
                usertable = usertable.replace('{{executiveValue}}', `<td>` + result.executive_employee_id + `</td>`);
            }
            else {
                usertable = usertable.replace('{{executiveHeader}}', '');
                usertable = usertable.replace('{{executiveValue}}', '');
            }
        }
        else {
            usertable = usertable.replace('{{executiveHeader}}', '');
            usertable = usertable.replace('{{executiveValue}}', '');
        }
        userdetails = `<div class='userdetails-wrapper'>` +
            usertable +
            `<br>` +
            //dependantsTable +
            `</div>`;
        if (success) {
            if (registerTermination) {
                mailOptions.subject = this.mailHelper.getExecutiveSuccessSubject(); //.replace('{{Enrolment date}}', moment(customer.customerSignup.enrollmentDate).format('MM/DD/YYYY'));
                mailOptions.html = this.mailHelper.getExecutiveSuccessBody(configurations_1.SYS_ADMIN.name, userdetails, '', ''); //.replace('{{Enrolment date}}', moment(customer.customerSignup.enrollmentDate).format('MM/DD/YYYY'));
            }
            else {
                mailOptions.subject = this.mailHelper.getExecutiveTerminationSuccessSubject(); //.replace('{{Enrolment date}}', moment(customer.customerSignup.enrollmentDate).format('MM/DD/YYYY'));
                mailOptions.html = this.mailHelper.getExecutiveSuccessBody(configurations_1.SYS_ADMIN.name, userdetails, '', ''); //.replace('{{Enrolment date}}', moment(customer.customerSignup.enrollmentDate).format('MM/DD/YYYY'));
            }
        }
        else {
            switch (scenario) {
                case 'notImplemented':
                    // brokerDetails += '<p>Customer coverage with Couple/Family in EXEC-CandooHealth not implemented yet</p>'
                    //brokerDetails += '<p>Customer coverage with Family in EXEC-CandooHealth not implemented yet</p>'
                    mailOptions.subject = this.mailHelper.getExecutiveFailSubject(); //.replace('{{Enrolment date}}', moment(customer.customerSignup.enrollmentDate).format('MM/DD/YYYY'));
                    mailOptions.html = this.mailHelper.getExecutiveFailBody(configurations_1.SYS_ADMIN.name, userdetails, '', ''); //.replace('{{Enrolment date}}', moment(customer.customerSignup.enrollmentDate).format('MM/DD/YYYY'));
                    break;
                case 'normal':
                default:
                    mailOptions.subject = this.mailHelper.getExecutiveFailSubject(); //.replace('{{Enrolment date}}', moment(customer.customerSignup.enrollmentDate).format('MM/DD/YYYY'));
                    mailOptions.html = this.mailHelper.getExecutiveFailBody(configurations_1.SYS_ADMIN.name, userdetails, '', ''); //.replace('{{Enrolment date}}', moment(customer.customerSignup.enrollmentDate).format('MM/DD/YYYY'));
            }
        }
        if (process.env.ccList) {
            mailOptions.cc = process.env.ccList;
        }
        mailOptions.bcc = [constants_1.GB_ADMIN];
        mailOptions.from = constants_1.GB_ADMIN;
        await this.mail.sendMail(mailOptions);
        return 1;
    }
};
CandooHealthProvisioningService = tslib_1.__decorate([
    (0, core_1.injectable)({ scope: core_1.BindingScope.TRANSIENT }),
    tslib_1.__param(0, (0, core_1.service)(common_provisioning_service_1.CommonProvisioningService)),
    tslib_1.__param(1, (0, core_1.service)(aitp_service_1.AitpService)),
    tslib_1.__param(2, (0, core_1.service)(email_service_1.EmailService)),
    tslib_1.__param(3, (0, core_1.service)(mail_helper_service_1.MailHelperService)),
    tslib_1.__metadata("design:paramtypes", [common_provisioning_service_1.CommonProvisioningService,
        aitp_service_1.AitpService,
        email_service_1.EmailService,
        mail_helper_service_1.MailHelperService])
], CandooHealthProvisioningService);
exports.CandooHealthProvisioningService = CandooHealthProvisioningService;
//# sourceMappingURL=candoo-health-provisioning.service.js.map