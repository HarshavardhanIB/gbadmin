"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResizeimgService = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const sharp_1 = tslib_1.__importDefault(require("sharp"));
const resize_img_1 = tslib_1.__importDefault(require("resize-img"));
const fs_1 = tslib_1.__importDefault(require("fs"));
const promises_1 = require("fs/promises");
const paths_1 = require("../paths");
let ResizeimgService = class ResizeimgService {
    constructor( /* Add @inject to inject parameters */) { }
    /*
     * Add service methods here
     */
    async resizeImg(filename) {
        try {
            console.log("enter into resize img ", filename);
            let imagee = await (0, promises_1.readFile)(paths_1.BROKERIMG_RESOURCES_FOLDER + "/" + filename);
            // let constNumfilelength = fs.readdirSync(BROKERIMG_RESOURCES_FOLDER + "/" + filename).length;
            let cImg = (0, sharp_1.default)(imagee);
            let bitmap = await cImg.metadata();
            let actualImgWidth = bitmap.width;
            let actualImgheight = bitmap.height;
            let aspectRatio = actualImgWidth / actualImgheight;
            let afterConvertWidth = aspectRatio * 100;
            var intvalue = Math.trunc(afterConvertWidth);
            const newImage = await (0, resize_img_1.default)(imagee, { width: intvalue, height: 100 });
            fs_1.default.writeFileSync(paths_1.BROKERIMG_RESOURCES_FOLDER + "/" + filename, newImage);
            console.log("Image");
            return true;
        }
        catch (error) {
            console.log(error);
            return false;
        }
    }
};
ResizeimgService = tslib_1.__decorate([
    (0, core_1.injectable)({ scope: core_1.BindingScope.TRANSIENT }),
    tslib_1.__metadata("design:paramtypes", [])
], ResizeimgService);
exports.ResizeimgService = ResizeimgService;
//# sourceMappingURL=resizeimg.service.js.map