/// <reference types="node" />
import path from 'path';
export declare function getActivationCode(): Promise<string>;
export declare function countDuplicate(array: string[], element: any): number;
export declare function objectLength(obj: any): number;
export declare function onlyUnique(value: any, index: number, self: any): boolean;
export declare function intersection(a: any, b: any): Promise<any>;
export declare function randomString(length: number, chars: string): Promise<string>;
export declare function generateFormLink(userid: number): Promise<string>;
export declare function generateRandomPassword(): Promise<string>;
export declare function encryptPassword(password: string): Promise<string>;
export declare function genCrypt(): string;
export declare function getRandomIdBetween(min: number, max: number): number;
export declare function validateSignatures(computedSignature: string, retrievedSignature: string): boolean;
export declare function createSignature(query: string): string;
export declare function getFileAttributes(file: string): path.ParsedPath;
