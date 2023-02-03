import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {mail} from '../configurations';
import * as CONST from '../constants';
import {GB_LOGO} from '../paths';

@injectable({scope: BindingScope.TRANSIENT})
export class MailHelperService {
  constructor(/* Add @inject to inject parameters */) { }

  /*
   * Add service methods here
   */

  style = `<style>
  .gb-aitp{
    line-height:2em;
    font:normal normal normal 11px/16px Calibri;
    font-size: 11pt;
    font-family: Calibri,sans-serif;
  }
  table {
    border-collapse: collapse;
    width: 100%;
  }
  th, td {
    text-align: left;
    padding: 8px;
  }
  tr:nth-child(even){
    background: #f2f2f2
  }
  tr {
    border-bottom: 0.25px solid #80808040;
  }
  th {
    background-color: #423795;
    /*background-color: #04AA6D;*/
    color: white;
  }
  .userdetails-wrapper{
    font-weight: 500;
    line-height: 1.5em;
  }
  .grandTotal{
      text-align:right;
  }
  .align-right{
      text-align:right;
  }
  .align-center{
    text-align:center;
  }
  .w25{
    width:25%;
  }
    .w20{
      width:20%;
    }
    .w15{
      width:15%;
    }
    caption{
      text-align: left;
    margin-bottom: 2px;
    }
    .bottom-line{
      display: flex;
      align-items: center;
      box-sizing: border-box;
      flex: 0 0 auto;
      justify-content: flex-start;
      /* justify-content: center; */
      align-content: center;
      flex-wrap: wrap;
      flex-direction: row;
      /*height: 85px;*/
      font-size: 11pt;
    font-family: Calibri,sans-serif;
    /*display: inline-flex;*/
    }

    .bottom-line img{
      max-height: 100%;
      min-width: 0px;
      max-width: 100%;
      /*max-width: 150px;*/
      max-width:20px;
    }

    .bottom-line span{
      font-size:12px;
    }

    .mail-regards{
      font-size: 11pt;
      font-family: Calibri,sans-serif;
    }
  </style>`

  GB_LOGO_B64 = "data: image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAXgAAABOCAYAAAAqyQ2iAAAAAXNSR0IArs4c6QAAHupJREFUeF7tXXuYHEW1P1U9O9lXCGRDeENeEAgYUEBBIaySbMhjd6Z7WAPIIyAXBMUrCgoXr/dyvXC5IIqiggqBBK + Im + nqmd1kSQJxw8PIByRBUQnkBYYECEkIifuYma663xl2xp7enunumdnNZKn6vv1jp + txzq + qf12Pc04RkEkiIBGQCEgEhiUCZFhqJZWSCEgEJAISAZAELweBREAiIBEYpghIgh + mHSvVkghIBCQCkuDlGJAISAQkAsMUAUnww7RjpVoSAYmAREASvBwDEgGJgERgmCIgCX6YdqxUSyIgEZAISIKXY0AiIBGQCAxTBCTBD9OOlWpJBCQCEgFJ8HIMSAQkAhKBYYqAJPhh2rFSLYmAREAiIAlejgGJgERAIjBMEZAEP0w7VqolEZAISAQkwcsxIBGQCEgEhikCkuCHacdKtSQCEgGJgCR4OQYkAhIBicAwRUAS / DDtWKmWREAiIBGQBC / HgERAIiARGKYISIIfph0r1ZIISAQkApLg5RiQCEgEJALDFIGhIvirAeBOADgSAFLDFEuplkRAIiARqCgEBpvgwwDAbBq / CwCfAoBtFYWEFEYiIBGQCAwzBAaD4D8BAL8CgM8gVhMnToSf3X8 / 3HPvvXDNNf8C8 + ZdlIEQZ / I / BYAbhxmmUh2JgERgCBFQVfVyznmToih1APAeACzSdf35QiJomvZXQshJ / KN0YSwWs09Eh1CDwWuqVIIPAACC + mMAuCIjJiEELrn4Ypg9Zw586UtfypF + 9OjR8Mq6dTD5xBOhu7vb + gwJHzO3A0AfAPDBU1vWLBGQCBzgCCiRSCQJAIU4bGk0Gp1j11PTtL8TQo62 / h6NRikAiAMckwHi + yH4tQBwWj4AjjrySJjR1ASTJk6Ehx56CLa8 + aYrVldddRU0Nc2Ax3 / zOMTicbf8IwAg4ZbJ63NVVU8ghMwXQrRQSk + 2lhNC7BRCLOec / zoWiy31WqfMV9kIaJp2LQCc6EdKQogQQuwjhGznnP + ZMfacn / Iyb / kRUFW1gVL6vlvNQogPdF0 / xJ4vEokMIHLO + c2MsR + 41XmgPfdD8MjYx2qqCqecPAXO / uzZUFNTDUuXLoOFCxfC + zt3gmmaRes / cuRImDx5Mlw1fz40jBkD77z7LqxZswY2bNgAzz + fXm3hSiFnyl9MY6FQ6M + BQAAJ3bPunPNdqVRqcnt7u + ugKkYmWWZoEFBVdRmltKnU1vqX9atjsdg5pdYly / tHQNM0TnCbwCV1d3dXd3Z24m5ATnIi + FQqdWwsFvu7W50H2nNXkCwKvQUAx4waNQr27NkzZHquWLECZsyYge0dBAB7i21Y07QOQsiA5Zqf + oQQ / 9i1a9eYrq6uXj / lZN7KQKBcBG / VhnP + TcbYjypDw + EvRTgcvlRRlMdsmk6MRqObrL + pqrqeMTbZCZFQKHRuIBB4JvOMc / 42Yyxny8ZeTlXVsdbfGGO411 / xyTfBjx59COzatXvIFLMQfFEz + NbW1tGpVOo9SqlSLqETicSE9vb2zeWqT9YzNAgMBsGj5EKIqK7rFw6NFh / vVlRV3UkpHZ1BQQih6bru + 4C0sbExcMghh5xpmuaOeDy + wQ1V + 6w / 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"

