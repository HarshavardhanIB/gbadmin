import { injectable, /* inject, */ BindingScope } from '@loopback/core';
import { genSalt, hash, compare } from 'bcryptjs';
@injectable({ scope: BindingScope.TRANSIENT })
export class Corporate {
  constructor(/* Add @inject to inject parameters */) { }
  async encryptPswrd(password: string) {
    let encryptedPasswrd = await hash(password, await genSalt());
    return encryptedPasswrd;
  }
  /*
   * Add service methods here
   */
}
