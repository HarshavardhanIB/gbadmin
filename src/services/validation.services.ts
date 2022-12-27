import validator from 'validator';
import * as constants from './constants';
export async function emailvalidation(email: string) {
    let emailIdcheckStatus = validator.isEmail(email);
    return emailIdcheckStatus;
}
export async function AlphaNumberorNot(userName: string) {
    let userNameValidation = validator.isAlphanumeric(userName);
    return userNameValidation;
}
export async function isAlphaorNot(name: string) {
    let validate = validator.isAlpha(name);
    return validate;
}
export async function lengthVerification(data: string, min: number, max: number) {
    if (data.length <= min || data.length >= max) {
        return false;
    }
}

