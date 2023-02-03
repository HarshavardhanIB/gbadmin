"use strict";
// Uncomment these imports to begin using these cool features!
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminCorporateController = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const bcryptjs_1 = require("bcryptjs");
const jwt = tslib_1.__importStar(require("jsonwebtoken"));
const messages = tslib_1.__importStar(require("../constants/messages.constants"));
const constants = tslib_1.__importStar(require("../services/constants"));
const CONST = tslib_1.__importStar(require("../constants"));
const authentication_jwt_1 = require("@loopback/authentication-jwt");
const repositories_1 = require("../repositories");
const authentication_1 = require("@loopback/authentication");
const authorization_1 = require("@loopback/authorization");
const common_functions_1 = require("../common-functions");
const moment_1 = tslib_1.__importDefault(require("moment"));
const models_1 = require("../models");
const auth_controller_1 = require("./auth.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
// import {inject} from '@loopback/core';
const CredentialsSchema = {
    type: 'object',
    required: ['email', 'password'],
    properties: {
        email: {
            type: 'string',
            format: 'email',
        },
        password: {
            type: 'string',
            minLength: 8,
        },
    },
};
const CredentialsRequestBody = {
    description: 'The input of login function',
    required: true,
    content: {
        'application/json': { schema: CredentialsSchema },
    },
};
let AdminCorporateController = class AdminCorporateController {
    constructor(usersRepository, adminRepository) {
        this.usersRepository = usersRepository;
        this.adminRepository = adminRepository;
    }
    async signUp(newUserRequest) {
        let res = {};
        let emailCount = await this.usersRepository.count({ where: { email: newUserRequest.email } });
        if (emailCount.count <= 0) {
            console.log(newUserRequest.password);
            const password = await (0, bcryptjs_1.hash)(newUserRequest.password, await (0, bcryptjs_1.genSalt)());
            // const savedUser = await this.userRepository.create(
            //   _.omit(newUserRequest, 'password'),
            // );
            // await this.userRepository.userCredentials(savedUser.id).create({ password });
            const saveAdmin = await this.adminRepository.create(newUserRequest);
            const newUser = new models_1.Users();
            console.log(newUserRequest);
            let userModel = newUserRequest;
            newUser.registrationDate = (0, moment_1.default)().format('YYYY-MM-DD');
            newUser.activation = await (0, common_functions_1.getActivationCode)();
            newUser.username = newUserRequest.email;
            newUser.password = password;
            const saveusers = await this.usersRepository.create(newUser);
            await this.usersRepository.updateById(saveusers.id, { password: password });
            await this.adminRepository.updateById(saveAdmin.id, { "password": password });
            res = {
                "statusCode": 200,
                "message": "Registration successfully done",
                "username": saveAdmin.username,
                "email": saveAdmin.email
            };
        }
        else {
            res = {
                "statusCode": 201,
                "message": "Email already exits"
            };
        }
        return res;
    }
    async userLogin(credentials) {
        let response;
        console.log(credentials);
        let useremail = credentials.email;
        console.log(useremail);
        let userEnterPaswrd = credentials.password;
        let user = await this.usersRepository.findOne({ where: { username: useremail } });
        console.log(user);
        if (user) {
            let HTMLcontentFile = process.env.ACTIVATIONPATH + "?key=" + user.activation;
            let userMail = user.username;
            let userPass = user.password;
            let matchpass = await (0, bcryptjs_1.compare)(userEnterPaswrd, userPass);
            if (matchpass) {
                if (user.block) {
                    // var htmlContent = `<h2>Hello </h2>
                    // <br></br>
                    // <p>Please active your account</p>
                    //   <br></br>
                    //   <a href="${HTMLcontentFile}"> Click here to activate your account "</a>`;
                    // await mail("", userMail, "Admin Portal Forgot Password Link", htmlContent, "click the link to activate your account", "");
                    response = {
                        "statusCode": 201,
                        "message": "Please activate your account click on the link sent in your mail"
                    };
                }
                else {
                    // const token = await this.jwtService.generateToken(customers);
                    let token = jwt.sign({ adminid: user.id, role: user.username }, constants.secret, { expiresIn: constants.expiresIn, algorithm: constants.algorithm });
                    // const userProfile = this.userService.convertToUserProfile(credentials);
                    response = {
                        "statusCode": 200,
                        "message": messages.LoginSuccess,
                        "token": token
                    };
                }
            }
            else {
                response = {
                    "statusCode": 400,
                    "message": "Please enter valid mailid and password"
                };
            }
        }
        else {
            let customers = await this.adminRepository.findOne({ where: { email: useremail } });
            if (customers) {
                let dbpass = customers === null || customers === void 0 ? void 0 : customers.password;
                let matchpass = await (0, bcryptjs_1.compare)(userEnterPaswrd, dbpass);
                if (matchpass) {
                    // const token = await this.jwtService.generateToken(customers);
                    let token = jwt.sign({ adminid: customers.id, role: customers.username }, constants.secret, { expiresIn: constants.expiresIn, algorithm: constants.algorithm });
                    response = {
                        "statusCode": 200,
                        "message": messages.LoginSuccess,
                        "token": token
                    };
                }
                else {
                    response = {
                        "statusCode": 202,
                        "message": messages.InvaliCredentials
                    };
                }
            }
            else {
                response = {
                    "statusCode": 202,
                    "message": messages.InvaliCredentials
                };
            }
        }
        return response;
    }
};
tslib_1.__decorate([
    (0, authentication_1.authenticate)('jwt'),
    (0, authorization_1.authorize)({
        allowedRoles: [CONST.USER_ROLE.CORPORATE_ADMINISTRATOR],
        voters: [auth_middleware_1.basicAuthorization],
    }),
    (0, rest_1.post)('/auth/signup', {
        responses: {
            '200': {
                description: 'User',
                content: {
                    'application/json': {
                        schema: {
                            'x-ts-type': authentication_jwt_1.User,
                        },
                    },
                },
            },
        },
    }),
    tslib_1.__param(0, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(auth_controller_1.NewUserRequest, {
                    title: 'NewUser',
                }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [auth_controller_1.NewUserRequest]),
    tslib_1.__metadata("design:returntype", Promise)
], AdminCorporateController.prototype, "signUp", null);
tslib_1.__decorate([
    (0, rest_1.post)('/corporate/signin'),
    tslib_1.__param(0, (0, rest_1.requestBody)(CredentialsRequestBody)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AdminCorporateController.prototype, "userLogin", null);
AdminCorporateController = tslib_1.__decorate([
    tslib_1.__param(0, (0, repository_1.repository)(repositories_1.UsersRepository)),
    tslib_1.__param(1, (0, repository_1.repository)(repositories_1.AdminRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.UsersRepository,
        repositories_1.AdminRepository])
], AdminCorporateController);
exports.AdminCorporateController = AdminCorporateController;
//# sourceMappingURL=admin-corporate.controller.js.map