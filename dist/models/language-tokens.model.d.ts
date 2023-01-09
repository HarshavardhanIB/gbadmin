import { Entity } from '@loopback/repository';
export declare class LanguageTokens extends Entity {
    category: string;
    description?: string;
    id?: number;
    itemId?: number;
    key: string;
    translationLanguageId?: number;
    value?: string;
    [prop: string]: any;
    constructor(data?: Partial<LanguageTokens>);
}
export interface LanguageTokensRelations {
}
export declare type LanguageTokensWithRelations = LanguageTokens & LanguageTokensRelations;