  regards = `<div class="mail-regards">Best Regards,<br>${mail.regards}</div>`
  //bottom_line = `<br><br><div class="bottom-line"><img src="${GB_LOGO}" alt="GroupBenefitz Logo" /> &nbsp;<span>Version IB:${app.version}   &nbsp;&nbsp;    © 2022 Copyright: ${app.company}</span>`

  //bottom_line = `<br><br><div class="bottom-line"><img src="${GB_LOGO}" alt="GroupBenefitz Logo" />&nbsp;<span>${app.company}</span></div>`
  bottom_line = `<br><br><div class="bottom-line"><img src="${GB_LOGO}" alt="GroupBenefitz Logo" />&nbsp;<span></span></div>`

  //bottom_line = `<br><br><div class="bottom-line"><img src="${GB_LOGO_B64}" alt="GroupBenefitz Logo" />&nbsp;<span></span></div>`



  getPaymentMailBodyGeneric(name: any, bodyStatement: string, paymentDetails: string) {
    let html = this.style +
      `<div class='gb-aitp'>` +
      `<p>Hi <strong>${name}</strong>,</p>` +
      //`<br>` +
      `<p>${bodyStatement}</p>` +
      // `<br>` +
      paymentDetails +
      `</div>` +
      `<br>` +
      `<br>` +
      this.regards
    return html;
  }

  getPaymentFailedMailSubjectBroker() {
    return CONST.PAYMENTFAIL_MAIL_SUBJECT_BROKER
  }

  getPaymentFailedMailBodyBroker(name: any, paymentDetails: string) {
    let bodyStatement = "Payment failed for Customer at GroupBenefitz/Fusebill with following details:";
    return this.getPaymentMailBodyGeneric(name, bodyStatement, paymentDetails)
  }

  getPaymentFailedMailSubjectCustomer() {
    return CONST.PAYMENTFAIL_MAIL_SUBJECT_CUSTOMER
  }

  getPaymentFailedMailBodyCustomer(name: any, paymentDetails: string) {
    let bodyStatement = "Your payment failed at GroupBenefitz/Fusebill with following details:";
    return this.getPaymentMailBodyGeneric(name, bodyStatement, paymentDetails)
  }

