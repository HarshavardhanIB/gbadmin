import { injectable, /* inject, */ BindingScope } from '@loopback/core';
import sharp from 'sharp';
import resizeImg from 'resize-img';
import fs from 'fs'
import { readFile, writeFile } from 'fs/promises';
import { BROKERIMG_RESOURCES_FOLDER } from '../paths';
@injectable({ scope: BindingScope.TRANSIENT })
export class ResizeimgService {
  constructor(/* Add @inject to inject parameters */) { }

  /*
   * Add service methods here
   */
  async resizeImg(filename: string) {
    try {
      console.log("enter into resize img ", filename);
      let imagee: any = await readFile(BROKERIMG_RESOURCES_FOLDER + "/" + filename);
      // let constNumfilelength = fs.readdirSync(BROKERIMG_RESOURCES_FOLDER + "/" + filename).length;
      let cImg = sharp(imagee);
      let bitmap: any = await cImg.metadata();
      let actualImgWidth = bitmap.width;
      let actualImgheight = bitmap.height;
      let aspectRatio = actualImgWidth / actualImgheight;
      let afterConvertWidth: number = aspectRatio * 100;
      var intvalue = Math.trunc(afterConvertWidth);
      const newImage = await resizeImg(imagee, { width: intvalue, height: 100 });
      fs.writeFileSync(BROKERIMG_RESOURCES_FOLDER + "/" + filename, newImage);
      console.log("Image")
      return true;
    }
    catch (error) {
      console.log(error);
      return false;
    }
  }

}
