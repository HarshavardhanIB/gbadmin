"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FusebillService = exports.fusebillClient = void 0;
const tslib_1 = require("tslib");
const fusebill_node_1 = require("@fusebridge/fusebill-node");
const core_1 = require("@loopback/core");
exports.fusebillClient = new fusebill_node_1.Client({
    apiKey: process.env.FUSEBILL_API_KEY || "",
    limiter: {
        maxConcurrent: 2,
        minTime: 1000 / 9,
    }
});
let FusebillService = class FusebillService {
    constructor( /* Add @inject to inject parameters */) {
    }
    /*
     * Add service methods here
     */
    async request(url, method, data) {
        const response = await exports.fusebillClient.apiRequest({
            method: method,
            url: url,
            // qs:"",
            data: data //{ key: 'value' }
        });
        return response;
    }
    async getAllPlans() {
        const response = await exports.fusebillClient.catalog.plans.list();
        //console.log(response);
        return response;
    }
    async getPlanByid(fusebillPlanId) {
        console.log(`getPlanByid: ${fusebillPlanId}`);
        //console.log(` apiKey: ${process.env.FUSEBILL_API_KEY}`)
        let options = {};
        try {
            const response = await exports.fusebillClient.catalog.plans.read(fusebillPlanId, options);
            //console.log(response);
            return response;
        }
        catch (error) {
            if ((error === null || error === void 0 ? void 0 : error.code) === 'ECONNABORTED')
                return 'Timeout error from Fusebill/Staxbill';
            else
                return error;
        }
    }
    async getProductsByPlanid(fusebillPlanId) {
        let options = {};
        const response = await exports.fusebillClient.catalog.planProducts.listByPlan(fusebillPlanId, options);
        //console.log(response);
        return response;
    }
    async updateProductPrice(fusebillProductId) {
        // curl --request PUT \
        //  --url https://secure.fusebill.com/v1/SubscriptionProductPriceOverrides \
        //  --header 'Authorization: Basic MDpMR2NjcGMwdHBlQTBlM1VaNFNJMm1mNVMyMXU3T3YyVTIxbmxwUDNlZlhnT3l3VTBieXZ3bzRZakFZa2tIODRC'
    }
    async createPaymentsCredictCardMethod(data) {
        let options = {};
        const ccPayments = await exports.fusebillClient.payments.method.creditCard.create(data, options);
        return ccPayments;
    }
    async createPayment(data) {
        let options = {};
        const payment = await exports.fusebillClient.payments.payment.create(data, options);
        return payment;
    }
    async refundPayment(data) {
        data = {
            originalPaymentId: 1234,
            method: "CreditCard",
            amount: 1.00
        };
        let options = {};
        const payment = await exports.fusebillClient.payments.refund.create(data, options);
        return payment;
    }
    async getCustomer(customerID) {
        let options = {};
        const customer = await exports.fusebillClient.customers.customer.read(customerID, options);
        return customer;
    }
    //Creates a customer in fusebill
    async createCustomer(data) {
        /*
         curl --request POST \
          --url https://secure.fusebill.com/v1/customers \
          --header 'Authorization: Basic MDpMR2NjcGMwdHBlQTBlM1VaNFNJMm1mNVMyMXU3T3YyVTIxbmxwUDNlZlhnT3l3VTBieXZ3bzRZakFZa2tIODRC'
         */
        const customer = await exports.fusebillClient.customers.customer.create(data);
        return customer;
    }
    async updateCustomer(data) {
        const customer = await exports.fusebillClient.customers.customer.update(data);
        return customer;
    }
    async activateCustomer(customerId) {
        let data = {
            customerId: customerId,
            activateAllSubscriptions: false,
            activateAllDraftPurchases: false,
            temporarilyDisableAutoPost: false
        };
        let showZeroDollarCharges = true;
        const customer = await exports.fusebillClient.customers.customer.activate(data);
        return customer;
    }
    async cancelCustomer(customerId) {
        const customer = await exports.fusebillClient.customers.customer.read(customerId);
        const customerCancelled = await exports.fusebillClient.customers.customer.cancel(customer);
        return customerCancelled;
    }
    async getSubscriptionsofCustomer(customerId) {
        let opts = {};
        const subscriptions = await exports.fusebillClient.subscriptions.subscription.listByCustomer(customerId, opts);
        return subscriptions;
    }
    async getSubscriptionById(subscriptionId) {
        let opts = {};
        const subscription = await exports.fusebillClient.subscriptions.subscription.read(subscriptionId, opts);
        return subscription;
    }
    async createSubscription(data) {
        let options = {};
        const customerSubscription = await exports.fusebillClient.subscriptions.subscription.create(data, options);
        return customerSubscription;
    }
    async updateSubscription(data) {
        //let options:any={}
        const customerSubscription = await exports.fusebillClient.subscriptions.subscription.update(data);
        return customerSubscription;
    }
    async cancelSubscription(data) {
        let options = {};
        const customerSubscription = await exports.fusebillClient.subscriptions.subscription.cancel(data, options);
        return customerSubscription;
    }
    async activateSubscription(subscriptionId) {
        let options = {};
        const customerSubscription = await exports.fusebillClient.subscriptions.subscription.activate(subscriptionId, options);
        return customerSubscription;
    }
    async provisionSubscription(subscriptionId) {
        let options = {};
        const customerSubscription = await exports.fusebillClient.subscriptions.subscription.provision(subscriptionId, options);
        return customerSubscription;
    }
    async deleteSubscription(subscriptionId) {
        let options = {};
        const customerSubscription = await exports.fusebillClient.subscriptions.subscription.delete(subscriptionId, options);
        return customerSubscription;
    }
    async getsubscriptionProduct(subscriptionProductId) {
        // products
        let opts = {};
        const subscriptionProduct = await exports.fusebillClient.subscriptions.products.read(subscriptionProductId, opts);
        return subscriptionProduct;
        // productPrice
        //fusebill.subscriptions.productPrice.update(data, opts)
    }
    async updatesubscriptionProduct(data) {
        // products
        let opts = {};
        const subscriptionProduct = await exports.fusebillClient.subscriptions.products.update(data, opts);
        return subscriptionProduct;
        //fusebill.subscriptions.products.updateQuantity(data, opts)
    }
    async newSubscriptionProductPrice(data) {
        // products
        let opts = {};
        const subscriptionProductPrice = await exports.fusebillClient.subscriptions.productPrice.create(data, opts);
        return subscriptionProductPrice;
        //fusebill.subscriptions.products.updateQuantity(data, opts)
    }
    async updateSubscriptionProductPrice(data) {
        // products
        let opts = {};
        const subscriptionProductPrice = await exports.fusebillClient.subscriptions.productPrice.update(data, opts);
        return subscriptionProductPrice;
    }
    async getInvoice(customerId) {
        let options = {};
        let showZeroDollarCharges = true;
        const customerInvoices = await exports.fusebillClient.invoices.invoice.listByCustomer(customerId, showZeroDollarCharges, options);
        return customerInvoices;
    }
    async createCustomerAddress(data) {
        const address = await this.request('https://secure.fusebill.com/v1/Addresses', 'POST', data);
        return address;
    }
    async updateCustomerAddress(data) {
        const address = await this.request('https://secure.fusebill.com/v1/Addresses', 'PUT', data);
        return address;
    }
};
FusebillService = tslib_1.__decorate([
    (0, core_1.injectable)({ scope: core_1.BindingScope.TRANSIENT }),
    tslib_1.__metadata("design:paramtypes", [])
], FusebillService);
exports.FusebillService = FusebillService;
//# sourceMappingURL=fusebill.service.js.map