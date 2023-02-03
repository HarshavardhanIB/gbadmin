import { /* inject, */ BindingScope, injectable} from '@loopback/core';
//import * as excel from 'exceljs';
import * as excel from 'exceljs';
import * as fs from 'fs';
import moment from 'moment';

@injectable({scope: BindingScope.TRANSIENT})
export class ExcelService {
  constructor(/* Add @inject to inject parameters */) { }

  /*
   * Add service methods here
   */
  //fs.readFile();
  //excel.wor

  async createNewExcelFile(filename: string) {
    const fileExists = await this.checkFileExistsSync(filename);
    if (fileExists) {
      return this.readExcelFile(filename);
    } else {
      const workbook = new excel.Workbook();
      workbook.creator = 'GroupBenefitz';
      workbook.lastModifiedBy = 'Admin';
      workbook.created = moment(new Date(), "YYYY-MM-DD").toDate()

      workbook.addWorksheet();

      await workbook.xlsx.writeFile(filename).then(function () {
        console.log("xlsx file is written.");
        console.log("Excel File has been created successfully.");
      });

      return workbook;
    }


  }

  async copyFromCreateNew(templateFile: string, newFilename: string) {
    const existing_wb = await this.readExcelFile(templateFile);

    const workbook = existing_wb;//new excel.Workbook();
    workbook.creator = 'GroupBenefitz';
    workbook.lastModifiedBy = 'Admin';
    workbook.created = moment(new Date(), "YYYY-MM-DD").toDate()


    await workbook.xlsx.writeFile(newFilename).then(function () {
      console.log("new xlsx file is written." + newFilename);
      console.log("Excel File has been created successfully.");
    });

    return workbook;
  }

  async fillHeader(wb: excel.Workbook, rowNumber: number, headerValues: any) {
    let sheet = wb.worksheets[0];//wb.getWorksheet(0); //or 1 //first
    let row = sheet.getRow(rowNumber);
    let cellNumber = 1;
    let cell;
    for (let header of headerValues) {
      cell = row.getCell(cellNumber)
      cell.value = header
      cell.style = this.styles('headerStyle');
      cellNumber++;
    }
  }

  async fillData(wb: excel.Workbook, rowNumber: number, dataValues: any) {
    let sheet = wb.worksheets[0];//wb.getWorksheet(0); //or 1 //first
    let row = sheet.getRow(rowNumber);
    let cellNumber = 1;
    let cell;
    console.log(`dataValues: ${dataValues.length}`)
    for (let data of dataValues) {
      cell = row.getCell(cellNumber)
      cell.value = data
      cellNumber++;
    }
  }

  async readExcelFile(filename: string) {
    // read from a file
    const workbook = new excel.Workbook();
    await workbook.xlsx.readFile(filename);
    return workbook;
  }

  async saveExcel(wb: excel.Workbook, filename: string) {
    try {
      // wb.write(fos);
      this.autoWidth(wb.worksheets[0]);
      await wb.xlsx.writeFile(filename);
      return true;
      // fos.flush();
    } catch (error) {
      // TODO Auto-generated catch block
      console.log(error);
      return false;
    }
  }

  async checkFileExistsSync(filepath: string) {
    let flag = true;
    try {

      fs.accessSync(filepath, fs.constants.F_OK);
    } catch (e) {
      flag = false;
    }
    return flag;
  }

  private styles(celltype: any) {
    const font = {color: {argb: 'FFFFFF'}, 'bold': true}

    const alignment = {vertical: 'middle', horizontal: 'center'};//direct property of cell.. not a style property
    const border = {
      top: {style: 'double', color: {argb: 'FF00FF00'}},
      left: {style: 'double', color: {argb: 'FF00FF00'}},
      bottom: {style: 'double', color: {argb: 'FF00FF00'}},
      right: {style: 'double', color: {argb: 'FF00FF00'}}
    };//direct property of cell.. not a style property
    //{ name: 'Comic Sans MS', family: 4, size: 16, underline: 'double', bold: true };
    const font1 = {
      name: 'Arial',
      size: 12,
      color: {
        argb: 'FFFFFF00'
      }
    };
    const fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: {
        argb: 'FCA041'
      }
    }

    let style: any = {}

    switch (celltype) {

      case 'headerStyle':
        style.font = font;
        style.fill = fill;
        style.fill.fgColor = {argb: 'FF9900'}

        break;


      default:
        style.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: {argb: 'FFFFFF'}
        };


    }
    // style.font = font;
    return style;

  }

  /**
* Autofit columns by width
*
* @param worksheet {ExcelJS.Worksheet}
* @param minimalWidth
*/
  autoWidth = (worksheet: any, minimalWidth = 10) => {
    worksheet.columns.forEach((column: any) => {
      let maxColumnLength = 0;
      column.eachCell({includeEmpty: true}, (cell: any) => {
        maxColumnLength = Math.max(
          maxColumnLength,
          minimalWidth,
          cell.value ? cell.value.toString().length : 0
        );
      });
      column.width = maxColumnLength + 2;
    });
  };
}
