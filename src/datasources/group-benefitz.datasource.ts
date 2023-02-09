import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'groupBenefitz',
  connector: 'mysql',
  url: process.env.DB_URL || '',
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || '3306',
  user: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || 'Sql@2022',
  database: process.env.DB_NAME || 'group_benefitz',
  //dateStrings: ['DATE'], // added this as suggested by @bajtos
  dateStrings: true,
  disableMigration: true,
};
console.log(config)

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class GroupBenefitzDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'groupBenefitz';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.groupBenefitz', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
