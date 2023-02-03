import fs, { createWriteStream } from 'fs';
import { pipeline } from 'stream';
import { promisify } from 'util';
import FormData from 'form-data';
import axios, { AxiosRequestConfig } from 'axios';
// import fetch, { RequestInit } from 'node-fetch';
import fetch, { RequestInit } from 'node-fetch';

import path from 'path';
import { STATUS } from '../constants';
import { BindingScope, injectable } from '@loopback/core';

@injectable({ scope: BindingScope.TRANSIENT })
export class HttpService {

  constructor(/* Add @inject to inject parameters */) { }
  
   async get(url: string, headers: any, staticService: boolean): Promise<any> {

    let config: AxiosRequestConfig = {

      // data:{

      // }

    }

    if (headers) {
      config.headers = headers
    }

    try {
      const response = await axios.get(url, config);
      //console.log(response.data);
      if (staticService) {
        return response;
      } else {
        return response.data;
      }

    } catch (error) {
      console.log(`Aitestpro server connection??`)
      console.log(`${process.env.AITPSERVER}`)
      if (error.response) {
        if (error.response.data)
          return error.response.data;
        else
          return error.response;
      } else {
        console.error(error);
        return error
      }
      //return error.response.data.message;
    }


  }

  async post(url: string, data: any, headers: any) {
    let config: AxiosRequestConfig = {
      //data: data,
    }
    if (headers) {
      config.headers = headers
    }

    try {
      const response = await axios.post(url, data, config);
      //console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(`Aitestpro server connection??`)
      console.log(`${process.env.AITPSERVER}`)

      if (error.response) {
        if (error.response.data)
          return error.response.data;
        else
          return error.response;
      } else {
        console.error(error);
        return error
      }

    }
  }
  async fetchXml(url: string, dir: any) {
    const streamPipeline = promisify(pipeline);
    const res: any = await fetch(url);
    if (!res.ok) {
      return false
    }
    await streamPipeline(res.body, createWriteStream(dir + '/excel.xlsx'));
    return true;
  }
  async fetchMultipartFormdata(url: string, path: any) {
    try {
      const formFile = fs.createReadStream(path);
      const form = new FormData();
      form.append("file", formFile);
      
      // let satstus = await fetch(url, requestOptions)
      let status = await axios.post(url, form);
      console.log(">>>>>>>", status)
      // if(status)
      // {}
      return true;
    }
    catch (error) {
      console.log(error)
      return false;
    }
  }
}
