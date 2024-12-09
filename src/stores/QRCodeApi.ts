import { defineStore } from 'pinia';
import { QrCodeService } from '../service/QrCodeService';
import { QrCode } from '../types/Types';

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
      if (data){
        this.fillStates(data);
        return data;
      }
      return
    },
    async saveQrCode (name: string, url: string): Promise<QrCode | undefined> {
      const data = await QrCodeService.saveQRCode(name, url)
      if (data){
        this.fillStates(data);
        return data;
      }
      return
    },
    fillStates(data: QrCode[] | QrCode) {
      if (Array.isArray(data)) {
        data.forEach((element: QrCode) => {
          this.qrcodeNames.push([element.name, element.id]);
          if (element.url) this.qrcodeUrls.push(element.url);
        });
      } else {
        this.qrcodeNames.push([data.name, data.id]);
        if (data.url) this.qrcodeUrls.push(data.url);
      }
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
        alert("QrCode atualizado");
      }
    }
  },
});