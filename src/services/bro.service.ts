import {injectable, /* inject, */ BindingScope, Provider} from '@loopback/core';

/*
 * Fix the service type. Possible options can be:
 * - import {Bro} from 'your-module';
 * - export type Bro = string;
 * - export interface Bro {}
 */
export type Bro = unknown;

@injectable({scope: BindingScope.TRANSIENT})
export class BroProvider implements Provider<Bro> {
  constructor(/* Add @inject to inject parameters */) {}

  value() {
    // Add your implementation here
    throw new Error('To be implemented');
  }
}
