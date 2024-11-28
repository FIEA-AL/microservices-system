import { defineStore } from 'pinia';
import { QrCodeService } from '../service/QrCodeService';

export const useQRCodeApi = defineStore('QRCodeApi', {
  state: () => ({
    qrcodeNames: [] as [string, string][],
    qrcodeUrls: [] as string[], 
  }),
  getters: {
    filterOutIds (state) {
      return state.qrcodeNames.map(([first]) => first);
    }
  },
  actions: {
    async getQrCodes () {
      const data = await QrCodeService.getQRCodes()
      this.fillStates(data);
    },
    async saveQrCode (name: string, url: string) {
      const data = await QrCodeService.saveQRCode(name, url)
      this.fillStates(data);
    },
    fillStates(data: any) {
      data.forEach((element : any) => {
        this.qrcodeNames.push([element.name, element.id]);
        this.qrcodeUrls.push(element.url);
      })
    },
    async deleteFromStates(index : number) {
      const deleted = await QrCodeService.deleteQRCodeByIndex(index);
      if (deleted){
        this.qrcodeNames.splice(index, 1);
        this.qrcodeUrls.splice(index, 1);
      }
    },
    async updateQrCode (index : number,name: string, url: string){
      const newQrCode = {
        name : name,
        url : url
      }
      const updated = await QrCodeService.updateQRCodeByIndex(index,newQrCode)
      if (updated){
        this.qrcodeNames[index] = [name, this.qrcodeNames[index][1]]
        this.qrcodeUrls[index] = url
      }
    }
  },
});