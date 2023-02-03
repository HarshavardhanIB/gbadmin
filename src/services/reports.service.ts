import { /* inject, */ BindingScope, inject, injectable, service} from '@loopback/core';
import {repository} from '@loopback/repository';
import moment from 'moment';
import Mail from 'nodemailer/lib/mailer';
import {SYS_ADMIN} from '../configurations';
import {ADDRESS_TYPE, CONTACT_TYPE, EQUITABLE_PLAN_LEVELS, EXECUTIVE_CARE_COMPLETE_PLAN_LEVELS, EXECUTIVE_HEALTH_PLAN_LEVELS, EXECUTIVE_PACKAGES, GB_ADMIN, GREENSHEILD_PLAN_LEVELS, INSURANCE_SERVICES, OPTIN_PACKAGES, RELATIONSHIP_TYPE, REPORTING_ID, REPORTING_TYPE} from '../constants';
import {GroupBenefitzDataSource} from '../datasources/group-benefitz.datasource';
import {REPORTS_FOLDER, REPORTS_PATH, SERVER_FOLDER} from '../paths';
import {CustomerRepository, PlanOptionsValuesRepository, PlansOptionsReportingRepository} from '../repositories';
import {CandooHealthProvisioningService} from './candoo-health-provisioning.service';
import {EmailService} from './email.service';
import {ExcelService} from './excel.service';
import {MailHelperService} from './mail-helper.service';



@injectable({scope: BindingScope.APPLICATION})
export class ReportsService {
  constructor(/* Add @inject to inject parameters */

    @inject('datasources.groupBenefitz')
    protected dataSource: GroupBenefitzDataSource,

    @repository(CustomerRepository)
    public customerRepository: CustomerRepository,

    @repository(PlanOptionsValuesRepository)
    public planOptionsValuesRepository: PlanOptionsValuesRepository,

    @repository(PlansOptionsReportingRepository)
    public plansOptionsReportingRepository: PlansOptionsReportingRepository,

    @service(ExcelService) private excelService: ExcelService,
    @service(EmailService) private mail: EmailService,
    @service(MailHelperService) private mailHelper: MailHelperService,

    @service(CandooHealthProvisioningService) private candoo: CandooHealthProvisioningService,
  ) { }

  /*
   * Add service methods here
   */

  async enrollment() {

  }


  async updates() {

  }


  async cancellation() {

  }

  async pocketPills(customers: any, maxChildren: number, monthYear: string) {


    //package_id=8 ; plan_level=

    let filename = "PocketPills-Registrants-" + monthYear + ".xlsx";
    let path = REPORTS_FOLDER + "/" + filename

    const wb = await this.excelService.createNewExcelFile(path);

    console.log(`Headers`);
    let commonHeaders = ['Name', 'Plan Selection', 'Carrier', 'Policy', 'Coverage Selection', 'Date of Birth', 'Gender', 'Plan Enrollment date', 'Email Address', 'Phone Number', 'Street Address', 'Street Address 2', 'City', 'Province', 'Postal Code', 'Spouse - Full Name', 'Spouse - Date of Birth', 'No. of children', 'Child 1 - Full Name', 'Child 1 - Date of Birth', 'Child 2 - Full Name', 'Child 2 - Date of Birth', 'Child 3 - Full Name', 'Child 3 - Date of Birth']
    if (maxChildren > 3) {
      for (let childNo = 4; childNo <= maxChildren; childNo++) {
        commonHeaders.push('Child ' + childNo + ' - Full Name');
        commonHeaders.push('Child ' + childNo + ' - Date of Birth')
      }
    }

    for (let header of commonHeaders) {
      console.log(header)
      await this.excelService.fillHeader(wb, 1, commonHeaders)
    }

    let customerNo = 1;
    let customerData: any;
    for (let customer of customers) {
      customerNo++;
      customerData = [];
      customerData = [customer.name, customer.planSelection, customer.carrier, customer.policy, customer.maritalStatus, customer.dateOfBirth, customer.gender, moment(customer.customerSignup.enrollmentDate).format('M-D-YYYY')]
      customerData = customerData.concat([customer.address.primaryEmail, customer.address.primaryPhone, (customer.address.apt + " " + customer.address.line1), customer.address.line2, customer.address.city, customer.address.state, customer.address.postalCode])
      if (customer.spouse.fullName) {
        customerData.push(customer.spouse.fullName)
        customerData.push(customer.spouse.dateOfBirth)
      } else {
        customerData.push("")
        customerData.push("")
      }
      if (customer.children.length > 0) {
        for (let child of customer.children) {
          customerData.push(child.fullName)
          customerData.push(child.dateOfBirth)
        }
      }
      await this.excelService.fillData(wb, customerNo, customerData)

    }

    await this.excelService.saveExcel(wb, path);

    console.log(REPORTS_PATH + "/" + filename)

    let mailOptions: Mail.Options = {}
    mailOptions.to = SYS_ADMIN.email
    mailOptions.subject = this.mailHelper.getCustomerReportsMailSubjectSysadmin().replace('{{service}}', 'Pocket Pills').replace('{{ReportsDate}}', monthYear);
    mailOptions.html = this.mailHelper.getCustomerReportsMailBodySysadmin(SYS_ADMIN.name, "", true).replace('{{service}}', 'Pocket Pills').replace('{{ReportsDate}}', monthYear);
    mailOptions.attachments = [
      {   // filename and content type is derived from path
        path: path
      }
    ]
    //mailOptions.bcc = [GB_ADMIN]
    mailOptions.from = GB_ADMIN;
    await this.mail.sendMail(mailOptions)

    //max_no_children (for any customer)......

    //for this month--> get customers with registration date

  }

