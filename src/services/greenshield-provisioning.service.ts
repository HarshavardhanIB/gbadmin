import { /* inject, */ BindingScope, injectable, service} from '@loopback/core';
import moment from 'moment';
import {commonExecutionData, GREENSHEILD_PLAN_LEVELS, targetTestcasesGreenshield, TestDataGreenshield} from '../constants';
import {Customer} from '../models';
import {SERVER_EXTDATA_PATH, TEMP_EXTDATA_FOLDER} from '../paths';
import {createFile, deleteFile} from '../storage.helper';
import {AitpService} from './aitp.service';
import {CommonProvisioningService} from './common-provisioning.service';


@injectable({scope: BindingScope.TRANSIENT})
export class GreenshieldProvisioningService {

  constructor(/* Add @inject to inject parameters */
    @service(CommonProvisioningService)
    protected provision: CommonProvisioningService,
    @service(AitpService)
    protected aitp: AitpService,
  ) { }

  /*
   * Add service methods here
   */
  async provisionGreenshield(customers: Customer[]) {

    // let greenshieldPlanPackages = [1] //health and dental

    let SCustomers = [] //single
    let C1Customers = [] //couple - customer and 1 dependent(spouse or a child)
    let F2Customers = [] //family - customer with/without spouse and children
    let SDCCustomers = [] // customer with atleast one child as special dependant

    for (let customer of customers) {

      //valid customer plans for grrenshield

      let greenshieldPlan: any = {}
      const greenshieldValidPlans: any = []

      for (const cp of customer.customerPlans) {
        //if (GREENSHEILD_PACKAGES.indexOf(cp.plan.packageId) >= 0) {
        if (GREENSHEILD_PLAN_LEVELS.indexOf(cp.plan.planLevel) >= 0) {
          greenshieldValidPlans.push(cp);
        }
      }

      if (greenshieldValidPlans.length == 0) {
        //no plans
        //just skip....
        console.log("//no plans     //just skip....")
        continue;
      } else if (greenshieldValidPlans.length == 1) {
        greenshieldPlan = greenshieldValidPlans[0]
      } else {
        console.log('more than 1 plans??? something wrong');
        greenshieldPlan = greenshieldValidPlans[0]
      }

      if (!customer.contactInformations) {
        console.log(`no customer contact info.. ?? wrong data.. skip this customer ${customer.id}`);
        continue;
      }

      let coverage = this.provision.getCoverageValue(greenshieldPlan)

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

      let extdataObj: any = {
        "Personal_Info-s2-req1": moment(customer.customerSignup.enrollmentDate).format('YYYY'), //ctl00$cphBody$firstDayOfCoverage$txtYear
        "Personal_Info-s2-req2": moment(customer.customerSignup.enrollmentDate).format('MM'), //ctl00$cphBody$firstDayOfCoverage$txtMonth
        "Personal_Info-s2-req3": moment(customer.customerSignup.enrollmentDate).format('DD'), //ctl00$cphBody$firstDayOfCoverage$txtDay

        "Personal_Info-s3-req1": customer.lastName, //ctl00$cphBody$txtLastName
        "Personal_Info-s3-req2": customer.firstName, //ctl00$cphBody$txtLegalFirstName
        "Personal_Info-s3-req3": moment(customer.dob).format('YYYY'), //ctl00$cphBody$dateinputBirthdate$txtYear
        "Personal_Info-s3-req4": moment(customer.dob).format('MM'), //ctl00$cphBody$dateinputBirthdate$txtMonth
        "Personal_Info-s3-req5": moment(customer.dob).format('DD'), //ctl00$cphBody$dateinputBirthdate$txtDay
        "Personal_Info-s3-req6": customer.gender ? ((customer.gender == "NON-BINARY") ? 'X' : customer.gender[0]) : '', //ctl00$cphBody$ddlGender //if Male --> M, F, X, U

        "Personal_Info-s3-req7": (customer.contactInformations[0].apt ?? "") + customer.contactInformations[0].line1, //ctl00$cphBody$txtAddressLine1
        "Personal_Info-s3-req8": customer.contactInformations[0].line2, //ctl00$cphBody$txtAddressLine2
        "Personal_Info-s3-req9": customer.contactInformations[0].city, //ctl00$cphBody$txtCity

        "Personal_Info-s3-req10": customer.contactInformations[0].state, //ctl00$cphBody$ddlProvince
        "Personal_Info-s3-req11": greenshieldPlan.plan.stateTaxDetails[0].state.country.greenshieldCode,
        //this.provision.getCountryValue(customer.contactInformations[0].country),//ctl00$cphBody$ddlCountry

        "Personal_Info-s3-req12": customer.contactInformations[0].postalCode, //ctl00$cphBody$txtPostalZipCode //postal_code

        "Personal_Info-s3-req13": customer.contactInformations[0].primaryEmail, //ctl00$cphBody$txtEmailAddressEnter
        "Personal_Info-s3-req14": customer.contactInformations[0].primaryEmail, //ctl00$cphBody$txtEmailAddressConfirm

        "Personal_Info-s3-req15": this.provision.getPackageValue(greenshieldPlan.plan.planLevels.greenshieldPackages, greenshieldPlan.plan.stateTaxDetails[0].stateId), //ctl00$cphBody$ClientDefinedFieldGrid$ctlPACKAGES

        "Personal_Info-s4-req1": coverage

      }

      let dependantsInfo: any = {}
      let targetTestcases: any = []
      //check condition and push this object to related array
      switch (coverage) {
        case "S":
          SCustomers.push(extdataObj);
          targetTestcases = ["Personal_Info"]
          break;
        case "C2":
          if (customer.customerRelatives) {
            dependantsInfo = await this.provision.getDependantInfo(customer.customerRelatives);
            //console.log(dependantsInfo);

            extdataObj = {...extdataObj, ...dependantsInfo.dependantsExtdataObject};
          }
          if (dependantsInfo.dependantsNumber > 0 && dependantsInfo.disabledChildrenNumber > 0) {
            SDCCustomers.push(extdataObj)
          } else {
            C1Customers.push(extdataObj)
            targetTestcases = ["Personal_Info", "Dependants"]
          }
          break;
        case "F1":
          if (customer.customerRelatives) {
            dependantsInfo = await this.provision.getDependantsInfo(customer.customerRelatives);
            //console.log(dependantsInfo);

            extdataObj = {...extdataObj, ...dependantsInfo.dependantsExtdataObject};
            // extdataObj.dependantsInfo = dependantsInfo;
          }
          if (dependantsInfo.dependantsNumber > 0 && dependantsInfo.disabledChildrenNumber > 0) {
            SDCCustomers.push(extdataObj)
          } else {


            F2Customers.push(extdataObj)
            targetTestcases = ["Personal_Info", "Dependants"]
          }
          break;
      }

    }

    const customerdataObject: any = {
      single: SCustomers,
      couple: C1Customers,
      family: F2Customers,
      specialChild: SDCCustomers
    }

    return customerdataObject

    //return array_of_arrayCustomers or object_of_arrayCustomers
  }

