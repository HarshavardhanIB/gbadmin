import { /* inject, */ BindingScope, injectable, service} from '@loopback/core';
import moment from 'moment';
import {commonExecutionData, EQUITABLE_PLAN_LEVELS, GENDER, targetTestcasesEquitable, TestDataEquitable} from '../constants';
import {Customer} from '../models';
import {SERVER_EXTDATA_PATH, TEMP_EXTDATA_FOLDER} from '../paths';
import {createFile, deleteFile} from '../storage.helper';
import {AitpService} from './aitp.service';
import {CommonProvisioningService} from './common-provisioning.service';

@injectable({scope: BindingScope.TRANSIENT})
export class EquitableProvisioningService {
  constructor(/* Add @inject to inject parameters */
    @service(CommonProvisioningService)
    protected provision: CommonProvisioningService,
    @service(AitpService)
    protected aitp: AitpService,) { }

  /*
   * Add service methods here
   */

  async provisionEquitable(customers: Customer[]) {

    // let greenshieldPlanPackages = [1] //health and dental

    let SCustomers = [] //single
    let C1Customers = [] //couple - customer and 1 dependent(spouse or a child)
    let F2Customers = [] //family - customer with/without spouse and children
    let SDCCustomers = [] // customer with atleast one child as special dependant

    for (let customer of customers) {

      //valid customer plans for grrenshield

      let equitablePlan: any = {}
      const equitableValidPlans: any = []

      for (const cp of customer.customerPlans) {
        //if (GREENSHEILD_PACKAGES.indexOf(cp.plan.packageId) >= 0) {
        if (EQUITABLE_PLAN_LEVELS.indexOf(cp.plan.planLevel) >= 0) {
          equitableValidPlans.push(cp);
        }
      }

      if (equitableValidPlans.length == 0) {
        //no plans
        //just skip....
        console.log("//no plans     //just skip....")
        continue;
      } else if (equitableValidPlans.length == 1) {
        equitablePlan = equitableValidPlans[0]
      } else {
        console.log('more than 1 plans??? something wrong');
        equitablePlan = equitableValidPlans[0]
      }

      if (!customer.contactInformations) {
        console.log(`no customer contact info.. ?? wrong data.. skip this customer ${customer.id}`);
        continue;
      }

      let coverage = this.provision.getCoverageValueEquitable(equitablePlan)

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
        "Personal_Info-s3-req11": equitablePlan.plan.stateTaxDetails[0].state.country.id,
        //this.provision.getCountryValue(customer.contactInformations[0].country),//ctl00$cphBody$ddlCountry

        "Personal_Info-s3-req12": customer.contactInformations[0].postalCode, //ctl00$cphBody$txtPostalZipCode //postal_code

        "Personal_Info-s3-req13": customer.contactInformations[0].primaryEmail, //ctl00$cphBody$txtEmailAddressEnter
        "Personal_Info-s3-req14": customer.contactInformations[0].primaryEmail, //ctl00$cphBody$txtEmailAddressConfirm

        "Personal_Info-s3-req15": this.provision.getPackageValue(equitablePlan.plan.planLevels.equitablePackages, equitablePlan.plan.stateTaxDetails[0].stateId), //ctl00$cphBody$ClientDefinedFieldGrid$ctlPACKAGES

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

  //here single doesnt mean coverage but count of customers --- so 1 customer will be provisioned to Equitable
  async provisionEquitableSingle(customer: Customer, equitablePlan: any) {

    if (!customer.contactInformations) {
      console.log(`no customer contact info.. ?? wrong data.. skip this customer ${customer.id}`);
      return null;
    }

    let coverage = this.provision.getCoverageValueEquitable(equitablePlan)

    console.log(`coverage: ${coverage}`);
    //coverage = "1";
    //console.log(`adjusted to coverage: ${coverage} to check eq single only; remove later`);

    let equitableDetails = this.provision.getPackageValueEquitable(equitablePlan.plan.planLevels.equitablePackages, equitablePlan.plan.stateTaxDetails[0].stateId);

    //let equitableStateId = this.provision.getStateIdEquitable()

    //Question only for division1
    let div1_choice = ""
    if (equitableDetails.division == "21514") { //21514 div1
      div1_choice = 'optPPMPYes' //cntEmployeeDetail_Roc_optPPMPYes
      //cntEmployeeDetail_Roc_optPPMPNo
    } else {
      div1_choice = 'aitp_exec_false'
    }

    let gender = ""
    if (customer.gender) {
      switch (customer.gender) {
        case GENDER.MALE:
          gender = "2"
          break;
        case GENDER.FEMALE:
          gender = "1"
          break;
      }
    }

    let extdataObjSave: any = {

      "Personal_information_form-s3-req1": equitableDetails.division, //cmbDivision,
      "Personal_information_form-s4-req1": equitableDetails.class,  //cmbClass,
      "Personal_information_form-s5-req1": coverage,  //cmbFamilyCategory,
      "Personal_information_form-s6-req1": customer.customerSignup.weeklyHours, //txtNumHrsWeek,
      "Personal_information_form-s6-req2": customer.customerSignup.jobTitle, //txtJobTitle,
      "Personal_information_form-s6-req3": moment(customer.customerSignup.hiringDate).format('M/D/YYYY'), //calHireDate,
      "Personal_information_form-s6-req5": customer.firstName, //cntEmployeeDetail_Roc_txtFirstName,
      "Personal_information_form-s6-req6": customer.lastName, //cntEmployeeDetail_Roc_txtLastName,
      "Personal_information_form-s6-req7": moment(customer.dob).format('M/D/YYYY'), //cntEmployeeDetail_Roc_calBirthDate,
      "Personal_information_form-s6-req8": gender,//customer.gender ? ((customer.gender == "FEMALE" || customer.gender == "MALE") ? (customer.gender == "FEMALE" ? '1' : '2') : '') : '', //cntEmployeeDetail_Roc_cmbGender,
      "Personal_information_form-s6-req10": (customer.contactInformations[0].apt ?? "") + customer.contactInformations[0].line1, //cntEmployeeDetail_Roc_txtAddress1,
      "Personal_information_form-s6-req11": customer.contactInformations[0].line2, //cntEmployeeDetail_Roc_txtAddress2,
      "Personal_information_form-s6-req12": customer.contactInformations[0].city, //cntEmployeeDetail_Roc_txtCity,
      "Personal_information_form-s6-req13": equitablePlan.plan.stateTaxDetails[0].state.country.id, //cntEmployeeDetail_Roc_cmbPersonROCCountry,
      "Personal_information_form-s6-req14": equitablePlan.plan.stateTaxDetails[0].state.equitableId, //(name|shortName) //cntEmployeeDetail_Roc$cmbPersonROCProvince,
      "Personal_information_form-s6-req15": customer.contactInformations[0].postalCode?.replace(/ /g, ""), //cntEmployeeDetail_Roc_txtPostalCode,
      "Personal_information_form-s7-req1": div1_choice,
      "Personal_information_form-s7-req2": customer.contactInformations[0].primaryEmail, //cntEmployeeDetail_Roc$txtHomeEmail,
      "Personal_information_form-s7-req3": customer.contactInformations[0].primaryEmail, //cntEmployeeDetail_Roc$txtConfirmHomeEmail,
      "Personal_information_form-s8-req1": moment(customer.customerSignup.enrollmentDate).format('M/D/YYYY')
    }

    let extdataObjsSave: any = {
      "Personal_Info-s3-req1": equitableDetails.division, //cmbDivision,
      "Personal_Info-s4-req1": equitableDetails.class,  //cmbClass,
      "Personal_Info-s5-req1": coverage,  //cmbFamilyCategory,
      "Personal_Info-s6-req1": customer.customerSignup.weeklyHours, //txtNumHrsWeek,
      "Personal_Info-s6-req2": customer.customerSignup.jobTitle, //txtJobTitle,
      "Personal_Info-s6-req3": moment(customer.customerSignup.hiringDate).format('M/D/YYYY'), //calHireDate,
      "Personal_Info-s6-req5": customer.firstName, //cntEmployeeDetail_Roc_txtFirstName,
      "Personal_Info-s6-req6": customer.lastName, //cntEmployeeDetail_Roc_txtLastName,
      "Personal_Info-s6-req7": moment(customer.dob).format('M/D/YYYY'), //cntEmployeeDetail_Roc_calBirthDate,
      "Personal_Info-s6-req8": gender,
      "Personal_Info-s6-req10": (customer.contactInformations[0].apt ?? "") + customer.contactInformations[0].line1, //cntEmployeeDetail_Roc_txtAddress1,
      "Personal_Info-s6-req11": customer.contactInformations[0].line2,
      "Personal_Info-s6-req12": customer.contactInformations[0].city,
      "Personal_Info-s6-req13": equitablePlan.plan.stateTaxDetails[0].state.country.id,
      "Personal_Info-s6-req14": equitablePlan.plan.stateTaxDetails[0].state.equitableId,
      "Personal_Info-s6-req15": customer.contactInformations[0].postalCode?.replace(/ /g, ""),
      "Personal_Info-s6-req16": div1_choice,
      "Personal_Info-s6-req17": customer.contactInformations[0].primaryEmail,
      "Personal_Info-s6-req18": customer.contactInformations[0].primaryEmail,
      "Personal_Info-s8-req1": moment(customer.customerSignup.enrollmentDate).format('M/D/YYYY'),

    }

    let extdataObj: any = {

      "PersonalInfo-s2-req2": equitableDetails.division, //cmbDivision,
      "PersonalInfo-s2-req3": equitableDetails.class,  //cmbClass,
      "PersonalInfo-s2-req4": coverage,  //cmbFamilyCategory,
      "PersonalInfo-s2-req5": customer.customerSignup.weeklyHours, //txtNumHrsWeek,
      "PersonalInfo-s2-req6": customer.customerSignup.jobTitle, //txtJobTitle,
      "PersonalInfo-s2-req7": moment(customer.customerSignup.hiringDate).format('M/D/YYYY'), //calHireDate,
      "PersonalInfo-s2-req9": customer.firstName, //cntEmployeeDetail_Roc_txtFirstName,
      "PersonalInfo-s2-req10": customer.lastName, //cntEmployeeDetail_Roc_txtLastName,
      "PersonalInfo-s2-req11": moment(customer.dob).format('M/D/YYYY'), //cntEmployeeDetail_Roc_calBirthDate,
      "PersonalInfo-s2-req12": gender,//customer.gender ? ((customer.gender == "FEMALE" || customer.gender == "MALE") ? (customer.gender == "FEMALE" ? '1' : '2') : '') : '', //cntEmployeeDetail_Roc_cmbGender,
      "PersonalInfo-s2-req13": (customer.contactInformations[0].apt ?? "") + customer.contactInformations[0].line1, //cntEmployeeDetail_Roc_txtAddress1,
      "PersonalInfo-s2-req14": customer.contactInformations[0].line2, //cntEmployeeDetail_Roc_txtAddress2,
      "PersonalInfo-s2-req15": customer.contactInformations[0].city, //cntEmployeeDetail_Roc_txtCity,
      //"PersonalInfo-s2-req16": equitablePlan.plan.stateTaxDetails[0].state.country.id, //cntEmployeeDetail_Roc_cmbPersonROCCountry,
      "PersonalInfo-s2-req16": equitablePlan.plan.stateTaxDetails[0].state.equitableId, //(name|shortName) //cntEmployeeDetail_Roc$cmbPersonROCProvince,
      "PersonalInfo-s2-req17": customer.contactInformations[0].postalCode?.replace(/ /g, ""), //cntEmployeeDetail_Roc_txtPostalCode,
      "PersonalInfo-s2-req18": customer.contactInformations[0].primaryEmail, //cntEmployeeDetail_Roc$txtHomeEmail,
      "PersonalInfo-s2-req19": customer.contactInformations[0].primaryEmail, //cntEmployeeDetail_Roc$txtConfirmHomeEmail,
      "PersonalInfo-s2-req21": moment(customer.customerSignup.enrollmentDate).format('M/D/YYYY')
      //"PersonalInfo-s2-req22": div1_choice
    }

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

    let extdataObjs: any = extdataObj;
    let dependantsInfo: any = []
    let extdataArray = []
    let Extdata;// = {...commonExecutionData, ...TestData.single};


    let result;
    switch (coverage) {
      case "1":
        extdataArray.push(extdataObj)
        await createFile(TEMP_EXTDATA_FOLDER, "ExternalData_" + customer.id + "_S.json", JSON.stringify(extdataArray))
        TestDataEquitable.single.source.link = SERVER_EXTDATA_PATH + "ExternalData_" + customer.id + "_S.json";
        commonExecutionData.executeAll = 0;
        commonExecutionData.testCases = targetTestcasesEquitable.single //['OpenUrl', 'login', 'Personal_Info', 'SignOut']
        Extdata = {...commonExecutionData, ...TestDataEquitable.single};
        Extdata.customerId = customer.id;
        Extdata.equitableDivision = equitableDetails.division;
        Extdata.equitableClass = equitableDetails.class;
        Extdata.equitableDivisionName = equitableDetails.divisionName;
        Extdata.equitableClassName = equitableDetails.className;
        Extdata.customerFN = customer.firstName;
        Extdata.customerLN = customer.lastName;
        Extdata.customerDob = moment(customer.dob).format('M/D/YYYY');
        result = await this.aitp.soleExecution(Extdata, true, 'equitable')

        //delete tempfile
        await deleteFile(TEMP_EXTDATA_FOLDER + "/ExternalData_" + customer.id + "_S.json")
        break;
      case "2": //couple
        if (customer.customerRelatives) {
          dependantsInfo = await this.provision.getDependantInfoEquitable(customer.customerRelatives);
          //console.log(dependantsInfo);

          extdataObj = {...extdataObjs, ...dependantsInfo.dependantsExtdataObject};
          extdataArray.push(extdataObj)

          if (dependantsInfo.dependantsNumber > 0 && dependantsInfo.disabledChildrenNumber > 0) {
            //mail related to special child
          } else {
            await createFile(TEMP_EXTDATA_FOLDER, "ExternalData_" + customer.id + "_C.json", JSON.stringify(extdataArray))
            TestDataEquitable.couple.source.link = SERVER_EXTDATA_PATH + "ExternalData_" + customer.id + "_C.json";

            commonExecutionData.executeAll = 0;
            commonExecutionData.testCases = targetTestcasesEquitable.couple//['OpenUrl', 'login', 'Personal_Info', 'Dependents', 'SignOut']
            Extdata = {...commonExecutionData, ...TestDataEquitable.couple};
            Extdata.customerId = customer.id;
            Extdata.equitableDivision = equitableDetails.division;
            Extdata.equitableClass = equitableDetails.class;
            Extdata.equitableDivisionName = equitableDetails.divisionName;
            Extdata.equitableClassName = equitableDetails.className;
            Extdata.customerFN = customer.firstName;
            Extdata.customerLN = customer.lastName;
            Extdata.customerDob = moment(customer.dob).format('M/D/YYYY');
            result = await this.aitp.soleExecution(Extdata, true, 'equitable')

            //delete tempfile
            await deleteFile(TEMP_EXTDATA_FOLDER + "/ExternalData_" + customer.id + "_C.json")
          }

        } else {
          console.log("no customer relatives.. wrong coverage Couple-2")
        }

        break;
      case "3": //family
        if (customer.customerRelatives) {
          dependantsInfo = await this.provision.getDependantsInfoEquitable(customer.customerRelatives);
          //console.log(dependantsInfo);

          extdataObj = {...extdataObjs, ...dependantsInfo.dependantsExtdataObject};
          extdataArray.push(extdataObj)

          if (dependantsInfo.dependantsNumber > 0 && dependantsInfo.disabledChildrenNumber > 0) {
            //mail related to special child
          } else {
            console.log(`eq-family extdata object`)
            console.log(JSON.stringify(extdataArray));
            await createFile(TEMP_EXTDATA_FOLDER, "ExternalData_" + customer.id + "_F.json", JSON.stringify(extdataArray))
            TestDataEquitable.family.source.link = SERVER_EXTDATA_PATH + "ExternalData_" + customer.id + "_F.json";

            commonExecutionData.executeAll = 0;
            commonExecutionData.testCases = targetTestcasesEquitable.family//['OpenUrl', 'login', 'Personal_Info', 'Dependents', 'SignOut']

            Extdata = {...commonExecutionData, ...TestDataEquitable.family};
            Extdata.customerId = customer.id;
            Extdata.equitableDivision = equitableDetails.division;
            Extdata.equitableClass = equitableDetails.class;
            Extdata.equitableDivisionName = equitableDetails.divisionName;
            Extdata.equitableClassName = equitableDetails.className;
            Extdata.customerFN = customer.firstName;
            Extdata.customerLN = customer.lastName;
            Extdata.customerDob = moment(customer.dob).format('M/D/YYYY');
            result = await this.aitp.soleExecution(Extdata, true, 'equitable')

            //delete tempfile
            await deleteFile(TEMP_EXTDATA_FOLDER + "/ExternalData_" + customer.id + "_F.json")
          }
        } else {
          console.log("no customer relatives.. wrong coverage Family-3")
        }

        break;
    }

    return result;
  }

  async terminateEquitableSingle(customer: any) {
    let extdata: any = [
      {
        "Termination-s2-req1": customer.customerFN || customer.firstName, //firstName
        "Termination-s2-req2": customer.customerLN || customer.lastName,
        //"Termination-s2-req3": "2", //Search Status -- inforce
        "Termination-s2-req4": customer.customerDob || moment(customer.dob).format('M/D/YYYY'), //dob
        "Termination-s2-req5": customer.equitableDivisionName || customer.equitableDivision,
        "Termination-s2-req6": customer.equitableClassName || customer.equitableClass,
        "Termination-s3-req6": moment().format('M/D/YYYY'), //termination date -- today
        //"Termination-s3-req7":"5014" //termination reason -- 5014 -- added by mistake
        "Termination-s4-req4": customer.customerFN || customer.firstName,
        "Termination-s4-req5": customer.customerLN || customer.lastName,
        "Termination-s4-req6": customer.equitableMemberId || customer.equitableCertificateId,
        //"Termination-s2-req7": "2", //Search status -- terminated
        "Termination-s4-req8": customer.customerDob || moment(customer.dob).format('M/D/YYYY'), //dob
        "Termination-s4-req9": customer.equitableDivisionName || customer.equitableDivision,
        "Termination-s4-req10": customer.equitableClassName || customer.equitableClass
      }
    ]




    let Extdata;// = {...commonExecutionData, ...TestData.single};

    await createFile(TEMP_EXTDATA_FOLDER, "ExternalData_" + customer.id + "_Terminate.json", JSON.stringify(extdata))
    TestDataEquitable.terminate.source.link = SERVER_EXTDATA_PATH + "ExternalData_" + customer.id + "_Terminate.json";

    commonExecutionData.executeAll = 0;
    commonExecutionData.testCases = targetTestcasesEquitable.terminate //['OpenUrl', 'login', 'Terminate_Member', 'SignOut']
    Extdata = {...commonExecutionData, ...TestDataEquitable.terminate};
    Extdata.customerId = customer.id;
    Extdata.equitableDivision = customer.equitableDivision;
    Extdata.equitableClass = customer.equitableClass;
    Extdata.equitableDivisionName = customer.equitableDivisionName;
    Extdata.equitableClassName = customer.equitableClassName;
    Extdata.customerFN = customer.customerFN;
    Extdata.customerLN = customer.customerLN;
    Extdata.equitableMemberId = customer.equitableMemberId || customer.equitableCertificateId
    Extdata.customerDob = moment(customer.dob).format('M/D/YYYY');
    const result = await this.aitp.soleExecution(Extdata, false, 'equitable')

    //delete tempfile
    await deleteFile(TEMP_EXTDATA_FOLDER + "/ExternalData_" + customer.id + "_Terminate.json")
    return result;


  }
}