  async executiveBenefits(customers: any) {
    //plan-options-reporting...
  }

  async getMaxChildNo(monthYear: string) {
    let query = 'SELECT COUNT(*) as count FROM customer_relatives where relationship_type="CHILDREN" and customer_id in (SELECT id FROM customer where MONTH(registration_date)=MONTH("' + monthYear + '") and YEAR(registration_date)=YEAR("' + monthYear + '")) group by customer_id order by count DESC LIMIT 1 ;'
    const results = await this.dataSource.execute(query);
    return results;
  }

  async allReports() {
    console.log(`all reports works now.....`)
    let customersFilter = {
      "where": {
        "status": "Active"
      },
      "include": [
        {
          "relation": "contactInformations"
        },
        {
          "relation": "customerContactInfos"
        },
        {
          "relation": "customerRelatives"
        },
        {
          "relation": "customerSignup",
          "scope": {
            include: [{relation: 'form', scope: {include: [{'relation': 'broker', scope: {include: [{relation: 'contactInfo'}]}}]}}]
          }
        },
        {
          "relation": "customerPlans",
          "scope": {
            "include": [
              {
                "relation": "plan",
                "scope": {
                  "include": [
                    {
                      "relation": "planLevels",
                      "scope": {
                        "include": [
                          {
                            "relation": "greenshieldPackages",

                          },
                          {
                            "relation": "equitablePackages",

                          }
                        ]
                      }
                    },
                    {
                      "relation": "products"
                    },
                    {
                      "relation": "stateTaxDetails",
                      "scope": {
                        "include": [
                          {
                            "relation": "state",
                            "scope": {
                              "include": [
                                {
                                  "relation": "country"
                                }
                              ]
                            }
                          }
                        ]
                      }
                    }
                  ]
                }
              }
            ]
          }
        },
        {
          "relation": "customerPlanOptionsValues"
        },
      ]
    }

    const customers = await this.customerRepository.find(customersFilter);
    console.log(`All reports--customers found: ${customers.length}`)

    let pocketPillsCustomers = []
    let pocketPillsPlan = false;

    let executiveBenefitsCustomers = []
    let executiveBenefitsPlan = false;

    let completeExecutiveCareCustomers = []
    let completeExecutiveCarePlan = false;

    let executiveHealthCustomers = []
    let executiveHealthPlan = false;

    let execReportingMails: any = {}
    let completeExecutiveCarePlans = []
    let executiveHealthPlans = []

    for (let customer of customers) {
      console.log(`Customer:${customer.id}`)

      let greenshieldPlans = []
      let equitablePlans = []
      let executivePlans = []

      if (customer.customerPlanOptionsValues) {
        console.log(`customer.customerPlanOptionsValues: ${customer.customerPlanOptionsValues.length}`)
        for (const cpov of customer.customerPlanOptionsValues) {


          const planOptionValues = await this.planOptionsValuesRepository.findOne({where: {"or": [{name: cpov.planOptionsValue}, {value: cpov.planOptionsValue}]}})
          if (planOptionValues) {
            console.log(`planOptionValues: ${planOptionValues.length}`)

            if (!execReportingMails[planOptionValues.reportingEmail || 'admin@aitestpro.com']) {
              console.log(`new execReportingMails`)
              execReportingMails[planOptionValues.reportingEmail || 'admin@aitestpro.com'] = []
            } else {
              console.log(`already existing execReportingMails`)
            }

            let clinicGroup = "";
            if (planOptionValues.value.includes("Cleveland")) {
              clinicGroup = "Cleveland"
            } else if (planOptionValues.value.includes("Medcan")) {
              clinicGroup = "Medcan"
            } else if (planOptionValues.value.includes("TELUS")) {
              clinicGroup = "TELUS"
            }
            customer.clinic = clinicGroup
            customer.clinicValue = planOptionValues.value
            execReportingMails[planOptionValues.reportingEmail || 'admin@aitestpro.com'].push(customer);

          } else {
            console.log(`No planOptionValues`)
          }


        }
      } else {
        console.log(`No customer.customerPlanOptionsValues`)
      }

      if (customer.customerPlans) {
        for (const cp of customer.customerPlans) {
          console.log('-------------------')
          console.log(cp.planId)
          console.log(cp.plan.name)
          console.log(cp.plan.packageId)
          console.log(OPTIN_PACKAGES.indexOf(cp.plan.packageId))
          console.log(EXECUTIVE_CARE_COMPLETE_PLAN_LEVELS.indexOf(cp.plan.planLevel))
          console.log('--------*****-----------')
          // if (GREENSHEILD_PACKAGES.indexOf(cp.plan.packageId) >= 0) {
          //   greenshieldPlans.push(cp);
          // }
          if (GREENSHEILD_PLAN_LEVELS.indexOf(cp.plan.planLevel) >= 0) {
            greenshieldPlans.push(cp);
          }

          if (EQUITABLE_PLAN_LEVELS.indexOf(cp.plan.planLevel) >= 0) {
            equitablePlans.push(cp);
          }

          if (OPTIN_PACKAGES.indexOf(cp.plan.packageId) >= 0) {
            console.log(`pocket -pills plan detected`);
            pocketPillsPlan = pocketPillsPlan || true;
          }

          if (EXECUTIVE_PACKAGES.indexOf(cp.plan.packageId) >= 0) {
            console.log(`executive plan - detected`);
            executiveBenefitsPlan = executiveBenefitsPlan || true;
            executivePlans.push(cp);
            executiveBenefitsCustomers.push(customer)
          }

          if (EXECUTIVE_CARE_COMPLETE_PLAN_LEVELS.indexOf(cp.plan.planLevel) >= 0) {
            console.log(`compltee executive care plan - detected`);
            completeExecutiveCarePlan = completeExecutiveCarePlan || true;
            completeExecutiveCarePlans.push(cp);
            completeExecutiveCareCustomers.push(customer)
          }


          if (EXECUTIVE_HEALTH_PLAN_LEVELS.indexOf(cp.plan.planLevel) >= 0) {
            console.log(`executive health  plan - detected`);
            executiveHealthPlan = executiveHealthPlan || true;
            executiveHealthPlans.push(cp);
            executiveHealthCustomers.push(customer)
          }


        }
      }

      //console.log(customer);

      let healthDentalPlan;
      let healthDentalPlanName;
      let healthDentalCarrier;
      let healthDentalPolicy;
      if (equitablePlans.length > 0) {
        healthDentalPlan = equitablePlans[0]; //only 1 plan
        console.log(`Equitable plan - ${healthDentalPlan.plan.name}`)
        healthDentalPlanName = healthDentalPlan.plan.name
        healthDentalCarrier = INSURANCE_SERVICES.EQUITABLE.name
        healthDentalPolicy = INSURANCE_SERVICES.EQUITABLE.policy
      } else if (greenshieldPlans.length > 0) {
        healthDentalPlan = greenshieldPlans[0];
        console.log(`Greenshield plan- ${healthDentalPlan.plan.name}`)
        healthDentalPlanName = healthDentalPlan.plan.name
        healthDentalCarrier = INSURANCE_SERVICES.GREENSHIELD.name
        healthDentalPolicy = INSURANCE_SERVICES.GREENSHIELD.policy
      } else {
        healthDentalPlan = null;
        healthDentalPlanName = 'N/A'
        healthDentalCarrier = 'N/A'
        healthDentalPolicy = 'N/A'
        console.log('no healthDentalPlan plan')
      }


      customer.dateOfBirth = moment(customer.dob).format('M/D/YYYY')

      const customer_contact = customer.contactInformations.filter((contact: any) => {
        return contact.contactType == CONTACT_TYPE.CUSTOMER && contact.addressType == ADDRESS_TYPE.HOME_ADDRESS
      });


      const customer_home_contact = customer_contact[0];
      const customer_home_address = [customer_home_contact.apt + " " + customer_home_contact.line1 + " " + customer_home_contact.line2, customer_home_contact.city, customer_home_contact.state, customer_home_contact.postalCode].join(', ');
      customer.address = customer_home_contact

      let customer_children = []
      let customer_spouse: any = {};
      if (customer.customerRelatives && customer.customerRelatives.length > 0) {

        //Child	Jhonson	Doe	Male	11/22/2011		No	Yes
        for (const cr of customer.customerRelatives) {
          let child_info: any = {}
          cr.fullName = [cr.firstName, cr.lastName].join(" ");
          cr.dateOfBirth = moment(cr.dob).format('M/D/YYYY')

          if (cr.relationshipType == RELATIONSHIP_TYPE.SPOUSE) {
            customer_spouse = cr;

          } else {
            child_info = cr;
            customer_children.push(child_info);
          }


        }

      }

      customer.spouse = customer_spouse
      customer.children = customer_children

      if (pocketPillsPlan) {
        //go for pocketPills report
        customer.name = [customer.firstName, customer.lastName].join(" ")
        customer.planSelection = healthDentalPlanName
        customer.carrier = healthDentalCarrier
        customer.policy = healthDentalPolicy


        pocketPillsCustomers.push(customer);
      }

      // if (executiveBenefitsPlan) {
      //   //customer-option values...
      //   executiveBenefitsCustomers.push(customer);
      // }

      // if (completeExecutiveCarePlan) {
      //   //customer-option values...
      //   completeExecutiveCareCustomers.push(customer);
      // }

      // if (executiveHealthPlan) {
      //   //customer-option values...
      //   executiveHealthCustomers.push(customer);
      // }


      let plansInfo = ``
      // for (const cp of customer.customerPlans) {
      //   plansInfo += `<tr>`
      //   plansInfo += `<td>` + cp.plan.name + `</td>`
      //   plansInfo += `</tr>`
      // }

      let plansTable = `<table>` +
        `<caption>Plans</caption>` +
        `<tbody>` +
        plansInfo +
        `</tbody>` +
        `</table>`

      let planDetails = `<div class='userdetails-wrapper'>` +
        plansTable +
        `<br>` +
        `</div>`

      const broker = customer.customerSignup.form.broker;
      const brokerEmailid = broker.contactInfo.primaryEmail



      let usertable = `<table>` +
        `<caption>Customer</caption>` +
        `<tbody>` +
        `<tr>` +
        `<th>ID</th>` +
        `{{greenshieldHeader}}` +
        `<th>Enrolment date</th>` +
        `<th>First name</th>` +
        `<th>Last name</th>` +
        `<th>Email address</th>` +
        `<th>Gender</th>` +
        `<th>Date of birth</th>` +
        `<th>Address</th>` +
        `<th>Phone</th>` +
        `</tr>` +
        `<tr>` +
        `<td>` + customer.id + `</td>` +
        `{{greenshieldValue}}` +
        `<td>` + moment(customer.customerSignup.enrollmentDate).format('MM/DD/YYYY') + `</td>` +
        `<td>` + customer.firstName + `</td>` +
        `<td>` + customer.lastName + `</td>` +
        `<td>` + customer_home_contact.primaryEmail + `</td>` +
        `<td>` + customer.gender + `</td>` +
        `<td>` + moment(customer.dob).format('MM/DD/YYYY') + `</td>` +
        `<td>` + customer_home_address + `</td>` +
        `<td>` + customer_home_contact.primaryPhone + `</td>` +
        `</tr>` +
        `</tbody>` +
        `</table>`

      let dependantsTable = ``


      usertable = usertable.replace('{{greenshieldHeader}}', '')
      usertable = usertable.replace('{{greenshieldValue}}', '')


    }

    let today = new Date().toISOString().slice(0, 10);
    let desiredDate = moment(today).format('YYYY-MM-DD')
    let reportMY = moment(desiredDate).format('MMM YYYY');

    console.log(`pocketPillsCustomers:${pocketPillsCustomers.length}`)
    if (pocketPillsCustomers.length > 0) {


      let maxChildData = await this.getMaxChildNo(desiredDate);
      let maxChildCount = 0

      if (maxChildData && maxChildData[0])
        maxChildCount = maxChildData[0].count;


      await this.pocketPills(pocketPillsCustomers, maxChildCount, reportMY);
    }

    console.log(`executiveBenefitsCustomers:${executiveBenefitsCustomers.length}`)
    if (executiveBenefitsCustomers.length > 0) {
      await this.executiveBenefits(executiveBenefitsCustomers);

      console.log(`executiveHealthCustomers:${executiveHealthCustomers.length}`)
      if (executiveHealthCustomers.length > 0)
        await this.execReports(executiveHealthCustomers, 17, 'Executive Health', reportMY)

      console.log(`completeExecutiveCareCustomers:${completeExecutiveCareCustomers.length}`)
      if (completeExecutiveCareCustomers.length > 0) {
        await this.specialExecReports(execReportingMails, 'Complete Executive Care', reportMY)
        await this.execReports(completeExecutiveCareCustomers, 18, 'Complete Executive Care', reportMY)
      }
    }


  }