  getPaymentSuccessMailSubjectBroker() {
    return CONST.PAYMENTSUCCESS_MAIL_SUBJECT_BROKER
  }

  getPaymentSuccessMailBodyBroker(name: any, paymentDetails: string) {
    let bodyStatement = "Payment Success for Customer at GroupBenefitz/Fusebill with following details:";
    return this.getPaymentMailBodyGeneric(name, bodyStatement, paymentDetails)
  }

  getPaymentSuccessMailSubjectCustomer() {
    return CONST.PAYMENTSUCCESS_MAIL_SUBJECT_CUSTOMER
  }

  getPaymentSuccessMailBodyCustomer(name: any, paymentDetails: string) {
    let bodyStatement = "Your payment success at GroupBenefitz/Fusebill with following details:";
    return this.getPaymentMailBodyGeneric(name, bodyStatement, paymentDetails)
  }


  getCustomerRegistartionMailBodyGeneric(name: any, bodyStatement: string, userdetails: string) {
    let html = this.style +
      `<div class='gb-aitp'>` +
      `<p>Hi <strong>${name}</strong>,</p>` +
      //`<br>` +
      `<p>${bodyStatement}</p>` +
      // `<br>` +
      userdetails +
      `</div>` +
      `<br>` +
      `<br>` +
      this.regards +
      `<br>` +
      this.bottom_line

    return html
  }


  getCustomerRegistartionMailSubjectSysadmin() {
    return CONST.CUSTOMERREGISTRAION_MAIL_SUBJECT_SYSADMIN
  }

  getCustomerRegistartionMailBodySysadmin(name: any, userdetails: string, brokerDetails: string) {
    let bodyStatement = "Customer is registered at GroupBenefitz with following details:";
    bodyStatement += "<br> " + brokerDetails
    return this.getCustomerRegistartionMailBodyGeneric(name, bodyStatement, userdetails)
  }

  getCustomerRegistartionMailSubjectBroker() {
    return CONST.CUSTOMERREGISTRAION_MAIL_SUBJECT_BROKER
  }

  getCustomerRegistartionMailBodyBroker(name: any, userdetails: string) {
    let bodyStatement = "Customer is registered at GroupBenefitz with following details:";
    return this.getCustomerRegistartionMailBodyGeneric(name, bodyStatement, userdetails)
  }

  getCustomerRegistartionMailSubjectCustomer() {
    return CONST.CUSTOMERREGISTRAION_MAIL_SUBJECT_CUSTOMER
  }

  getCustomerRegistartionMailBodyCustomer_bck(name: any, userdetails: string) {
    let bodyStatement = "Your registration is successfull at GroupBenefitz with following details:";
    let footerNote = "<p>Thank you for applying for coverage with us. You will receive your booklet/card (if applicable) and instructions on accessing your program 3-5 days before your coverage begins.</p>"
    userdetails += `<br>` + footerNote
    return this.getCustomerRegistartionMailBodyGeneric(name, bodyStatement, userdetails)
  }

  getCustomerRegistartionMailBodyCustomer(name: any, userdetails: string) {
    let bodyStatement = "Your GroupBenefitz registration has been received. Please see attached your Record of Enrollment for your files and your benefit card (if applicable to your plan selection).";
    let footerNote = "<p>Further plan materials and instructions on accessing your programs (if applicable) will be emailed 3-5 days before your coverage begins.</p>"
    userdetails += `<br>` + footerNote
    return this.getCustomerRegistartionMailBodyGeneric(name, bodyStatement, userdetails)
  }




  //greenshield realted- mail for SYSADMIN

  getGreenshiledRegistartionMailBodyGeneric(name: any, bodyStatement: string, userdetails: string, planDetails: string) {
    let html = this.style +
      `<div class='gb-aitp'>` +
      `<p>Hi <strong>${name}</strong>,</p>` +
      //`<br>` +
      `<p>${bodyStatement}</p>` +
      // `<br>` +
      planDetails +
      `<br>` +
      userdetails +
      `</div>` +
      `<br>` +
      `<br>` +
      this.regards +
      `<br>` +
      this.bottom_line

    return html
  }

