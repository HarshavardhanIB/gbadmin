import { inject, lifeCycleObserver, LifeCycleObserver } from '@loopback/core';
import { juggler } from '@loopback/repository';
// import dotenv from 'dotenv';
// dotenv.config();
const config = {
  name: 'gbadmin',
  connector: 'mysql',
  // url: 'mysql://root:Sql@2022@localhost:3306/adminp',
  // host: 'localhost',
  // port: 3306,
  // user: 'root',
  // password: 'Sql@2022',
  // database: 'gdadmin'
  url: '',
  host: process.env.dbhost || 'localhost',
  port: process.env.dbport || 3306,
  user: process.env.dbuser || "root",
  password: process.env.dbpassword || 'Sql@2022',
  database: process.env.database || 'gbadmin',
  // 'gbadmin'
  dateStrings: ['DATE'], // added this as suggested by @bajtos
};
console.log("db config>>>", config);
console.log(process.env.dbhost);
// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class GbadminDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'gbadmin';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.gbadmin', { optional: true })
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