  async allReportsMY(date: string, reportMY: string, startOfMonth: string, endOfMonth: string) {


    let desiredDate = moment(date).format('YYYY-MM-DD')

    console.log(`all reports works now.....`)
    // customersFilter.where.registrationDate={

    // }
    let customersFilter = {
      "where": {
        "status": "Active",
        "registrationDate": {
          "gte": startOfMonth,
          "lte": endOfMonth
        }
      },
      "include": [
        {
          "relation": "contactInformations"
        },
        {
          "relation": "customerContactInfos"
        },
        {
          "relation": "customerRelatives"
        },
        {
          "relation": "customerSignup",
          "scope": {
            include: [{relation: 'form', scope: {include: [{'relation': 'broker', scope: {include: [{relation: 'contactInfo'}]}}]}}]
          }
        },
        {
          "relation": "customerPlans",
          "scope": {
            "include": [
              {
                "relation": "plan",
                "scope": {
                  "include": [
                    {
                      "relation": "planLevels",
                      "scope": {
                        "include": [
                          {
                            "relation": "greenshieldPackages",

                          },
                          {
                            "relation": "equitablePackages",

                          }
                        ]
                      }
                    },
                    {
                      "relation": "products"
                    },
                    {
                      "relation": "stateTaxDetails",
                      "scope": {
                        "include": [
                          {
                            "relation": "state",
                            "scope": {
                              "include": [
                                {
                                  "relation": "country"
                                }
                              ]
                            }
                          }
                        ]
                      }
                    }
                  ]
                }
              }
            ]
          }
        },
        {
          "relation": "customerPlanOptionsValues"
        },
      ]
    }

    const customers = await this.customerRepository.find(customersFilter);
    console.log(`All reports--customers found for ${reportMY}: ${customers.length}`)

    let pocketPillsCustomers = []
    let pocketPillsPlan = false;

    let executiveBenefitsCustomers = []
    let executiveBenefitsPlan = false;

    let completeExecutiveCareCustomers = []
    let completeExecutiveCarePlan = false;

    let executiveHealthCustomers = []
    let executiveHealthPlan = false;

    let execReportingMails: any = {}
    let completeExecutiveCarePlans = []
    let executiveHealthPlans = []

    for (let customer of customers) {
      console.log(`Customer:${customer.id}`)

      let greenshieldPlans = []
      let equitablePlans = []
      let executivePlans = []

      if (customer.customerPlanOptionsValues) {
        console.log(`customer.customerPlanOptionsValues: ${customer.customerPlanOptionsValues.length}`)
        for (const cpov of customer.customerPlanOptionsValues) {


          const planOptionValues = await this.planOptionsValuesRepository.findOne({where: {"or": [{name: cpov.planOptionsValue}, {value: cpov.planOptionsValue}]}})
          if (planOptionValues) {
            console.log(`planOptionValues: ${planOptionValues.length}`)

            if (!execReportingMails[planOptionValues.reportingEmail || 'admin@aitestpro.com']) {
              console.log(`new execReportingMails`)
              execReportingMails[planOptionValues.reportingEmail || 'admin@aitestpro.com'] = []
            } else {
              console.log(`already existing execReportingMails`)
            }

            let clinicGroup = "";
            if (planOptionValues.value.includes("Cleveland")) {
              clinicGroup = "Cleveland"
            } else if (planOptionValues.value.includes("Medcan")) {
              clinicGroup = "Medcan"
            } else if (planOptionValues.value.includes("TELUS")) {
              clinicGroup = "TELUS"
            }
            customer.clinic = clinicGroup
            customer.clinicValue = planOptionValues.value
            execReportingMails[planOptionValues.reportingEmail || 'admin@aitestpro.com'].push(customer);

          } else {
            console.log(`No planOptionValues`)
          }


        }
      } else {
        console.log(`No customer.customerPlanOptionsValues`)
      }

      if (customer.customerPlans) {
        for (const cp of customer.customerPlans) {
          console.log('-------------------')
          console.log(cp.planId)
          console.log(cp.plan.name)
          console.log(cp.plan.packageId)
          console.log(OPTIN_PACKAGES.indexOf(cp.plan.packageId))
          console.log(EXECUTIVE_CARE_COMPLETE_PLAN_LEVELS.indexOf(cp.plan.planLevel))
          console.log('--------*****-----------')
          // if (GREENSHEILD_PACKAGES.indexOf(cp.plan.packageId) >= 0) {
          //   greenshieldPlans.push(cp);
          // }
          if (GREENSHEILD_PLAN_LEVELS.indexOf(cp.plan.planLevel) >= 0) {
            greenshieldPlans.push(cp);
          }

          if (EQUITABLE_PLAN_LEVELS.indexOf(cp.plan.planLevel) >= 0) {
            equitablePlans.push(cp);
          }

          if (OPTIN_PACKAGES.indexOf(cp.plan.packageId) >= 0) {
            console.log(`pocket -pills plan detected`);
            pocketPillsPlan = pocketPillsPlan || true;
          }

          if (EXECUTIVE_PACKAGES.indexOf(cp.plan.packageId) >= 0) {
            console.log(`executive plan - detected`);
            executiveBenefitsPlan = executiveBenefitsPlan || true;
            executivePlans.push(cp);
            executiveBenefitsCustomers.push(customer)
          }

          if (EXECUTIVE_CARE_COMPLETE_PLAN_LEVELS.indexOf(cp.plan.planLevel) >= 0) {
            console.log(`compltee executive care plan - detected`);
            completeExecutiveCarePlan = completeExecutiveCarePlan || true;
            completeExecutiveCarePlans.push(cp);
            completeExecutiveCareCustomers.push(customer)
          }


          if (EXECUTIVE_HEALTH_PLAN_LEVELS.indexOf(cp.plan.planLevel) >= 0) {
            console.log(`executive health  plan - detected`);
            executiveHealthPlan = executiveHealthPlan || true;
            executiveHealthPlans.push(cp);
            executiveHealthCustomers.push(customer)
          }


        }
      }

      //console.log(customer);

      let healthDentalPlan;
      let healthDentalPlanName;
      let healthDentalCarrier;
      let healthDentalPolicy;
      if (equitablePlans.length > 0) {
        healthDentalPlan = equitablePlans[0]; //only 1 plan
        console.log(`Equitable plan - ${healthDentalPlan.plan.name}`)
        healthDentalPlanName = healthDentalPlan.plan.name
        healthDentalCarrier = INSURANCE_SERVICES.EQUITABLE.name
        healthDentalPolicy = INSURANCE_SERVICES.EQUITABLE.policy
      } else if (greenshieldPlans.length > 0) {
        healthDentalPlan = greenshieldPlans[0];
        console.log(`Greenshield plan- ${healthDentalPlan.plan.name}`)
        healthDentalPlanName = healthDentalPlan.plan.name
        healthDentalCarrier = INSURANCE_SERVICES.GREENSHIELD.name
        healthDentalPolicy = INSURANCE_SERVICES.GREENSHIELD.policy
      } else {
        healthDentalPlan = null;
        healthDentalPlanName = 'N/A'
        healthDentalCarrier = 'N/A'
        healthDentalPolicy = 'N/A'
        console.log('no healthDentalPlan plan')
      }


      customer.dateOfBirth = moment(customer.dob).format('M/D/YYYY')

      const customer_contact = customer.contactInformations.filter((contact: any) => {
        return contact.contactType == CONTACT_TYPE.CUSTOMER && contact.addressType == ADDRESS_TYPE.HOME_ADDRESS
      });


      const customer_home_contact = customer_contact[0];
      const customer_home_address = [customer_home_contact.apt + " " + customer_home_contact.line1 + " " + customer_home_contact.line2, customer_home_contact.city, customer_home_contact.state, customer_home_contact.postalCode].join(', ');
      customer.address = customer_home_contact

      let customer_children = []
      let customer_spouse: any = {};
      if (customer.customerRelatives && customer.customerRelatives.length > 0) {

        //Child	Jhonson	Doe	Male	11/22/2011		No	Yes
        for (const cr of customer.customerRelatives) {
          let child_info: any = {}
          cr.fullName = [cr.firstName, cr.lastName].join(" ");
          cr.dateOfBirth = moment(cr.dob).format('M/D/YYYY')

          if (cr.relationshipType == RELATIONSHIP_TYPE.SPOUSE) {
            customer_spouse = cr;

          } else {
            child_info = cr;
            customer_children.push(child_info);
          }


        }

      }

      customer.spouse = customer_spouse
      customer.children = customer_children

      if (pocketPillsPlan) {
        //go for pocketPills report
        customer.name = [customer.firstName, customer.lastName].join(" ")
        customer.planSelection = healthDentalPlanName
        customer.carrier = healthDentalCarrier
        customer.policy = healthDentalPolicy


        pocketPillsCustomers.push(customer);
      }

      // if (executiveBenefitsPlan) {
      //   //customer-option values...
      //   executiveBenefitsCustomers.push(customer);
      // }

      // if (completeExecutiveCarePlan) {
      //   //customer-option values...
      //   completeExecutiveCareCustomers.push(customer);
      // }

      // if (executiveHealthPlan) {
      //   //customer-option values...
      //   executiveHealthCustomers.push(customer);
      // }


      let plansInfo = ``
      // for (const cp of customer.customerPlans) {
      //   plansInfo += `<tr>`
      //   plansInfo += `<td>` + cp.plan.name + `</td>`
      //   plansInfo += `</tr>`
      // }

      let plansTable = `<table>` +
        `<caption>Plans</caption>` +
        `<tbody>` +
        plansInfo +
        `</tbody>` +
        `</table>`

      let planDetails = `<div class='userdetails-wrapper'>` +
        plansTable +
        `<br>` +
        `</div>`

      const broker = customer.customerSignup.form.broker;
      const brokerEmailid = broker.contactInfo.primaryEmail



      let usertable = `<table>` +
        `<caption>Customer</caption>` +
        `<tbody>` +
        `<tr>` +
        `<th>ID</th>` +
        `{{greenshieldHeader}}` +
        `<th>Enrolment date</th>` +
        `<th>First name</th>` +
        `<th>Last name</th>` +
        `<th>Email address</th>` +
        `<th>Gender</th>` +
        `<th>Date of birth</th>` +
        `<th>Address</th>` +
        `<th>Phone</th>` +
        `</tr>` +
        `<tr>` +
        `<td>` + customer.id + `</td>` +
        `{{greenshieldValue}}` +
        `<td>` + moment(customer.customerSignup.enrollmentDate).format('MM/DD/YYYY') + `</td>` +
        `<td>` + customer.firstName + `</td>` +
        `<td>` + customer.lastName + `</td>` +
        `<td>` + customer_home_contact.primaryEmail + `</td>` +
        `<td>` + customer.gender + `</td>` +
        `<td>` + moment(customer.dob).format('MM/DD/YYYY') + `</td>` +
        `<td>` + customer_home_address + `</td>` +
        `<td>` + customer_home_contact.primaryPhone + `</td>` +
        `</tr>` +
        `</tbody>` +
        `</table>`

      let dependantsTable = ``


      usertable = usertable.replace('{{greenshieldHeader}}', '')
      usertable = usertable.replace('{{greenshieldValue}}', '')


    }



    console.log(`pocketPillsCustomers:${pocketPillsCustomers.length}`)
    if (pocketPillsCustomers.length > 0) {


      let maxChildData = await this.getMaxChildNo(desiredDate);
      let maxChildCount = 0

      if (maxChildData && maxChildData[0])
        maxChildCount = maxChildData[0].count;


      await this.pocketPills(pocketPillsCustomers, maxChildCount, reportMY);
    }

    console.log(`executiveBenefitsCustomers:${executiveBenefitsCustomers.length}`)
    if (executiveBenefitsCustomers.length > 0) {
      await this.executiveBenefits(executiveBenefitsCustomers);

      console.log(`executiveHealthCustomers:${executiveHealthCustomers.length}`)
      if (executiveHealthCustomers.length > 0)
        await this.execReports(executiveHealthCustomers, 17, 'Executive Health', reportMY)

      console.log(`completeExecutiveCareCustomers:${completeExecutiveCareCustomers.length}`)
      if (completeExecutiveCareCustomers.length > 0) {
        await this.specialExecReports(execReportingMails, 'Complete Executive Care', reportMY)
        await this.execReports(completeExecutiveCareCustomers, 18, 'Complete Executive Care', reportMY)
      }
    }


  }



