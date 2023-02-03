// Copyright IBM Corp. and LoopBack contributors 2018,2020. All Rights Reserved.
// Node module: @loopback/example-todo
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import { ApplicationConfig, GroupBenfitsAdminPortalApplication } from './application';

// re-exports for our benchmark, not needed for the tutorial itself
export * from '@loopback/rest';
export * from './application';
export * from './models';
export * from './repositories';
// import dotenv from "dotenv";
import 'dotenv/config';

// let config: any = dotenv.config();
// console.log(config);
export async function main(options: ApplicationConfig = {})
{
  let config: any = require('dotenv').config();
  const app = new GroupBenfitsAdminPortalApplication(options);
  await app.boot();
  await app.start();
  // console.log(">>>>", process.env.PORT);
  // console.log(">>>>", process.env.dburl);
  const url = app.restServer.url;
  console.log(`Server is running at ${url}`);
  // config = dotenv.config();
  // console.log(config);
  return app;
}

if (require.main === module) {
  // Run the application
  const config = {
    rest: {
      port: +(process.env.PORT ?? 3002),
      host: process.env.HOST,
      basePath: '/api/ap',

      gracePeriodForClose: 5000, // 5 seconds
      openApiSpec: {
        // useful when used with OpenAPI-to-GraphQL to locate your application
        setServersFromRequest: true,
      },
    },
  };
  main(config).catch(err => {
    console.error('Cannot start the application.', err);
    process.exit(1);
  });
}
