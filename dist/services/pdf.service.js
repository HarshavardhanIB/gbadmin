"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PdfService = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const moment_1 = tslib_1.__importDefault(require("moment"));
const node_fetch_1 = tslib_1.__importDefault(require("node-fetch"));
const pdf_lib_1 = require("pdf-lib");
const paths_1 = require("../paths");
const storage_helper_1 = require("../storage.helper");
//import {HttpService} from './http.service';
let PdfService = class PdfService {
    constructor( /* Add @inject to inject parameters */
    // @service(HttpService) protected http: HttpService
    ) {
        this.createPageLinkAnnotation = (pdfDoc, pageRef, position) => pdfDoc.context.register(pdfDoc.context.obj({
            Type: 'Annot',
            Subtype: 'Link',
            /* Bounds of the link on the page */
            Rect: [
                position.x1,
                position.y1,
                position.x2,
                position.y2 //height - 200 + 25, // upper right y coord
            ],
            /* Give the link a 2-unit-wide border, with sharp corners */
            Border: [0, 0, 0.5],
            /* Make the border color blue: rgb(0, 0, 1) */
            C: [0, 0, 0.1],
            /* Page to be visited when the link is clicked */
            // XYZ destination stands for 'left', 'top' and 'zoom' coordinates -null, null, null
            //Dest: [pageRef, 'XYZ', null, null, null],
            Dest: [pageRef, 'XYZ', null, null, null],
        }));
    }
    /*
     * Add service methods here
     */
    async createNewPdfFile(filename) {
    }
    async createForm() {
        const pdfDoc = await pdf_lib_1.PDFDocument.create();
        const page = pdfDoc.addPage([550, 750]);
        const form = pdfDoc.getForm();
        page.drawText('Enter your favorite superhero:', { x: 50, y: 700, size: 20 });
        const superheroField = form.createTextField('favorite.superhero');
        superheroField.setText('One Punch Man');
        superheroField.addToPage(page, { x: 55, y: 640 });
        page.drawText('Select your favorite rocket:', { x: 50, y: 600, size: 20 });
        page.drawText('Falcon Heavy', { x: 120, y: 560, size: 18 });
        page.drawText('Saturn IV', { x: 120, y: 500, size: 18 });
        page.drawText('Delta IV Heavy', { x: 340, y: 560, size: 18 });
        page.drawText('Space Launch System', { x: 340, y: 500, size: 18 });
        const rocketField = form.createRadioGroup('favorite.rocket');
        rocketField.addOptionToPage('Falcon Heavy', page, { x: 55, y: 540 });
        rocketField.addOptionToPage('Saturn IV', page, { x: 55, y: 480 });
        rocketField.addOptionToPage('Delta IV Heavy', page, { x: 275, y: 540 });
        rocketField.addOptionToPage('Space Launch System', page, { x: 275, y: 480 });
        rocketField.select('Saturn IV');
        page.drawText('Select your favorite gundams:', { x: 50, y: 440, size: 20 });
        page.drawText('Exia', { x: 120, y: 400, size: 18 });
        page.drawText('Kyrios', { x: 120, y: 340, size: 18 });
        page.drawText('Virtue', { x: 340, y: 400, size: 18 });
        page.drawText('Dynames', { x: 340, y: 340, size: 18 });
        const exiaField = form.createCheckBox('gundam.exia');
        const kyriosField = form.createCheckBox('gundam.kyrios');
        const virtueField = form.createCheckBox('gundam.virtue');
        const dynamesField = form.createCheckBox('gundam.dynames');
        exiaField.addToPage(page, { x: 55, y: 380 });
        kyriosField.addToPage(page, { x: 55, y: 320 });
        virtueField.addToPage(page, { x: 275, y: 380 });
        dynamesField.addToPage(page, { x: 275, y: 320 });
        exiaField.check();
        dynamesField.check();
        page.drawText('Select your favorite planet*:', { x: 50, y: 280, size: 20 });
        const planetsField = form.createDropdown('favorite.planet');
        planetsField.addOptions(['Venus', 'Earth', 'Mars', 'Pluto']);
        planetsField.select('Pluto');
        planetsField.addToPage(page, { x: 55, y: 220 });
        page.drawText('Select your favorite person:', { x: 50, y: 180, size: 18 });
        const personField = form.createOptionList('favorite.person');
        personField.addOptions([
            'Julius Caesar',
            'Ada Lovelace',
            'Cleopatra',
            'Aaron Burr',
            'Mark Antony',
        ]);
        personField.select('Ada Lovelace');
        personField.addToPage(page, { x: 55, y: 70 });
        page.drawText(`* Pluto should be a planet too!`, { x: 15, y: 15, size: 15 });
        const pdfBytes = await pdfDoc.save();
    }
    async fillForm(data) {
        const formUrl = paths_1.SERVER_FILES_PATH + 'PAD_Agreement.pdf'; //'https://pdf-lib.js.org/assets/dod_character.pdf'
        const formPdfBytes = await (0, node_fetch_1.default)(formUrl).then((res) => res.arrayBuffer()
        //res.buffer()
        );
        const marioUrl = 'https://pdf-lib.js.org/assets/small_mario.png';
        const marioImageBytes = await (0, node_fetch_1.default)(marioUrl).then((res) => res.arrayBuffer());
        const emblemUrl = 'https://pdf-lib.js.org/assets/mario_emblem.png';
        const emblemImageBytes = await (0, node_fetch_1.default)(emblemUrl).then((res) => res.arrayBuffer());
        const pdfDoc = await pdf_lib_1.PDFDocument.load(formPdfBytes);
        const marioImage = await pdfDoc.embedPng(marioImageBytes);
        const emblemImage = await pdfDoc.embedPng(emblemImageBytes);
        const form = pdfDoc.getForm();
        console.log(form);
        const nameField = form.getTextField('CharacterName 2');
        const ageField = form.getTextField('Age');
        const heightField = form.getTextField('Height');
        const weightField = form.getTextField('Weight');
        const eyesField = form.getTextField('Eyes');
        const skinField = form.getTextField('Skin');
        const hairField = form.getTextField('Hair');
        const alliesField = form.getTextField('Allies');
        const factionField = form.getTextField('FactionName');
        const backstoryField = form.getTextField('Backstory');
        const traitsField = form.getTextField('Feat+Traits');
        const treasureField = form.getTextField('Treasure');
        const characterImageField = form.getButton('CHARACTER IMAGE');
        const factionImageField = form.getButton('Faction Symbol Image');
        nameField.setText(data.name);
        ageField.setText('24 years');
        heightField.setText(`5' 1"`);
        weightField.setText('196 lbs');
        eyesField.setText('blue');
        skinField.setText('white');
        hairField.setText('brown');
        characterImageField.setImage(marioImage);
        alliesField.setText([
            `Allies:`,
            `  • Princess Daisy`,
            `  • Princess Peach`,
            `  • Rosalina`,
            `  • Geno`,
            `  • Luigi`,
            `  • Donkey Kong`,
            `  • Yoshi`,
            `  • Diddy Kong`,
            ``,
            `Organizations:`,
            `  • Italian Plumbers Association`,
        ].join('\n'));
        factionField.setText(`Mario's Emblem`);
        factionImageField.setImage(emblemImage);
        backstoryField.setText([
            `Mario is a fictional character in the Mario video game franchise, `,
            `owned by Nintendo and created by Japanese video game designer Shigeru `,
            `Miyamoto. Serving as the company's mascot and the eponymous `,
            `protagonist of the series, Mario has appeared in over 200 video games `,
            `since his creation. Depicted as a short, pudgy, Italian plumber who `,
            `resides in the Mushroom Kingdom, his adventures generally center `,
            `upon rescuing Princess Peach from the Koopa villain Bowser. His `,
            `younger brother and sidekick is Luigi.`,
        ].join('\n'));
        traitsField.setText([
            `Mario can use three basic three power-ups:`,
            `  • the Super Mushroom, which causes Mario to grow larger`,
            `  • the Fire Flower, which allows Mario to throw fireballs`,
            `  • the Starman, which gives Mario temporary invincibility`,
        ].join('\n'));
        treasureField.setText(['• Gold coins', '• Treasure chests'].join('\n'));
        const pdfBytes = await pdfDoc.save();
        let filename = "example.pdf";
        const saved = await this.savePDF(pdfBytes, filename);
        if (saved) {
            return paths_1.SERVER_FILES_PATH + filename;
        }
        else {
            return "Not saved";
        }
    }
    async modifyPdf(data) {
        //const url = 'https://pdf-lib.js.org/assets/with_update_sections.pdf'
        const url = paths_1.SERVER_FILES_PATH + 'PAD_Agreement.pdf'; //'https://pdf-lib.js.org/assets/dod_character.pdf'
        const existingPdfBytes = await (0, node_fetch_1.default)(url).then(res => res.arrayBuffer());
        const pdfDoc = await pdf_lib_1.PDFDocument.load(existingPdfBytes);
        //const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica)
        //customer signature
        let signature = data.signature; //"data:image/png;base64,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"
        //const signatureBytes = await fetch(signature).then(res => res.arrayBuffer())
        const signatureImage = await pdfDoc.embedPng(signature);
        const pages = pdfDoc.getPages();
        const firstPage = pages[0];
        const { width, height } = firstPage.getSize();
        console.log(`height: ${height}`);
        console.log(`width: ${width}`);
        // firstPage.drawLine({
        //   start: {x: 25, y: height - 100},
        //   end: {x: 25, y: height - 175},
        //   thickness: 2,
        //   color: rgb(0.75, 0.2, 0.2),
        //   opacity: 0.75,
        // })
        firstPage.drawText(data.name, {
            x: 48,
            y: height - 230,
            size: 11,
            //font: helveticaFont, //timesnewroman //default//
            //color: rgb(0.95, 0.1, 0.1),
            //rotate: degrees(-45),
        });
        const secondPage = pages[1];
        const width2 = secondPage.getSize().width;
        const height2 = secondPage.getSize().height;
        console.log(`height2: ${height2}`);
        console.log(`width2: ${width2}`);
        let chequeURL = data.voidChequeUrl;
        secondPage.drawRectangle({
            x: 42.5,
            y: height2 - 288,
            width: (580.5 - 42.5),
            height: (288 - 120),
            borderWidth: 1,
            // // borderColor: grayscale(0.5),
            // // color: rgb(0.75, 0.2, 0.2),
            // opacity: 0.5,
            // borderOpacity: 0.75,
        });
        //image 50, 130
        if (data.voidChequeType == "pdf") {
            const voidChequePDFUrl = chequeURL; //CUSTOMER_CHEQUES_PATH + '1663164790738.pdf'//'https://pdf-lib.js.org/assets/mario_emblem.png'
            const voidChequePDFBytes = await (0, node_fetch_1.default)(voidChequePDFUrl).then((res) => res.arrayBuffer());
            const [chequePDF] = await pdfDoc.embedPdf(voidChequePDFBytes);
            const chequePDFWidth = chequePDF.width; //300  -->
            const chequePDFHeight = chequePDF.height; //150
            console.log(`chequePDFWidth: ${chequePDFWidth}`);
            console.log(`chequePDFHeight: ${chequePDFHeight}`);
            const availablechequePDFWidth = 580.5 - 42.5; // 538
            const availablechequePDFHeight = 288 - 120; // 168
            console.log(`availablechequePDFWidth: ${availablechequePDFWidth}`);
            console.log(`availablechequePDFHeight: ${availablechequePDFHeight}`);
            //scaling 1.,0 0.75, 0.5, 0.25  //790, 594 //592.5, 445.5 //395 ,297 //197.5 ,148.5
            var widthx = 1 - ((chequePDFWidth - availablechequePDFWidth) / chequePDFWidth);
            let xScale = Math.round((widthx + Number.EPSILON) * 100) / 100;
            var heighty = 1 - ((chequePDFHeight - availablechequePDFHeight) / chequePDFHeight);
            let yScale = Math.round((heighty + Number.EPSILON) * 100) / 100;
            secondPage.drawPage(chequePDF, {
                x: 42.5,
                y: height2 - 288,
                xScale: xScale,
                yScale: yScale,
                width: (580.5 - 42.5),
                height: (288 - 120)
            });
        }
        else {
            const voidChequeImageUrl = chequeURL; //CUSTOMER_CHEQUES_PATH + '1663164790738.png'//'https://pdf-lib.js.org/assets/mario_emblem.png'
            const voidChequeImageBytes = await (0, node_fetch_1.default)(voidChequeImageUrl).then((res) => res.arrayBuffer());
            let chequeImage;
            if (voidChequeImageUrl.includes(".png")) {
                //png
                chequeImage = await pdfDoc.embedPng(voidChequeImageBytes);
            }
            else {
                //jpg
                chequeImage = await pdfDoc.embedJpg(voidChequeImageBytes);
            }
            const chequeImageWidth = chequeImage.width; //300  -->
            const chequeImageHeight = chequeImage.height; //150
            console.log(`chequeImageWidth: ${chequeImageWidth}`);
            console.log(`chequeImageHeight: ${chequeImageHeight}`);
            const availableChequeWidth = 433 - 103; // 330
            const availableChequeHeight = 788 - 750; // 38
            console.log(`availableChequeWidth: ${availableChequeWidth}`);
            console.log(`availableChequeHeight: ${availableChequeHeight}`);
            const chequeImageDims = chequeImage.scaleToFit(availableChequeWidth, availableChequeHeight);
            secondPage.drawImage(signatureImage, {
                x: 42.5,
                y: height2 - 288,
                width: chequeImageDims.width,
                height: chequeImageDims.height
            });
        }
        /* PAYOR INFO */
        secondPage.drawText(data.name, {
            x: 48,
            y: height2 - 342,
            size: 11,
        });
        secondPage.drawText([data.address1, data.address2].join(" "), {
            x: 48,
            y: height2 - 375,
            size: 11,
        });
        secondPage.drawText(data.apt, {
            x: 396,
            y: height2 - 375,
            size: 11,
        });
        secondPage.drawText(data.city, {
            x: 48,
            y: height2 - 408,
            size: 11,
        });
        secondPage.drawText(data.province, {
            x: 325,
            y: height2 - 408,
            size: 11,
        });
        secondPage.drawText(data.postalCode, {
            x: 396,
            y: height2 - 408,
            size: 11,
        });
        secondPage.drawText(data.phone, {
            x: 48,
            y: height2 - 442,
            size: 11,
        });
        secondPage.drawText(data.email, {
            x: 204,
            y: height2 - 442,
            size: 11,
        });
        /*BANK ACCOUNT INFO*/
        secondPage.drawText(data.bankName, {
            x: 48,
            y: height2 - 515,
            size: 11,
        });
        secondPage.drawText(data.bankAddress, {
            x: 48,
            y: height2 - 548,
            size: 11,
        });
        secondPage.drawText(data.bankCity, {
            x: 48,
            y: height2 - 582,
            size: 11,
        });
        secondPage.drawText(data.bankProvince, {
            x: 325,
            y: height2 - 582,
            size: 11,
        });
        secondPage.drawText(data.bankPostalCode, {
            x: 396,
            y: height2 - 582,
            size: 11,
        });
        secondPage.drawText(data.transitNumber, {
            x: 48,
            y: height2 - 614,
            size: 11,
        });
        secondPage.drawText(data.bankCode, {
            x: 240,
            y: height2 - 614,
            size: 11,
        });
        secondPage.drawText(data.accountNumber, {
            x: 396,
            y: height2 - 614,
            size: 11,
        });
        /*confirmation*/
        secondPage.drawText(data.name, {
            x: 48,
            y: height2 - 710,
            size: 11,
        });
        secondPage.drawText(data.name, {
            x: 48,
            y: height2 - 744,
            size: 11,
        });
        //drawImage signature
        const signatureImageWidth = signatureImage.width; //300  -->
        const signatureImageHeight = signatureImage.height; //150
        console.log(`signatureImageWidth: ${signatureImageWidth}`);
        console.log(`signatureImageHeight: ${signatureImageHeight}`);
        const availableSignatureWidth = 433 - 103; // 330
        const availableSignatureHeight = 788 - 750; // 38
        console.log(`availableSignatureWidth: ${availableSignatureWidth}`);
        console.log(`availableSignatureHeight: ${availableSignatureHeight}`);
        const signatureImageDims = signatureImage.scaleToFit(330, 40);
        secondPage.drawImage(signatureImage, {
            x: 103,
            y: height2 - 788,
            width: signatureImageDims.width,
            height: signatureImageDims.height
        });
        let today = (0, moment_1.default)().format('DD-MM-YYYY'); //or enrollmentDate??
        secondPage.drawText(today, {
            x: 455,
            y: height2 - 777,
            size: 11,
        });
        const pdfBytes = await pdfDoc.save();
        //let filename = "example2.pdf"
        const saved = await this.savePDF(pdfBytes, data.filename + ".pdf");
        if (saved) {
            return paths_1.SERVER_FOLDER + "/" + data.filename + ".pdf";
        }
        else {
            return "Not saved";
        }
    }
    async addCustomerDataPdf_v1(data) {
        const url = paths_1.SERVER_FILES_PATH + 'PAD_Agreement.pdf';
        const existingPdfBytes = await (0, node_fetch_1.default)(url).then(res => res.arrayBuffer());
        const pdfDoc = await pdf_lib_1.PDFDocument.load(existingPdfBytes);
        const pages = pdfDoc.getPages();
        const firstPage = pages[0];
        const { width, height } = firstPage.getSize();
        firstPage.drawText(data.name, {
            x: 48,
            y: height - 230,
            size: 11,
        });
        const secondPage = pages[1];
        const width2 = secondPage.getSize().width;
        const height2 = secondPage.getSize().height;
        console.log(`height2: ${height2}`);
        console.log(`width2: ${width2}`);
        let chequeURL = data.voidChequeUrl;
        const FULL_WHITE = (0, pdf_lib_1.rgb)(255 / 255, 255 / 255, 255 / 255);
        console.log(`border height ${(289 - 114)}`);
        console.log(`y: height2 - 289 ${(height2 - 289)}`);
        secondPage.drawRectangle({
            x: 42,
            y: height2 - 289,
            width: (580.5 - 42),
            //height: (295 - 114), //120
            height: (289 - 114),
            borderWidth: 0.50,
            color: FULL_WHITE,
            // // borderColor: grayscale(0.5),
            // // color: rgb(0.75, 0.2, 0.2),
            // opacity: 0.5,
            // borderOpacity: 0.75,
        });
        //image 50, 130
        if (data.voidChequeType == "pdf") {
            const voidChequePDFUrl = chequeURL; //CUSTOMER_CHEQUES_PATH + '1663164790738.pdf'//'https://pdf-lib.js.org/assets/mario_emblem.png'
            const voidChequePDFBytes = await (0, node_fetch_1.default)(voidChequePDFUrl).then((res) => res.arrayBuffer());
            const [chequePDF] = await pdfDoc.embedPdf(voidChequePDFBytes);
            const chequePDFWidth = chequePDF.width; //300  -->
            const chequePDFHeight = chequePDF.height; //150
            console.log(`chequePDFWidth: ${chequePDFWidth}`);
            console.log(`chequePDFHeight: ${chequePDFHeight}`);
            const availablechequePDFWidth = 580.5 - 42.5; // 538
            const availablechequePDFHeight = 288 - 120; // 168
            console.log(`availablechequePDFWidth: ${availablechequePDFWidth}`);
            console.log(`availablechequePDFHeight: ${availablechequePDFHeight}`);
            //scaling 1.,0 0.75, 0.5, 0.25  //790, 594 //592.5, 445.5 //395 ,297 //197.5 ,148.5
            let chequePDFaspect = Math.round(((chequePDFWidth / chequePDFHeight) + Number.EPSILON) * 100) / 100;
            //voidcheq  790.6/610.6 ==> 1.294
            let heighty = 1 - ((chequePDFHeight - availablechequePDFHeight) / chequePDFHeight);
            let yScale = Math.round((heighty + Number.EPSILON) * 100) / 100;
            let adjustedChequeWidth = chequePDFaspect * availablechequePDFHeight;
            console.log(`adjustedChequeWidth: ${adjustedChequeWidth}`);
            let widthx = 1 - ((adjustedChequeWidth - availablechequePDFWidth) / adjustedChequeWidth);
            let xScale = Math.round((widthx + Number.EPSILON) * 100) / 100;
            // var widthx = 1 - ((chequePDFWidth - availablechequePDFWidth) / chequePDFWidth)
            // let xScale = Math.round((widthx + Number.EPSILON) * 100) / 100
            // var heighty = 1 - ((chequePDFHeight - availablechequePDFHeight) / chequePDFHeight)
            // let yScale = Math.round((heighty + Number.EPSILON) * 100) / 100
            console.log(`cheque height ${(availablechequePDFHeight - 1.5)}`);
            console.log(`xScale: ${xScale}`);
            console.log(`yScale: ${yScale}`);
            secondPage.drawPage(chequePDF, {
                x: 43.5,
                y: height2 - 288,
                //xScale: xScale,
                yScale: yScale,
                width: (adjustedChequeWidth - 1),
                height: (availablechequePDFHeight - 1.5) //(288 - 120) 168
            });
        }
        else {
            const voidChequeImageUrl = chequeURL; //CUSTOMER_CHEQUES_PATH + '1663164790738.png'//'https://pdf-lib.js.org/assets/mario_emblem.png'
            const voidChequeImageBytes = await (0, node_fetch_1.default)(voidChequeImageUrl).then((res) => res.arrayBuffer());
            let chequeImage;
            if (voidChequeImageUrl.includes(".png")) {
                //png
                chequeImage = await pdfDoc.embedPng(voidChequeImageBytes);
            }
            else {
                //jpg
                chequeImage = await pdfDoc.embedJpg(voidChequeImageBytes);
            }
            const chequeImageWidth = chequeImage.width; //300  -->
            const chequeImageHeight = chequeImage.height; //150
            console.log(`chequeImageWidth: ${chequeImageWidth}`);
            console.log(`chequeImageHeight: ${chequeImageHeight}`);
            const availableChequeWidth = 580.5 - 42.5; // 538
            const availableChequeHeight = 288 - 120; // 168
            // const availableChequeWidth = 433 - 103 // 330
            // const availableChequeHeight = 788 - 750 // 38
            console.log(`availableChequeWidth: ${availableChequeWidth}`);
            console.log(`availableChequeHeight: ${availableChequeHeight}`);
            const chequeImageDims = chequeImage.scaleToFit(availableChequeWidth, availableChequeHeight);
            console.log(`cheque img height ${chequeImageDims.height}`);
            secondPage.drawImage(chequeImage, {
                x: 43.5,
                y: height2 - 288,
                width: chequeImageDims.width,
                height: chequeImageDims.height - 0.5
            });
        }
        /* PAYOR INFO */
        secondPage.drawText(data.name, {
            x: 48,
            y: height2 - 342,
            size: 11,
        });
        secondPage.drawText([data.address1, data.address2].join(" "), {
            x: 48,
            y: height2 - 375,
            size: 11,
        });
        secondPage.drawText(data.apt, {
            x: 396,
            y: height2 - 375,
            size: 11,
        });
        secondPage.drawText(data.city, {
            x: 48,
            y: height2 - 408,
            size: 11,
        });
        secondPage.drawText(data.province, {
            x: 325,
            y: height2 - 408,
            size: 11,
        });
        secondPage.drawText(data.postalCode, {
            x: 396,
            y: height2 - 408,
            size: 11,
        });
        secondPage.drawText(data.phone, {
            x: 48,
            y: height2 - 442,
            size: 11,
        });
        secondPage.drawText(data.email, {
            x: 204,
            y: height2 - 442,
            size: 11,
        });
        /*BANK ACCOUNT INFO*/
        secondPage.drawText(data.bankName, {
            x: 48,
            y: height2 - 515,
            size: 11,
        });
        secondPage.drawText(data.bankAddress, {
            x: 48,
            y: height2 - 548,
            size: 11,
        });
        secondPage.drawText(data.bankCity, {
            x: 48,
            y: height2 - 582,
            size: 11,
        });
        secondPage.drawText(data.bankProvince, {
            x: 325,
            y: height2 - 582,
            size: 11,
        });
        secondPage.drawText(data.bankPostalCode, {
            x: 396,
            y: height2 - 582,
            size: 11,
        });
        secondPage.drawText(data.transitNumber, {
            x: 48,
            y: height2 - 614,
            size: 11,
        });
        secondPage.drawText(data.bankCode, {
            x: 240,
            y: height2 - 614,
            size: 11,
        });
        secondPage.drawText(data.accountNumber, {
            x: 396,
            y: height2 - 614,
            size: 11,
        });
        /*confirmation*/
        secondPage.drawText(data.name, {
            x: 48,
            y: height2 - 710,
            size: 11,
        });
        secondPage.drawText(data.name, {
            x: 48,
            y: height2 - 744,
            size: 11,
        });
        const pdfBytes = await pdfDoc.save();
        data.filename = "PAD_Agreement_" + data.filename;
        //let filename = "example2.pdf"
        const saved = await this.savePDF(pdfBytes, data.filename + ".pdf");
        console.log(data.filename + ".pdf");
        if (saved) {
            //return SERVER_FOLDER + "/" + data.filename + ".pdf"
            return paths_1.SERVER_FILES_PATH + data.filename + ".pdf";
        }
        else {
            return "Not saved";
        }
    }
    async addCustomerDataPdf(data) {
        //v2 new letter sized template
        const url = paths_1.SERVER_FILES_PATH + 'PAD_Agreement_Letter.pdf';
        const existingPdfBytes = await (0, node_fetch_1.default)(url).then(res => res.arrayBuffer());
        const pdfDoc = await pdf_lib_1.PDFDocument.load(existingPdfBytes);
        const pages = pdfDoc.getPages();
        const firstPage = pages[0];
        const { width, height } = firstPage.getSize();
        firstPage.drawText(data.name, {
            x: 48,
            y: height - 233,
            size: 11,
        });
        const secondPage = pages[1];
        const width2 = secondPage.getSize().width;
        const height2 = secondPage.getSize().height;
        console.log(`height2: ${height2}`);
        console.log(`width2: ${width2}`);
        //26, 115, 232
        //10.2, 45.1, 91
        const BLUE = (0, pdf_lib_1.rgb)(0.1, 0.45, 0.91);
        const D_BLUE = (0, pdf_lib_1.rgb)(0.1, 0.5, 0.95);
        // const link = this.createPageLinkAnnotation(secondPage, "Attached at the bottom of this agreement in Page 3/3");
        // secondPage.node.set(PDFName.of('Annots'), pdfDoc.context.obj([link]));
        // secondPage.drawText("Attached at the bottom of this agreement in Page 3", {
        //   x: 48,
        //   y: height2 - 373,
        //   size: 9,
        //   color: BLUE
        // })
        // secondPage.drawText('Click here to see Void Cheque', {size: 10, x: 300, y: height2 - 373, color: D_BLUE});
        const thirdPage = pages[2];
        /*
    
      x1,y2-----------------------x2,y2
        |                           |
        |    Link Clickable Area    |
        |        wrt                |
      x1,y1-----------------------x2,y1
    
        */
        const linkAreaPosition = {
            x1: 300 - 2,
            y1: height2 - 373 - 3,
            x2: 435,
            y2: height2 - 373 + 7, // upper right y coord
        };
        // const voidChequeLink = this.createPageLinkAnnotation(pdfDoc, thirdPage.ref, linkAreaPosition);
        // secondPage.node.set(PDFName.of('Annots'), pdfDoc.context.obj([voidChequeLink]));
        /* PAYOR INFO */
        secondPage.drawText(data.name, {
            x: 48,
            y: height2 - 430,
            size: 11,
        });
        secondPage.drawText([data.address1, data.address2].join(" "), {
            x: 48,
            y: height2 - 462,
            size: 11,
        });
        secondPage.drawText(data.apt, {
            x: 401,
            y: height2 - 462,
            size: 11,
        });
        secondPage.drawText(data.city, {
            x: 48,
            y: height2 - 496,
            size: 11,
        });
        secondPage.drawText(data.province, {
            x: 323,
            y: height2 - 496,
            size: 11,
        });
        secondPage.drawText(data.postalCode, {
            x: 396,
            y: height2 - 496,
            size: 11,
        });
        secondPage.drawText(data.phone, {
            x: 48,
            y: height2 - 531,
            size: 11,
        });
        secondPage.drawText(data.email, {
            x: 207,
            y: height2 - 531,
            size: 11,
        });
        /*BANK ACCOUNT INFO*/
        secondPage.drawText(data.bankName, {
            x: 48,
            y: height2 - 617,
            size: 11,
        });
        secondPage.drawText(data.bankAddress, {
            x: 48,
            y: height2 - 650,
            size: 11,
        });
        secondPage.drawText(data.bankCity, {
            x: 48,
            y: height2 - 685,
            size: 11,
        });
        secondPage.drawText(data.bankProvince, {
            x: 325,
            y: height2 - 685,
            size: 11,
        });
        secondPage.drawText(data.bankPostalCode, {
            x: 396,
            y: height2 - 685,
            size: 11,
        });
        secondPage.drawText(data.transitNumber, {
            x: 48,
            y: height2 - 718,
            size: 11,
        });
        secondPage.drawText(data.bankCode, {
            x: 240,
            y: height2 - 718,
            size: 11,
        });
        secondPage.drawText(data.accountNumber, {
            x: 396,
            y: height2 - 718,
            size: 11,
        });
        const width3 = thirdPage.getSize().width;
        const height3 = thirdPage.getSize().height;
        console.log(`height3: ${height3}`);
        console.log(`width3: ${width3}`);
        let chequeURL = data.voidChequeUrl;
        const FULL_WHITE = (0, pdf_lib_1.rgb)(255 / 255, 255 / 255, 255 / 255);
        console.log(`border height ${(289 - 114)}`);
        console.log(`y: height2 - 289 ${(height2 - 289)}`);
        thirdPage.drawRectangle({
            x: 42,
            y: height3 - 652,
            width: (580.5 - 42),
            //height: (295 - 114), //120
            height: (652 - 350),
            borderWidth: 0.50,
            color: FULL_WHITE,
            // // borderColor: grayscale(0.5),
            // // color: rgb(0.75, 0.2, 0.2),
            // opacity: 0.5,
            // borderOpacity: 0.75,
        });
        //image 50, 130
        if (data.voidChequeType == "pdf") {
            const voidChequePDFUrl = chequeURL; //CUSTOMER_CHEQUES_PATH + '1663164790738.pdf'//'https://pdf-lib.js.org/assets/mario_emblem.png'
            const voidChequePDFBytes = await (0, node_fetch_1.default)(voidChequePDFUrl).then((res) => res.arrayBuffer());
            const [chequePDF] = await pdfDoc.embedPdf(voidChequePDFBytes);
            const chequePDFWidth = chequePDF.width; //300  -->
            const chequePDFHeight = chequePDF.height; //150
            console.log(`chequePDFWidth: ${chequePDFWidth}`);
            console.log(`chequePDFHeight: ${chequePDFHeight}`);
            const availablechequePDFWidth = 580.5 - 42.5; // 538
            const availablechequePDFHeight = 650 - 350; // 168
            console.log(`availablechequePDFWidth: ${availablechequePDFWidth}`);
            console.log(`availablechequePDFHeight: ${availablechequePDFHeight}`);
            //scaling 1.,0 0.75, 0.5, 0.25  //790, 594 //592.5, 445.5 //395 ,297 //197.5 ,148.5
            let chequePDFaspect = Math.round(((chequePDFWidth / chequePDFHeight) + Number.EPSILON) * 100) / 100;
            //voidcheq  790.6/610.6 ==> 1.294
            let heighty = 1 - ((chequePDFHeight - availablechequePDFHeight) / chequePDFHeight);
            let yScale = Math.round((heighty + Number.EPSILON) * 100) / 100;
            let adjustedChequeWidth = chequePDFaspect * availablechequePDFHeight;
            console.log(`adjustedChequeWidth: ${adjustedChequeWidth}`);
            let widthx = 1 - ((adjustedChequeWidth - availablechequePDFWidth) / adjustedChequeWidth);
            let xScale = Math.round((widthx + Number.EPSILON) * 100) / 100;
            // var widthx = 1 - ((chequePDFWidth - availablechequePDFWidth) / chequePDFWidth)
            // let xScale = Math.round((widthx + Number.EPSILON) * 100) / 100
            // var heighty = 1 - ((chequePDFHeight - availablechequePDFHeight) / chequePDFHeight)
            // let yScale = Math.round((heighty + Number.EPSILON) * 100) / 100
            console.log(`cheque height ${(availablechequePDFHeight - 1.5)}`);
            console.log(`xScale: ${xScale}`);
            console.log(`yScale: ${yScale}`);
            thirdPage.drawPage(chequePDF, {
                x: 43.5,
                y: height3 - 650,
                //xScale: xScale,
                yScale: yScale,
                width: (adjustedChequeWidth - 1),
                height: (availablechequePDFHeight - 1.5) //(288 - 120) 168
            });
        }
        else {
            const voidChequeImageUrl = chequeURL; //CUSTOMER_CHEQUES_PATH + '1663164790738.png'//'https://pdf-lib.js.org/assets/mario_emblem.png'
            const voidChequeImageBytes = await (0, node_fetch_1.default)(voidChequeImageUrl).then((res) => res.arrayBuffer());
            let chequeImage;
            if (voidChequeImageUrl.includes(".png")) {
                //png
                chequeImage = await pdfDoc.embedPng(voidChequeImageBytes);
            }
            else {
                //jpg
                chequeImage = await pdfDoc.embedJpg(voidChequeImageBytes);
            }
            const chequeImageWidth = chequeImage.width; //300  -->
            const chequeImageHeight = chequeImage.height; //150
            console.log(`chequeImageWidth: ${chequeImageWidth}`);
            console.log(`chequeImageHeight: ${chequeImageHeight}`);
            const availableChequeWidth = 580.5 - 42.5; // 538
            const availableChequeHeight = 650 - 350; // 300
            // const availableChequeWidth = 433 - 103 // 330
            // const availableChequeHeight = 788 - 750 // 38
            console.log(`availableChequeWidth: ${availableChequeWidth}`);
            console.log(`availableChequeHeight: ${availableChequeHeight}`);
            const chequeImageDims = chequeImage.scaleToFit(availableChequeWidth, availableChequeHeight);
            console.log(`cheque img height ${chequeImageDims.height}`);
            thirdPage.drawImage(chequeImage, {
                x: 43.5,
                y: height3 - 650,
                width: chequeImageDims.width,
                height: chequeImageDims.height - 0.5
            });
        }
        /*confirmation*/
        thirdPage.drawText(data.name, {
            x: 48,
            y: height2 - 143,
            size: 11,
        });
        thirdPage.drawText(data.name, {
            x: 48,
            y: height2 - 176,
            size: 11,
        });
        const pdfBytes = await pdfDoc.save();
        data.filename = "PAD_Agreement_l_" + data.filename;
        //let filename = "example2.pdf"
        const saved = await this.savePDF(pdfBytes, data.filename + ".pdf");
        console.log(data.filename + ".pdf");
        if (saved) {
            //return SERVER_FOLDER + "/" + data.filename + ".pdf"
            return paths_1.SERVER_FILES_PATH + data.filename + ".pdf";
        }
        else {
            return "Not saved";
        }
    }
    async addSignaturePdf_v1(data) {
        //const url = 'https://pdf-lib.js.org/assets/with_update_sections.pdf'
        const url = data.url; //SERVER_FILES_PATH + 'PAD_Agreement.pdf' //'https://pdf-lib.js.org/assets/dod_character.pdf'
        const existingPdfBytes = await (0, node_fetch_1.default)(url).then(res => res.arrayBuffer());
        const pdfDoc = await pdf_lib_1.PDFDocument.load(existingPdfBytes);
        //const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica)
        let signature = data.signature; //"data:image/png;base64,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"
        //const signatureBytes = await fetch(signature).then(res => res.arrayBuffer())
        const signatureImage = await pdfDoc.embedPng(signature);
        const pages = pdfDoc.getPages();
        const secondPage = pages[1];
        const width2 = secondPage.getSize().width;
        const height2 = secondPage.getSize().height;
        console.log(`height2: ${height2}`);
        console.log(`width2: ${width2}`);
        //drawImage signature
        const signatureImageWidth = signatureImage.width; //300  -->
        const signatureImageHeight = signatureImage.height; //150
        console.log(`signatureImageWidth: ${signatureImageWidth}`);
        console.log(`signatureImageHeight: ${signatureImageHeight}`);
        const availableSignatureWidth = 433 - 103; // 330
        const availableSignatureHeight = 788 - 750; // 38
        console.log(`availableSignatureWidth: ${availableSignatureWidth}`);
        console.log(`availableSignatureHeight: ${availableSignatureHeight}`);
        const signatureImageDims = signatureImage.scaleToFit(330, 40);
        secondPage.drawImage(signatureImage, {
            x: 103,
            y: height2 - 788,
            width: signatureImageDims.width,
            height: signatureImageDims.height
        });
        let today = (0, moment_1.default)().format('DD-MM-YYYY'); //or enrollmentDate??
        secondPage.drawText(today, {
            x: 455,
            y: height2 - 777,
            size: 11,
        });
        const pdfBytes = await pdfDoc.save();
        //let filename = "example2.pdf"
        const saved = await this.savePDF(pdfBytes, data.filename + ".pdf");
        if (saved) {
            //return SERVER_FOLDER + "/" + data.filename + ".pdf"
            return paths_1.SERVER_FILES_PATH + data.filename + ".pdf";
        }
        else {
            return "Not saved";
        }
    }
    async addSignaturePdf(data) {
        //v2 new template of letter-sized
        const url = data.url;
        const existingPdfBytes = await (0, node_fetch_1.default)(url).then(res => res.arrayBuffer());
        const pdfDoc = await pdf_lib_1.PDFDocument.load(existingPdfBytes);
        //const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica)
        let signature = data.signature; //"data:image/png;base64,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"
        const signatureImage = await pdfDoc.embedPng(signature);
        const pages = pdfDoc.getPages();
        const thirdPage = pages[2];
        const width3 = thirdPage.getSize().width;
        const height3 = thirdPage.getSize().height;
        console.log(`height3: ${height3}`);
        console.log(`width3: ${width3}`);
        //drawImage signature
        const signatureImageWidth = signatureImage.width; //300  -->
        const signatureImageHeight = signatureImage.height; //150
        console.log(`signatureImageWidth: ${signatureImageWidth}`);
        console.log(`signatureImageHeight: ${signatureImageHeight}`);
        const availableSignatureWidth = 433 - 103; // 330
        const availableSignatureHeight = 227 - 186; // 41
        console.log(`availableSignatureWidth: ${availableSignatureWidth}`);
        console.log(`availableSignatureHeight: ${availableSignatureHeight}`);
        const signatureImageDims = signatureImage.scaleToFit(330, 40); //signaute image always 330 width and 40 height
        thirdPage.drawImage(signatureImage, {
            x: 103,
            y: height3 - 227,
            width: signatureImageDims.width,
            height: signatureImageDims.height
        });
        let today = (0, moment_1.default)().format('DD-MM-YYYY'); //or enrollmentDate??
        thirdPage.drawText(today, {
            x: 455,
            y: height3 - 213,
            size: 11,
        });
        const pdfBytes = await pdfDoc.save();
        //let filename = "example2.pdf"
        const saved = await this.savePDF(pdfBytes, data.filename + ".pdf");
        if (saved) {
            //return SERVER_FOLDER + "/" + data.filename + ".pdf"
            return paths_1.SERVER_FILES_PATH + data.filename + ".pdf";
        }
        else {
            return "Not saved";
        }
    }
    async savePDF(pdfBytes, filename) {
        try {
            await (0, storage_helper_1.createFilex)(paths_1.SERVER_FOLDER, filename, pdfBytes);
            return true;
            // fos.flush();
        }
        catch (error) {
            // TODO Auto-generated catch block
            console.log(error);
            return false;
        }
    }
};
PdfService = tslib_1.__decorate([
    (0, core_1.injectable)({ scope: core_1.BindingScope.TRANSIENT }),
    tslib_1.__metadata("design:paramtypes", [])
], PdfService);
exports.PdfService = PdfService;
//# sourceMappingURL=pdf.service.js.map