  async specialExecReports(execReportingMails: any, planName: string, monthYear: string) {
    //
    console.log("execReportingMails")
    console.log(execReportingMails)
    let mailOptions: Mail.Options = {}

    for (const email in execReportingMails) {
      console.log(`${email}:`);
      let customers = execReportingMails[email]
      console.log(`customers: ${customers.length}`)



      mailOptions.to = [email || '', SYS_ADMIN.email]
      // mailOptions.subject = `[specialExecReports] `
      // mailOptions.subject += `Customers for this month`

      let serviceBody;
      let service = "";
      if (customers.length > 0) {
        service = customers[0].clinic
        serviceBody = await this.prepareVirtualCareProviderData(customers);
      } else {
        serviceBody = "No customers for this month"
      }


      console.log(`service: ${service}`)

      //Cleveland
      //Medcan
      //TELUS

      //SYS_ADMIN.name
      mailOptions.subject = this.mailHelper.getCustomerReportsMailSubjectSysadmin().replace('{{service}}', `${planName} [${service}]`).replace('{{ReportsDate}}', monthYear);
      mailOptions.html = this.mailHelper.getCustomerReportsMailBodySysadmin("", serviceBody, false).replace('{{service}}', `${planName} [${service}]`).replace('{{ReportsDate}}', monthYear);


      mailOptions.from = GB_ADMIN;
      await this.mail.sendMail(mailOptions)
    }

  }

