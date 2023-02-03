export declare class CommonProvisioningService {
    getPackageValueExecutive(equitablePackages: any, stateId: any): void;
    getDependantsInfoExecutive(customerRelatives: any): any;
    getDependantInfoExecutive(customerRelatives: any): any;
    constructor();
    getPackageValue(greenshieldPackages: any[], stateId: any): string;
    getPackageValueGreenshield(greenshieldPackages: any[], stateId: any): string;
    getPackageValueEquitable(equitablePackages: any[], stateId: any): {
        division: string;
        class: string;
        divisionName: string;
        className: string;
    };
    getCountryValue(country: any): void;
    getGenderGreenshield(gender: string): string;
    getCoverageValue(greenshieldPlan: any): string;
    getCoverageValueGreenshield(greenshieldPlan: any): string;
    getGenderEquitable(gender: string): string;
    getCoverageValueEquitable(equitablePlan: any): string;
    getYearMonthDateSplit(date: string): any;
    getDependantInfo(customerRelatives: any): Promise<any>;
    getDependantsInfo(customerRelatives: any): Promise<any>;
    getDependantInfoGreenshield(customerRelatives: any): Promise<any>;
    getDependantsInfoGreenshield(customerRelatives: any): Promise<any>;
    getDependantInfoEquitable(customerRelatives: any): Promise<any>;
    getDependantsInfoEquitable(customerRelatives: any): Promise<any>;
    getCoverageValueExecutive(executivePlan: any): string;
}
