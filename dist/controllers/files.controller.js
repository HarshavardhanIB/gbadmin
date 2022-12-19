"use strict";
// Uncomment these imports to begin using these cool features!
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilesController = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const fs_1 = tslib_1.__importDefault(require("fs"));
const path_1 = tslib_1.__importDefault(require("path"));
const util_1 = require("util");
const keys_1 = require("../keys");
const paths_1 = require("../paths");
const repositories_1 = require("../repositories");
const readdir = (0, util_1.promisify)(fs_1.default.readdir);
// import {inject} from '@loopback/core';
//import * as imageConversion from 'image-conversion';
//import {compressAccurately} from 'image-conversion';
let FilesController = class FilesController {
    constructor(brokerRepo, handler, storageDirectory) {
        this.brokerRepo = brokerRepo;
        this.handler = handler;
        this.storageDirectory = storageDirectory;
    }
    async fileUpload(request, response) {
        return new Promise((resolve, reject) => {
            this.handler(request, response, err => {
                if (err)
                    reject(err);
                else {
                    resolve(FilesController.getFilesAndFields(request, 'fileUpload', {}));
                }
            });
        });
    }
    async listFiles() {
        const files = await readdir(this.storageDirectory);
        return files;
    }
    downloadFile(fileName, response) {
        const file = this.validateFileName(fileName);
        response.download(file, fileName);
        return response;
    }
    /**
    * Get files and fields for the request
    * @param request - Http request
    */
    static async getFilesAndFields(request, method, others) {
        const uploadedFiles = request.files;
        const uploadedFields = request.body;
        //console.log(uploadedFields)
        const mapper = (f) => ({
            fieldname: f.fieldname,
            originalname: f.originalname,
            encoding: f.encoding,
            mimetype: f.mimetype,
            size: f.size,
        });
        let files = [];
        if (Array.isArray(uploadedFiles)) {
            files = uploadedFiles.map(mapper);
        }
        else {
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
            console.log(`uploadedFields.parent_id: ${uploadedFields.parent_id}`);
            console.log(`uploadedFields.parent_name: ${uploadedFields.parent_name}`);
            if (!uploadedFields.useParentsLogo && files.length == 0) {
                return { files: null, fields: { error: 'No logo is attached or `useParentsLogo` is not set. ' } };
            }
            else if (uploadedFields.useParentsLogo && files.length == 0 && (uploadedFields.parent_id == 0) && (uploadedFields.parent_name == "")) {
                return { files: null, fields: { error: 'No parent info provided after setting `useParentsLogo` ' } };
            }
            for (let file of files) {
                var allowedMimes = ['image/jpg', 'image/jpeg', 'image/pjpeg', 'image/png'];
                if (allowedMimes.includes(file.mimetype)) {
                    console.log(file.size);
                    if (file.size <= (1 * 1024 * 1024)) {
                        //1mb
                    }
                    else {
                        return { files: null, fields: { error: 'Invalid file size. File with max. of 1 MB is allowed.' } };
                    }
                }
                else {
                    return { files: null, fields: { error: 'Invalid file type. Only jpg, png image files are allowed.' } };
                }
                console.log(`file.originalname`);
                let originalname = file.originalname;
                console.log(originalname);
                originalname = originalname.replace(/[\])}[{(]/g, '').replace(/ /g, '');
                console.log(originalname);
                let modfilenameArr = originalname.split(".");
                let modfilename = modfilenameArr[0] + "0." + modfilenameArr[1];
                console.log(paths_1.TEMP_UPLOADS_FOLDER + '/' + file.originalname);
                try {
                    fs_1.default.rename(paths_1.TEMP_UPLOADS_FOLDER + '/' + file.originalname, paths_1.BROKERIMG_RESOURCES_FOLDER + '/' + originalname, function (res) {
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
                    });
                }
                catch (error) {
                    console.log(error);
                }
            }
        }
        else if (method == 'customerChequeUpload') {
            for (let file of files) {
                var allowedMimes = ['image/jpg', 'image/jpeg', 'image/pjpeg', 'image/png', 'application/pdf'];
                if (allowedMimes.includes(file.mimetype)) {
                    console.log(file.size);
                    if (file.size <= (300 * 1024)) {
                        //300KB
                    }
                    else {
                        return { files: null, fields: { error: 'Invalid file size. File with max. of 300KB is allowed.' } };
                    }
                }
                else {
                    return { files: null, fields: { error: 'Invalid file type. Only jpg, png image files are allowed.' } };
                }
                console.log(paths_1.TEMP_UPLOADS_FOLDER + '/' + file.originalname);
                try {
                    let filename = uploadedFields.timestamp;
                    console.log(filename);
                    let ext = file.originalname.split(".")[1];
                    let newFilename = paths_1.CUSTOMER_CHEQUES_FOLDER + '/' + filename + "." + ext;
                    // let newFilenameBuffer = CUSTOMER_CHEQUES_FOLDER + '/' + filename + ".txt";
                    console.log(newFilename);
                    fs_1.default.rename(paths_1.TEMP_UPLOADS_FOLDER + '/' + file.originalname, paths_1.CUSTOMER_CHEQUES_FOLDER + '/' + filename + "." + ext, function (res) {
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
                    });
                }
                catch (error) {
                    console.log(error);
                }
            }
        }
        else if (method == 'customerChequeUploadx') {
            for (let file of files) {
                var allowedMimes = ['image/jpg', 'image/jpeg', 'image/pjpeg', 'image/png', 'application/pdf'];
                if (allowedMimes.includes(file.mimetype)) {
                    console.log(file.size);
                    if (file.size <= (300 * 1024)) {
                        //300KB
                    }
                    else {
                        return { files: null, fields: { error: 'Invalid file size. File with max. of 300KB is allowed.' } };
                    }
                }
                else {
                    return { files: null, fields: { error: 'Invalid file type. Only jpg, png image files are allowed.' } };
                }
            }
            //return null;
        }
        else if (method == 'subscription') {
            for (let file of files) {
                var allowedMimes = ['image/jpg', 'image/jpeg', 'image/pjpeg', 'image/png', 'application/pdf'];
                if (allowedMimes.includes(file.mimetype)) {
                    console.log(file.size);
                    if (file.size <= (300 * 1024)) {
                        //300KB
                    }
                    else {
                        return { files: null, fields: { error: 'Invalid file size. File with max. of 300KB is allowed.' } };
                    }
                }
                else {
                    return { files: null, fields: { error: 'Invalid file type. Only jpg, png image files are allowed.' } };
                }
                console.log(paths_1.TEMP_UPLOADS_FOLDER + '/' + file.originalname);
                try {
                    let filename = uploadedFields.timestamp;
                    console.log(filename);
                    let ext = file.originalname.split(".")[1];
                    let newFilename = paths_1.CUSTOMER_CHEQUES_FOLDER + '/' + filename + "." + ext;
                    // let newFilenameBuffer = CUSTOMER_CHEQUES_FOLDER + '/' + filename + ".txt";
                    console.log(newFilename);
                    fs_1.default.rename(paths_1.TEMP_UPLOADS_FOLDER + '/' + file.originalname, paths_1.CUSTOMER_CHEQUES_FOLDER + '/' + filename + "." + ext, function (res) {
                        //console.log(res);
                    });
                }
                catch (error) {
                    console.log(error);
                }
            }
        }
        else if (method == 'generatePAD') {
            if (files.length == 0) {
                return { files: null, fields: { error: 'No void cheque file attached.' } };
            }
            for (let file of files) {
                var allowedMimes = ['image/jpg', 'image/jpeg', 'image/pjpeg', 'image/png', 'application/pdf'];
                if (allowedMimes.includes(file.mimetype)) {
                    console.log(file.size);
                    if (file.size <= (300 * 1024)) {
                        //300KB
                    }
                    else {
                        return { files: null, fields: { error: 'Invalid file size. File with max. of 300KB is allowed.' } };
                    }
                }
                else {
                    return { files: null, fields: { error: 'Invalid file type. Only jpg, png image files are allowed.' } };
                }
                console.log(paths_1.TEMP_UPLOADS_FOLDER + '/' + file.originalname);
                try {
                    let filename = uploadedFields.timestamp;
                    console.log(filename);
                    let ext = file.originalname.split(".")[1];
                    let newFilename = paths_1.CUSTOMER_CHEQUES_FOLDER + '/' + filename + "." + ext;
                    // let newFilenameBuffer = CUSTOMER_CHEQUES_FOLDER + '/' + filename + ".txt";
                    console.log(newFilename);
                    fs_1.default.rename(paths_1.TEMP_UPLOADS_FOLDER + '/' + file.originalname, paths_1.CUSTOMER_CHEQUES_FOLDER + '/' + filename + "." + ext, function (res) {
                        //console.log(res);
                    });
                }
                catch (error) {
                    console.log(error);
                }
            }
        }
        else if (method == 'brokersCSVUpload') {
            if (uploadedFields.type == "file" && files.length == 0) {
                return { files: null, fields: { error: 'No CSV file is attached or `type` must be link ' } };
            }
            for (let file of files) {
                var allowedMimes = ['application/csv'];
                if (allowedMimes.includes(file.mimetype)) {
                    console.log(file.size);
                    if (file.size <= (1 * 1024 * 1024)) {
                        //1mb
                    }
                    else {
                        return { files: null, fields: { error: 'Invalid file size. File with max. of 1 MB is allowed.' } };
                    }
                }
                else {
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
    validateFileName(fileName) {
        const resolved = path_1.default.resolve(this.storageDirectory, fileName);
        if (resolved.startsWith(this.storageDirectory))
            return resolved;
        // The resolved file is outside sandbox
        throw new rest_1.HttpErrors.BadRequest(`Invalid file name: ${fileName}`);
    }
};
tslib_1.__decorate([
    (0, rest_1.post)('/files', {
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
    }),
    tslib_1.__param(0, rest_1.requestBody.file()),
    tslib_1.__param(1, (0, core_1.inject)(rest_1.RestBindings.Http.RESPONSE)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], FilesController.prototype, "fileUpload", null);
tslib_1.__decorate([
    (0, rest_1.get)('/files', {
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
    }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], FilesController.prototype, "listFiles", null);
tslib_1.__decorate([
    (0, rest_1.get)('/files/{filename}'),
    rest_1.oas.response.file(),
    tslib_1.__param(0, rest_1.param.path.string('filename')),
    tslib_1.__param(1, (0, core_1.inject)(rest_1.RestBindings.Http.RESPONSE)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", void 0)
], FilesController.prototype, "downloadFile", null);
FilesController = tslib_1.__decorate([
    tslib_1.__param(0, (0, repository_1.repository)(repositories_1.BrokerRepository)),
    tslib_1.__param(1, (0, core_1.inject)(keys_1.FILE_UPLOAD_SERVICE)),
    tslib_1.__param(2, (0, core_1.inject)(keys_1.STORAGE_DIRECTORY)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.BrokerRepository, Function, String])
], FilesController);
exports.FilesController = FilesController;
//# sourceMappingURL=files.controller.js.map