"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = exports.CredentialsRequestBody = exports.NewUserRequest = void 0;
const tslib_1 = require("tslib");
// Copyright IBM Corp. and LoopBack contributors 2020. All Rights Reserved.
// Node module: @loopback/example-todo-jwt
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
const authentication_1 = require("@loopback/authentication");
const messages = tslib_1.__importStar(require("../constants/messages.constants"));
const authentication_jwt_1 = require("@loopback/authentication-jwt");
const moment_1 = tslib_1.__importDefault(require("moment"));
const repositories_1 = require("../repositories");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const jwt = tslib_1.__importStar(require("jsonwebtoken"));
const security_1 = require("@loopback/security");
const bcryptjs_1 = require("bcryptjs");
const admin_model_1 = require("../models/admin.model");
const common_services_1 = require("../services/common.services");
const email_services_1 = require("../services/email.services");
const constants = tslib_1.__importStar(require("../services/constants"));
const jwt_service_1 = require("../services/jwt.service");
const models_1 = require("../models");
const services_1 = require("../services");
let NewUserRequest = class NewUserRequest extends admin_model_1.Admin {
};
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], NewUserRequest.prototype, "password", void 0);
NewUserRequest = tslib_1.__decorate([
    (0, repository_1.model)()
], NewUserRequest);
exports.NewUserRequest = NewUserRequest;
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
const forgotmail = {
    type: 'object',
    required: ['email'],
    properties: {
        email: {
            type: 'string',
            format: 'email',
        },
    },
};
const chnagePassword = {
    type: 'object',
    required: ['oldpassword', 'newpassword'],
    properties: {
        oldpassword: {
            type: 'string'
        },
        newpassword: {
            type: 'string'
        },
    },
};
exports.CredentialsRequestBody = {
    description: 'The input of login function',
    required: true,
    content: {
        'application/json': { schema: CredentialsSchema },
    },
};
let AuthController = class AuthController {
    constructor(jwtService, userService, user, userRepository, usersRepository, adminRepository, request, service) {
        this.jwtService = jwtService;
        this.userService = userService;
        this.user = user;
        this.userRepository = userRepository;
        this.usersRepository = usersRepository;
        this.adminRepository = adminRepository;
        this.request = request;
        this.service = service;
    }
    async login(credentials) {
        // ensure the user exists, and the password is correct
        const user = await this.userService.verifyCredentials(credentials);
        // convert a User object into a UserProfile object (reduced set of properties)
        const userProfile = this.userService.convertToUserProfile(user);
        // create a JSON Web Token based on the user profile
        const token = await this.jwtService.generateToken(userProfile);
        return { token };
    }
    async whoAmI(currentUserProfile) {
        console.log(currentUserProfile);
        return currentUserProfile[security_1.securityId];
    }
    async signUp(newUserRequest) {
        let role = "BROKER";
        let res = {};
        let emailCount = await this.usersRepository.count({ username: newUserRequest.email });
        console.log(emailCount);
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
            newUser.activation = await (0, common_services_1.randomString)(10, 'abcde');
            newUser.username = newUserRequest.email;
            newUser.password = password;
            const saveusers = await this.usersRepository.create(newUser);
            await this.usersRepository.updateById(saveusers.id, { password: password, role: role });
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
                "message": "email already exits"
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
            let dbPassword = user.password;
            let matchpass = await (0, bcryptjs_1.compare)(userEnterPaswrd, dbPassword);
            if (matchpass) {
                if (user.block) {
                    // var htmlContent = `<h2>Hello </h2>
                    // <br></br>
                    // <p>Please active your account</p>
                    //   <br></br>
                    //   <a href="${HTMLcontentFile}"> Click here to activate your account "</a>`;
                    let mailBody = await this.service.MailContent("signin", "", true, HTMLcontentFile);
                    console.log('>>>>', mailBody);
                    // await mail("", userMail, "Admin Portal Forgot Password Link", htmlContent, "click the link to activate your account", "");
                    await (0, email_services_1.mail)("", userMail, "Admin Portal Activation Link", mailBody, "", "");
                    response = {
                        "statusCode": 201,
                        "message": "Please activate your account click on the link sent in your mail"
                    };
                }
                else {
                    // const token = await this.jwtService.generateToken(customers);
                    let token = jwt.sign({ id: user.id, role: user.role, name: user.username }, constants.secret, { expiresIn: constants.expiresIn, algorithm: constants.algorithm });
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
        // let customers: any = await this.adminRepository.findOne({ where: { email: useremail }, fields: {} });
        // let dbpass: any = customers?.password;
        // let matchpass = await compare(userEnterPaswrd, dbpass);
        // if (matchpass) {
        //   // const token = await this.jwtService.generateToken(customers);
        //   let token = jwt.sign({ adminid: customers.id, role: customers.username }, constants.secret, { expiresIn: constants.expiresIn, algorithm: constants.algorithm });
        //   response = {
        //     "statusCode": 200,
        //     "message": messages.LoginSuccess,
        //     "token": token
        //   }
        // }
        // else {
        //   response = {
        //     "statusCode": 201,
        //     "message": messages.InvaliCredentials
        //   }
        // }
        // return response;
    }
    // @get('/auth/forgotPassword/{mailid}')
    async forgotPassword(email) {
        var _a;
        let response;
        let userEnterEmailId = email.email;
        let activeStatus = await this.usersRepository.findOne({ where: { username: userEnterEmailId }, fields: { block: true, activation: true, id: true } });
        console.log(activeStatus);
        if (activeStatus) {
            let id = activeStatus.id;
            let HTMLcontentFile = ((_a = process.env.APP_URL) !== null && _a !== void 0 ? _a : "https://devresources.aitestpro.com/apps/temp") + "/gb_user_activation.html?key=" + activeStatus.activation;
            let inActiveUser = activeStatus.block;
            // const active_buffer = Buffer.from(activeStatus.block);
            // const active_boolean = Boolean(active_buffer.readInt8());
            let userNewPassword = await (0, common_services_1.generateRandomPassword)();
            // let encryptPswd = await encryptPassword(userNewPassword);
            const encryptPswd = await (0, bcryptjs_1.hash)(userNewPassword, await (0, bcryptjs_1.genSalt)());
            let mailBody = await this.service.MailContent("forgotPassword", userNewPassword, inActiveUser, HTMLcontentFile);
            // var htmlContent = `<h3>Hello </h3>
            // <p>This is your temporary password to login : "${userNewPassword}"</p>`;
            // if (inActiveUser) {
            //   htmlContent +=
            //     `<p>To active your account </p>
            //   <a href="${HTMLcontentFile}"> Click here</a>`;
            // }
            await this.usersRepository.updateById(id, { password: encryptPswd });
            // await mail("", userEnterEmailId, "Admin Portal Forgot Password Link", htmlContent, "click on the link and reset your password", "");
            await (0, email_services_1.mail)("", userEnterEmailId, "Admin Portal Forgot Password Link", mailBody, "", "");
            let response = {
                "statusCode": 200,
                "message": "Password reset successfull.Check your email"
            };
            return response;
        }
        else {
            response = {
                "statusCode": 204,
                "message": messages.EMAIL_EXISTS_PLS_REGISTER
            };
        }
        return response;
    }
    async activeuser(key) {
        console.log(key);
        let response;
        let user = await this.usersRepository.findOne({ where: { activation: key } });
        if (user) {
            await this.usersRepository.updateById(user.id, { block: false });
            response = {
                "statusCode": 200,
                "message": "Account activated successfully"
            };
        }
        else {
            response = {
                "statusCode": 204,
                "message": "Invalid key"
            };
        }
        return response;
    }
    async chnagePasswords(requestBody, currentUserProfile) {
        let response;
        let oldpassword = requestBody.oldpassword;
        let newpassword = requestBody.newpassword;
        try {
            let hashOldPswrd = await (0, bcryptjs_1.hash)(oldpassword, await (0, bcryptjs_1.genSalt)());
            console.log(hashOldPswrd);
            let user = await this.usersRepository.findOne({ where: { id: currentUserProfile[security_1.securityId] } });
            console.log(user);
            if (user) {
                let matchPass = await (0, bcryptjs_1.compare)(oldpassword, user.password);
                if (matchPass) {
                    let hashNewPswrd = await (0, bcryptjs_1.hash)(newpassword, await (0, bcryptjs_1.genSalt)());
                    await this.usersRepository.updateById(user.id, { password: hashNewPswrd });
                    let userwithNewPswrd = await this.usersRepository.findById(user.id, { fields: { role: true, id: true } });
                    const token = jwt.sign({ id: userwithNewPswrd.id, role: userwithNewPswrd.role, name: userwithNewPswrd.username }, constants.secret, { expiresIn: constants.expiresIn, algorithm: constants.algorithm });
                    response = {
                        "statusCode": 200,
                        "message": "Password chnaged successfully",
                        "token": token
                    };
                }
                else {
                    response = {
                        "statusCode": 201,
                        "message": "Please enter valid Oldpassword"
                    };
                }
            }
            else {
                response = {
                    "statusCode": 201,
                    "message": "Please enter valid Oldpassword"
                };
            }
        }
        catch (error) {
            console.log(error);
            response = {
                "statusCode": 400,
                "message": "Error when changing the password"
            };
        }
        return response;
    }
    async app() {
        let data = { "name": constants.name, "version": constants.version, "NodeVersion": process.versions.node, "NpmVersion": constants.npm_version };
        let responseData = {
            "statusCode": 200,
            "message": "The project details",
            "AppData": data
        };
        return responseData;
    }
    async ip() {
        let req = this.request;
        let headers = req.headers;
        // console.log(headers);
        let xForwardFor = headers['X-Forwarded-For'];
        console.log(req.ip);
        // console.log(req.socket.);
        let data = { "userIp": req.ip, "socketAddress": req.socket.address, "socketRemoteAddress": req.socket.remoteAddress, "xForwardFor": xForwardFor };
        let responseData = {
            "statusCode": 200,
            "message": "The project details",
            "userConfig": data
        };
        return responseData;
    }
};
tslib_1.__decorate([
    (0, rest_1.post)('/auth/login', {
        responses: {
            '200': {
                description: 'Token',
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                token: {
                                    type: 'string',
                                },
                            },
                        },
                    },
                },
            },
        },
    }),
    tslib_1.__param(0, (0, rest_1.requestBody)(exports.CredentialsRequestBody)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
tslib_1.__decorate([
    (0, authentication_1.authenticate)('jwt'),
    (0, rest_1.get)('/user/whoAmI', {
        responses: {
            '200': {
                description: 'Return current user',
                content: {
                    'application/json': {
                        schema: {
                            type: 'string',
                        },
                    },
                },
            },
        },
    }),
    tslib_1.__param(0, (0, core_1.inject)(security_1.SecurityBindings.USER)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AuthController.prototype, "whoAmI", null);
tslib_1.__decorate([
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
                schema: (0, rest_1.getModelSchemaRef)(NewUserRequest, {
                    title: 'NewUser',
                    exclude: ['id']
                }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [NewUserRequest]),
    tslib_1.__metadata("design:returntype", Promise)
], AuthController.prototype, "signUp", null);
tslib_1.__decorate([
    (0, rest_1.post)('/auth/signin'),
    tslib_1.__param(0, (0, rest_1.requestBody)(exports.CredentialsRequestBody)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AuthController.prototype, "userLogin", null);
tslib_1.__decorate([
    (0, rest_1.post)('/auth/forgotpassword'),
    tslib_1.__param(0, (0, rest_1.requestBody)({
        content: {
            'application/json': { schema: forgotmail },
        }
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AuthController.prototype, "forgotPassword", null);
tslib_1.__decorate([
    (0, rest_1.get)('/auth/userActivation/{key}'),
    tslib_1.__param(0, rest_1.param.path.string('key')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], AuthController.prototype, "activeuser", null);
tslib_1.__decorate([
    (0, authentication_1.authenticate)('jwt'),
    (0, rest_1.post)('/user/changePassword'),
    tslib_1.__param(0, (0, rest_1.requestBody)({
        content: {
            'application/json': { schema: chnagePassword },
        }
    })),
    tslib_1.__param(1, (0, core_1.inject)(security_1.SecurityBindings.USER)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AuthController.prototype, "chnagePasswords", null);
tslib_1.__decorate([
    (0, rest_1.get)('/auth/app'),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], AuthController.prototype, "app", null);
tslib_1.__decorate([
    (0, rest_1.get)('/userIp'),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], AuthController.prototype, "ip", null);
AuthController = tslib_1.__decorate([
    tslib_1.__param(0, (0, core_1.inject)(authentication_jwt_1.TokenServiceBindings.TOKEN_SERVICE)),
    tslib_1.__param(1, (0, core_1.inject)(authentication_jwt_1.UserServiceBindings.USER_SERVICE)),
    tslib_1.__param(2, (0, core_1.inject)(security_1.SecurityBindings.USER, { optional: true })),
    tslib_1.__param(3, (0, repository_1.repository)(authentication_jwt_1.UserRepository)),
    tslib_1.__param(4, (0, repository_1.repository)(repositories_1.UsersRepository)),
    tslib_1.__param(5, (0, repository_1.repository)(repositories_1.AdminRepository)),
    tslib_1.__param(6, (0, core_1.inject)(rest_1.RestBindings.Http.REQUEST)),
    tslib_1.__param(7, (0, core_1.service)(services_1.AuthService)),
    tslib_1.__metadata("design:paramtypes", [jwt_service_1.JWTService,
        authentication_jwt_1.MyUserService, Object, authentication_jwt_1.UserRepository,
        repositories_1.UsersRepository,
        repositories_1.AdminRepository, Object, services_1.AuthService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map