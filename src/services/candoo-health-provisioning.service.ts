import { /* inject, */ BindingScope, injectable, service} from '@loopback/core';
import Mail from 'nodemailer/lib/mailer';
import {SYS_ADMIN} from '../configurations';
import {ADDRESS_TYPE, commonExecutionData, CONTACT_TYPE, EXECUTIVE_CARE_COMPLETE_PLAN_LEVELS, GB_ADMIN, targetTestcasesExecutive, TestDataExecutive} from '../constants';
import {Customer} from '../models/customer.model';
import {SERVER_EXTDATA_PATH, TEMP_EXTDATA_FOLDER} from '../paths';
import {createFile, deleteFile} from '../storage.helper';
import {AitpService} from './aitp.service';
import {CommonProvisioningService} from './common-provisioning.service';
import {EmailService} from './email.service';
import {MailHelperService} from './mail-helper.service';

@injectable({scope: BindingScope.TRANSIENT})
export class CandooHealthProvisioningService {
  constructor(
    @service(CommonProvisioningService)
    protected provision: CommonProvisioningService,
    @service(AitpService)
    protected aitp: AitpService,
    @service(EmailService) public mail: EmailService,
    @service(MailHelperService) public mailHelper: MailHelperService,
    /* Add @inject to inject parameters */) { }

  /*
   * Add service methods here
   */

