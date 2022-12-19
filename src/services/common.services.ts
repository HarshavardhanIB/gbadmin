import { genSalt, hash, compare } from 'bcryptjs';
import * as crypto from 'crypto'
export async function randomString(length: number, chars: string) {
  var result = '';
  for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
  return result;
}
export async function generateRandomPassword() {
  const PASSWORD_LENGTH = 8;
  return await randomString(PASSWORD_LENGTH, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
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
