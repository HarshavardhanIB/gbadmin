import { PDFDocument, PDFRef } from 'pdf-lib';
export declare class PdfService {
    constructor();
    createNewPdfFile(filename: string): Promise<void>;
    createForm(): Promise<void>;
    fillForm(data: any): Promise<string>;
    modifyPdf(data: any): Promise<string>;
    addCustomerDataPdf_v1(data: any): Promise<string>;
    addCustomerDataPdf(data: any): Promise<string>;
    addSignaturePdf_v1(data: any): Promise<string>;
    addSignaturePdf(data: any): Promise<string>;
    savePDF(pdfBytes: any, filename: string): Promise<boolean>;
    createPageLinkAnnotation: (pdfDoc: PDFDocument, pageRef: PDFRef, position: any) => PDFRef;
}