  //success
  getGreenshieldSuccessSubject() {
    return `New customer signup (GS)`
  }

  getGreenshieldSuccessBody(name: any, userdetails: string, brokerDetails: string, planDetails: string) {

    let bodyStatement = brokerDetails +
      "<br> " +
      "The customer below has signed up for the following packages effective at {{Enrolment date}}";

    return this.getGreenshiledRegistartionMailBodyGeneric(name, bodyStatement, userdetails, planDetails);
  }



  //fail
  getGreenshieldFailSubject() {
    return `[Action required] customer registration failure (GS)`
  }

  getGreenshieldFailBody(name: any, userdetails: string, brokerDetails: string, planDetails: string) {

    let bodyStatement = brokerDetails +
      "<br> " +
      "Please record this customer manually into the Greenshield platform";

    return this.getGreenshiledRegistartionMailBodyGeneric(name, bodyStatement, userdetails, planDetails);
  }


  //planEnrollmentDate
  getGreenshieldEnrollmentDateIssueSubject() {
    return `[Customer registration - Action required] customer with plan enrollment date advanced.`
  }

  getGreenshieldEnrollmentDateIssueBody(name: any, userdetails: string, brokerDetails: string, planDetails: string) {

    let bodyStatement = brokerDetails +
      "<br> " +
      "The customer below has signed up for the following packages effective at {{Enrolment date}} and this is not acceptable at Greenshield";

    return this.getGreenshiledRegistartionMailBodyGeneric(name, bodyStatement, userdetails, planDetails);
  }

  //specialchlild
  getGreenshieldSpecialchildSubject() {
    return `[Customer registration - Action required] customer with dependent with special needs`
  }

  getGreenshieldSpecialchildBody(name: any, userdetails: string, brokerDetails: string, planDetails: string) {

    let bodyStatement = brokerDetails +
      "<br> " +
      "The customer below has signed up for the following packages effective at {{Enrolment date}}";

    return this.getGreenshiledRegistartionMailBodyGeneric(name, bodyStatement, userdetails, planDetails);
  }

  //termination
  getGreenshieldTerminationSubject() {
    return `Greenshield customer termination`
  }


  getGreenshieldTerminationBody(name: any, userdetails: string, brokerDetails: string, planDetails: string) {

    let bodyStatement = brokerDetails +
      "<br> " +
      "The customer below has signed up for the following packages effective at {{Enrolment date}}, is terminated";

    return this.getGreenshiledRegistartionMailBodyGeneric(name, bodyStatement, userdetails, planDetails);
  }

  //termination-fail
  getGreenshieldTerminationFailSubject() {
    return `[Action required] Greenshield customer termination failure`
  }

  getGreenshieldTerminationFailBody(name: any, userdetails: string, brokerDetails: string, planDetails: string) {

    let bodyStatement = brokerDetails +
      "<br> " +
      "Please terminate this customer manually from the Greenshield platform, if exists";

    return this.getGreenshiledRegistartionMailBodyGeneric(name, bodyStatement, userdetails, planDetails);
  }

  //equitable realted- mail for SYSADMIN

  getEquitableRegistartionMailBodyGeneric(name: any, bodyStatement: string, userdetails: string, planDetails: string) {
    let html = this.style +
      `<div class='gb-aitp'>` +
      // `<p>Hi <strong>${name}</strong>,</p>` +
      `<p>Hi <strong>Admin/Broker</strong>,</p>` +
      //`<br>` +
      `<p>${bodyStatement}</p>` +
      // `<br>` +
      planDetails +
      `<br>` +
      userdetails +
      `</div>` +
      `<br>` +
      `<br>` +
      this.regards +
      `<br>` +
      this.bottom_line

    return html
  }

  //success
  getEquitableSuccessSubject() {
    return `New customer signup (EQ)`
  }

