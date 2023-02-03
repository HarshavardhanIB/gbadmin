# fusebill-node-sdk

Javascript / node.js wrapper for the [Fusebill API](https://developer.fusebill.com/reference#overview)


## Installing

```shell
npm install @fusebridge/fusebill-node
```

## Instantiate client

```javascript
import { Client as Fusebill } from '@fusebridge/fusebill-node'

export const fusebillClient = new Fusebill({
  apiKey: 'abc',
  checkLimit: false // (Optional) Specify whether to check the API limit on each call. Default: true
})
```

To change the base url:

```javascript
export const fusebillClient = new Fusebill({ apiKey: YOUR_API_KEY, baseURL: 'https://some-url' })
```

### Changing rate limiter options

[Bottleneck](https://github.com/SGrondin/bottleneck) is used for rate limiting. To override the default settings, pass a `limiter` object when instantiating the client. Bottleneck options can be found [here](https://github.com/SGrondin/bottleneck#constructor).

```javascript
export const fusebillClient = new Fusebill({
  apiKey: YOUR_API_KEY,
  limiter: {
    maxConcurrent: 2,
    minTime: 1000 / 9,
  }
})
```

## Usage

All methods return a [promise]. The success case includes the returned object
from the response. Use the API method via:

```javascript
fusebill.catalog.plans
  .list(options)
  .then(results => {
    console.log(results)
  })
  .catch(err => {
    console.error(err)
  })
```

[promise]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise

## Samples

Please see repository with [samples] applications with common cases.

[samples]: https://github.com/someexampleshere

## API limits

Fusebill has API limits (180,000 per day by default). To
prevent from consuming it all-at-once, this library checks API quotas regularly
and will fail requests if the total is too close to the max. By default

## Available Methods

### Catalog

```javascript
// plans
fusebill.catalog.plans.list(opts)
fusebill.catalog.plans.read(planId, opts)

// products
fusebill.catalog.products.summary(opts)
fusebill.catalog.products.list(opts)
fusebill.catalog.products.read(productId, opts)

// plan products
fusebill.catalog.planProducts.listByPlan(planId, opts)
fusebill.catalog.planProducts.listByCatalogProduct(productId, opts)
fusebill.catalog.planProducts.read(planProductId, opts)
fusebill.catalog.planProducts.patch(data)

// plan families
fusebill.catalog.planFamilies.list(opts)
fusebill.catalog.planFamilies.listByPlanId(planId, opts)
fusebill.catalog.planFamilies.read(planFamilyId, opts)
fusebill.catalog.planFamilies.readBySubscriptionId(subscriptionId, opts)

// discounts
fusebill.catalog.discounts.list(opts)
fusebill.catalog.discounts.read(discountId, opts)

// custom fields
fusebill.catalog.customFields.updateOnSubscription(data)
fusebill.catalog.customFields.updateOnSubscriptionProduct(data)
fusebill.catalog.customFields.updateOnPurchase(data)
```

### Customers

```javascript
// customer
fusebill.customers.customer.list(opts)
fusebill.customers.customer.readOverview(customerId, opts)
fusebill.customers.customer.read(customerId, opts)
fusebill.customers.customer.create(data)
fusebill.customers.customer.activate(data, opts)
fusebill.customers.customer.activateSubscriptionsAndPurchases(customerId, data, opts)
fusebill.customers.customer.hold(customerId, opts)
fusebill.customers.customer.unHold(data, opts)
fusebill.customers.customer.cancel(data, opts)
fusebill.customers.customer.unCancel(customerId, opts)
fusebill.customers.customer.update(data, opts)
fusebill.customers.customer.createNote(data, opts)
fusebill.customers.customer.deleteNote(noteId, opts)

// email
fusebill.customers.email.read(customerId, opts)
fusebill.customers.email.update(data, opts)

// billing
fusebill.customers.billing.read(customerId, opts)
fusebill.customers.billing.update(data, opts)

// address
fusebill.customers.address.read(customerId, opts)
fusebill.customers.address.update(data, opts)

// shippingBillingAddress
fusebill.customers.shippingBillingAddress.read(addressId, opts)
fusebill.customers.shippingBillingAddress.create(data, opts)
fusebill.customers.shippingBillingAddress.update(data, opts)
fusebill.customers.shippingBillingAddress.readCountries(opts)
```

### Subscriptions

```javascript
// subscription
fusebill.subscriptions.subscription.list(opts)
fusebill.subscriptions.subscription.listSummary(opts)
fusebill.subscriptions.subscription.listByCustomer(customerId, opts)
fusebill.subscriptions.subscription.read(subscriptionId, opts)
fusebill.subscriptions.subscription.create(data, opts)
fusebill.subscriptions.subscription.update(data)
fusebill.subscriptions.subscription.activate(subscriptionId, opts)
fusebill.subscriptions.subscription.activateMultiple(data, opts)
fusebill.subscriptions.subscription.provision(subscriptionId, opts)
fusebill.subscriptions.subscription.cancel(data, opts)
fusebill.subscriptions.subscription.delete(subscriptionId, opts)
fusebill.subscriptions.subscription.countByStatus(customerId, status, opts)

// products
fusebill.subscriptions.products.read(subscriptionProductId, opts)
fusebill.subscriptions.products.update(data, opts)
fusebill.subscriptions.products.updateQuantity(data, opts)

// productPrice
fusebill.subscriptions.productPrice.create(data, opts)
fusebill.subscriptions.productPrice.update(data, opts)
fusebill.subscriptions.productPrice.delete(subscriptionProductId, opts)

// billingPeriodDefinitions
fusebill.subscriptions.billingPeriodDefinitions.listByCustomer(customerId, opts)
fusebill.subscriptions.billingPeriodDefinitions.readBySubscriptionId(subscriptionId, opts)
fusebill.subscriptions.billingPeriodDefinitions.read(billingPeriodDefinitionId, opts)
fusebill.subscriptions.billingPeriodDefinitions.create(data, opts)
fusebill.subscriptions.billingPeriodDefinitions.preview(data, opts)
fusebill.subscriptions.billingPeriodDefinitions.update(data, opts)
fusebill.subscriptions.billingPeriodDefinitions.delete(billingPeriodDefinitionId, opts)

// coupons
fusebill.subscriptions.coupons.list(opts)
fusebill.subscriptions.coupons.read(couponId, opts)
fusebill.subscriptions.coupons.validate(data, opts)
fusebill.subscriptions.coupons.apply(data, opts)
fusebill.subscriptions.coupons.delete(subscriptionId, couponCode, deleteAllDiscounts, opts)

// migrations
fusebill.subscriptions.migrations.read(subscriptionId, opts)
fusebill.subscriptions.migrations.create(subscriptionId, data, opts)
fusebill.subscriptions.migrations.cancel(subscriptionId, opts)
```

### Purchases

```javascript
// purchase
fusebill.purchases.purchase.listByProduct(productId, opts)
fusebill.purchases.purchase.listByCustomer(customerId, opts)
fusebill.purchases.purchase.read(purchaseId, opts)
fusebill.purchases.purchase.createBulk(data, opts)
fusebill.purchases.purchase.create(data, opts)
fusebill.purchases.purchase.finalize(data, opts)
fusebill.purchases.purchase.split(data, opts)
fusebill.purchases.purchase.update(data)
fusebill.purchases.purchase.applyCoupon(data)
fusebill.purchases.purchase.deleteCoupon(purchaseId, couponCode, deleteAllDiscounts, opts)
fusebill.purchases.purchase.cancel(data, opts)
fusebill.purchases.purchase.deleteDraft(purchaseId, opts)

// discount
fusebill.purchases.discount.read(purchaseDiscountId, opts)
fusebill.purchases.discount.create(data, opts)
fusebill.purchases.discount.update(data, opts)
fusebill.purchases.discount.delete(purchaseDiscountId, opts)
```

### Payments

```javascript
// payment
fusebill.payments.payment.read(paymentId, opts)
fusebill.payments.payment.create(data, opts)

// activity
fusebill.payments.activity.listByCustomer(customerId, opts)
fusebill.payments.activity.list(opts)
fusebill.payments.activity.listChildActivityByCustomer(customerId, opts)
fusebill.payments.activity.read(paymentActivityId, opts)
fusebill.payments.activity.autoResolve(data, opts)
fusebill.payments.activity.manualResolve(data, opts)

// refund
fusebill.payments.refund.read(transactionId, opts)
fusebill.payments.refund.create(data, opts)

// method
fusebill.payments.method.listByCustomer(customerId, opts)
fusebill.payments.method.setCustomerDefault(paymentMethodId, customerId, opts)

// method.creditCard
fusebill.payments.method.creditCard.listByCustomer(customerId, opts)
fusebill.payments.method.creditCard.read(paymentMethodId, opts)
fusebill.payments.method.creditCard.create(data, opts)
fusebill.payments.method.creditCard.update(data, opts)
fusebill.payments.method.creditCard.delete(paymentMethodId, opts)

// method.ach
fusebill.payments.method.ach.listByCustomer(customerId, opts)
fusebill.payments.method.ach.read(paymentMethodId, opts)
fusebill.payments.method.ach.create(data, opts)
fusebill.payments.method.ach.update(data, opts)
fusebill.payments.method.ach.delete(paymentMethodId, opts)

// transactions
fusebill.payments.transaction.list(opts)
fusebill.payments.transaction.listByCustomer(customerId, opts)

// credit
fusebill.payments.credit.read(transactionId, opts)
fusebill.payments.credit.create(data, opts)

// debit
fusebill.payments.debit.read(transactionId, opts)
fusebill.payments.debit.create(data, opts)

// stripe
fusebill.payments.stripe.achTokenImport(data, opts)
fusebill.payments.stripe.creditCardTokenImport(data, opts)
fusebill.payments.stripe.connectAchTokenImport(data, opts)
fusebill.payments.stripe.connectCreditCardTokenImport(data, opts)

// paypal
fusebill.payments.paypal.create(data, opts)
fusebill.payments.paypal.delete(paymentMethodId, opts)

// braintree
fusebill.payments.braintree.cardTokenImport(data, opts)
```

### Invoices

```javascript
// invoice
fusebill.invoices.invoice.list(opts)
fusebill.invoices.invoice.listSummary(opts)
fusebill.invoices.invoice.listByCustomer(customerId, showZeroDollarCharges, opts)
fusebill.invoices.invoice.read(invoiceId, showTrackedItems, groupCharges, opts)
fusebill.invoices.invoice.readAsHtml(invoiceId, showTrackedItems, opts)
fusebill.invoices.invoice.readAsPdf(invoiceId, showTrackedItems, opts)
fusebill.invoices.invoice.listCreditAllocations(invoiceId, opts)
fusebill.invoices.invoice.listPaymentAllocations(invoiceId, opts)
fusebill.invoices.invoice.writeOff(data, opts)
```


## Not wrapped endpoint(s)

It is possible to access the fusebill request method directly,
it could be handy if wrapper doesn't have implementation for some endpoint yet.
Using of exposed request method benefits by the bottleneck throttling, auth and request parsing and formatting already in place

Note: This library uses [Axios](https://www.npmjs.com/package/axios#axios-api) for http calls.

```javascript
fusebill.apiRequest({
  method: 'PUT',
  path: '/some/api/not/wrapped/yet',
  data: { key: 'value' }
})
```

```javascript
 // qs is not part of axios and we use this for custom transformations on query
fusebill.apiRequest({
  method: 'GET',
  path: '/some/api/not/wrapped/yet',
  qs: { query: { someKey: 'someValue'}, pageSize: 100}
})
```

## Credits
Built and maintained by [Clay Gorman](https://www.linkedin.com/in/claygorman/)
