import { /* inject, */ BindingScope, injectable, service} from '@loopback/core';
import {repository} from '@loopback/repository';
import {EXECUTIVE_CARE_COMPLETE_PLAN_LEVELS, GREENSHEILD_PLAN_LEVELS} from '../constants';
import {Customer} from '../models';
import {ContactInformationRepository, CustomerContactInfoRepository, CustomerPlansRepository, CustomerRepository} from '../repositories';
import {CandooHealthProvisioningService} from './candoo-health-provisioning.service';
//import {CustomerRegistrationService} from './customer-registration.service';
import {FusebillService} from './fusebill.service';
import {GreenshieldProvisioningService} from './greenshield-provisioning.service';

@injectable({scope: BindingScope.TRANSIENT})
export class ProvisioningService {

  constructor(
    @repository(CustomerRepository)
    public customerRepository: CustomerRepository,
    @repository(ContactInformationRepository)
    public contactInfoRepository: ContactInformationRepository,
    @repository(CustomerContactInfoRepository)
    public customerContactInfoRepository: CustomerContactInfoRepository,
    @repository(CustomerPlansRepository)
    public customerPlansRepository: CustomerPlansRepository,
    @service(FusebillService)
    public fusebill: FusebillService,
    // @service(CustomerRegistrationService)
    // public registered: CustomerRegistrationService,
    @service(GreenshieldProvisioningService)
    public greenshieldProvisioning: GreenshieldProvisioningService,
    @service(CandooHealthProvisioningService)
    public exec: CandooHealthProvisioningService
  ) { }

  /*
   * Add service methods here
   */

  //get that particular service methods such as  formatDate
  //--- divide date into 3 fields
  //caluclate marital_status or plan_coverage
  //calcuate package based on classic/all-in and state/province
  // segregate groups based on single, couple, depndeednet, special dependeant

  async provisionAll(customers: Customer[]) {

    //segregate... customers services based on plans
    //let greenshieldPlanPackages = GREENSHEILD_PACKAGES;// [1] //health and dental
    //let greenshieldPlanLevels = [1, 2, 3, 4, 5, 6, 7, 8, 9] //classic, all-in of health and dental
    const greenshieldCustomers: any = []
    for (const customer of customers) {
      if (customer.customerPlans) {
        for (const cp of customer.customerPlans) {
          //if (GREENSHEILD_PACKAGES.indexOf(cp.plan.packageId) >= 0) {
          if (GREENSHEILD_PLAN_LEVELS.indexOf(cp.plan.planLevel) >= 0) {
            greenshieldCustomers.push(customer);
          }
        }
      }
    }

    console.log(`Customers: ${customers?.length}`)

    console.log(`greenshieldCustomers: ${greenshieldCustomers?.length}`)

    const gsCustomersData = await this.greenshieldProvisioning.provisionGreenshield(greenshieldCustomers);
    return gsCustomersData;


  }

  async greenshieldUserRegistartion(customer: any, greenshieldPlans: any) {
    let greenshieldPlan;


    if (greenshieldPlans.length == 0) {
      //no plans
      //just skip....
      console.log("//no plans     //just skip....")
      return null;
    } else {
      if (greenshieldPlans.length == 1) {
        greenshieldPlan = greenshieldPlans[0]
      } else {
        console.log('more than 1 plans??? something wrong');
        greenshieldPlan = greenshieldPlans[0]
      }
      const result = await this.greenshieldProvisioning.provisionGreenshieldSingle(customer, greenshieldPlan)
      return result;
    }
  }

  async greenshieldUserTermination(customer: any) {

    const result = await this.greenshieldProvisioning.terminateGreenshieldSingle(customer)
    return result;
  }

  async executiveUserRegistartion(customer: any, executivePlansx: any) {
    console.log(`executiveUserRegistartion will be in bg..`)
    console.log(executivePlansx);

    let executivePlans = []
    if (customer.customerPlans) {
      for (const cp of customer.customerPlans) {
        if (EXECUTIVE_CARE_COMPLETE_PLAN_LEVELS.indexOf(cp.plan.planLevel) >= 0) {
          executivePlans.push(cp);
        }
      }
    }

    // console.log(customer);

    if (executivePlans.length > 0) {
      // await this.customerRepository.updateById(customer.id, {
      //   executiveRegistrationStatus: EXECUTIVE_REGISTRATION_STATUS.PENDING
      // })
    }
    let executivePlan;
    console.log(executivePlans);
    console.log(`No. of executivePlans ${executivePlans.length}`)
    if (executivePlans.length == 0) {
      //no plans
      //just skip....
      console.log("//no plans  for executive    //just skip....")
    } else {
      if (executivePlans.length == 1) {
        executivePlan = executivePlans[0]
      } else {
        console.log('more than 1 plans??? something wrong');
        executivePlan = executivePlans[0]
      }

      // let executiveDetails = this.provision.getPackageValueExecutive(executivePlan.plan.planLevels.eexecutivePackages, executivePlan.plan.stateTaxDetails[0].stateId);

      const execCheck = true; //await this.executiveRestrictionsCheck(customer, executiveDetails);
      console.log(`execCheck: ${execCheck}`)
      if (!execCheck) {
        console.log('executive restriction check failed -- so no aitp service hits')
        return;
      }

      // let execcoverage = this.provision.getCoverageValueExecutive(executivePlan)
      // if (execcoverage != "1") {
      //   //if (execcoverage == "3") {
      //   console.log('couple/family not implemented');
      //   await this.executiveUserRegistrationProcess(customer, null, false, 'notImplemented', 'save');
      //   return;
      // }

      const result = await this.exec.provisionExecutiveSingle(customer, executivePlan)
      return result;
      // result.validation = true;
      // result.executive_employee_id = "0"
      // if (result && result.executive_employee_id) {
      //   const registration: any = await this.executiveUserRegistrationProcess(customer, result, true, 'normal', 'save');

      //   if (registration) {
      //     //terminate result.executive_employee_id

      //     customer.executiveMemberId = result.executive_employee_id
      //     //if(process.env.REGISTRATION_EXECUTIVE=="save"){}
      //     const result2 = null;//await this.exec.terminateExecutiveSingle(customer)

      //     if (result2) {
      //       //if (result2 && result2.executive_employee_id) {
      //       //const termination = await this.executiveUserTerminationProcess(customer, result, true);

      //     } else {
      //       // await this.executiveUserTerminationProcess(customer, result, false);
      //     }
      //   }
      // } else {
      //   await this.executiveUserRegistrationProcess(customer, result, false, 'normal', 'save');
      //   //await this.executiveUserTerminationProcess(customer, result, false);
      // }
    }
  }


}



