import { Entity } from '@loopback/repository';
export declare class TranslationLanguages extends Entity {
    description?: string;
    id?: number;
    isDefault?: boolean;
    name?: string;
    slug?: string;
    [prop: string]: any;
    constructor(data?: Partial<TranslationLanguages>);
}
export interface TranslationLanguagesRelations {
}
export declare type TranslationLanguagesWithRelations = TranslationLanguages & TranslationLanguagesRelations;
