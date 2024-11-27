import { defineStore } from 'pinia';

export const useQRCodeApi = defineStore('QRCodeApi', {
  state: () => ({
    qrcodeNames: [] as [string, string][],
    qrcodeUrls: [] as string[], 
}),
});