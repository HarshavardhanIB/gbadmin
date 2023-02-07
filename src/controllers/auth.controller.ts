// Copyright IBM Corp. and LoopBack contributors 2020. All Rights Reserved.
// Node module: @loopback/example-todo-jwt
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
import { authenticate, TokenService } from '@loopback/authentication';
import { Request, Response } from 'express';
import * as messages from '../constants/messages.constants';
import {
  Credentials,
  MyUserService,
  TokenServiceBindings,
  User,
  UserRepository,
  UserServiceBindings,
} from '@loopback/authentication-jwt';
import moment from 'moment';
import { UsersRepository, AdminRepository } from '../repositories'
import { inject, service } from '@loopback/core';
import { model, property, repository } from '@loopback/repository';
import {
  get,
  getModelSchemaRef,
  post,
  param,
  requestBody,
  SchemaObject,
  patch,
  put,
  del,
  response,
  RestBindings,
} from '@loopback/rest';
import * as jwt from 'jsonwebtoken'
import { SecurityBindings, securityId, UserProfile } from '@loopback/security';
import { genSalt, hash, compare } from 'bcryptjs';
import _, { StringChain } from 'lodash';
import { Admin } from '../models/admin.model';
import { encryptPassword, genCrypt, generateRandomPassword, randomString } from '../services/common.services';
import { mail } from '../services/email.services';
import { Buffer } from 'buffer';
import * as constants from '../services/constants'
import { JWTService } from '../services/jwt.service'
import { Users } from '../models';
import { email } from '../configurations';
import { AuthService } from '../services';
import {AUTH} from '../paths'
import { config } from 'dotenv';
@model()
export class NewUserRequest extends Admin {
  @property({
    type: 'string',
    required: true,
  })
  password: string;
  username: string;
  email: string;
}
export declare type mailId = {
  email: string;
}
export declare type forgotPswrd = {
  oldpassword: string;
  newpassword: string;
}
const CredentialsSchema: SchemaObject = {
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
const forgotmail: SchemaObject = {
  type: 'object',
  required: ['email'],
  properties: {
    email: {
      type: 'string',
      format: 'email',
    },
  },
};
const chnagePassword: SchemaObject = {
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
export const CredentialsRequestBody = {
  description: 'The input of login function',
  required: true,
  content: {
    'application/json': { schema: CredentialsSchema },
  },
};
export class AuthController {

  constructor(
    @inject(TokenServiceBindings.TOKEN_SERVICE)
    public jwtService: JWTService,
    @inject(UserServiceBindings.USER_SERVICE)
    public userService: MyUserService,
    @inject(SecurityBindings.USER, { optional: true })
    public user: UserProfile,
    @repository(UserRepository) protected userRepository: UserRepository,
    @repository(UsersRepository)
    public usersRepository: UsersRepository,
    @repository(AdminRepository)
    public adminRepository: AdminRepository,
    @inject(RestBindings.Http.REQUEST)
    private request: Request,
    @service(AuthService) public service: AuthService,
  ) { }
  @post(AUTH.LOGIN, {
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
  })
  async login(
    @requestBody(CredentialsRequestBody) credentials: Credentials,
  ): Promise<{ token: string }> {
    // ensure the user exists, and the password is correct
    const user = await this.userService.verifyCredentials(credentials);
    // convert a User object into a UserProfile object (reduced set of properties)
    const userProfile = this.userService.convertToUserProfile(user);
    // create a JSON Web Token based on the user profile
    const token = await this.jwtService.generateToken(userProfile);
    return { token };
  }
  @authenticate('jwt')
  @get(AUTH.WHOAMI, {
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
  })
  async whoAmI(
    @inject(SecurityBindings.USER)
    currentUserProfile: UserProfile,
  ): Promise<string> {
    console.log(currentUserProfile);
    return currentUserProfile[securityId];
  }
  @post(AUTH.SIGNUP, {
    responses: {
      '200': {
        description: 'User',
        content: {
          'application/json': {
            schema: {
              'x-ts-type': User,
            },
          },
        },
      },
    },
  })
  async signUp(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(NewUserRequest, {
            title: 'NewUser',
            exclude: ['id']
          }),
        },
      },
    })
    newUserRequest: NewUserRequest,
  ): Promise<any> {
    let role = "BROKER";
    let res: any = {};
    let emailCount = await this.usersRepository.count({ username: newUserRequest.email });
    console.log(emailCount);
    if (emailCount.count <= 0) {
      console.log(newUserRequest.password);
      const password = await hash(newUserRequest.password, await genSalt());
      // const savedUser = await this.userRepository.create(
      //   _.omit(newUserRequest, 'password'),
      // );
      // await this.userRepository.userCredentials(savedUser.id).create({ password });
      // const saveAdmin = await this.usersRepository.create(newUserRequest);
      const newUser: Users = new Users();
      console.log(newUserRequest);
      let userModel = newUserRequest;
      newUser.registrationDate = moment().format('YYYY-MM-DD')
      newUser.activation = await randomString(10, 'abcde');
      newUser.username = newUserRequest.email;
      newUser.password = password;
      const saveusers = await this.usersRepository.create(newUser);
      await this.usersRepository.updateById(saveusers.id, { password: password, role: role });
      // await this.adminRepository.updateById(saveAdmin.id, { "password": password });
      res = {
        "statusCode": 200,
        "message": "Registration successfully done",
        "email": saveusers.username
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
  @post(AUTH.SIGNIN)
  async userLogin(@requestBody(CredentialsRequestBody) credentials: Credentials,): Promise<any> {
    let response: any;
    console.log(credentials);
    let useremail = credentials.email;
    console.log(useremail);
    let userEnterPaswrd = credentials.password;
    let user = await this.usersRepository.findOne({ where: { username: useremail } });
    console.log(user);
    if (user) {
      let HTMLcontentFile = process.env.ACTIVATIONPATH + "?key=" + user.activation;
      let userMail: any = user.username;
      let dbPassword: any = user.password;
      let matchpass = await compare(userEnterPaswrd, dbPassword);
      if (matchpass) {
        if (user.block) {
          // var htmlContent = `<h2>Hello </h2>
          // <br></br>
          // <p>Please active your account</p>
          //   <br></br>
          //   <a href="${HTMLcontentFile}"> Click here to activate your account "</a>`;
          let mailBody = await this.service.MailContent("signin", "", true, HTMLcontentFile);
          console.log('>>>>', mailBody)
          // await mail("", userMail, "Admin Portal Forgot Password Link", htmlContent, "click the link to activate your account", "");
          await mail("", userMail, "Admin Portal Activation Link", mailBody, "", "");
          response = {
            "statusCode": 201,
            "message": "Please activate your account click on the link sent in your mail"
          }
        }
        else {
          // const token = await this.jwtService.generateToken(customers);
          let token = jwt.sign({ id: user.id, role: user.role, name: user.username }, constants.secret, { expiresIn: constants.expiresIn, algorithm: constants.algorithm });
          // const userProfile = this.userService.convertToUserProfile(credentials);
          response = {
            "statusCode": 200,
            "message": messages.LoginSuccess,
            "token": token
          }
        }
      }
      else {
        response = {
          "statusCode": 400,
          "message": "Please enter valid mailid and password"
        }
      }
    }
    else {
      let customers: any = await this.adminRepository.findOne({ where: { email: useremail } });
      if (customers) {
        let dbpass: any = customers?.password;
        let matchpass = await compare(userEnterPaswrd, dbpass);
        if (matchpass) {
          // const token = await this.jwtService.generateToken(customers);
          let token = jwt.sign({ adminid: customers.id, role: customers.username }, constants.secret, { expiresIn: constants.expiresIn, algorithm: constants.algorithm });
          response = {
            "statusCode": 200,
            "message": messages.LoginSuccess,
            "token": token
          }
        }
        else {
          response = {
            "statusCode": 202,
            "message": messages.InvaliCredentials
          }
        }
      }
      else {
        response = {
          "statusCode": 202,
          "message": messages.InvaliCredentials
        }
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
  @post(AUTH.FORGOTPASSWORD)
  async forgotPassword(@requestBody({
    content: {
      'application/json': { schema: forgotmail },
    }
  }) email: mailId): Promise<any> {

    let response: any;
    let userEnterEmailId = email.email;
    let activeStatus = await this.usersRepository.findOne({ where: { username: userEnterEmailId }, fields: { block: true, activation: true, id: true } });

    console.log(activeStatus);
    if (activeStatus) {
      let id = activeStatus.id;
      let HTMLcontentFile = (process.env.APP_URL ?? "https://devresources.aitestpro.com/apps/temp") + "/gb_user_activation.html?key=" + activeStatus.activation;

      let inActiveUser = activeStatus.block?? true;
      // const active_buffer = Buffer.from(activeStatus.block);
      // const active_boolean = Boolean(active_buffer.readInt8());
      let userNewPassword = await generateRandomPassword();

      // let encryptPswd = await encryptPassword(userNewPassword);
      const encryptPswd = await hash(userNewPassword, await genSalt());
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
      await mail('', userEnterEmailId, "Admin Portal Forgot Password Link", mailBody, "", "");
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
      }
    }
    return response;
  }
  @get(AUTH.USER_ACTIVATION)
  async activeuser(@param.path.string('key') key: string): Promise<any> {
    console.log(key);
    let response: any;
    let user = await this.usersRepository.findOne({ where: { activation: key } });
    if (user) {
      await this.usersRepository.updateById(user.id, { block: false });
      response = {
        "statusCode": 200,
        "message": "Account activated successfully"
      }
    }
    else {
      response = {
        "statusCode": 204,
        "message": "Invalid key"
      }
    }
    return response;
  }
  @authenticate('jwt')
  @post(AUTH.CHANGE_PASSWORD)
  async chnagePasswords(@requestBody(
    {
      content: {
        'application/json': { schema: chnagePassword },
      }
    }
  ) requestBody: {
    oldpassword: string;
    newpassword: string;
  }, @inject(SecurityBindings.USER)
    currentUserProfile: UserProfile): Promise<any> {
    let response: any;
    let oldpassword = requestBody.oldpassword;
    let newpassword = requestBody.newpassword;
    try {
      let hashOldPswrd = await hash(oldpassword, await genSalt())
      console.log(hashOldPswrd);
      let user: any = await this.usersRepository.findOne({ where: { id: currentUserProfile[securityId] } });
      console.log(user);
      if (user) {
        let matchPass = await compare(oldpassword, user.password)
        if (matchPass) {
          let hashNewPswrd = await hash(newpassword, await genSalt());
          await this.usersRepository.updateById(user.id, { password: hashNewPswrd });
          let userwithNewPswrd = await this.usersRepository.findById(user.id, { fields: { role: true, id: true } })
          const token = jwt.sign({ id: userwithNewPswrd.id, role: userwithNewPswrd.role, name: userwithNewPswrd.username }, constants.secret, { expiresIn: constants.expiresIn, algorithm: constants.algorithm });
          response = {
            "statusCode": 200,
            "message": "Password chnaged successfully",
            "token": token
          }
        }
        else {
          response = {
            "statusCode": 201,
            "message": "Please enter valid Oldpassword"
          }
        }
      }
      else {
        response = {
          "statusCode": 201,
          "message": "Please enter valid Oldpassword"
        }
      }
    }
    catch (error) {
      console.log(error);
      response = {
        "statusCode": 400,
        "message": "Error when changing the password"
      }
    }
    return response;
  }
  @get(AUTH.APP)
  async app(): Promise<any> {
    let data: any = { "name": constants.name, "version": constants.version, "NodeVersion": process.versions.node, "NpmVersion": constants.npm_version };
    let responseData =
    {
      "statusCode": 200,
      "message": "The project details",
      "AppData": data
    };
    return responseData;
  }
  @get(AUTH.IP)
  async ip(): Promise<any> {
    let req = this.request;
    let headers = req.headers;
    // console.log(headers);
    let xForwardFor = headers['X-Forwarded-For'];
    console.log(req.ip);
    // console.log(req.socket.);
    let data = { "userIp": req.ip, "socketAddress": req.socket.address, "socketRemoteAddress": req.socket.remoteAddress, "xForwardFor": xForwardFor }
    let responseData =
    {
      "statusCode": 200,
      "message": "The project details",
      "userConfig": data
    };
    return responseData;
  }
  @get('/user')
  async userss(): Promise<any> {
let user=await this.usersRepository.find();
return user;
  }
}

