export declare class ExecutableService {
    constructor();
    executeNode(): Promise<void>;
    generateROE(json: any): Promise<boolean>;
    generateHealthCards(json: any): Promise<boolean>;
    executeROE(): Promise<void>;
    executeROEfile(): Promise<void>;
}
