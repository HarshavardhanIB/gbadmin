import { CustomerRelatives, Customer } from '../models';
import { CustomerRelativesRepository } from '../repositories';
export declare class CustomerRelativesCustomerController {
    customerRelativesRepository: CustomerRelativesRepository;
    constructor(customerRelativesRepository: CustomerRelativesRepository);
    getCustomer(id: typeof CustomerRelatives.prototype.id): Promise<Customer>;
}
