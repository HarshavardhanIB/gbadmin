"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExecutableService = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const paths_1 = require("../paths");
const execFileSync = require('child_process').execFileSync;
let ExecutableService = class ExecutableService {
    constructor( /* Add @inject to inject parameters */) { }
    /*
     * Add service methods here
     */
    async executeNode() {
        const stdout = execFileSync('node', ['--version']);
        console.log(stdout);
        console.log(stdout.toString());
        var isWin = process.platform === "win32";
        console.log(`isWin:${isWin}`);
    }
    async generateROE(json) {
        //record of enrollment executable file execution with options
        var isWin = process.platform === "win32";
        console.log(`isWin:${isWin}`);
        //var file = "D:\\sid\\gb\\gb-enrollment-form\\ROE\\ROE\\enrollment_jstring.py"
        // var json = {
        //   "planEnrollmentDate": "2022-12-01",
        //   "first_name": "Nama",
        //   "last_name": "sda",
        //   "email": "Micheljrv123123@gmail.com",
        //   "phone_number": "+917527527522",
        //   "apt": "A",
        //   "street_address_line1": "2 Seyton Dr",
        //   "street_address_line2": "",
        //   "city": "Nepean",
        //   "province": "ON",
        //   "country": "Canada",
        //   "postal_code": "K2K 3E7",
        //   "date_of_birth": "1956-10-01",
        //   "gender": "Male",
        //   "company_name": "Ideabytes",
        //   "job_title": "Employee",
        //   "date_of_hiring": "2022-06-09",
        //   "working_20hours": true,
        //   "hours_per_week": 40,
        //   "provincial_health_coverage": true,
        //   "having_spouse": false,
        //   "spouse_details": {
        //         "first_name": "Test",
        //         "last_name": "Test1",
        //         "date_of_birth": "2006-12-07",
        //         "gender": "Female",
        //         "is_spouse_having_healthcard": true,
        //         "spouse_carrier_name": "Hdfc"
        //   },
        //   "children_details": [
        //         {
        //               "first_name": "Child1",
        //               "last_name": "TestChild",
        //               "gender": "Male",
        //               "date_of_birth": "2022-12-01",
        //               "is_child_having_healthcard": false,
        //               "child_carrier_name": "HDFC",
        //               "enrolledInUniversity": true,
        //               "isDisabled": true,
        //               "graduationDay": "2022-12-15"
        //         }
        //   ],
        //   "signature": "data:image/png;base64,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",
        //   "termsandconditions": true,
        //   "disclouseradvisor": true,
        //   "paymentMethod": "Credit Card",
        //   "advisorName": "David Mosley",
        //   "plans": [
        //         {
        //               "details": "Opt-in",
        //               "planPrice": 0,
        //               "planname": "PocketPills Digital Pharmacy - Activate My Account",
        //               "tax": 0,
        //               "totalPrice": 0
        //         },
        //         {
        //               "details": "Executive Benefits",
        //               "planPrice": 791.67,
        //               "planname": "GroupBenefitz Exec - Executive Health - Family (Ontario >60)",
        //               "tax": 63.33,
        //               "totalPrice": 855.0036
        //         },
        //         {
        //               "details": "Health & Dental Insurance",
        //               "planPrice": 509.34,
        //               "planname": "All-in Gold - Family (Ontario)",
        //               "tax": 40.75,
        //               "totalPrice": 550.0871999999999
        //         },
        //         {
        //               "details": "Executive Benefits",
        //               "planPrice": 791.67,
        //               "planname": "GroupBenefitz Exec - Executive Health - Family (Ontario >60)",
        //               "tax": 63.33,
        //               "totalPrice": 855.0036
        //         }
        //   ],
        //   "totalAmount": 1405.0908,
        //   "fileName": "enrollment_1518.pdf",
        //   "filePath": "D:/sid/gb/gb-enrollment-form/"
        // }
        //const stdout = execFileSync('python', [file, encodeURIComponent(JSON.stringify(json))]);
        var exefile;
        if (isWin)
            exefile = paths_1.SERVER_ROE_FOLDER + "/enrollment.exe";
        else
            exefile = paths_1.SERVER_ROE_FOLDER + "/enrollment";
        try {
            const stdout = execFileSync(exefile, [encodeURIComponent(JSON.stringify(json))]);
            //console.log(stdout);
            console.log(`Response: ${stdout.toString()}`);
            return true;
        }
        catch (err) {
            console.log(`Status Code: ${err.status} with ${err.message}`);
            return false;
        }
    }
    async generateHealthCards(json) {
        //health cards executable file execution with options
        var isWin = process.platform === "win32";
        console.log(`generateHealthCards isWin:${isWin}`);
        if (isWin)
            console.log(json);
        var exefile;
        if (isWin)
            exefile = paths_1.SERVER_ROE_FOLDER + "/healthcards.exe";
        else
            exefile = paths_1.SERVER_ROE_FOLDER + "/healthcards";
        try {
            const stdout = execFileSync(exefile, [encodeURIComponent(JSON.stringify(json))]);
            //console.log(stdout);
            console.log(`Response: ${stdout.toString()}`);
            return true;
        }
        catch (err) {
            console.log(`Status Code: ${err.status} with ${err.message}`);
            return false;
        }
    }
    async executeROE() {
        //test
        //record of enrollment executable file execution with options
        var isWin = process.platform === "win32";
        console.log(`isWin:${isWin}`);
        var file = "D:\\sid\\gb\\gb-enrollment-form\\ROE\\ROE\\enrollment_jstring.py";
        var json = {
            "planEnrollmentDate": "2022-12-01",
            "first_name": "Nama",
            "last_name": "sda",
            "email": "Micheljrv123123@gmail.com",
            "phone_number": "+917527527522",
            "apt": "A",
            "street_address_line1": "2 Seyton Dr",
            "street_address_line2": "",
            "city": "Nepean",
            "province": "ON",
            "country": "Canada",
            "postal_code": "K2K 3E7",
            "date_of_birth": "1956-10-01",
            "gender": "Male",
            "company_name": "Ideabytes",
            "job_title": "Employee",
            "date_of_hiring": "2022-06-09",
            "working_20hours": true,
            "hours_per_week": 40,
            "provincial_health_coverage": true,
            "having_spouse": false,
            "spouse_details": {
                "first_name": "Test",
                "last_name": "Test1",
                "date_of_birth": "2006-12-07",
                "gender": "Female",
                "is_spouse_having_healthcard": true,
                "spouse_carrier_name": "Hdfc"
            },
            "children_details": [
                {
                    "first_name": "Child1",
                    "last_name": "TestChild",
                    "gender": "Male",
                    "date_of_birth": "2022-12-01",
                    "is_child_having_healthcard": false,
                    "child_carrier_name": "HDFC",
                    "enrolledInUniversity": true,
                    "isDisabled": true,
                    "graduationDay": "2022-12-15"
                }
            ],
            "signature": "data:image/png;base64,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",
            "termsandconditions": true,
            "disclouseradvisor": true,
            "paymentMethod": "Credit Card",
            "advisorName": "David Mosley",
            "plans": [
                {
                    "details": "Opt-in",
                    "planPrice": 0,
                    "planname": "PocketPills Digital Pharmacy - Activate My Account",
                    "tax": 0,
                    "totalPrice": 0
                },
                {
                    "details": "Executive Benefits",
                    "planPrice": 791.67,
                    "planname": "GroupBenefitz Exec - Executive Health - Family (Ontario >60)",
                    "tax": 63.33,
                    "totalPrice": 855.0036
                },
                {
                    "details": "Health & Dental Insurance",
                    "planPrice": 509.34,
                    "planname": "All-in Gold - Family (Ontario)",
                    "tax": 40.75,
                    "totalPrice": 550.0871999999999
                },
                {
                    "details": "Executive Benefits",
                    "planPrice": 791.67,
                    "planname": "GroupBenefitz Exec - Executive Health - Family (Ontario >60)",
                    "tax": 63.33,
                    "totalPrice": 855.0036
                }
            ],
            "totalAmount": 1405.0908,
            "fileName": "enrollment_1518.pdf",
            "filePath": "D:/sid/gb/gb-enrollment-form/"
        };
        //const stdout = execFileSync('python', [file, encodeURIComponent(JSON.stringify(json))]);
        var exefile = "D:\\sid\\gb\\gb-enrollment-form\\ROE\\ROE\\dist\\enrollment_jstring.exe";
        try {
            const stdout = execFileSync(exefile, [encodeURIComponent(JSON.stringify(json))]);
            console.log(stdout);
            console.log(stdout.toString());
        }
        catch (err) {
            console.log(`Status Code: ${err.status} with ${err.message}`);
        }
    }
    async executeROEfile() {
        //record of enrollment executable file execution with options
        var isWin = process.platform === "win32";
        console.log(`isWin:${isWin}`);
        var file = "D:\\sid\\gb\\gb-enrollment-form\\ROE\\ROE\\enrollment_jfile.py";
        var jsonfile = "D:\\sid\\gb\\gb-enrollment-form\\ROE\\ROE\\allinputdata.json";
        //var json = {"planEnrollmentDate": "2022-12-01", "first_name": "John", "firstName": "John", "last_name": "Michel", "lastName": "Michel", "email": "Micheljrv123123@gmail.com", "phone_number": "+917527527522", "street_address_line1": "2 Seyton Dr", "street_address_line2": "", "city": "Nepean", "province": "ON", "province_id": 12, "country": "Canada", "country_id": 124, "postal_code": "K2K 3E7", "date_of_birth": "1956-10-01", "dob": "1956-10-01", "gender": "Male", "company_name": "Ideabytes", "job_title": "Employee", "date_of_hiring": "2022-06-09", "working_20hours": true, "hours_per_week": 40, "provincial_health_coverage": true, "work_visa": "", "having_spouse": true, "spouse_details": {"first_name": "Test", "last_name": "Test1", "firstName": "Test", "lastName": "Test1", "email": "", "date_of_birth": "2006-12-07", "dob": "2006-12-07", "gender": "Female", "is_spouse_having_healthcard": true, "spouse_carrier_name": "Hdfc", "cobCoverage": "SINGLE"}, "having_dependent_children": true, "no_of_children": 1, "children_details": [{"first_name": "Child1", "last_name": "TestChild", "firstName": "Child1", "lastName": "TestChild", "gender": "Male", "date_of_birth": "2022-12-01", "dob": "2022-12-01", "is_child_having_healthcard": false, "child_carrier_name": "HDFC", "enrolledInUniversity": true, "isDisabled": true, "graduationDay": "2022-12-15"}], "signature": "data:image/png;base64,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", "fusebillCustomer": true, "formId": 1, "termsandconditions": true, "disclouseradvisor": true, "state": "Ontario", "paymentMethod": "Credit Card", "advisorName": "David Mosley", "state_id": 9, "currency": "CAD", "currencySymbol": "$", "apt": "A", "fusebillCustomerAddressId": "8815399", "fusebillCustomerId": "11600711", "customerId": "1701", "billing_sameas_homeAddress": true, "billing_address": {"line1": "2 Seyton Dr", "line2": "", "city": "Nepean", "state": "ON", "state_id": 9, "country": "Canada", "country_id": 124, "postal_zip": "K2K 3E7", "apt": "A", "customer_id": 1701, "fusebill_customer_id": 11600711}, "plans": [{"enrollmentDate": "2022-12-01", "name": "PocketPills Digital Pharmacy - Activate My Account", "details": "Opt-in", "packagename": "Opt-in", "groupName": "Opt-In", "amount": 0, "planCoverage": "", "planPrice": 0, "amountUI": "$0.00", "gst": 0, "hst": 0, "pst": 0, "qst": 0, "gstCheck": false, "hstCheck": false, "pstCheck": false, "qstCheck": false, "id": 429, "fusebillPlanID": 0, "planFrequencyID": 0, "optIn": true, "planname": "PocketPills Digital Pharmacy - Activate My Account", "planLevel": 16, "packageId": 8, "options": [], "gstPrice": 0, "hstPrice": 0, "pstPrice": 0, "qstPrice": 0, "taxUI": "", "tax": 0, "totalPrice": 0, "totalUI": "$0.00", "total": 0}, {"enrollmentDate": "2022-12-01", "name": "GroupBenefitz Exec - Executive Health - Family (Ontario >60)", "details": "Executive Benefits", "packagename": "Executive Benefits", "groupName": "Executive Health", "amount": 791.67, "planCoverage": "FAMILY", "planPrice": 791.67, "amountUI": "$791.67", "gst": 0.08, "hst": 0, "pst": 0, "qst": 0, "gstCheck": true, "hstCheck": false, "pstCheck": false, "qstCheck": false, "id": 183, "fusebillPlanID": 44403, "planFrequencyID": 99214, "optIn": false, "planname": "GroupBenefitz Exec - Executive Health - Family (Ontario >60)", "planLevel": 17, "packageId": 5, "options": [], "gstPrice": 63.33, "hstPrice": 0, "pstPrice": 0, "qstPrice": 0, "taxUI": "<span>$63.33&nbsp;(GST)</span>", "tax": 63.33, "totalPrice": 855.0036, "totalUI": "$855.00", "total": 855}, {"enrollmentDate": "2022-12-01", "name": "All-in Gold - Family (Ontario)", "details": "Health & Dental Insurance", "packagename": "Health & Dental Insurance", "groupName": "All-In Gold", "amount": 509.34, "planCoverage": "FAMILY", "planPrice": 509.34, "amountUI": "$509.34", "gst": 0.08, "hst": 0, "pst": 0, "qst": 0, "gstCheck": true, "hstCheck": false, "pstCheck": false, "qstCheck": false, "id": 103, "fusebillPlanID": 43653, "planFrequencyID": 97622, "optIn": false, "planname": "All-in Gold - Family (Ontario)", "planLevel": 9, "packageId": 1, "options": [], "gstPrice": 40.75, "hstPrice": 0, "pstPrice": 0, "qstPrice": 0, "taxUI": "<span>$40.75&nbsp;(GST)</span>", "tax": 40.75, "totalPrice": 550.0871999999999, "totalUI": "$550.09", "total": 550.09}], "totalAmount": 1405.0908}
        //const stdout = execFileSync('python', [file, jsonfile]);
        var exefile = "D:\\sid\\gb\\gb-enrollment-form\\ROE\\ROE\\dist\\enrollment_jfile.exe";
        try {
            const stdout = execFileSync(exefile, [jsonfile]);
            console.log(stdout);
            console.log(stdout.toString());
        }
        catch (err) {
            console.log(`Status Code: ${err.status} with ${err.message}`);
        }
    }
};
ExecutableService = tslib_1.__decorate([
    (0, core_1.injectable)({ scope: core_1.BindingScope.TRANSIENT }),
    tslib_1.__metadata("design:paramtypes", [])
], ExecutableService);
exports.ExecutableService = ExecutableService;
//# sourceMappingURL=executable.service.js.map