import { injectable, /* inject, */ BindingScope } from '@loopback/core';
import { genSalt, hash, compare } from 'bcryptjs';
import { Broker } from '../models';
import { DataSource } from 'loopback-datasource-juggler';
import { Model } from '@loopback/repository';

@injectable({ scope: BindingScope.TRANSIENT })
export class Corporate {
  constructor(/* Add @inject to inject parameters */) { }
  async encryptPswrd(password: string) {
    let encryptedPasswrd = await hash(password, await genSalt());
    return encryptedPasswrd;
  }
  async modelPropoerties(model: any) {
    let returnPropertyName:any=[];
    const modelDefinition = (model as typeof Model & { definition: any }).definition;
    const properties = modelDefinition.properties;
    for (const propertyName in properties) {
      const property = properties[propertyName];
      // console.log(`${propertyName}: ${property.type}`);
      returnPropertyName.push(propertyName);
    }
    return returnPropertyName;
  } 
}
