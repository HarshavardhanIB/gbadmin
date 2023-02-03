import {Client as Fusebill} from '@fusebridge/fusebill-node';
import { /* inject, */ BindingScope, injectable} from '@loopback/core';


export const fusebillClient = new Fusebill({
  apiKey: process.env.FUSEBILL_API_KEY || "",
  limiter: {
    maxConcurrent: 2,
    minTime: 1000 / 9,
  }
})

@injectable({scope: BindingScope.TRANSIENT})
export class FusebillService {
  constructor(/* Add @inject to inject parameters */) {

  }

  /*
   * Add service methods here
   */

  async request(url: string, method: string, data: any): Promise<any> {

    const response = await fusebillClient.apiRequest({
      method: method,
      url: url,
      // qs:"",
      data: data //{ key: 'value' }
    })

    return response;
  }

  async getAllPlans(): Promise<any> {

    const response = await fusebillClient.catalog.plans.list();
    //console.log(response);
    return response;
  }

  async getPlanByid(fusebillPlanId: string): Promise<any> {

    console.log(`getPlanByid: ${fusebillPlanId}`)
    //console.log(` apiKey: ${process.env.FUSEBILL_API_KEY}`)

    let options: any = {}
    try {
      const response = await fusebillClient.catalog.plans.read(fusebillPlanId, options)
      //console.log(response);
      return response;
    } catch (error) {
      if (error?.code === 'ECONNABORTED')
        return 'Timeout error from Fusebill/Staxbill';
      else
        return error;
    }
  }

  async getProductsByPlanid(fusebillPlanId: string): Promise<any> {

    let options: any = {}
    const response = await fusebillClient.catalog.planProducts.listByPlan(fusebillPlanId, options)
    //console.log(response);
    return response;
  }

  async updateProductPrice(fusebillProductId: string): Promise<any> {
    // curl --request PUT \
    //  --url https://secure.fusebill.com/v1/SubscriptionProductPriceOverrides \
    //  --header 'Authorization: Basic MDpMR2NjcGMwdHBlQTBlM1VaNFNJMm1mNVMyMXU3T3YyVTIxbmxwUDNlZlhnT3l3VTBieXZ3bzRZakFZa2tIODRC'
  }



  async createPaymentsCredictCardMethod(data: any): Promise<any> {

    let options: any = {}
    const ccPayments = await fusebillClient.payments.method.creditCard.create(data, options)
    return ccPayments;
  }

  async createPayment(data: any): Promise<any> {

    let options: any = {}
    const payment = await fusebillClient.payments.payment.create(data, options)
    return payment;
  }


  async refundPayment(data: any): Promise<any> {
    data = {
      originalPaymentId: 1234,
      method: "CreditCard",
      amount: 1.00
    }
    let options: any = {}
    const payment = await fusebillClient.payments.refund.create(data, options)
    return payment;
  }

  async getCustomer(customerID: any): Promise<any> {
    let options: any = {}

    const customer = await fusebillClient.customers.customer.read(customerID, options);
    return customer;
  }

  //Creates a customer in fusebill
  async createCustomer(data: any): Promise<any> {

    /*
     curl --request POST \
      --url https://secure.fusebill.com/v1/customers \
      --header 'Authorization: Basic MDpMR2NjcGMwdHBlQTBlM1VaNFNJMm1mNVMyMXU3T3YyVTIxbmxwUDNlZlhnT3l3VTBieXZ3bzRZakFZa2tIODRC'
     */

    const customer = await fusebillClient.customers.customer.create(data);
    return customer;
  }

  async updateCustomer(data: any): Promise<any> {


    const customer = await fusebillClient.customers.customer.update(data);
    return customer;
  }

  async activateCustomer(customerId: any): Promise<any> {

    let data: any = {
      customerId: customerId,
      activateAllSubscriptions: false,
      activateAllDraftPurchases: false,
      temporarilyDisableAutoPost: false
    }

    let showZeroDollarCharges = true;
    const customer = await fusebillClient.customers.customer.activate(data)
    return customer;
  }

