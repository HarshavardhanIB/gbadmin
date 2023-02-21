import {injectable, /* inject, */ BindingScope} from '@loopback/core';
import * as xlsx from 'xlsx';
@injectable({scope: BindingScope.TRANSIENT})
export class Excel2Service {
  constructor(/* Add @inject to inject parameters */) {}

  /*
   * Add service methods here
   */
  async excelToJson(filepath: string){
    let workbook=xlsx.readFile(filepath);
    let worksheet=workbook.Sheets[workbook.SheetNames[0]]
    let jsonData=xlsx.utils.sheet_to_json(worksheet,{defval:''});
    console.log(jsonData);
    return jsonData;
  }
}