  getEquitableSuccessBody(name: any, userdetails: string, brokerDetails: string, planDetails: string) {

    let bodyStatement = brokerDetails +
      "<br> " +
      "The customer below has signed up for the following packages effective at {{Enrolment date}}, is saved. Please complete enrollment";

    return this.getEquitableRegistartionMailBodyGeneric(name, bodyStatement, userdetails, planDetails);
  }



  //fail
  getEquitableFailSubject() {
    return `[Action required] customer registration failure (EQ)`
  }

  getEquitableFailBody(name: any, userdetails: string, brokerDetails: string, planDetails: string) {

    let bodyStatement = brokerDetails +
      "<br> " +
      "Please record this customer manually into the Equitable platform";

    return this.getEquitableRegistartionMailBodyGeneric(name, bodyStatement, userdetails, planDetails);
  }


  //planEnrollmentDate
  getEquitableEnrollmentDateIssueSubject() {
    return `[Customer registration - Action required] customer with plan enrollment date advanced.`
  }

  getEquitableEnrollmentDateIssueBody(name: any, userdetails: string, brokerDetails: string, planDetails: string) {

    let bodyStatement = brokerDetails +
      "<br> " +
      "The customer below has signed up for the following packages effective at {{Enrolment date}} and this is not acceptable at Equitable";

    return this.getEquitableRegistartionMailBodyGeneric(name, bodyStatement, userdetails, planDetails);
  }

  //customerHireDate
  getEquitableCustomerHireDateIssueSubject() {
    return `[Customer registration - Action required] customer with hire date advanced.`
  }

  getEquitableCustomerHireDateIssueBody(name: any, userdetails: string, brokerDetails: string, planDetails: string) {

    let bodyStatement = brokerDetails +
      "<br> " +
      "The customer below has signed up for the following packages effective at {{Enrolment date}} and this is not acceptable at Equitable";

    return this.getEquitableRegistartionMailBodyGeneric(name, bodyStatement, userdetails, planDetails);
  }

  //specialchlild
  getEquitableSpecialchildSubject() {
    return `[Customer registration - Action required] customer with dependent with special needs`
  }

  getEquitableSpecialchildBody(name: any, userdetails: string, brokerDetails: string, planDetails: string) {

    let bodyStatement = brokerDetails +
      "<br> " +
      "The customer below has signed up for the following packages effective at {{Enrolment date}}";

    return this.getEquitableRegistartionMailBodyGeneric(name, bodyStatement, userdetails, planDetails);
  }

  //minorCustomer
  getEquitableMinorCustomerSubject() {
    return `[Customer registration - Action required] customer with minor age (Cert. eligibility earlier than cert. holder age)`
  }

  getEquitableMinorCustomerBody(name: any, userdetails: string, brokerDetails: string, planDetails: string) {

    let bodyStatement = brokerDetails +
      "<br> " +
      "The customer below has signed up for the following packages effective at {{Enrolment date}}";

    return this.getEquitableRegistartionMailBodyGeneric(name, bodyStatement, userdetails, planDetails);
  }

  //majorChildStudent
  getEquitableMajorStudentChildSubject() {
    return `[Customer registration - Action required] customer with dependent who is Student(major)`
  }

  getEquitableMajorStudentChildBody(name: any, userdetails: string, brokerDetails: string, planDetails: string) {

    let bodyStatement = brokerDetails +
      "<br> " +
      "The customer below has signed up for the following packages effective at {{Enrolment date}}";

    return this.getEquitableRegistartionMailBodyGeneric(name, bodyStatement, userdetails, planDetails);
  }

  //gender
  getEquitableGenderIssueSubject() {
    return `[Customer registration - Action required] customer with other Gender`
  }

  getEquitableGenderIssueBody(name: any, userdetails: string, brokerDetails: string, planDetails: string) {

    let bodyStatement = brokerDetails +
      "<br> " +
      "The customer below has signed up for the following packages effective at {{Enrolment date}}";

    return this.getEquitableRegistartionMailBodyGeneric(name, bodyStatement, userdetails, planDetails);
  }

  //divisionClass
  getEquitableDivisionClassIssueSubject() {
    return `[Customer registration - Action required] customer with new Division-Class`
  }