  async prepareVirtualCareProviderData(customers: any) {
    //names/emails for member + spouse
    let customersInfo = "";
    for (const customer of customers) {
      customersInfo += "<tr>"
      customersInfo += "<td>" + customer.firstName + " " + customer.lastName + "</td>"
      customersInfo += "<td>" + customer.address.primaryEmail + "</td>"
      if (customer.spouse && customer.spouse.firstName) {
        customersInfo += "<td>" + customer.spouse.firstName + " " + customer.spouse.lastName + "</td>"
        customersInfo += "<td>" + customer.spouse.email + "</td>"
      } else {
        customersInfo += "<td>" + " " + "</td>"
        customersInfo += "<td>" + " " + "</td>"
      }
      //customersInfo += "<td>" + customer.maritalStatus + "</td>"
      customersInfo += "<td>" + customer.clinicValue + "</td>"
      customersInfo += "</tr>"
    }

    let customersTable = `<table>` +
      // `<caption>Customers</caption>` +
      `<tbody>` +
      `<tr>` +
      `<th>Name</th>` +
      `<th>Email</th>` +
      `<th>Spouse</th>` +
      `<th>Spouse Email</th>` +
      `<th>Clinic</th>` +
      `</tr>` +
      customersInfo +
      `</tbody>` +
      `</table>`

    return customersTable
  }


