import * as excel from 'exceljs';
export declare class ExcelService {
    constructor();
    createNewExcelFile(filename: string): Promise<excel.Workbook>;
    copyFromCreateNew(templateFile: string, newFilename: string): Promise<excel.Workbook>;
    fillHeader(wb: excel.Workbook, rowNumber: number, headerValues: any): Promise<void>;
    fillData(wb: excel.Workbook, rowNumber: number, dataValues: any): Promise<void>;
    readExcelFile(filename: string): Promise<excel.Workbook>;
    saveExcel(wb: excel.Workbook, filename: string): Promise<boolean>;
    checkFileExistsSync(filepath: string): Promise<boolean>;
    private styles;
    /**
  * Autofit columns by width
  *
  * @param worksheet {ExcelJS.Worksheet}
  * @param minimalWidth
  */
    autoWidth: (worksheet: any, minimalWidth?: number) => void;
    excelToJson(filepath: string, type: string): Promise<any>;
    sheetData(worksheet: excel.Worksheet, type: any): Promise<any>;
}
