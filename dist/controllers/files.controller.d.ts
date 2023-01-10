/// <reference types="express" />
import { Request, Response } from '@loopback/rest';
import { BrokerRepository } from '../repositories';
import { FileUploadHandler } from '../types';
export declare class FilesController {
    brokerRepo: BrokerRepository;
    private handler;
    private storageDirectory;
    constructor(brokerRepo: BrokerRepository, handler: FileUploadHandler, storageDirectory: string);
    fileUpload(request: Request, response: Response): Promise<object>;
    listFiles(): Promise<string[]>;
    downloadFile(fileName: string, response: Response): Response<any, Record<string, any>>;
    /**
    * Get files and fields for the request
    * @param request - Http request
    */
    static getFilesAndFields(request: Request, method: string, others: any): Promise<{
        files: null;
        fields: {
            error: string;
        };
    } | {
        files: any[];
        fields: any;
    } | undefined>;
    /**
  * Validate file names to prevent them goes beyond the designated directory
  * @param fileName - File name
  */
    private validateFileName;
}