  async provisionGreenshieldSingle(customer: Customer, greenshieldPlan: any) {

    if (!customer.contactInformations) {
      console.log(`no customer contact info.. ?? wrong data.. skip this customer ${customer.id}`);
      return null;
    }

    let coverage = this.provision.getCoverageValueGreenshield(greenshieldPlan)

    let extdataObj: any = {
      "Personal_Info-s2-req1": moment(customer.customerSignup.enrollmentDate).format('YYYY'), //ctl00$cphBody$firstDayOfCoverage$txtYear
      "Personal_Info-s2-req2": moment(customer.customerSignup.enrollmentDate).format('MM'), //ctl00$cphBody$firstDayOfCoverage$txtMonth
      "Personal_Info-s2-req3": moment(customer.customerSignup.enrollmentDate).format('DD'), //ctl00$cphBody$firstDayOfCoverage$txtDay

      "Personal_Info-s3-req1": customer.lastName, //ctl00$cphBody$txtLastName
      "Personal_Info-s3-req2": customer.firstName, //ctl00$cphBody$txtLegalFirstName
      "Personal_Info-s3-req3": moment(customer.dob).format('YYYY'), //ctl00$cphBody$dateinputBirthdate$txtYear
      "Personal_Info-s3-req4": moment(customer.dob).format('MM'), //ctl00$cphBody$dateinputBirthdate$txtMonth
      "Personal_Info-s3-req5": moment(customer.dob).format('DD'), //ctl00$cphBody$dateinputBirthdate$txtDay
      "Personal_Info-s3-req6": this.provision.getGenderGreenshield(customer.gender ?? ''),// customer.gender ? ((customer.gender == "NON-BINARY") ? 'X' : customer.gender[0]) : '', //ctl00$cphBody$ddlGender //if Male --> M, F, X, U

      "Personal_Info-s3-req7": (customer.contactInformations[0].apt ?? "") + customer.contactInformations[0].line1, //ctl00$cphBody$txtAddressLine1
      "Personal_Info-s3-req8": customer.contactInformations[0].line2, //ctl00$cphBody$txtAddressLine2
      "Personal_Info-s3-req9": customer.contactInformations[0].city, //ctl00$cphBody$txtCity

      "Personal_Info-s3-req10": customer.contactInformations[0].state, //ctl00$cphBody$ddlProvince
      "Personal_Info-s3-req11": greenshieldPlan.plan.stateTaxDetails[0].state.country.greenshieldCode,
      //this.provision.getCountryValue(customer.contactInformations[0].country),//ctl00$cphBody$ddlCountry

      "Personal_Info-s3-req12": customer.contactInformations[0].postalCode, //ctl00$cphBody$txtPostalZipCode //postal_code

      "Personal_Info-s3-req13": customer.contactInformations[0].primaryEmail, //ctl00$cphBody$txtEmailAddressEnter
      "Personal_Info-s3-req14": customer.contactInformations[0].primaryEmail, //ctl00$cphBody$txtEmailAddressConfirm

      "Personal_Info-s3-req15": this.provision.getPackageValue(greenshieldPlan.plan.planLevels.greenshieldPackages, greenshieldPlan.plan.stateTaxDetails[0].stateId), //ctl00$cphBody$ClientDefinedFieldGrid$ctlPACKAGES

      "Personal_Info-s4-req1": coverage

    }

    let dependantsInfo: any = []

    let extdataArray = []


    let Extdata;// = {...commonExecutionData, ...TestData.single};

    let result;
    switch (coverage) {
      case "S":
        extdataArray.push(extdataObj)
        await createFile(TEMP_EXTDATA_FOLDER, "ExternalData_" + customer.id + "_S.json", JSON.stringify(extdataArray))
        TestDataGreenshield.single.source.link = SERVER_EXTDATA_PATH + "ExternalData_" + customer.id + "_S.json";
        commonExecutionData.executeAll = 0;
        commonExecutionData.testCases = targetTestcasesGreenshield.single //['OpenUrl', 'login', 'Personal_Info', 'SignOut']
        Extdata = {...commonExecutionData, ...TestDataGreenshield.single};
        Extdata.customerId = customer.id;
        result = await this.aitp.soleExecution(Extdata, true, 'greenshield')

        //delete tempfile
        await deleteFile(TEMP_EXTDATA_FOLDER + "/ExternalData_" + customer.id + "_S.json")
        break;
      case "C2":
        if (customer.customerRelatives) {
          dependantsInfo = await this.provision.getDependantInfoGreenshield(customer.customerRelatives);
          //console.log(dependantsInfo);

          extdataObj = {...extdataObj, ...dependantsInfo.dependantsExtdataObject};
          extdataArray.push(extdataObj)

          if (dependantsInfo.dependantsNumber > 0 && dependantsInfo.disabledChildrenNumber > 0) {
            //mail related to special child
          } else {
            await createFile(TEMP_EXTDATA_FOLDER, "ExternalData_" + customer.id + "_C.json", JSON.stringify(extdataArray))
            TestDataGreenshield.couple.source.link = SERVER_EXTDATA_PATH + "ExternalData_" + customer.id + "_C.json";

            commonExecutionData.executeAll = 0;
            commonExecutionData.testCases = targetTestcasesGreenshield.couple//['OpenUrl', 'login', 'Personal_Info', 'Dependents', 'SignOut']
            Extdata = {...commonExecutionData, ...TestDataGreenshield.couple};
            Extdata.customerId = customer.id;
            result = await this.aitp.soleExecution(Extdata, true, 'greenshield')


            //delete tempfile
            await deleteFile(TEMP_EXTDATA_FOLDER + "/ExternalData_" + customer.id + "_C.json")
          }

        } else {
          console.log("no customer relatives.. wrong coverage C2")
        }

        break;
      case "F1":
        if (customer.customerRelatives) {
          dependantsInfo = await this.provision.getDependantsInfoGreenshield(customer.customerRelatives);
          //console.log(dependantsInfo);

          extdataObj = {...extdataObj, ...dependantsInfo.dependantsExtdataObject};
          extdataArray.push(extdataObj)

          if (dependantsInfo.dependantsNumber > 0 && dependantsInfo.disabledChildrenNumber > 0) {
            //mail related to special child
          } else {
            await createFile(TEMP_EXTDATA_FOLDER, "ExternalData_" + customer.id + "_F.json", JSON.stringify(extdataArray))
            TestDataGreenshield.family.source.link = SERVER_EXTDATA_PATH + "ExternalData_" + customer.id + "_F.json";

            commonExecutionData.executeAll = 0;
            commonExecutionData.testCases = targetTestcasesGreenshield.family//['OpenUrl', 'login', 'Personal_Info', 'Dependents', 'SignOut']

            Extdata = {...commonExecutionData, ...TestDataGreenshield.family};
            Extdata.customerId = customer.id;
            result = await this.aitp.soleExecution(Extdata, true, 'greenshield')

            //delete tempfile
            await deleteFile(TEMP_EXTDATA_FOLDER + "/ExternalData_" + customer.id + "_F.json")
          }
        } else {
          console.log("no customer relatives.. wrong coverage F1")
        }

        break;
    }

    return result;
  }

