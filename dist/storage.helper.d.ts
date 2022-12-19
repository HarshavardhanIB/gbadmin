/// <reference types="node" />
/**
 * Check if a file exists at a given path.
 *
 * @param {string} path
 *
 * @returns {boolean}
 */
export declare const checkIfFileOrDirectoryExists: (path: string) => boolean;
/**
 * Gets file data from a given path via a promise interface.
 *
 * @param {string} path
 * @param {string} encoding
 *
 * @returns {Promise<Buffer>}
 */
export declare const getFile: (path: string, encoding: string) => Promise<string | Buffer>;
/**
 * Writes a file at a given path via a promise interface.
 *
 * @param {string} path
 * @param {string} fileName
 * @param {string} data
 *
 * @return {Promise<void>}
 */
export declare const createFile: (path: string, fileName: string, data: string) => Promise<void>;
/**
 * Writes a file at a given path via a promise interface.
 *
 * @param {string} path
 * @param {string} fileName
 * @param {string} data
 *
 * @return {Promise<void>}
 */
export declare const createFilex: (path: string, fileName: string, data: string) => Promise<void>;
export declare const copyFile: (source: string, dest: string) => Promise<boolean>;
/**
 * Delete file at the given path via a promise interface
 *
 * @param {string} path
 *
 * @returns {Promise<void>}
 */
export declare const deleteFile: (path: string) => Promise<void>;
/**
 * Creates a directory
 *
 * @param {string} path
 * @param {string} dirName
  *
 * @return {Promise<void>}
 */
export declare const createDirectory: (path: string, dirName: string) => Promise<string>;
/**
* Creates a client directory for registered orgnization/client
*
* @param {string} clientName
*
* @return {Promise<void>}
*/
export declare const createClientDirectory: (clientName: string) => Promise<string>;
