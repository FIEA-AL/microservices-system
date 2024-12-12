import { defineStore } from 'pinia';
import { QrCodeService } from '../service/QrCodeService';
import { QrCode } from '../types/Types';

export const useQRCodeApi = defineStore("QRCodeApi", {
  state: () => ({
    qrCodes: [] as {
      name: string;
      url: string;
      color: string;
      backgroundColor: string;
      id: string;
    }[],
  }),
  actions: {
    async getQrCodes() {
      const data = await QrCodeService.getQRCodes();
      if (data) {
        this.fillStates(data);
        return data;
      }
      return;
    },
    async saveQrCode(
      name: string,
      url: string,
      color: string,
      backgroundColor: string
    ): Promise<QrCode | undefined> {
      const data = await QrCodeService.saveQRCode(
        name,
        url,
        color,
        backgroundColor
      );
      if (data) {
        this.fillStates(data);
        return data;
      }
      return;
    },
    fillStates(data: QrCode[] | QrCode) {
      if (Array.isArray(data)) {
        data.forEach((element: QrCode) => {
          this.qrCodes.push(element);
        });
      } else {
        this.qrCodes.push(data);
      }
    },
    async deleteFromStates(index: number) {
      const deleted = await QrCodeService.deleteQRCodeByIndex(index);
      if (deleted) {
        this.qrCodes.splice(index, 1);
      }
    },
    clearStates() {
      this.qrCodes = [];
    },
    async updateQrCode(
      index: number,
      name: string,
      url: string,
      color: string,
      backgroundColor: string
    ) {
      const newQrCode = {
        name: name,
        url: url,
        color: color,
        backgroundColor: backgroundColor,
        id: this.qrCodes[index].id,
      };
      const updated = await QrCodeService.updateQRCodeByIndex(index, newQrCode);
      if (updated) {
        this.qrCodes[index] = newQrCode;
        alert("QrCode atualizado");
      }
    },
  },
});