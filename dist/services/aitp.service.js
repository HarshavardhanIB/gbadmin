"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AitpService = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const constants_1 = require("../constants");
const repositories_1 = require("../repositories");
const http_service_1 = require("./http.service");
const server = constants_1.aitp.server;
let AitpService = class AitpService {
    constructor(/* Add @inject to inject parameters */ http, customerRepo) {
        this.http = http;
        this.customerRepo = customerRepo;
    }
    /*
     * Add service methods here
     */
    async signin() {
        const service = server + constants_1.serviceEndpoints.login; // '/api/auth/signin'
        const data = {
            username: constants_1.userCreds.username,
            password: constants_1.userCreds.password //'Ideabytes@123'
        };
        const user = await this.http.post(service, data, null);
        return user;
    }
    async execute() {
    }
    async getExecutionId(token) {
        const service = server + constants_1.serviceEndpoints.executionId; // '/api/user/get_execution_id'
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        };
        const executionIdResponse = await this.http.get(service, headers, false);
        return executionIdResponse.execution_id;
    }
    async executeWithExternalData(data, token) {
        const service = server + constants_1.serviceEndpoints.externalData; // '/api/user/execute_script_external_source_multiple'
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        };
        console.log(data);
        const result = await this.http.post(service, data, headers);
        return result;
    }
    async mainExecution(data) {
        let singleExecResult;
        let coupleExecResult;
        let familyExecResult;
        //signing
        const user = await this.signin();
        //single
        if (data.executeSingle) {
            const single_executionid = await this.getExecutionId(user.accessToken);
            data.single.execution_id = single_executionid;
            const single_execution_result = await this.executeWithExternalData(data.single, user.accessToken);
            singleExecResult = single_execution_result;
        }
        //get errors in with datasetnumber---and customer_email
        //couple
        if (data.executeCouple) {
            const couple_executionid = await this.getExecutionId(user.accessToken);
            data.couple.execution_id = couple_executionid;
            const couple_execution_result = await this.executeWithExternalData(data.couple, user.accessToken);
            coupleExecResult = couple_execution_result;
        }
        //family
        if (data.executeFamily) {
            const family_executionid = await this.getExecutionId(user.accessToken);
            data.family.execution_id = family_executionid;
            const family_execution_result = await this.executeWithExternalData(data.family, user.accessToken);
            familyExecResult = family_execution_result;
        }
        const results = {
            single: singleExecResult || `No single customers`,
            couple: coupleExecResult || `No couple customers`,
            family: familyExecResult || `No family customers`
        };
        return results;
    }
    async soleExecution(data, registartion, service) {
        //signing
        const user = await this.signin();
        const executionid = await this.getExecutionId(user.accessToken);
        data.execution_id = executionid;
        const execution_result = await this.executeWithExternalData(data, user.accessToken);
        let coverage;
        if (data.source.link.includes("_S.json")) {
            coverage = "Single";
        }
        else if (data.source.link.includes("_C.json")) {
            coverage = "Couple";
        }
        else if (data.source.link.includes("_F.json")) {
            coverage = "Family";
        }
        else {
            coverage = '';
        }
        let gsp_mem_id;
        let eqp_cert_id;
        if (execution_result.logdata) {
            if (service == 'greenshield') {
                if (registartion) {
                    //add_plan_member
                    //execution_result.logfile=''
                    //execution_result.logdata=[]
                    gsp_mem_id = await this.checkLogDataGS(execution_result.logdata, data.customerId, true, coverage);
                }
                else {
                    //termination : terminate_plan_member
                    gsp_mem_id = await this.checkLogDataGS(execution_result.logdata, data.customerId, false, coverage);
                }
                execution_result.greenshield_member_id = gsp_mem_id;
            }
            if (service == 'equitable') {
                if (registartion) {
                    eqp_cert_id = await this.checkLogDataEQ(execution_result.logdata, data.customerId, true, coverage);
                }
                else {
                    eqp_cert_id = await this.checkLogDataEQ(execution_result.logdata, data.customerId, false, coverage);
                }
                execution_result.equitable_certificate_id = eqp_cert_id;
                execution_result.equitableMemberId = data.equitableMemberId;
                execution_result.customerId = data.customerId;
                execution_result.equitableDivision = data.equitableDivision;
                execution_result.equitableClass = data.equitableClass;
                execution_result.customerFN = data.customerFN;
                execution_result.customerLN = data.customerLN;
                execution_result.customerDob = data.customerDob;
            }
            if (service == 'executive') {
                let execResult;
                if (registartion) {
                    execResult = await this.checkLogDataEXEC(execution_result.logdata, data.datasets, true, coverage);
                    if (execResult) {
                        execution_result.executiveRegistration = execResult.executiveRegistration;
                        execution_result.executiveRegistrationDatasets = execResult.executiveRegistrationDatasets;
                    }
                    else {
                        execution_result.executiveRegistration = false;
                        execution_result.executiveRegistrationDatasets = {};
                    }
                }
                else {
                    execResult = await this.checkLogDataEXEC(execution_result.logdata, data.datasets, false, coverage);
                    if (execResult) {
                        execution_result.executiveTermination = execResult.executiveTermination;
                        execution_result.executiveTerminationDatasets = execResult.executiveTerminationDatasets;
                    }
                    else {
                        execution_result.executiveTermination = false;
                        execution_result.executiveTerminationDatasets = {};
                    }
                }
            }
        }
        else {
            console.log('aipt execution error');
        }
        return execution_result;
    }
    //   async downloadFile(url:string,filename:string){
    //     const headers = {
    //       // 'Content-Type': 'application/json',
    //       // 'Authorization': 'Bearer ' + token
    //     }
    //     const data=await this.http.get(url,headers,true)
    //     await createFile("./support/extdata", "temp_" + filename, data)
    // return
    //   }
    async checkLogDataGS(data, customerId, registration, coverage) {
        //[]
        /*[
          {
            logType: 'INFO ',
            result: 'Passed',
            duration: '23994 (ms)',
            item: 'Request_Item_1',
            ainfo2: '...',
            classLine: 'IBSeleniumScripter:2843',
            sinfo: 'Enter url details',
            ainfo: 'https://onlineservices.greenshield.ca/OnlineServices/AccessMgmt/Public/SignOn.aspx >> Status: 200',
            step: 'Step_1',
            dataset: 'Dataset_1',
            testcase: 'OpenUrl',
            timestamp: '2022-08-03 20:07:52.804'
          },
          {
            logType: 'INFO ',
            result: 'Passed',
            duration: '27960 (ms)',
            item: 'Request_Item_1',
            ainfo2: '...',
            classLine: 'IBSeleniumScripter:2843',
            sinfo: 'Enter url details -active',
            ainfo: 'https://onlineservices.greenshield.ca/OnlineServices/AccessMgmt/Public/SignOn.aspx',
            step: 'Step_1',
            dataset: 'Dataset_1',
            testcase: 'login',
            timestamp: '2022-08-03 20:07:56.769'
          }]*/
        // step: 'Step_5',
        // dataset: 'Dataset_2',
        // testcase: 'Personal_Info',
        //0 -->  'Get text `13111702` details | Compare: #13113759# && #13111702# by xpath:/html/body[1]/form[1]/table[2]/tbody/tr/td[2]/table[1]/tbody/tr[1]/td[2]/span >> Issue with spelling or spaces(tabs, newlines) or unicode/special characters'
        let greenshieldMemberId;
        let step;
        let testcase;
        if (coverage == "Single") {
            step = 'Step_5';
            testcase = 'Personal_Info';
        }
        else if (coverage == "Couple") {
            step = 'Step_4';
            testcase = 'Dependents';
        }
        else if (coverage == "Family") {
            step = 'Step_7';
            testcase = 'Dependents';
        }
        else {
        }
        if (registration) {
            const results = data.filter((obj) => {
                return obj.testcase == testcase && obj.dataset == 'Dataset_2' && obj.step == step && obj.item == 'Response_Item_1';
            });
            console.log(results);
            if (!results || results.length == 0) {
                return null;
            }
            greenshieldMemberId = await this.getMemebershipId(results[0]); //? id..
            //  const greenshieldMemberId= this.getMemebershipId(results[1]); //customer name // fullname
            //  const greenshieldMemberId= this.getMemebershipId(results[2]); //BENEFLEX
            //  const greenshieldMemberId= this.getMemebershipId(results[3]); //41000
            //  const greenshieldMemberId= this.getMemebershipId(results[4]); //enrollment/coverage startdate
            if (greenshieldMemberId) {
                await this.customerRepo.updateById(customerId, {
                    greenshieldMemberId: greenshieldMemberId,
                    greenshieldRegistrationStatus: constants_1.GREENSHEILD_REGISTRATION_STATUS.DONE
                });
            }
        }
        else {
            const results = data.filter((obj) => {
                return obj.testcase == 'Terminate_Member' && obj.dataset == 'Dataset_2' && obj.step == 'Step_6' && obj.item == 'Response_Item_1';
            });
            if (!results || results.length == 0) {
                return null;
            }
            greenshieldMemberId = await this.getMemebershipId(results[0]);
        }
        return greenshieldMemberId;
        /***
         *
         * 2022-08-05 15:31:47.068 | ERROR | IBSeleniumScripter:3265 | Personal_Info | Dataset_2 | Step_5 | Response_Item_1 | Get text `13111702` details | Compare: #13113759# && #13111702# by xpath:/html/body[1]/form[1]/table[2]/tbody/tr/td[2]/table[1]/tbody/tr[1]/td[2]/span >> Issue with spelling or spaces(tabs, newlines) or unicode/special characters | Failed | 2479 (ms)
    2022-08-05 15:31:50.040 | ERROR | IBSeleniumScripter:3265 | Personal_Info | Dataset_2 | Step_5 | Response_Item_2 | Get text `RAKESH MARKA` details | Compare: #BHAVANADASARI# && #RAKESH MARKA# by xpath:/html/body[1]/form[1]/table[2]/tbody/tr/td[2]/table[1]/tbody/tr[3]/td[2]/span >> Issue with spelling or spaces(tabs, newlines) or unicode/special characters | Failed | 2972 (ms)
    2022-08-05 15:31:52.718 | INFO  | IBSeleniumScripter:3315 | Personal_Info | Dataset_2 | Step_5 | Response_Item_3 | Get text `BENEFLEX` details | Compare: #BENEFLEX# && #BENEFLEX# by xpath:/html/body[1]/form[1]/table[2]/tbody/tr/td[2]/table[3]/tbody/tr[1]/td[2]/span | Passed | 2677 (ms)
    2022-08-05 15:31:52.831 | INFO  | IBSeleniumScripter:3315 | Personal_Info | Dataset_2 | Step_5 | Response_Item_4 | Get text `41000` details | Compare: #41000# && #41000# by xpath:/html/body[1]/form[1]/table[2]/tbody/tr/td[2]/table[3]/tbody/tr[2]/td[2]/span | Passed | 113 (ms)
    2022-08-05 15:31:53.474 | ERROR | IBSeleniumScripter:3265 | Personal_Info | Dataset_2 | Step_5 | Response_Item_5 | Get text `Aug 4, 2022` details | Compare: #Aug5,2022# && #Aug 4, 2022# by xpath:/html/body[1]/form[1]/table[2]/tbody/tr/td[2]/table[3]/tbody/tr[3]/td[2]/span >> Issue with spelling or spaces(tabs, newlines) or unico
         *
         */
    }
    async getMemebershipId(response) {
        //Get text `13111702` details | Compare: #13113759# && #13111702# by xpath:/html/body[1]/form[1]/table[2]/tbody/tr/td[2]/table[1]/tbody/tr[1]/td[2]/span >> Issue with spelling or spaces(tabs, newlines) or unicode/special characters'
        //Compare: #13114319# && #13111702# by xpath:/html/body[1]/form[1]/table[2]/tbody/tr/td[2]/table[2]/tbody/tr[1]/td[2]/span >> Issue with spelling or spaces(tabs, newlines) or unicode/special characters
        try {
            console.log(response);
            if (response) {
                // console.log(response.ainfo)
                // console.log(response.ainfo.trim().split('Compare: #'))
                //console.log(response.ainfo.trim().split('Compare: #')[0])
                // console.log(response.ainfo.trim().split('Compare: #')[1])
                const id = response.ainfo.trim().split('Compare: #')[1].split('# && #')[0];
                if (id != "BENEFLEX")
                    return id;
                else
                    return null;
            }
            else {
                return null;
            }
        }
        catch (error) {
            console.log(error);
            return null;
        }
    }
    /***EQ */
    async checkLogDataEQ(data, customerId, registration, coverage) {
        //[]
        /*[
          {
            logType: 'INFO ',
            result: 'Passed',
            duration: '23994 (ms)',
            item: 'Request_Item_1',
            ainfo2: '...',
            classLine: 'IBSeleniumScripter:2843',
            sinfo: 'Enter url details',
            ainfo: 'https://onlineservices.greenshield.ca/OnlineServices/AccessMgmt/Public/SignOn.aspx >> Status: 200',
            step: 'Step_1',
            dataset: 'Dataset_1',
            testcase: 'OpenUrl',
            timestamp: '2022-08-03 20:07:52.804'
          },
          {
            logType: 'INFO ',
            result: 'Passed',
            duration: '27960 (ms)',
            item: 'Request_Item_1',
            ainfo2: '...',
            classLine: 'IBSeleniumScripter:2843',
            sinfo: 'Enter url details -active',
            ainfo: 'https://onlineservices.greenshield.ca/OnlineServices/AccessMgmt/Public/SignOn.aspx',
            step: 'Step_1',
            dataset: 'Dataset_1',
            testcase: 'login',
            timestamp: '2022-08-03 20:07:56.769'
          }]*/
        // step: 'Step_5',
        // dataset: 'Dataset_2',
        // testcase: 'Personal_Info',
        //0 -->  'Get text `13111702` details | Compare: #13113759# && #13111702# by xpath:/html/body[1]/form[1]/table[2]/tbody/tr/td[2]/table[1]/tbody/tr[1]/td[2]/span >> Issue with spelling or spaces(tabs, newlines) or unicode/special characters'
        let equitableCertId;
        let step;
        let testcase;
        if (coverage == "Single") {
            step = 'Step_2';
            testcase = 'PersonalInfo';
        }
        else if (coverage == "Couple") {
            step = 'Step_2';
            testcase = 'PersonalInfo';
        }
        else if (coverage == "Family") {
            step = 'Step_2';
            testcase = 'PersonalInfo';
        }
        else {
        }
        if (registration) {
            const results = data.filter((obj) => {
                return obj.testcase == testcase && obj.dataset == 'Dataset_2' && obj.step == step && obj.item == 'Response_Item_1';
            });
            console.log(results);
            if (!results || results.length == 0) {
                return null;
            }
            equitableCertId = await this.getCertId(results[0]);
            if (equitableCertId) {
                await this.customerRepo.updateById(customerId, {
                    equitableCertificateId: equitableCertId,
                    equitableRegistrationStatus: constants_1.EQUITABLE_REGISTRATION_STATUS.DONE
                });
            }
        }
        else {
            //equitable termination
            //step2 - resp2
            //step4 - resp2
            const results = data.filter((obj) => {
                return obj.testcase == 'Termination' && obj.dataset == 'Dataset_2' && (obj.step == 'Step_2' || obj.step == 'Step_4') && obj.item == 'Response_Item_2';
            });
            if (!results || results.length == 0) {
                return null;
            }
            equitableCertId = await this.checkEQterm(results);
        }
        console.log(`EQ-term validation: ${equitableCertId}`);
        if (equitableCertId) {
            return equitableCertId;
        }
        else {
            return null;
        }
        /***
         *
         * 2022-08-05 15:31:47.068 | ERROR | IBSeleniumScripter:3265 | Personal_Info | Dataset_2 | Step_5 | Response_Item_1 | Get text `13111702` details | Compare: #13113759# && #13111702# by xpath:/html/body[1]/form[1]/table[2]/tbody/tr/td[2]/table[1]/tbody/tr[1]/td[2]/span >> Issue with spelling or spaces(tabs, newlines) or unicode/special characters | Failed | 2479 (ms)
    2022-08-05 15:31:50.040 | ERROR | IBSeleniumScripter:3265 | Personal_Info | Dataset_2 | Step_5 | Response_Item_2 | Get text `RAKESH MARKA` details | Compare: #BHAVANADASARI# && #RAKESH MARKA# by xpath:/html/body[1]/form[1]/table[2]/tbody/tr/td[2]/table[1]/tbody/tr[3]/td[2]/span >> Issue with spelling or spaces(tabs, newlines) or unicode/special characters | Failed | 2972 (ms)
    2022-08-05 15:31:52.718 | INFO  | IBSeleniumScripter:3315 | Personal_Info | Dataset_2 | Step_5 | Response_Item_3 | Get text `BENEFLEX` details | Compare: #BENEFLEX# && #BENEFLEX# by xpath:/html/body[1]/form[1]/table[2]/tbody/tr/td[2]/table[3]/tbody/tr[1]/td[2]/span | Passed | 2677 (ms)
    2022-08-05 15:31:52.831 | INFO  | IBSeleniumScripter:3315 | Personal_Info | Dataset_2 | Step_5 | Response_Item_4 | Get text `41000` details | Compare: #41000# && #41000# by xpath:/html/body[1]/form[1]/table[2]/tbody/tr/td[2]/table[3]/tbody/tr[2]/td[2]/span | Passed | 113 (ms)
    2022-08-05 15:31:53.474 | ERROR | IBSeleniumScripter:3265 | Personal_Info | Dataset_2 | Step_5 | Response_Item_5 | Get text `Aug 4, 2022` details | Compare: #Aug5,2022# && #Aug 4, 2022# by xpath:/html/body[1]/form[1]/table[2]/tbody/tr/td[2]/table[3]/tbody/tr[3]/td[2]/span >> Issue with spelling or spaces(tabs, newlines) or unico
         *
         */
    }
    async getCertId(response) {
        //Compare: #Cert.:0000000166-SinglehSingleh# && #Cert.: 0000000153 - Singleh Singleh# by xpath:/html/body[1]/form/div[3]/table[1]/tbody/tr[1]/td/div/h2[1]/span >> Issue with spelling or spaces(tabs, newlines) or unicode/special characters
        //Get action/tag getText value/text `Cert.: 0000000153 - CoupleTestt CoupleTestt` details
        try {
            //console.log(response)
            if (response) {
                // console.log(response.ainfo)
                // console.log(response.ainfo.trim().split('Compare: #'))
                //console.log(response.ainfo.trim().split('Compare: #')[0])
                // console.log(response.ainfo.trim().split('Compare: #')[1])
                try {
                    const id = response.ainfo.trim().split('Compare: #Cert.:')[1].split('# && #')[0].split("-")[0];
                    return id;
                }
                catch (err) {
                    console.log("eq cert id error:");
                    return null;
                }
            }
            else {
                return null;
            }
        }
        catch (error) {
            console.log(error);
            return null;
        }
    }
    async checkEQterm(responses) {
        let eqTermValidated = true;
        console.log(`EQ-term Validations: ${responses.length}`);
        for (const response of responses) {
            eqTermValidated = (response.result == "Passed" ? true : false) && eqTermValidated;
        }
        return eqTermValidated;
    }
    /***CandooHealth - Executive */
    async checkLogDataEXEC(data, datasets, registration, coverage) {
        // step: 'Step_4',
        // dataset: 'Dataset_2',
        // testcase: 'Add_Employee',
        //0 -->  'Get text `13111702` details | Compare: #13113759# && #13111702# by xpath:/html/body[1]/form[1]/table[2]/tbody/tr/td[2]/table[1]/tbody/tr[1]/td[2]/span >> Issue with spelling or spaces(tabs, newlines) or unicode/special characters'
        let executiveRegistration = true;
        let executiveRegistrationDatasets = {};
        let executiveTermination = true;
        let executiveTerminationDatasets = {};
        let step;
        let testcase;
        let dataset;
        if (registration) {
            testcase = "Add_Employee";
            step = "Step_4";
            for (let ds = 2; ds <= (datasets + 1); ds++) {
                console.log(`dataset:${ds}`);
                dataset = ds;
                const results = data.filter((obj) => {
                    return obj.testcase == testcase && obj.dataset == ('Dataset_' + ds) && obj.step == step && obj.item == 'Response_Item_1';
                });
                console.log(results);
                if (!results || results.length == 0) {
                    continue;
                }
                console.log(results[0]);
                console.log(`Reg DS:${ds} -- ${results[0].result}`);
                console.log(data[ds - 2]["Add_Employee-s4-resp1"]);
                if (results[0].result == "Passed") {
                    executiveRegistration = executiveRegistration || true;
                    executiveRegistrationDatasets[ds] = "Passed";
                }
                else {
                    executiveRegistration = executiveRegistration || false;
                    executiveRegistrationDatasets[ds] = "Failed";
                }
                // if (results[0] == data[ds - 2]["Add_Employee-s4-resp1"]) {
                //   executiveRegistration = executiveRegistration || true
                //   executiveRegistrationDatasets[ds] = "Passed";
                // } else {
                //   executiveRegistration = executiveRegistration || false
                //   executiveRegistrationDatasets[ds] = "Failed";
                // }
            }
            return { executiveRegistration, executiveRegistrationDatasets };
        }
        else {
            testcase = "Termination";
            step = "Step_2";
            for (let ds = 2; ds <= (datasets + 1); ds++) {
                dataset = ds;
                const resultsT = data.filter((obj) => {
                    return obj.testcase == testcase && obj.dataset == ('Dataset_' + ds) && obj.step == step && obj.item == 'Response_Item_1';
                });
                if (!resultsT || resultsT.length == 0) {
                    continue;
                }
                console.log(resultsT[0]);
                console.log(`Term DS:${ds} -- ${resultsT[0].result}`);
                console.log(data[ds - 2]["Termination-s2-resp1"]);
                // if (results[0] == data[ds - 2]["Termination-s2-resp1"]) {
                //   executiveTermination = executiveTermination || true
                //   executiveTerminationDatasets[ds] = "Passed";
                // } else {
                //   executiveTermination = executiveTermination || false
                //   executiveTerminationDatasets[ds] = "Failed";
                // }
                if (resultsT[0].result == "Passed") {
                    executiveTermination = executiveTermination || true;
                    executiveTerminationDatasets[ds] = "Passed";
                }
                else {
                    executiveRegistration = executiveRegistration || false;
                    executiveTerminationDatasets[ds] = "Failed";
                }
            }
            return { executiveTermination, executiveTerminationDatasets };
        }
        /***
         *
         * 2022-08-05 15:31:47.068 | ERROR | IBSeleniumScripter:3265 | Personal_Info | Dataset_2 | Step_5 | Response_Item_1 | Get text `13111702` details | Compare: #13113759# && #13111702# by xpath:/html/body[1]/form[1]/table[2]/tbody/tr/td[2]/table[1]/tbody/tr[1]/td[2]/span >> Issue with spelling or spaces(tabs, newlines) or unicode/special characters | Failed | 2479 (ms)
    2022-08-05 15:31:50.040 | ERROR | IBSeleniumScripter:3265 | Personal_Info | Dataset_2 | Step_5 | Response_Item_2 | Get text `RAKESH MARKA` details | Compare: #BHAVANADASARI# && #RAKESH MARKA# by xpath:/html/body[1]/form[1]/table[2]/tbody/tr/td[2]/table[1]/tbody/tr[3]/td[2]/span >> Issue with spelling or spaces(tabs, newlines) or unicode/special characters | Failed | 2972 (ms)
    2022-08-05 15:31:52.718 | INFO  | IBSeleniumScripter:3315 | Personal_Info | Dataset_2 | Step_5 | Response_Item_3 | Get text `BENEFLEX` details | Compare: #BENEFLEX# && #BENEFLEX# by xpath:/html/body[1]/form[1]/table[2]/tbody/tr/td[2]/table[3]/tbody/tr[1]/td[2]/span | Passed | 2677 (ms)
    2022-08-05 15:31:52.831 | INFO  | IBSeleniumScripter:3315 | Personal_Info | Dataset_2 | Step_5 | Response_Item_4 | Get text `41000` details | Compare: #41000# && #41000# by xpath:/html/body[1]/form[1]/table[2]/tbody/tr/td[2]/table[3]/tbody/tr[2]/td[2]/span | Passed | 113 (ms)
    2022-08-05 15:31:53.474 | ERROR | IBSeleniumScripter:3265 | Personal_Info | Dataset_2 | Step_5 | Response_Item_5 | Get text `Aug 4, 2022` details | Compare: #Aug5,2022# && #Aug 4, 2022# by xpath:/html/body[1]/form[1]/table[2]/tbody/tr/td[2]/table[3]/tbody/tr[3]/td[2]/span >> Issue with spelling or spaces(tabs, newlines) or unico
         *
         */
    }
};
AitpService = tslib_1.__decorate([
    (0, core_1.injectable)({ scope: core_1.BindingScope.TRANSIENT }),
    tslib_1.__param(0, (0, core_1.service)(http_service_1.HttpService)),
    tslib_1.__param(1, (0, repository_1.repository)(repositories_1.CustomerRepository)),
    tslib_1.__metadata("design:paramtypes", [http_service_1.HttpService,
        repositories_1.CustomerRepository])
], AitpService);
exports.AitpService = AitpService;
//# sourceMappingURL=aitp.service.js.map