  async provisionCandooRegistration(customers: Customer[]) {

    let extdataArray = []

    for (let customer of customers) {


      let executivePlan: any = {}
      const executiveValidPlans: any = []


      if (!customer.customerPlans || customer.customerPlans.length <= 0) {
        console.log(`No customer plans for this customer... !?... goto next customer`)
        continue;

      }

      for (const cp of customer.customerPlans) {
        //if (EXECUTIVE_PACKAGES.indexOf(cp.plan.packageId) >= 0) {
        //}
        if (EXECUTIVE_CARE_COMPLETE_PLAN_LEVELS.indexOf(cp.plan.planLevel) >= 0) {
          executiveValidPlans.push(cp);
        }
      }

      if (executiveValidPlans.length == 0) {
        //no plans
        //just skip....
        console.log("//no plans     //just skip....")
        continue;
      } else if (executiveValidPlans.length == 1) {
        executivePlan = executiveValidPlans[0]
      } else {
        console.log(`executiveValidPlans.length: ${executiveValidPlans.length}`)
        console.log('more than 1 plans??? something wrong');
        executivePlan = executiveValidPlans[0]
      }

      if (!customer.contactInformations) {
        console.log(`no customer contact info.. ?? wrong data.. skip this customer ${customer.id}`);
        continue;
      }

      let extdataObj: any = {

        "Add_Employee-s3-req1": customer.contactInformations[0].primaryEmail, //employeeEmail,
        "Add_Employee-s3-req2": customer.firstName, //employeeFirstName,
        "Add_Employee-s3-req3": customer.lastName, //employeeLastName,

        "Add_Employee-s4-req1": customer.contactInformations[0].primaryEmail, //employeeTableSearch,

        "Add_Employee-s4-resp1": [customer.firstName, customer.lastName].join(" "),
        "Add_Employee-s4-resp2": "VIEW"
      }

      extdataArray.push(extdataObj)

    }

    let Extdata, result;
    await createFile(TEMP_EXTDATA_FOLDER, "ExternalData_execAll" + "_S.json", JSON.stringify(extdataArray))
    TestDataExecutive.single.source.link = SERVER_EXTDATA_PATH + "ExternalData_execAll" + "_S.json";
    commonExecutionData.executeAll = 0;
    commonExecutionData.testCases = targetTestcasesExecutive.single //['OpenUrl', 'login', 'Personal_Info', 'SignOut']
    Extdata = {...commonExecutionData, ...TestDataExecutive.single};
    Extdata.datasets = extdataArray.length;
    result = await this.aitp.soleExecution(Extdata, true, 'executive')
    await deleteFile(TEMP_EXTDATA_FOLDER + "/ExternalData_execAll" + "_S.json")
    result.customers = customers
    return result;

    //return array_of_arrayCustomers or object_of_arrayCustomers
  }
  async provisionCandooTermination(customers: Customer[]) {

    let extdataArray = []

    for (let customer of customers) {


      let executivePlan: any = {}
      const executiveValidPlans: any = []

      for (const cp of customer.customerPlans) {
        //if (EXECUTIVE_PACKAGES.indexOf(cp.plan.packageId) >= 0) {
        //}
        if (EXECUTIVE_CARE_COMPLETE_PLAN_LEVELS.indexOf(cp.plan.planLevel) >= 0) {
          executiveValidPlans.push(cp);
        }
      }

      if (executiveValidPlans.length == 0) {
        //no plans
        //just skip....
        console.log("//no plans     //just skip....")
        continue;
      } else if (executiveValidPlans.length == 1) {
        executivePlan = executiveValidPlans[0]
      } else {
        console.log('more than 1 plans??? something wrong');
        executivePlan = executiveValidPlans[0]
      }

      if (!customer.contactInformations) {
        console.log(`no customer contact info.. ?? wrong data.. skip this customer ${customer.id}`);
        continue;
      }

      let extdataObj: any = {
        "Termination-s2-req1": customer.contactInformations[0].primaryEmail, //employeeTableSearch,
        "Termination-s2-resp1": [customer.firstName, customer.lastName].join(" ") + customer.contactInformations[0].primaryEmail,
        "Termination-s2-resp2": "VIEW"

      }

      extdataArray.push(extdataObj)

    }

    let Extdata;// = {...commonExecutionData, ...TestData.single};

    await createFile(TEMP_EXTDATA_FOLDER, "ExternalData_execAll" + "_Terminate.json", JSON.stringify(extdataArray))
    TestDataExecutive.terminate.source.link = SERVER_EXTDATA_PATH + "ExternalData_execAll" + "_Terminate.json";

    commonExecutionData.executeAll = 0;
    commonExecutionData.testCases = targetTestcasesExecutive.terminate //['OpenUrl', 'login', 'Terminate_Member', 'SignOut']
    Extdata = {...commonExecutionData, ...TestDataExecutive.terminate};
    Extdata.datasets = extdataArray.length;
    //Extdata.customerId = customer.id;
    const result = await this.aitp.soleExecution(Extdata, false, 'executive')

    //delete tempfile
    await deleteFile(TEMP_EXTDATA_FOLDER + "/ExternalData_execAll" + "_Terminate.json")
    result.customers = customers
    return result;

    //return array_of_arrayCustomers or object_of_arrayCustomers
  }

