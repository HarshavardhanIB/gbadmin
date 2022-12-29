// Uncomment these imports to begin using these cool features!

import { inject } from '@loopback/core';
import { repository } from '@loopback/repository';
import { get, HttpErrors, oas, param, post, Request, requestBody, Response, RestBindings } from '@loopback/rest';
import fs from 'fs';
import path from 'path';
import { promisify } from 'util';
import { FILE_UPLOAD_SERVICE, STORAGE_DIRECTORY } from '../keys';
import { BROKERIMG_RESOURCES_FOLDER, CUSTOMER_CHEQUES_FOLDER, TEMP_UPLOADS_FOLDER } from '../paths';
import { BrokerRepository } from '../repositories';
import { FileUploadHandler } from '../types';
const readdir = promisify(fs.readdir);
// import {inject} from '@loopback/core';
//import * as imageConversion from 'image-conversion';
//import {compressAccurately} from 'image-conversion';

export class FilesController {
  constructor(
    @repository(BrokerRepository) public brokerRepo: BrokerRepository,
    @inject(FILE_UPLOAD_SERVICE) private handler: FileUploadHandler,
    @inject(STORAGE_DIRECTORY) private storageDirectory: string
  ) { }

  @post('/files', {
    responses: {
      200: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
            },
          },
        },
        description: 'Files and fields',
      },
    },
  })
  async fileUpload(
    @requestBody.file()
    request: Request,
    @inject(RestBindings.Http.RESPONSE) response: Response,
  ): Promise<object> {
    return new Promise<object>((resolve, reject) => {
      this.handler(request, response, err => {
        if (err) reject(err);
        else {
          resolve(FilesController.getFilesAndFields(request, 'fileUpload', {}));
        }
      });
    });
  }

  @get('/files', {
    responses: {
      200: {
        content: {
          // string[]
          'application/json': {
            schema: {
              type: 'array',
              items: {
                type: 'string',
              },
            },
          },
        },
        description: 'A list of files',
      },
    },
  })
  async listFiles() {
    const files = await readdir(this.storageDirectory);
    return files;
  }

  @get('/files/{filename}')
  @oas.response.file()
  downloadFile(
    @param.path.string('filename') fileName: string,
    @inject(RestBindings.Http.RESPONSE) response: Response,
  ) {
    const file = this.validateFileName(fileName);
    response.download(file, fileName);
    return response;
  }

  /**
  * Get files and fields for the request
  * @param request - Http request
  */
  public static async getFilesAndFields(request: Request, method: string, others: any) {
    const uploadedFiles = request.files;
    const uploadedFields = request.body
    //console.log(uploadedFields)
    const mapper = (f: globalThis.Express.Multer.File) => ({
      fieldname: f.fieldname,
      originalname: f.originalname,
      encoding: f.encoding,
      mimetype: f.mimetype,
      size: f.size,
    });
    let files: any[] = [];
    if (Array.isArray(uploadedFiles)) {
      files = uploadedFiles.map(mapper);
    } else {
      for (const filename in uploadedFiles) {
        // console.log(`filename`);
        // let originalname = filename;
        // console.log(originalname)
        // originalname = originalname.replace(/[\])}[{(]/g, '').replace(/ /g, '')
        // console.log(originalname)
        files.push(...uploadedFiles[filename].map(mapper));
      }
    }

    if (method == 'brokerLogoUpload') {
      console.log(files);
      console.log(`uploadedFields.parent_id: ${uploadedFields.parent_id}`)
      console.log(`uploadedFields.parent_name: ${uploadedFields.parent_name}`)

      if (!uploadedFields.useParentsLogo && files.length == 0) {
        return { files: null, fields: { error: 'No logo is attached or `useParentsLogo` is not set. ' } };
      } else if (uploadedFields.useParentsLogo && files.length == 0 && (uploadedFields.parent_id == 0) && (uploadedFields.parent_name == "")) {
        return { files: null, fields: { error: 'No parent info provided after setting `useParentsLogo` ' } };
      }

      for (let file of files) {
        var allowedMimes = ['image/jpg', 'image/jpeg', 'image/pjpeg', 'image/png'];
        if (allowedMimes.includes(file.mimetype)) {
          console.log(file.size);
          if (file.size <= (1 * 1024 * 1024)) {
            //1mb
          } else {
            return { files: null, fields: { error: 'Invalid file size. File with max. of 1 MB is allowed.' } };
          }

        } else {
          return { files: null, fields: { error: 'Invalid file type. Only jpg, png image files are allowed.' } };
        }

        console.log(`file.originalname`);
        let originalname = file.originalname;
        console.log(originalname)
        originalname = originalname.replace(/[\])}[{(]/g, '').replace(/ /g, '')
        console.log(originalname)

        let modfilenameArr = originalname.split(".")
        let modfilename = modfilenameArr[0] + "0." + modfilenameArr[1]

        console.log(TEMP_UPLOADS_FOLDER + '/' + file.originalname);
        try {
          fs.rename(TEMP_UPLOADS_FOLDER + '/' + file.originalname, BROKERIMG_RESOURCES_FOLDER + '/' + originalname, function (res) {
            console.log(res);

            //const fileBuffer = await getFile(BROKERIMG_RESOURCES_FOLDER + '/' + originalname, '');
            // const lowImage = await compressAccurately(file, 3) //3kb
            // console.log(typeof lowImage);
            // console.log(lowImage);
            // compressAccurately(file, 3).then(async res1 => {
            //   //The res in the promise is a compressed Blob type (which can be treated as a File type) file;
            //   console.log(typeof res1);
            //   console.log(res1);

            //   //await createFilex(BROKERIMG_RESOURCES_FOLDER + '/', modfilename, res1);

            // })
            //console.log(res);
          })

        } catch (error) {
          console.log(error);
        }
      }
    } else if (method == 'customerChequeUpload') {
      for (let file of files) {

        var allowedMimes = ['image/jpg', 'image/jpeg', 'image/pjpeg', 'image/png', 'application/pdf'];
        if (allowedMimes.includes(file.mimetype)) {

          console.log(file.size);
          if (file.size <= (300 * 1024)) {
            //300KB
          } else {
            return { files: null, fields: { error: 'Invalid file size. File with max. of 300KB is allowed.' } };
          }
        } else {

          return { files: null, fields: { error: 'Invalid file type. Only jpg, png image files are allowed.' } };
        }
        console.log(TEMP_UPLOADS_FOLDER + '/' + file.originalname);
        try {
          let filename = uploadedFields.timestamp
          console.log(filename)
          let ext = file.originalname.split(".")[1]
          let newFilename = CUSTOMER_CHEQUES_FOLDER + '/' + filename + "." + ext;
          // let newFilenameBuffer = CUSTOMER_CHEQUES_FOLDER + '/' + filename + ".txt";
          console.log(newFilename);
          fs.rename(TEMP_UPLOADS_FOLDER + '/' + file.originalname, CUSTOMER_CHEQUES_FOLDER + '/' + filename + "." + ext, function (res) {
            console.log(res);
            //return {files, fields: request.body};
            // fs.readFile(newFilename, function (err, buffer) {
            //   console.log(buffer);
            // })
            //var fileBuffer = Buffer.from(newFilename)
            // let encoding: BufferEncoding = 'base64'; //utf8
            // var fileBuffer = Buffer.from(newFilename, encoding);
            // console.log(fileBuffer)


            //data:pdf;base64, + buffer.toString()
            //data:image/png;base64
            //data:image/jpg;base64


            // fs.writeFile(newFilenameBuffer, fileBuffer, {
            //   encoding: encoding, //base64
            //   // flag: "w",
            //   // mode: 0o666
            // },
            //   (err) => {
            //     if (err)
            //       console.log(err);
            //     else {
            //       console.log("File written successfully\n");
            //       console.log("The written has the following contents:");
            //       console.log(fs.readFileSync(newFilename, encoding));
            //     }
            //   })
          })

        } catch (error) {
          console.log(error);
        }
      }
    } else if (method == 'customerChequeUploadx') {
      for (let file of files) {

        var allowedMimes = ['image/jpg', 'image/jpeg', 'image/pjpeg', 'image/png', 'application/pdf'];
        if (allowedMimes.includes(file.mimetype)) {

          console.log(file.size);
          if (file.size <= (300 * 1024)) {
            //300KB
          } else {
            return { files: null, fields: { error: 'Invalid file size. File with max. of 300KB is allowed.' } };
          }
        } else {

          return { files: null, fields: { error: 'Invalid file type. Only jpg, png image files are allowed.' } };
        }

      }

      //return null;
    } else if (method == 'subscription') {
      for (let file of files) {

        var allowedMimes = ['image/jpg', 'image/jpeg', 'image/pjpeg', 'image/png', 'application/pdf'];
        if (allowedMimes.includes(file.mimetype)) {

          console.log(file.size);
          if (file.size <= (300 * 1024)) {
            //300KB
          } else {
            return { files: null, fields: { error: 'Invalid file size. File with max. of 300KB is allowed.' } };
          }
        } else {

          return { files: null, fields: { error: 'Invalid file type. Only jpg, png image files are allowed.' } };
        }
        console.log(TEMP_UPLOADS_FOLDER + '/' + file.originalname);
        try {
          let filename = uploadedFields.timestamp
          console.log(filename)
          let ext = file.originalname.split(".")[1]
          let newFilename = CUSTOMER_CHEQUES_FOLDER + '/' + filename + "." + ext;
          // let newFilenameBuffer = CUSTOMER_CHEQUES_FOLDER + '/' + filename + ".txt";
          console.log(newFilename);
          fs.rename(TEMP_UPLOADS_FOLDER + '/' + file.originalname, CUSTOMER_CHEQUES_FOLDER + '/' + filename + "." + ext, function (res) {
            //console.log(res);
          })

        } catch (error) {
          console.log(error);
        }
      }
    } else if (method == 'generatePAD') {

      if (files.length == 0) {
        return { files: null, fields: { error: 'No void cheque file attached.' } };
      }

      for (let file of files) {

        var allowedMimes = ['image/jpg', 'image/jpeg', 'image/pjpeg', 'image/png', 'application/pdf'];
        if (allowedMimes.includes(file.mimetype)) {

          console.log(file.size);
          if (file.size <= (300 * 1024)) {
            //300KB
          } else {
            return { files: null, fields: { error: 'Invalid file size. File with max. of 300KB is allowed.' } };
          }
        } else {

          return { files: null, fields: { error: 'Invalid file type. Only jpg, png image files are allowed.' } };
        }
        console.log(TEMP_UPLOADS_FOLDER + '/' + file.originalname);
        try {
          let filename = uploadedFields.timestamp
          console.log(filename)
          let ext = file.originalname.split(".")[1]
          let newFilename = CUSTOMER_CHEQUES_FOLDER + '/' + filename + "." + ext;
          // let newFilenameBuffer = CUSTOMER_CHEQUES_FOLDER + '/' + filename + ".txt";
          console.log(newFilename);
          fs.rename(TEMP_UPLOADS_FOLDER + '/' + file.originalname, CUSTOMER_CHEQUES_FOLDER + '/' + filename + "." + ext, function (res) {
            //console.log(res);
          })

        } catch (error) {
          console.log(error);
        }
      }
    } else if (method == 'brokersCSVUpload') {
      if (uploadedFields.type == "file" && files.length == 0) {
        return { files: null, fields: { error: 'No CSV file is attached or `type` must be link ' } };
      }

      for (let file of files) {
        var allowedMimes = ['application/csv'];
        if (allowedMimes.includes(file.mimetype)) {
          console.log(file.size);
          if (file.size <= (1 * 1024 * 1024)) {
            //1mb
          } else {
            return { files: null, fields: { error: 'Invalid file size. File with max. of 1 MB is allowed.' } };
          }

        } else {
          return { files: null, fields: { error: 'Invalid file type. Only CSV files are allowed.' } };
        }
      }
    }
    return { files, fields: request.body };
  }

  /**
* Validate file names to prevent them goes beyond the designated directory
* @param fileName - File name
*/
  private validateFileName(fileName: string) {
    const resolved = path.resolve(this.storageDirectory, fileName);
    if (resolved.startsWith(this.storageDirectory)) return resolved;
    // The resolved file is outside sandbox
    throw new HttpErrors.BadRequest(`Invalid file name: ${fileName}`);
  }
}
