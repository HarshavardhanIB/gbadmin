import * as fs from 'fs';
import {promisify} from 'util';

/**
 * Check if a file exists at a given path.
 *
 * @param {string} path
 *
 * @returns {boolean}
 */
export const checkIfFileOrDirectoryExists = (path: string): boolean => {
  // console.log(path);
  //console.log(fs.existsSync(path))

  //let exists=fs.existsSync(path);
  //console.log("exists: "+exists);
  return fs.existsSync(path);
};

/**
 * Gets file data from a given path via a promise interface.
 *
 * @param {string} path
 * @param {string} encoding
 *
 * @returns {Promise<Buffer>}
 */
export const getFile = async (
  path: string,
  encoding: string,
): Promise<string | Buffer> => {
  const readFile = promisify(fs.readFile);

  return encoding ? readFile(path, {encoding: <BufferEncoding>encoding}) : readFile(path, {});
};

/**
 * Writes a file at a given path via a promise interface.
 *
 * @param {string} path
 * @param {string} fileName
 * @param {string} data
 *
 * @return {Promise<void>}
 */
export const createFile = async (
  path: string,
  fileName: string,
  data: string,
): Promise<void> => {
  if (!checkIfFileOrDirectoryExists(path)) {
    fs.mkdirSync(path, {recursive: true});
  }

  const writeFile = promisify(fs.writeFile);

  return await writeFile(`${path}/${fileName}`, data, 'utf8');
};

/**
 * Writes a file at a given path via a promise interface.
 *
 * @param {string} path
 * @param {string} fileName
 * @param {string} data
 *
 * @return {Promise<void>}
 */
export const createFilex = async (
  path: string,
  fileName: string,
  data: string,
): Promise<void> => {
  if (!checkIfFileOrDirectoryExists(path)) {
    fs.mkdirSync(path, {recursive: true});
  }

  const writeFile = promisify(fs.writeFile);

  return await writeFile(`${path}/${fileName}`, data);
};

export const copyFile = async (
  source: string,
  dest: string,

): Promise<boolean> => {
  try {
    fs.copyFileSync(source, dest)
    return true
  } catch (err) {
    console.log(err)
    return false
  }

};



/**
 * Delete file at the given path via a promise interface
 *
 * @param {string} path
 *
 * @returns {Promise<void>}
 */
export const deleteFile = async (path: string): Promise<void> => {
  const unlink = promisify(fs.unlink);

  return await unlink(path);
};


/**
 * Creates a directory
 *
 * @param {string} path
 * @param {string} dirName
  *
 * @return {Promise<void>}
 */
export const createDirectory = async (
  path: string,
  dirName: string,
): Promise<string> => {
  let fullPath = path + dirName;
  console.log(fullPath)


  const dirExists: boolean = checkIfFileOrDirectoryExists(fullPath);

  // console.log("dirExists:"+dirExists);

  if (!dirExists) {
    try {
      //   console.log(fullPath);
      await fs.mkdirSync(fullPath, {recursive: true});
      return fullPath;
    } catch (error) {
      console.error(error);
      return error?.message
    }
  } else {
    console.log("exists");
    return "Already exists"
  }

  // return
};

/**
* Creates a client directory for registered orgnization/client
*
* @param {string} clientName
*
* @return {Promise<void>}
*/
export const createClientDirectory = async (
  clientName: string,
): Promise<string> => {
  let mainDir = "./app/clients/";
  //console.log(mainDir)
  //console.log(clientName);
  const createdDir = await createDirectory(mainDir, clientName);
  return createdDir;
};

const TIMEOUT = 10000
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