  async cancelCustomer(customerId: any): Promise<any> {

    const customer = await fusebillClient.customers.customer.read(customerId);
    const customerCancelled = await fusebillClient.customers.customer.cancel(customer);
    return customerCancelled;
  }


  async getSubscriptionsofCustomer(customerId: any): Promise<any> {
    let opts: any = {}
    const subscriptions = await fusebillClient.subscriptions.subscription.listByCustomer(customerId, opts)
    return subscriptions;
  }

  async getSubscriptionById(subscriptionId: any): Promise<any> {
    let opts: any = {}
    const subscription = await fusebillClient.subscriptions.subscription.read(subscriptionId, opts)
    return subscription;
  }

  async createSubscription(data: any): Promise<any> {

    let options: any = {}

    const customerSubscription = await fusebillClient.subscriptions.subscription.create(data, options);
    return customerSubscription;


  }

  async updateSubscription(data: any): Promise<any> {

    //let options:any={}
    const customerSubscription = await fusebillClient.subscriptions.subscription.update(data);
    return customerSubscription;
  }

  async cancelSubscription(data: any): Promise<any> {

    let options: any = {}
    const customerSubscription = await fusebillClient.subscriptions.subscription.cancel(data, options);
    return customerSubscription;
  }

  async activateSubscription(subscriptionId: any): Promise<any> {

    let options: any = {}
    const customerSubscription = await fusebillClient.subscriptions.subscription.activate(subscriptionId, options);
    return customerSubscription;
  }

  async provisionSubscription(subscriptionId: any): Promise<any> {

    let options: any = {}
    const customerSubscription = await fusebillClient.subscriptions.subscription.provision(subscriptionId, options);
    return customerSubscription;
  }

  async deleteSubscription(subscriptionId: any): Promise<any> {

    let options: any = {}
    const customerSubscription = await fusebillClient.subscriptions.subscription.delete(subscriptionId, options);
    return customerSubscription;
  }

  async getsubscriptionProduct(subscriptionProductId: any): Promise<any> {

    // products
    let opts: any = {}
    const subscriptionProduct = await fusebillClient.subscriptions.products.read(subscriptionProductId, opts)
    return subscriptionProduct;


    // productPrice
    //fusebill.subscriptions.productPrice.update(data, opts)
  }

  async updatesubscriptionProduct(data: any): Promise<any> {

    // products
    let opts: any = {}
    const subscriptionProduct = await fusebillClient.subscriptions.products.update(data, opts)
    return subscriptionProduct;
    //fusebill.subscriptions.products.updateQuantity(data, opts)
  }

  async newSubscriptionProductPrice(data: any): Promise<any> {

    // products
    let opts: any = {}
    const subscriptionProductPrice = await fusebillClient.subscriptions.productPrice.create(data, opts);
    return subscriptionProductPrice;
    //fusebill.subscriptions.products.updateQuantity(data, opts)
  }

  async updateSubscriptionProductPrice(data: any): Promise<any> {

    // products
    let opts: any = {}
    const subscriptionProductPrice = await fusebillClient.subscriptions.productPrice.update(data, opts)
    return subscriptionProductPrice;

  }



  async getInvoice(customerId: any): Promise<any> {

    let options: any = {}
    let showZeroDollarCharges = true;
    const customerInvoices = await fusebillClient.invoices.invoice.listByCustomer(customerId, showZeroDollarCharges, options)
    return customerInvoices;
  }


  async createCustomerAddress(data: any): Promise<any> {


    const address = await this.request('https://secure.fusebill.com/v1/Addresses', 'POST', data);
    return address;
  }


  async updateCustomerAddress(data: any): Promise<any> {


    const address = await this.request('https://secure.fusebill.com/v1/Addresses', 'PUT', data);
    return address;
  }



}
