import { genSalt, hash } from 'bcryptjs';
import crypto from 'crypto';

const sharedSecret = "ibAitp";
export async function getActivationCode() {

  return genCrypt();

}

export function countDuplicate(array: string[], element: any) {

  let i = 0;
  let count = 0;

  while (i < array.length) {

    if (array[i] == element)
      count++;

    i++;
  }

  return count;
}

export function objectLength(obj: any) {
  var size = 0,
    key;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) size++;
  }
  return size;
};

export function onlyUnique(value: any, index: number, self: any) {
  return self.indexOf(value) === index;
}

export async function randomString(length: number, chars: string) {
  var result = '';
  for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
  return result;
}

export async function generateFormLink(userid: number) {
  const randomStr = await randomString(8, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
  return "/" + randomStr + userid.toString().padStart(4, '0')
}

export async function generateRandomPassword() {
  return await randomString(8, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
}

export async function encryptPassword(password: string) {
  const salt = await genSalt();
  return await hash(password, salt);

}

export function genCrypt() {

  var shasum = crypto.createHash("sha1");
  var rand = crypto.randomBytes(127);

  shasum.update(rand);
  //console.log(shasum.digest("hex"));
  return shasum.digest("hex");

}

export function getRandomIdBetween(min: number, max: number) {
  return parseInt((Math.random() * (max - min) + min).toString());
}

export function validateSignatures(computedSignature: string, retrievedSignature: string) {
  const computedSignatureBuffer = Buffer.from(computedSignature, 'hex');
  const retrievedSignatureBuffer = Buffer.from(retrievedSignature, 'hex');
  const valid = crypto.timingSafeEqual(computedSignatureBuffer, retrievedSignatureBuffer);
  return valid;
}

export function createSignature(query: string) {

  const computedSignature = crypto.createHmac("sha256", sharedSecret).update(query).digest("hex");
  return computedSignature;
}