  async provisionExecutiveSingle(customer: Customer, executivePlan: any) {

    if (!customer.contactInformations) {
      console.log(`no customer contact info.. ?? wrong data.. skip this customer ${customer.id}`);
      return null;
    }

    let coverage = this.provision.getCoverageValueExecutive(executivePlan)
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

    let extdataObj: any = {

      "Add_Employee-s3-req1": customer.contactInformations[0].primaryEmail, //employeeEmail,
      "Add_Employee-s3-req2": customer.firstName, //employeeFirstName,
      "Add_Employee-s3-req3": customer.lastName, //employeeLastName,

      "Add_Employee-s4-req1": customer.contactInformations[0].primaryEmail, //employeeTableSearch,

      "Add_Employee-s4-resp1": [customer.firstName, customer.lastName].join(" "),
      "Add_Employee-s4-resp2": "VIEW"
    }

    let extdataObjs: any = {
      "Add_Employee-s3-req1": customer.contactInformations[0].primaryEmail, //employeeEmail,
      "Add_Employee-s3-req2": customer.firstName, //employeeFirstName,
      "Add_Employee-s3-req3": customer.lastName, //employeeLastName,

      "Add_Employee-s4-req1": customer.contactInformations[0].primaryEmail, //employeeTableSearch,

      "Add_Employee-s4-resp1": [customer.firstName, customer.lastName].join(" "),
      "Add_Employee-s4-resp2": "VIEW"

    }



    let dependantsInfo: any = []
    let extdataArray = []
    let Extdata;// = {...commonExecutionData, ...TestData.single};

    let result;
    coverage = "1";//always single for now
    switch (coverage) {
      case "1":
        extdataArray.push(extdataObj)
        await createFile(TEMP_EXTDATA_FOLDER, "ExternalData_ex" + customer.id + "_S.json", JSON.stringify(extdataArray))
        TestDataExecutive.single.source.link = SERVER_EXTDATA_PATH + "ExternalData_ex" + customer.id + "_S.json";
        commonExecutionData.executeAll = 0;
        commonExecutionData.testCases = targetTestcasesExecutive.single //['OpenUrl', 'login', 'Personal_Info', 'SignOut']
        Extdata = {...commonExecutionData, ...TestDataExecutive.single};
        Extdata.customerId = customer.id;
        result = await this.aitp.soleExecution(Extdata, true, 'executive')

        //delete tempfile
        await deleteFile(TEMP_EXTDATA_FOLDER + "/ExternalData_ex" + customer.id + "_S.json")
        break;
      case "2": //couple
        if (customer.customerRelatives) {
          dependantsInfo = await this.provision.getDependantInfoExecutive(customer.customerRelatives);
          //console.log(dependantsInfo);

          extdataObj = {...extdataObjs, ...dependantsInfo.dependantsExtdataObject};
          extdataArray.push(extdataObj)

          if (dependantsInfo.dependantsNumber > 0 && dependantsInfo.disabledChildrenNumber > 0) {
            //mail related to special child
          } else {
            await createFile(TEMP_EXTDATA_FOLDER, "ExternalData_ex" + customer.id + "_C.json", JSON.stringify(extdataArray))
            TestDataExecutive.couple.source.link = SERVER_EXTDATA_PATH + "ExternalData_ex" + customer.id + "_C.json";

            commonExecutionData.executeAll = 0;
            commonExecutionData.testCases = targetTestcasesExecutive.couple//['OpenUrl', 'login', 'Personal_Info', 'Dependents', 'SignOut']
            Extdata = {...commonExecutionData, ...TestDataExecutive.couple};
            Extdata.customerId = customer.id;
            result = await this.aitp.soleExecution(Extdata, true, 'executive')

            //delete tempfile
            await deleteFile(TEMP_EXTDATA_FOLDER + "/ExternalData_ex" + customer.id + "_C.json")
          }

        } else {
          console.log("no customer relatives.. wrong coverage Couple-2")
        }

        break;
      case "3": //family
        if (customer.customerRelatives) {
          dependantsInfo = await this.provision.getDependantsInfoExecutive(customer.customerRelatives);
          //console.log(dependantsInfo);

          extdataObj = {...extdataObjs, ...dependantsInfo.dependantsExtdataObject};
          extdataArray.push(extdataObj)

          if (dependantsInfo.dependantsNumber > 0 && dependantsInfo.disabledChildrenNumber > 0) {
            //mail related to special child
          } else {
            await createFile(TEMP_EXTDATA_FOLDER, "ExternalData_ex" + customer.id + "_F.json", JSON.stringify(extdataArray))
            TestDataExecutive.family.source.link = SERVER_EXTDATA_PATH + "ExternalData_ex" + customer.id + "_F.json";

            commonExecutionData.executeAll = 0;
            commonExecutionData.testCases = targetTestcasesExecutive.family//['OpenUrl', 'login', 'Personal_Info', 'Dependents', 'SignOut']

            Extdata = {...commonExecutionData, ...TestDataExecutive.family};
            Extdata.customerId = customer.id;
            result = await this.aitp.soleExecution(Extdata, true, 'executive')

            //delete tempfile
            await deleteFile(TEMP_EXTDATA_FOLDER + "/ExternalData_ex" + customer.id + "_F.json")
          }
        } else {
          console.log("no customer relatives.. wrong coverage Family-3")
        }

        break;
    }

    return result;
  }

