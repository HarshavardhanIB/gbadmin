import { injectable, /* inject, */ BindingScope } from '@loopback/core';
import { REGEX } from '../constants';

@injectable({ scope: BindingScope.TRANSIENT })
export class RegistrationServiceService {
  constructor(/* Add @inject to inject parameters */) { }
  validateBankCode(bankCode: string): boolean { return REGEX.BANK_CODE.test(bankCode); }
  validateBranchCode(branchCode: string): boolean { return REGEX.BRANCH_CODE.test(branchCode); }
  validateAccountNo(accountNo: string): boolean { return REGEX.ACCOUNT_NO.test(accountNo); }
  validateName(name:string):boolean{ return REGEX.NAME.test(name);  }
  validateEmail(email:string):boolean{return REGEX.EMAIL.test(email)}
  
}