  //CAISSE POPULAIRE GROUPE FINANCIER, Succursale Sainte-Anne, 1-130 Avenue Centrale, C.P. 550, Sainte-Anne, MB R5H 1J3

  async execReports(customers: any, planLevelId: any, planName: string, monthYear: string) {

    const reportingOptions = await this.plansOptionsReportingRepository.find({where: {planLevelId: planLevelId}})
    console.log(`reportingOptions: ${reportingOptions.length}`)

    let reportsPath;
    let mailOptions: Mail.Options = {}
    for (const reporting of reportingOptions) {
      console.log(`reportingId: ${reporting.reportingId}`)

      //mailOptions.subject = `[${reporting.reportingId}] `
      //mailOptions.subject += `${planName} Customers for this month`

      switch (reporting.reportingId) {
        case REPORTING_ID.bestdoctorsinsurance:
          let serviceid = "Best Doctors Insurance"
          reportsPath = await this.prepareBestDoctorsData(customers, planName, monthYear)

          mailOptions.html = `PFA for customer data (${planName})`
          mailOptions.attachments = [
            {   // filename and content type is derived from path
              path: reportsPath
            }
          ]

          //SYS_ADMIN.name
          mailOptions.subject = this.mailHelper.getCustomerReportsMailSubjectSysadmin().replace('{{service}}', `${planName} [${serviceid}] `).replace('{{ReportsDate}}', monthYear);
          mailOptions.html = this.mailHelper.getCustomerReportsMailBodySysadmin("", "", true).replace('{{service}}', `${planName} [${serviceid}] `).replace('{{ReportsDate}}', monthYear);

          break;
        case REPORTING_ID.marital_status:
          let serviceBody = "";
          let service = "gutChek";
          if (customers.length > 0) {
            //service = customers[0].clinic
            serviceBody = await this.prepareGutCheckData(customers);
          } else {
            serviceBody = "No customers for this month"
          }


          mailOptions.attachments = [
          ]

          //SYS_ADMIN.name
          mailOptions.subject = this.mailHelper.getCustomerReportsMailSubjectSysadmin().replace('{{service}}', `${planName} [${service}] `).replace('{{ReportsDate}}', monthYear);
          mailOptions.html = this.mailHelper.getCustomerReportsMailBodySysadmin("", serviceBody, true).replace('{{service}}', `${planName} [${service}] `).replace('{{ReportsDate}}', monthYear);
          break;
        case REPORTING_ID.name_email:

          let serviceBody2 = "";
          let service2 = "RxFood";
          if (customers.length > 0) {
            //service = customers[0].clinic
            serviceBody2 = await this.prepareRxFoodData(customers);
          } else {
            serviceBody2 = "No customers for this month"
          }

          mailOptions.attachments = [
          ]
          //SYS_ADMIN.name
          mailOptions.subject = this.mailHelper.getCustomerReportsMailSubjectSysadmin().replace('{{service}}', `${planName} [${service2}] `).replace('{{ReportsDate}}', monthYear);
          mailOptions.html = this.mailHelper.getCustomerReportsMailBodySysadmin("", serviceBody2, true).replace('{{service}}', `${planName} [${service2}] `).replace('{{ReportsDate}}', monthYear);
          break;
        case REPORTING_ID.candoohealth:
          break;
      }

      if (reporting.reportingType == REPORTING_TYPE.EMAIL_REPORTING) {

        mailOptions.to = [reporting.email || '', SYS_ADMIN.email]


        //mailOptions.bcc = [GB_ADMIN]
        mailOptions.from = GB_ADMIN;
        await this.mail.sendMail(mailOptions)
      } else {
        //API-reporting
        console.log(`candoo proviosioned?? .env??`)
        if (process.env.REGISTER_EXECUTIVE) {
          console.log(`candoo reg triggers`)
          const result = await this.candoo.provisionCandooRegistration(customers);
          console.log(result);

          console.log(result.executiveRegistration)
          console.log(result.executiveRegistrationDatasets);

          await this.candoo.executiveUsersProvisionProcess(customers, result, result.executiveRegistration, 'normal', true);

          if (process.env.TERMINATE_EXECUTIVE) {
            console.log(`candoo term triggers`)
            const result2 = await this.candoo.provisionCandooTermination(customers);
            console.log(result2);

            console.log(result2.executiveTermination)
            console.log(result2.executiveTerminationDatasets);

            await this.candoo.executiveUsersProvisionProcess(customers, result2, result2.executiveTermination, 'normal', false);
          }
        } else {
          console.log(`candoo not triggers`)
        }
      }

    }
  }

