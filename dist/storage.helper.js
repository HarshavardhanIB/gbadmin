"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createClientDirectory = exports.createDirectory = exports.deleteFile = exports.copyFile = exports.createFilex = exports.createFile = exports.getFile = exports.checkIfFileOrDirectoryExists = void 0;
const tslib_1 = require("tslib");
const fs = tslib_1.__importStar(require("fs"));
const util_1 = require("util");
/**
 * Check if a file exists at a given path.
 *
 * @param {string} path
 *
 * @returns {boolean}
 */
const checkIfFileOrDirectoryExists = (path) => {
    // console.log(path);
    //console.log(fs.existsSync(path))
    //let exists=fs.existsSync(path);
    //console.log("exists: "+exists);
    return fs.existsSync(path);
};
exports.checkIfFileOrDirectoryExists = checkIfFileOrDirectoryExists;
/**
 * Gets file data from a given path via a promise interface.
 *
 * @param {string} path
 * @param {string} encoding
 *
 * @returns {Promise<Buffer>}
 */
const getFile = async (path, encoding) => {
    const readFile = (0, util_1.promisify)(fs.readFile);
    return encoding ? readFile(path, { encoding: encoding }) : readFile(path, {});
};
exports.getFile = getFile;
/**
 * Writes a file at a given path via a promise interface.
 *
 * @param {string} path
 * @param {string} fileName
 * @param {string} data
 *
 * @return {Promise<void>}
 */
const createFile = async (path, fileName, data) => {
    if (!(0, exports.checkIfFileOrDirectoryExists)(path)) {
        fs.mkdirSync(path, { recursive: true });
    }
    const writeFile = (0, util_1.promisify)(fs.writeFile);
    return await writeFile(`${path}/${fileName}`, data, 'utf8');
};
exports.createFile = createFile;
/**
 * Writes a file at a given path via a promise interface.
 *
 * @param {string} path
 * @param {string} fileName
 * @param {string} data
 *
 * @return {Promise<void>}
 */
const createFilex = async (path, fileName, data) => {
    if (!(0, exports.checkIfFileOrDirectoryExists)(path)) {
        fs.mkdirSync(path, { recursive: true });
    }
    const writeFile = (0, util_1.promisify)(fs.writeFile);
    return await writeFile(`${path}/${fileName}`, data);
};
exports.createFilex = createFilex;
const copyFile = async (source, dest) => {
    try {
        fs.copyFileSync(source, dest);
        return true;
    }
    catch (err) {
        console.log(err);
        return false;
    }
};
exports.copyFile = copyFile;
/**
 * Delete file at the given path via a promise interface
 *
 * @param {string} path
 *
 * @returns {Promise<void>}
 */
const deleteFile = async (path) => {
    const unlink = (0, util_1.promisify)(fs.unlink);
    return await unlink(path);
};
exports.deleteFile = deleteFile;
/**
 * Creates a directory
 *
 * @param {string} path
 * @param {string} dirName
  *
 * @return {Promise<void>}
 */
const createDirectory = async (path, dirName) => {
    let fullPath = path + dirName;
    console.log(fullPath);
    const dirExists = (0, exports.checkIfFileOrDirectoryExists)(fullPath);
    // console.log("dirExists:"+dirExists);
    if (!dirExists) {
        try {
            //   console.log(fullPath);
            await fs.mkdirSync(fullPath, { recursive: true });
            return fullPath;
        }
        catch (error) {
            console.error(error);
            return error === null || error === void 0 ? void 0 : error.message;
        }
    }
    else {
        console.log("exists");
        return "Already exists";
    }
    // return
};
exports.createDirectory = createDirectory;
/**
* Creates a client directory for registered orgnization/client
*
* @param {string} clientName
*
* @return {Promise<void>}
*/
const createClientDirectory = async (clientName) => {
    let mainDir = "./app/clients/";
    //console.log(mainDir)
    //console.log(clientName);
    const createdDir = await (0, exports.createDirectory)(mainDir, clientName);
    return createdDir;
};
exports.createClientDirectory = createClientDirectory;
const TIMEOUT = 10000;
// export const download = async (
//   url: string,
//   dest: string
// ): Promise<string> => {
//   const uri = new URL(url)
//   if (!dest) {
//     dest = basename(uri.pathname)
//   }
//   const pkg = url.toLowerCase().startsWith('https:') ? https : http
//   return new Promise((resolve, reject) => {
//     const request = pkg.get(uri.href).on('response', (res) => {
//       if (res.statusCode === 200) {
//         const file = fs.createWriteStream(dest, {flags: 'wx'})
//         res.on('end', () => {
//           file.end()
//           // console.log(`${uri.pathname} downloaded to: ${path}`)
//           resolve()
//         })
//           .on('error', (err: any) => {
//             file.destroy()
//             fs.unlink(dest, () => reject(err))
//           }).pipe(file)
//       } else if (res.statusCode === 302 || res.statusCode === 301) {
//         // Recursively follow redirects, only a 200 will resolve.
//         //  download(res.headers.location, dest).then(() => resolve())
//       } else {
//         reject(new Error(`Download request failed, response status: ${res.statusCode} ${res.statusMessage}`))
//       }
//     })
//     request.setTimeout(TIMEOUT, function () {
//       request.abort()
//       reject(new Error(`Request timeout after ${TIMEOUT / 1000.0}s`))
//     })
//   })
// }
//# sourceMappingURL=storage.helper.js.map