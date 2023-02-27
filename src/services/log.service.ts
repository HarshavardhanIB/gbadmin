import {injectable, /* inject, */ BindingScope} from '@loopback/core';
import { HttpErrors } from '@loopback/rest';
import path from 'path';
import fs from 'fs';
import util from 'util';
const maxLogfileSize = 10 * 1024 * 1024; //(10) MB

@injectable({scope: BindingScope.TRANSIENT})
export class LogService {
  constructor(/* Add @inject to inject parameters */) {}

  /*
   * Add service methods here
   */
  async consoles(functionName:string,condition:string,result:string,err: any){
    try{
    console.log("enter into logs");
    let logfilePath = __dirname + '/logs.log';
    logfilePath = path.join(__dirname, '..', '..', 'logs', 'logs.log');
    const logFile = fs.createWriteStream(logfilePath, { flags: 'w' });
    const { size } = fs.statSync(logfilePath);
    if (size >= maxLogfileSize) {
      fs.truncateSync(logfilePath, 0)
    }
    if(err!=""){
      logFile.write(new Date().toISOString() + ": function name :" +functionName +" "+condition+" "+ util.format(err.message)+ '\n');
    }
    else{
      logFile.write(new Date().toISOString() + ": function name :" +functionName +" "+condition+" "+ '\n'); 
    }
  }
  catch(error){
console.log(error)
  };
   
  }
}
