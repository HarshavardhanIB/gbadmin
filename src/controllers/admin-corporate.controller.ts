// Uncomment these imports to begin using these cool features!

import { model, property, repository } from '@loopback/repository';
import { getModelSchemaRef, post, requestBody, SchemaObject } from "@loopback/rest";
import { genSalt, hash, compare } from 'bcryptjs';
import * as jwt from 'jsonwebtoken'
import * as messages from '../constants/messages.constants';
import * as constants from '../services/constants'
import * as CONST from '../constants'
import {
  Credentials,
  MyUserService,
  TokenServiceBindings,
  User,
  UserRepository,
  UserServiceBindings,
} from '@loopback/authentication-jwt';
import { AdminRepository, UsersRepository } from '../repositories';
import { authenticate } from '@loopback/authentication';
import { authorize } from '@loopback/authorization';

import { getActivationCode, randomString } from '../common-functions';
import moment from 'moment';
import { Users } from '../models';
import { NewUserRequest } from './auth.controller';
import { basicAuthorization } from '../middlewares/auth.middleware';
// import {inject} from '@loopback/core';
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
const CredentialsRequestBody = {
  description: 'The input of login function',
  required: true,
  content: {
    'application/json': { schema: CredentialsSchema },
  },
};
export class AdminCorporateController {

  constructor(@repository(UsersRepository)
  public usersRepository: UsersRepository,
    @repository(AdminRepository)
    public adminRepository: AdminRepository,) { }
  @authenticate('jwt')
  @authorize({
    allowedRoles: [CONST.USER_ROLE.CORPORATE_ADMINISTRATOR],
    voters: [basicAuthorization],
  })
  @post('/auth/signup', {
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
          }),
        },
      },
    })
    newUserRequest: NewUserRequest,
  ): Promise<any> {
    let res: any = {};
    let emailCount = await this.usersRepository.count({ where: { email: newUserRequest.email } });
    if (emailCount.count <= 0) {
      console.log(newUserRequest.password);
      const password = await hash(newUserRequest.password, await genSalt());
      // const savedUser = await this.userRepository.create(
      //   _.omit(newUserRequest, 'password'),
      // );
      // await this.userRepository.userCredentials(savedUser.id).create({ password });

      const saveAdmin = await this.adminRepository.create(newUserRequest);
      const newUser: Users = new Users();
      console.log(newUserRequest);
      let userModel = newUserRequest;
      newUser.registrationDate = moment().format('YYYY-MM-DD')
      newUser.activation = await getActivationCode();
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
  @post('/corporate/signin')
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
      let userPass: any = user.password;
      let matchpass = await compare(userEnterPaswrd, userPass);
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
          }
        }
        else {
          // const token = await this.jwtService.generateToken(customers);
          let token = jwt.sign({ adminid: user.id, role: user.username }, constants.secret, { expiresIn: constants.expiresIn, algorithm: constants.algorithm });
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

  }
}