  async terminateExecutiveSingle(customer: any) {
    let extdata: any = [{
      "Termination-s2-req1": customer.contactInformations[0].primaryEmail, //employeeTableSearch,
      "Termination-s2-resp1": [customer.firstName, customer.lastName].join(" ") + customer.contactInformations[0].primaryEmail,
      "Termination-s2-resp2": "VIEW"
    }]


    let Extdata;// = {...commonExecutionData, ...TestData.single};

    await createFile(TEMP_EXTDATA_FOLDER, "ExternalData_exec" + customer.id + "_Terminate.json", JSON.stringify(extdata))
    TestDataExecutive.terminate.source.link = SERVER_EXTDATA_PATH + "ExternalData_exec" + customer.id + "_Terminate.json";

    commonExecutionData.executeAll = 0;
    commonExecutionData.testCases = targetTestcasesExecutive.terminate //['OpenUrl', 'login', 'Terminate_Member', 'SignOut']
    Extdata = {...commonExecutionData, ...TestDataExecutive.terminate};
    Extdata.customerId = customer.id;
    const result = await this.aitp.soleExecution(Extdata, false, 'executive')

    //delete tempfile
    await deleteFile(TEMP_EXTDATA_FOLDER + "/ExternalData_exec" + customer.id + "_Terminate.json")
    return result;


  }



  async executiveUsersProvisionProcess(customers: any, result: any, success: boolean, scenario: string, registerTermination: boolean) {

    let mailOptions: Mail.Options = {}
    mailOptions.to = SYS_ADMIN.email

    if (registerTermination) {
      console.log(`exec reg`)
      if (result.executiveRegistration) {
        if (result.executiveRegistrationDatasets && result.executiveRegistrationDatasets.lnegth > 2) {
          for (const ds of result.executiveRegistrationDatasets) {
            console.log(`Dataset:${ds} - ${result.executiveRegistrationDatasets[ds]}`)
          }
        }
      }
    } else {
      console.log(`exec term`)
      if (result.executiveTermination) {
        if (result.executiveTerminationDatasets && result.executiveTerminationDatasets.lnegth > 2) {
          for (const ds of result.executiveTerminationDatasets) {
            console.log(`Dataset:${ds} - ${result.executiveTerminationDatasets[ds]}`)
          }
        }
      }
    }


    let plansInfo = ``
    let index = 2


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
      usertable = usertable.replace("{{registerTerminationHeader}}", "Registration Status")
    } else {
      usertable = usertable.replace("{{registerTerminationHeader}}", "Termination Status")
    }
    for (const customer of customers) {

      if (customer.customerPlans) {
        for (const cp of customer.customerPlans) {
          //filter for only executive plans
          if (EXECUTIVE_CARE_COMPLETE_PLAN_LEVELS.indexOf(cp.plan.planLevel) >= 0) {
            plansInfo += `<tr>`
            plansInfo += `<td>` + cp.plan.name + `</td>`
            plansInfo += `</tr>`
          }
        }
      } else {
        console.log(`cust_no_${customer.id}: no customer plans`)
      }
      let plansTable = `<table>` +
        `<caption>Plans</caption>` +
        `<tbody>` +
        plansInfo +
        `</tbody>` +
        `</table>`

      let planDetails = `<div class='userdetails-wrapper'>` +
        // plansTable +
        `<br>` +
        `</div>`

      if (customer.customerSignup) {
        console.log(`cust_no_${customer.id}: signup exists`)
      } else {
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

      const customer_contact = customer.contactInformations.filter((contact: any) => {
        return contact.contactType == CONTACT_TYPE.CUSTOMER && contact.addressType == ADDRESS_TYPE.HOME_ADDRESS
      });

      const customer_home_contact = customer_contact[0];

      const customer_home_address = [customer_home_contact.apt ?? "" + " " + customer_home_contact.line1 + " " + customer_home_contact.line2, customer_home_contact.city, customer_home_contact.state, customer_home_contact.postalCode].join(', ');
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
        `</tr>`


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
        usertable = usertable.replace("{{registerTerminationValue}}", result.executiveRegistrationDatasets[index] == "Passed" ? "Success" : "Failed")
      } else {
        usertable = usertable.replace("{{registerTerminationValue}}", result.executiveTerminationDatasets[index] == "Passed" ? "Success" : "Failed")
      }
    }