  async prepareBestDoctorsData(customers: any, planName: string, monthYear: string) {
    let templateXL = SERVER_FOLDER + '/BestDoctorsCanadaInsuranseGroupBenefitzExec.xlsx'
    let newXL = SERVER_FOLDER + '/BestDoctorsCanadaInsuranseGroupBenefitz_' + (planName.replace(/ /g, "")) + "-" + monthYear + ".xlsx";
    const wb = await this.excelService.copyFromCreateNew(templateXL, newXL);
    let rowNo = 8; //max filled row -- header last row
    let customerData: any;
    for (const customer of customers) {
      console.log(`customer: ${customer.firstName}`)
      rowNo++;
      customerData = [];
      /* * Class Option	* Last Name	* First Name	* Coverage	* Dependent Code	* Date of Birth			"Validation
       MM/DD/YYYY"	"* Gender
       F/M"	 * Effective Date MM/DD/YYYY	 * Date of Employment MM/DD/YYYY	Subsidiary	Email */

      let dependantCode = "P"
      const customerCoverage = await this.getCoverage(customer.spouse, customer.children)
      const customerDependantCode = await this.getDependantCode("");
      customerData = ["Class A", customer.lastName, customer.firstName, customerCoverage, customerDependantCode, moment(customer.dateOfBirth).format('MM'), moment(customer.dateOfBirth).format('DD'), moment(customer.dateOfBirth).format('YYYY'), moment(customer.dateOfBirth).format('MM/DD/YYYY'), customer.gender ? customer.gender[0] : '']
      customerData = customerData.concat([moment(customer.customerSignup.enrollmentDate).format('MM/DD/YYYY'), moment(customer.customerSignup.hiringDate).format('MM/DD/YYYY'), 'Si aplica', customer.address.primaryEmail])
      await this.excelService.fillData(wb, rowNo, customerData)

      console.log(customer.spouse)
      if (customer.spouse && customer.spouse.firstName) {
        console.log(`customer.spouse: ${customer.spouse.firstName}`)
        rowNo++
        let spouseData = []
        const spouseDependantCode = await this.getDependantCode(customer.spouse.relationshipType)
        spouseData = ["Class A", customer.spouse.lastName, customer.spouse.firstName, customerCoverage, spouseDependantCode, moment(customer.spouse.dateOfBirth).format('MM'), moment(customer.spouse.dateOfBirth).format('DD'), moment(customer.spouse.dateOfBirth).format('YYYY'), moment(customer.spouse.dateOfBirth).format('MM/DD/YYYY'), customer.spouse.gender ? customer.spouse.gender[0] : '']
        spouseData = spouseData.concat([moment(customer.customerSignup.enrollmentDate).format('MM/DD/YYYY'), '', 'Si aplica', customer.spouse.email])
        await this.excelService.fillData(wb, rowNo, spouseData)
      } else {
        console.log(`No customer spouse`)
      }

      if (customer.children && customer.children.length > 0) {

        for (let child of customer.children) {
          console.log(`customer.child: ${child.firstName}`)
          if (child.firstName) {
            rowNo++
            let childData = []
            const childDependantCode = await this.getDependantCode(child.relationshipType)
            childData = ["Class A", child.lastName, child.firstName, customerCoverage, childDependantCode, moment(child.dateOfBirth).format('MM'), moment(child.dateOfBirth).format('DD'), moment(child.dateOfBirth).format('YYYY'), moment(child.dateOfBirth).format('MM/DD/YYYY'), child.gender ? child.gender[0] : '']
            childData = childData.concat([moment(customer.customerSignup.enrollmentDate).format('MM/DD/YYYY'), '', 'Si aplica', ''])
            await this.excelService.fillData(wb, rowNo, childData)
          }
        }

      } else {
        console.log(`No customer children`)
      }


    }

    //save now...
    await this.excelService.saveExcel(wb, newXL);

    console.log(newXL)

    return newXL;
  }

