export declare class HttpService {
    constructor();
    fetchXml(url: string, dir: any): Promise<boolean>;
    fetchMultipartFormdata(url: string, path: any): Promise<boolean>;
}