  async terminateGreenshieldSingle(customer: any) {
    let extdata: any = [{
      "Terminate_Member-s3-req1": customer.greenshieldMemberId,
      "Terminate_Member-s4-req1": customer.greenshieldMemberId,
      "Terminate_Member-s6-req1": moment(customer.customerSignup.enrollmentDate).format('YYYY'),
      "Terminate_Member-s6-req2": moment(customer.customerSignup.enrollmentDate).format('MM'),
      "Terminate_Member-s6-req3": moment(customer.customerSignup.enrollmentDate).format('DD'),
      "Terminate_Member-s6-req4": "N", //No (not deceased)
      "Terminate_Member-s6-req5": "AU" //AUDIT
    }]


    let Extdata;// = {...commonExecutionData, ...TestData.single};

    await createFile(TEMP_EXTDATA_FOLDER, "ExternalData_" + customer.id + "_Terminate.json", JSON.stringify(extdata))
    TestDataGreenshield.terminate.source.link = SERVER_EXTDATA_PATH + "ExternalData_" + customer.id + "_Terminate.json";

    commonExecutionData.executeAll = 0;
    commonExecutionData.testCases = targetTestcasesGreenshield.terminate //['OpenUrl', 'login', 'Terminate_Member', 'SignOut']
    Extdata = {...commonExecutionData, ...TestDataGreenshield.terminate};
    Extdata.customerId = customer.id;
    const result = await this.aitp.soleExecution(Extdata, false, 'greenshield')

    //delete tempfile
    await deleteFile(TEMP_EXTDATA_FOLDER + "/ExternalData_" + customer.id + "_Terminate.json")
    return result;


  }
}