  getEquitableDivisionClassIssueBody(name: any, userdetails: string, brokerDetails: string, planDetails: string) {

    let bodyStatement = brokerDetails +
      "<br> " +
      "The customer below has signed up for the following packages effective at {{Enrolment date}}";

    return this.getEquitableRegistartionMailBodyGeneric(name, bodyStatement, userdetails, planDetails);
  }

  //termination
  getEquitableTerminationSubject() {
    return `Equitable customer termination`
  }


  getEquitableTerminationBody(name: any, userdetails: string, brokerDetails: string, planDetails: string) {

    let bodyStatement = brokerDetails +
      "<br> " +
      "The customer below has signed up for the following packages effective at {{Enrolment date}}, is terminated";

    return this.getEquitableRegistartionMailBodyGeneric(name, bodyStatement, userdetails, planDetails);
  }

  //termination-fail
  getEquitableTerminationFailSubject() {
    return `[Action required] Equitable customer termination failure`
  }

  getEquitableTerminationFailBody(name: any, userdetails: string, brokerDetails: string, planDetails: string) {

    let bodyStatement = brokerDetails +
      "<br> " +
      "Please terminate this customer manually from the Equitable platform";

    return this.getEquitableRegistartionMailBodyGeneric(name, bodyStatement, userdetails, planDetails);
  }

  //termination-fail
  getEquitableHealthcardIssueSubject() {
    return `[Action required] Equitable customer health card generation`
  }

  getEquitableHealthcardIssueBody(name: any, userdetails: string, brokerDetails: string, planDetails: string) {

    let bodyStatement = brokerDetails +
      "<br> " +
      "Please download/print  health cards for this customer manually from the Equitable platform";

    return this.getEquitableRegistartionMailBodyGeneric(name, bodyStatement, userdetails, planDetails);
  }

  /********* Reports ************* */
  getCustomerReportsMailBodyGeneric(name: any, bodyStatement: string) {
    let html = this.style +
      `<div class='gb-aitp'>` +
      `<p>Hi <strong>${name}</strong>,</p>` +
      //`<br>` +
      `<p>${bodyStatement}</p>` +
      // `<br>` +
      // userdetails +
      `</div>` +
      `<br>` +
      `<br>` +
      this.regards +
      `<br>` +
      this.bottom_line

    return html
  }


  getCustomerReportsMailSubjectSysadmin() {
    return "{{service}} Registrants for {{ReportsDate}} "
  }

  getCustomerReportsMailBodySysadmin(name: any, body: string, attachment: boolean) {
    let bodyStatement = "Customers registered at GroupBenefitz opting for {{service}} in {{ReportsDate}}.";
    if (attachment)
      bodyStatement += "<br> " + "Please find the attachement of the list of customers and their details"
    bodyStatement += body
    return this.getCustomerReportsMailBodyGeneric(name, bodyStatement)
  }

  getCustomerReportsMailSubjectBroker() {
    return "{{service}} Registrants for {{ReportsDate}} "
  }

  getCustomerReportsMailBodyBroker(name: any) {
    let bodyStatement = "Customer is registered at GroupBenefitz with following details:";
    return this.getCustomerReportsMailBodyGeneric(name, bodyStatement)
  }

  //Plans check
  getFusebillPlanIssueBodyGeneric(name: any, bodyStatement: string, planDetails: string) {
    let html = this.style +
      `<div class='gb-aitp'>` +
      `<p>Hi <strong>${name}</strong>,</p>` +
      //`<br>` +
      `<p>${bodyStatement}</p>` +
      // `<br>` +
      planDetails +
      `<br>` +
      `</div>` +
      `<br>` +
      `<br>` +
      this.regards +
      `<br>` +
      this.bottom_line

    return html
  }

  //plan id
  getFusebillPlanIdIssueSubject() {
    return `[Action required] Fusebill Plan not found `
  }
  getFusebillPlanIdIssueBody(name: any, planDetails: string) {

    let bodyStatement = "Below plan has not found at Fusebill";

    return this.getFusebillPlanIssueBodyGeneric(name, bodyStatement, planDetails);
  }

