import { Client } from '@loopback/testlab';
import { GroupBenfitsAdminPortalApplication } from '../..';
export declare function setupApplication(): Promise<AppWithClient>;
export interface AppWithClient {
    app: GroupBenfitsAdminPortalApplication;
    client: Client;
}
