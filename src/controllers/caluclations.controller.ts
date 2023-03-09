// Uncomment these imports to begin using these cool features!

import { inject, service } from "@loopback/core";
import { repository } from "@loopback/repository";
import { param, post, Response, response, RestBindings } from "@loopback/rest";
import moment from "moment";
import { Customer } from "../models";
import { CORPORATE } from "../paths";
import { BrokerRepository, CustomerRepository } from "../repositories";
import { Corporate } from "../services";

// import {inject} from '@loopback/core';
export class CaluclationsController {
  constructor(
    @repository(BrokerRepository) public brokerRepository: BrokerRepository,
    @service(Corporate) public corporateService: Corporate,
    @repository(CustomerRepository) public customerRepository: CustomerRepository,
    @inject(RestBindings.Http.RESPONSE) private response: Response,
  ) { }
  @post(CORPORATE.UPDATE_CUSTOME_TIER)
  @response(200, {
    description: 'update customer tear service use this service in cron job',
    content: {
      'application/json': {
        schema: {
          type: 'object'
        }
      }

    }
  })
  async customerTierUpdate() {
    let status, message, data: any = {};
    let updatedCustonmersList: any = [];
    try {
      let corporates = await this.brokerRepository.find({ where: { brokerType: 'CORPORATE' }, include: [{ relation: 'customers' }] });
      if (corporates.length > 0) {
        for (const corporate of corporates) {
          let customers = corporate.customers;
          // console.log(customers);
          let corporateId: any = corporate.id;
          if (customers) {
            for (const customer of customers) {
              // console.log(customer);
              if(customer.parentId!=undefined){
                let customerObj: Customer = new Customer();
              let caluclatedTier = 0;
              if (corporate.settingsEnableTieredHealthBenefits == 1 && (corporate.settingsAllowGroupBenefitsWallet == 0||corporate.settingsAllowGroupBenefitsWallet == undefined)) {
                if (customer.dateOfHiring != undefined && customer.dateOfHiring != null) {
                  caluclatedTier = await this.corporateService.getActualTiers(corporateId, customer.annualIncome ?? 0, customer.dateOfHiring, "tier")
                  console.log("caluclated tier",caluclatedTier)
                  if (caluclatedTier != 0) {
                    customerObj.actualTier = caluclatedTier;
                    await this.customerRepository.updateById(customer.id, customerObj);
                    updatedCustonmersList.push(customer.id);
                  }
                }
              }
              else if ((corporate.settingsEnableTieredHealthBenefits == 0 ||corporate.settingsEnableTieredHealthBenefits==undefined) && corporate.settingsAllowGroupBenefitsWallet == 1) {
                // customerObj.assignerTier = employeeObj.tier;
                if (customer.annualIncome != undefined && customer.annualIncome != null) {
                  caluclatedTier = await this.corporateService.getActualTiers(corporateId, customer.annualIncome, customer.dateOfHiring, "wallet");
                  console.log("caluclated tier",caluclatedTier)
                  if (caluclatedTier != 0) {
                    customerObj.actualTier = caluclatedTier;
                    await this.customerRepository.updateById(customer.id, customerObj);
                    updatedCustonmersList.push(customer.id);
                  }
                }
              }
              else {
                if (customer.annualIncome != undefined && customer.annualIncome != null) {
                  caluclatedTier = await this.corporateService.getActualTiers(corporateId, customer.annualIncome, customer.dateOfHiring, "");
                  console.log("caluclated tier",caluclatedTier)
                  if (caluclatedTier != 0) {
                    customerObj.actualTier = caluclatedTier;
                    await this.customerRepository.updateById(customer.id, customerObj);
                    updatedCustonmersList.push(customer.id);
                  }
                }
              }
              // actualTier = await this.corporateService.getActualTiers(corporateId, employeeObj.walletLimit, employeeObj.dateOfHire,"")
              // caluclatedTier != 0 ? customerObj.actualTier = caluclatedTier : customerObj.actualTier = undefined;
              
              }
              
            }
          }
        }
      }
      status=200;
      message='ok';
    } catch (error) {
      status = 422;
      message = 'internal error ' + error.message
    }
    this.response.status(status).send({
      status, message, updatedCustonmersList
    })
  }
}
