#CHANGE LOG
1.0.0.0 - RELEASE(v...)
-----------------------------------------------------------------
0.7.0
added caluclation controller in that controller added update corporate customer assigned tier and handle the duplicate entry's in corporate signup and employee signup

0.6.6

changes are done in corporate controller add demployee to multiple employees

0.6.5
added get plans service in corporate controller

0.6.4
added delete tier service in corporate controller

0.6.3
changes in corporate controoler when corporate is create update the corporate broker.customer fusebill id 

0.6.2

made changes in corporate signup and customer validation service in that remove the signup form and creating signup fomr in corporate plans service and added the plan levels in signup form plan level mapping

0.6.1

added tier configration and waller configration in corporate controller and made changes in planselection service in that added configration key in that key added tier and waller in tier is flase create a defaul tier in corporate tiers

0.6.0

form logo,disclouser aggrement and broker disclouser aggrement services added 

0.5.0
- Changes in db and models, repos (**-02-23)   removed corporate_paid_tiered_plan_levels   modified customer_plans (paid_by_company, covered_by_company, paid_by_employee)  modified broker (disclosure_agreement)  modified signup_forms (logo, disclosure_agreement)  modified corporate_tiered_plan_levels (paid_by_company, covered_by_company, paid_by_employee, plan_id vs plan_level_id, foriegn key corporate_tiered_plan_levels_ibfk_1)  modified corporate_tiers (from_length, to_length, income_percentage, annual_income)  modified customer(employee_id)

0.4.8

added model properties funcytion in corporate services and change the app details service auth controller to broker controller

0.4.7

changes in maiul config in mail service reading the mail username and password in config

0.4.6

added customers search/filter service in customer controller and added broker,form,customers based on the brokerid,formId and custoemid services in broker controller and also added broker search/filter service in broker controller

0.4.5

added plans bansed on formId,age and province id  2 services added broker controller

0.4.4

updated models

0.4.3

added broker count service in broker controller and added the customer count based on the role in customer count service,added form configuration

0.4.2
changes in changepassword service.

0.4.1
added broker licence, licence states, e&o insurence update services in broker controller
in licence states are delete in database and create new state given in the input

0.4.0
added jwt authenrication stratagy and auth middleware
changes are added role in jwt signin and get that role in jwt verification.
0.3.1
added admin corporate controller in that controller added login and signupn services added
--> In there signup services only for broker
0.3.0

added corpotate controller
and write the corporate logo service and for logo based on the broker name and sending the logo path in the response

0.2.1
changes done in the broker registration in that added insert the data into the broker signupforms planlevel table,added form configiration service, and added form modification

0.2.0
added broker controller and added customers count unser the broker id
addded

0.1.0
adding customer details and count
0.0.1

 - Initial setup
 - Models, Repositories, Datasource, Related Controllers generation

-------------------------------------------------------------------------------------------------------------------

MAJOR SOFTWARES

 #NodeJS        v16
 #Loopback      v4
--------------------------------------------------------------------------------------------------------------------

DESCRIPTION

Server for GroupBenefitz providing APIs and services related to the customer signup - including registration, subscription.
This also involves Fusebill/Staxbill connections, insurance portal provisioning and also ACH-customer payment record creation.
--------------------------------------------------------------------------------------------------------------------------------

NAME AND OTHERS

admindev
testadminapi
adminapi-dev
adminapi

PORT-3002
