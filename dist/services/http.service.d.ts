export declare class HttpService {
    constructor();
    get(url: string, headers: any, staticService: boolean): Promise<any>;
    post(url: string, data: any, headers: any): Promise<any>;
    fetchXml(url: string, dir: any): Promise<boolean>;
    fetchMultipartFormdata(url: string, path: any): Promise<boolean>;
}
