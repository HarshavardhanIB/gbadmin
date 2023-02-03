import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

// const config = {
//   name: 'googleRC',
//   connector: 'rest',
//   baseURL: '',
//   crud: false
// };

const config = {
  name: 'googleRC',
  connector: 'rest',
  crud: true,
  options: {
    headers: {
      //accept: 'application/json',
      'content-type': 'application/x-www-form-urlencoded',
    },
  },
  operations: [
    {
      template: {
        method: 'POST',
        url: 'https://www.google.com/recaptcha/api/siteverify',
        // body: {
        //   secret: '{secretkey}',
        //   response: '{sitekey}',
        // },
        query: {
          secret: '{secretkey}',
          response: '{sitekey}',

        },
        // responsePath: '$.result.addressMatches[*].coordinates',
      },
      functions: {
        validate: ['secretkey', 'sitekey'],
      },
    },
  ],
  disableMigration: true,
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class GoogleRcDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'googleRC';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.googleRC', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
