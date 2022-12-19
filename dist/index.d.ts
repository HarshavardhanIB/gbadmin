import { ApplicationConfig, GroupBenfitsAdminPortalApplication } from './application';
export * from '@loopback/rest';
export * from './application';
export * from './models';
export * from './repositories';
import 'dotenv/config';
export declare function main(options?: ApplicationConfig): Promise<GroupBenfitsAdminPortalApplication>;