  //plan-freq id
  getFusebillPlanFrequencyIdIssueSubject() {
    return `[Action required] Fusebill Plan Frequency not found `
  }

  getFusebillPlanFrequencyIdIssueBody(name: any, planDetails: string) {

    let bodyStatement = "Below plan(frequency) has not found at Fusebill";

    return this.getFusebillPlanIssueBodyGeneric(name, bodyStatement, planDetails);
  }


  //brokership transfered
  getBrokershipTransferedBodyGeneric(name: any, bodyStatement: string, customerDetails: string) {
    let html = this.style +
      `<div class='gb-aitp'>` +
      `<p>Hi <strong>${name}</strong>,</p>` +
      //`<br>` +
      `<p>${bodyStatement}</p>` +
      // `<br>` +
      customerDetails +
      `<br>` +
      `</div>` +
      `<br>` +
      `<br>` +
      this.regards +
      `<br>` +
      this.bottom_line

    return html
  }

  getBrokershipTransferedSubject() {
    return `[Info] Brokership Transfered `
  }
  getBrokershipTransferedBody(name: any, customerDetails: string) {

    let bodyStatement = "Brokership has been transfered to {{HouseClient}} from {{originalBrokerName}}({{originalBrokerEmail}}) for following customer";

    return this.getBrokershipTransferedBodyGeneric(name, bodyStatement, customerDetails);
  }


  //executive realted- mail for SYSADMIN

  getExecutiveRegistartionMailBodyGeneric(name: any, bodyStatement: string, userdetails: string, planDetails: string) {
    let html = this.style +
      `<div class='gb-aitp'>` +
      // `<p>Hi <strong>${name}</strong>,</p>` +
      `<p>Hi <strong>Admin/Broker</strong>,</p>` +
      //`<br>` +
      `<p>${bodyStatement}</p>` +
      // `<br>` +
      planDetails +
      `<br>` +
      userdetails +
      `</div>` +
      `<br>` +
      `<br>` +
      this.regards +
      `<br>` +
      this.bottom_line

    return html
  }

  //success
  getExecutiveSuccessSubject() {
    return `New customers signup (EXEC-CandooHealth)`
  }

  getExecutiveSuccessBody(name: any, userdetails: string, brokerDetails: string, planDetails: string) {

    let bodyStatement = brokerDetails +
      "<br> " +
      "The customers below has signed up for the EXECUTIVE packages and are registered at Candoo Health Services. "//effective at {{Enrolment date}}, is saved. Please complete enrollment";

    return this.getExecutiveRegistartionMailBodyGeneric(name, bodyStatement, userdetails, planDetails);
  }



  //fail
  getExecutiveFailSubject() {
    return `[Action required] customers registration failure (EXEC-CandooHealth)`
  }

  getExecutiveFailBody(name: any, userdetails: string, brokerDetails: string, planDetails: string) {

    let bodyStatement = brokerDetails +
      "<br> " +
      "Please record these customer manually into the CandooHealth platform";

    return this.getExecutiveRegistartionMailBodyGeneric(name, bodyStatement, userdetails, planDetails);
  }

  //term success
  getExecutiveTerminationSuccessSubject() {
    return `Customers terminated (EXEC-CandooHealth)`
  }

  getExecutiveTerminationSuccessBody(name: any, userdetails: string, brokerDetails: string, planDetails: string) {

    let bodyStatement = brokerDetails +
      "<br> " +
      "The customers below has been terminated from Candoo Health Services";

    return this.getExecutiveRegistartionMailBodyGeneric(name, bodyStatement, userdetails, planDetails);
  }



  //fail
  getExecutiveTerminationFailSubject() {
    return `[Action required] customers termination failure (EXEC-CandooHealth)`
  }

  getExecutiveTerminationFailBody(name: any, userdetails: string, brokerDetails: string, planDetails: string) {

    let bodyStatement = brokerDetails +
      "<br> " +
      "Please terminate these customers manually from the CandooHealth platform";

    return this.getExecutiveRegistartionMailBodyGeneric(name, bodyStatement, userdetails, planDetails);
  }
}
