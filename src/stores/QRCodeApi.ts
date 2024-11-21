import { defineStore } from 'pinia';

export const useQRCodeApi = defineStore('QRCodeApi', {
  state: () => ({
    qrcodeNames: [] as string[],
    qrcodeUrls: [] as string[],
  }),
  actions: {
    async saveQRCode(name: string, url: string) {
      const qrCodeData = {
        name: name,
        url: url,
      };

      try {
        const response = await fetch('http://localhost:3000/qrcodes', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(qrCodeData),
        });

        if (response.ok) {
          alert('QR code saved!');
          this.qrcodeNames.push(name);
          this.qrcodeUrls.push(url);
        } else {
          alert('Failed to save QR code.');
        }
      } catch (error) {
        console.error('Error saving QR code:', error);
        alert('Error saving QR code.');
      }
    },

    async getQRCodes() {
      try {
        const response = await fetch('http://localhost:3000/qrcodes', {
          method: 'GET',
        });

        const qrcodes = await response.json();
        qrcodes.forEach((element : any) => {
            this.qrcodeNames.push(element.name);
            this.qrcodeUrls.push(element.url);
        });
      } catch (error) {
        console.error('Error fetching QR codes:', error);
        alert('Error fetching QR codes.');
      }
    },

    
    async getQRCodeByIndex(index: number): Promise<string> {
      try {
        const response = await fetch(`http://localhost:3000/qrcodes/${index}`, {
          method: 'GET',
        });
    
        const qrcode = await response.json();
        
        if (qrcode){
          return qrcode.url
        }
    
        console.log('No matching QR code found');
        return ''; 
      } catch (error) {
        console.error('Error fetching QR codes:', error);
        alert('Error fetching QR codes.');
        return '';
      }
    },

    async deleteQRCodeByIndex(index : number) {
      try {
        const response = await fetch(`http://localhost:3000/qrcodes/${index}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          this.qrcodeNames.splice(index, 1);
          this.qrcodeUrls.splice(index, 1);
        }
    
      } catch (error) {
        console.error('Error fetching QR codes:', error);
        alert('Error fetching QR codes.');
      }
    }
    ,
    async updateQRCodeByIndex(index: number, updatedQRCode: { name: string; url: string }) {
      try {
        const response = await fetch(`http://localhost:3000/qrcodes/${index}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedQRCode),
        });
    
        if (response.ok) {
          alert('QR code updated!');
    
          // Update the local state
          this.qrcodeNames[index] = updatedQRCode.name;
          this.qrcodeUrls[index] = updatedQRCode.url;
        } else {
          alert('Failed to update QR code.');
        }
      } catch (error) {
        console.error('Error updating QR code:', error);
        alert('Error updating QR code.');
      }
    }
  },
});