    usertable += `</tbody>` +
      `</table>`;

    let brokerEmailids = [SYS_ADMIN.email]
    mailOptions.to = brokerEmailids


    let userdetails = `<div class='userdetails-wrapper'>` +
      usertable +
      `<br>` +
      //dependantsTable +
      `</div>`

    if (success) {
      if (result.executive_employee_id != null) {
        usertable = usertable.replace('{{executiveHeader}}', `<th>Executive Employee Id</th>`)
        usertable = usertable.replace('{{executiveValue}}', `<td>` + result.executive_employee_id + `</td>`)
      } else {
        usertable = usertable.replace('{{executiveHeader}}', '')
        usertable = usertable.replace('{{executiveValue}}', '')
      }
    } else {
      usertable = usertable.replace('{{executiveHeader}}', '')
      usertable = usertable.replace('{{executiveValue}}', '')
    }

    userdetails = `<div class='userdetails-wrapper'>` +
      usertable +
      `<br>` +
      //dependantsTable +
      `</div>`

    if (success) {


      if (registerTermination) {
        mailOptions.subject = this.mailHelper.getExecutiveSuccessSubject()//.replace('{{Enrolment date}}', moment(customer.customerSignup.enrollmentDate).format('MM/DD/YYYY'));
        mailOptions.html = this.mailHelper.getExecutiveSuccessBody(SYS_ADMIN.name, userdetails, '', '')//.replace('{{Enrolment date}}', moment(customer.customerSignup.enrollmentDate).format('MM/DD/YYYY'));
      } else {
        mailOptions.subject = this.mailHelper.getExecutiveTerminationSuccessSubject()//.replace('{{Enrolment date}}', moment(customer.customerSignup.enrollmentDate).format('MM/DD/YYYY'));
        mailOptions.html = this.mailHelper.getExecutiveSuccessBody(SYS_ADMIN.name, userdetails, '', '')//.replace('{{Enrolment date}}', moment(customer.customerSignup.enrollmentDate).format('MM/DD/YYYY'));
      }
    } else {
      switch (scenario) {

        case 'notImplemented':
          // brokerDetails += '<p>Customer coverage with Couple/Family in EXEC-CandooHealth not implemented yet</p>'
          //brokerDetails += '<p>Customer coverage with Family in EXEC-CandooHealth not implemented yet</p>'
          mailOptions.subject = this.mailHelper.getExecutiveFailSubject()//.replace('{{Enrolment date}}', moment(customer.customerSignup.enrollmentDate).format('MM/DD/YYYY'));
          mailOptions.html = this.mailHelper.getExecutiveFailBody(SYS_ADMIN.name, userdetails, '', '')//.replace('{{Enrolment date}}', moment(customer.customerSignup.enrollmentDate).format('MM/DD/YYYY'));
          break;
        case 'normal':
        default:
          mailOptions.subject = this.mailHelper.getExecutiveFailSubject()//.replace('{{Enrolment date}}', moment(customer.customerSignup.enrollmentDate).format('MM/DD/YYYY'));
          mailOptions.html = this.mailHelper.getExecutiveFailBody(SYS_ADMIN.name, userdetails, '', '')//.replace('{{Enrolment date}}', moment(customer.customerSignup.enrollmentDate).format('MM/DD/YYYY'));
      }

    }

    if (process.env.ccList) {
      mailOptions.cc = process.env.ccList
    }
    mailOptions.bcc = [GB_ADMIN]
    mailOptions.from = GB_ADMIN;
    await this.mail.sendMail(mailOptions)

    return 1
  }
}
