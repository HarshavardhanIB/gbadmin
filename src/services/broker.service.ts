import { injectable, /* inject, */ BindingScope } from '@loopback/core';
import { repository } from '@loopback/repository';
import { BrokerLicensedStatesAndProvinces } from '../models';
import { BrokerEoInsuranceRepository, BrokerLicensedStatesAndProvincesRepository, BrokerRepository, SignupFormsPlanLevelMappingRepository, BrokerSignupFormsPlansRepository, ContactInformationRepository, CustomerRepository, CustomerSignupRepository, InsurancePlansRepository, PlanLevelRepository, SignupFormsRepository, StatesAndProvincesRepository, TieredRebatesDataRepository, TieredRebatesRepository, UsersRepository } from '../repositories';

@injectable({ scope: BindingScope.TRANSIENT })
export class BrokerService {
  constructor(/* Add @inject to inject parameters */
    @repository(BrokerRepository)
    public BrokerRepository: BrokerRepository,
    @repository(BrokerLicensedStatesAndProvincesRepository)
    public BrokerLicensedStatesAndProvincesRepository: BrokerLicensedStatesAndProvincesRepository,
    @repository(BrokerSignupFormsPlansRepository)
    public BrokerSignupFormsPlansRepository: BrokerSignupFormsPlansRepository,
    @repository(SignupFormsPlanLevelMappingRepository)
    public SignupFormsPlanLevelMappingRepository: SignupFormsPlanLevelMappingRepository,
    @repository(TieredRebatesDataRepository)
    public TieredRebatesDataRepository: TieredRebatesDataRepository,
    @repository(TieredRebatesRepository)
    public TieredRebatesRepository: TieredRebatesRepository,
    @repository(UsersRepository)
    public UsersRepository: UsersRepository,
    @repository(ContactInformationRepository)
    public ContactInformationRepository: ContactInformationRepository,
    @repository(SignupFormsRepository)
    public SignupFormsRepository: SignupFormsRepository,
    @repository(StatesAndProvincesRepository)
    public StatesAndProvincesRepository: StatesAndProvincesRepository,
    @repository(CustomerSignupRepository)
    public CustomerSignupRepository: CustomerSignupRepository,
    @repository(CustomerRepository)
    public CustomerRepository: CustomerRepository,
    @repository(InsurancePlansRepository)
    public InsurancePlansRepository: InsurancePlansRepository,
    @repository(PlanLevelRepository)
    public PlanLevelRepository: PlanLevelRepository,
    @repository(BrokerEoInsuranceRepository)
    public BrokerEoInsuranceRepository: BrokerEoInsuranceRepository,
  ) { }

  async print() {
    console.log("allow from broker service");
  }
  async updateContact(id: number, ContactInformation: any) {
    let statusCode, message: any = {};
    console.log(ContactInformation)
    let broker: any = await this.BrokerRepository.findOne({ where: { id: id }, fields: { contactId: true } })
    if (broker) {
      await this.ContactInformationRepository.updateAll(broker.contactId, ContactInformation);
      statusCode = 200;
      message = "Contact information updated successfully"
    }
    else {
      statusCode = 201;
      message = "No info found"

    }
    let response = {
      statusCode, message, date: new Date()
    };
    return response;
  }
  async updateLiceceState(brokerId: number, states: any): Promise<any> {
    let status, message, date: any = {};
    if (states.length > 0) {
      await this.BrokerLicensedStatesAndProvincesRepository.deleteById(brokerId);
      let BrokerLicensedStatesAndProvince: BrokerLicensedStatesAndProvinces = new BrokerLicensedStatesAndProvinces();
      BrokerLicensedStatesAndProvince.brokerId = brokerId;

      for (const state of states) {
        BrokerLicensedStatesAndProvince.stateId = state;
        await this.BrokerLicensedStatesAndProvincesRepository.create(BrokerLicensedStatesAndProvince)
      }
      status = 200;
      message = "Licence states updated successfully"
    }
    else {
      status = 201;
      message = "Send states"
    }
    let response = {
      status, message, date: new Date()
    }
    return response;

  }
  async updateEO(BrokerEoInsurance: any, brokerId: number): Promise<any> {
    let status, message, data: any = {}
    console.log(BrokerEoInsurance);
    if (!brokerId) {
      status = 201;
      message = "Send proper input"
    }
    else {
      await this.BrokerEoInsuranceRepository.updateAll(BrokerEoInsurance, { where: { brokerId: brokerId } })
      status = 200;
      message = "E&O insurence Updated succesfully"
    }
    let response = {
      status, message, date: new Date()
    }
    return response;
  }
  async updateLiceceNum(brokerId: number, licenceNum: any): Promise<any> {

    let status, message, data: any = {};
    if (licenceNum.length > 0) {
      let brokerLicecs = await this.BrokerLicensedStatesAndProvincesRepository.find({ where: { brokerId: brokerId } });
      if (brokerLicecs) {
        let brokerLicecne: BrokerLicensedStatesAndProvinces = new BrokerLicensedStatesAndProvinces();
        await this.BrokerLicensedStatesAndProvincesRepository.updateAll({ licenseNumber: licenceNum }, { where: { brokerId: brokerId } })
        status = 200;
        message = "Licence number updated succesfully";
      }
      else {
        status = 201;
        message = "No broker licences found"
      }

    }
    else {
      status = 201;
      message = "Send licence number"
    }
    let response = {
      status, message, date: new Date()
    };
    return response;
  }
}