  async prepareGutCheckData(customers: any) {
    //name/email/single-couple-family
    let customersInfo = "";
    for (const customer of customers) {
      customersInfo += "<tr>"
      customersInfo += "<td>" + customer.firstName + " " + customer.lastName + "</td>"
      customersInfo += "<td>" + customer.address.primaryEmail + "</td>"
      customersInfo += "<td>" + customer.maritalStatus + "</td>"
      customersInfo += "</tr>"
    }


    let customersTable = `<table>` +
      // `<caption>Customers</caption>` +
      `<tbody>` +
      `<tr>` +
      `<th>Name</th>` +
      `<th>Email</th>` +
      `<th>Coverage</th>` +
      `</tr>` +
      customersInfo +
      `</tbody>` +
      `</table>`

    return customersTable

  }

  async prepareRxFoodData(customers: any) {
    //name/email/single-couple-family
    let customersInfo = "";
    for (const customer of customers) {
      customersInfo += "<tr>"
      customersInfo += "<td>" + customer.firstName + " " + customer.lastName + "</td>"
      customersInfo += "<td>" + customer.address.primaryEmail + "</td>"
      // customersInfo += "<td>" + customer.maritalStatus + "</td>"
      customersInfo += "</tr>"
    }
    let customersTable = `<table>` +
      // `<caption>Customers</caption>` +
      `<tbody>` +
      `<tr>` +
      `<th>Name</th>` +
      `<th>Email</th>` +
      `</tr>` +
      customersInfo +
      `</tbody>` +
      `</table>`

    return customersTable
  }

  async getCoverage(spouse: any, children: any) {

    /*
E = Employee
S =Employee + Spouse
C = Employee + Child
F= Employee + Family
*/
    let coverage = "E"

    if (spouse) {

      if (children) {
        if (children.length > 0) {
          coverage = "F"
        } else {
          coverage = "S"
        }
      }

    } else {

      if (children) {
        if (children.length == 1) {
          coverage = "C"
        } else if (children.length > 1) {
          coverage = "F"
        }
      }

    }



    return coverage;

  }

  async getDependantCode(relationshipType: string) {
    let dependantCode = "P"
    /*
    P= Policy Holder
S = Spouse
D = Dependent
X = Parent
    */
    switch (relationshipType) {
      case RELATIONSHIP_TYPE.SPOUSE:
        dependantCode = "S";
        break;
      case RELATIONSHIP_TYPE.CHILDREN:
        dependantCode = "D";
        break;
      default:
        dependantCode = "P";
        break;
    }
    return dependantCode;
  }
}
