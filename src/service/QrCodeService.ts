import http from "./config";
import { useQRCodeApi } from '../stores/QRCodeApi';

class QrCodeService {
    static async saveQRCode(name: string, url: string) {
        const qrCodeData = {
            name: name,
            url: url,
        };

        try {
            const token = localStorage.getItem('authToken'); 
            const response = await http.post('http://localhost:3000/qrcodes', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: qrCodeData,
        });

            const newQrCode = response.data
            alert('QR code saved!');
            const qrCodeStore = useQRCodeApi();
            qrCodeStore.qrcodeNames.push([name, newQrCode.id]);
            qrCodeStore.qrcodeUrls.push(url);
        } catch (error) {
            console.error('Error saving QR code:', error);
            alert('Error saving QR code.');
        }
    }

    static async getQRCodes() {
        try {
            const token = localStorage.getItem('authToken'); 
    
            const response = await http.get('http://localhost:3000/qrcodes', {
                headers: {
                'Authorization': `Bearer ${token}`,
                },
            });
    
            const qrcodes = response.data
            const qrCodeStore = useQRCodeApi();

            qrcodes.forEach((element : any) => {
                qrCodeStore.qrcodeNames.push([element.name, element.id]);
                qrCodeStore.qrcodeUrls.push(element.url);
            });
        } catch (error) {
            console.error('Error fetching QR codes:', error);
            alert('Error fetching QR codes.');
        }
    }

    static async getQRCodeByIndex(index: number): Promise<string> {
        await QrCodeService.getQRCodes();
        const qrCodeStore = useQRCodeApi();

        try {
  
          if (index < 0 || index > qrCodeStore.qrcodeNames.length)
          {
            return ''
          }
          else{
            return qrCodeStore.qrcodeUrls[index] 
          }
        } catch (error) {
          console.error('Error fetching QR codes:', error);
          alert('Error fetching QR codes.');
          return '';
        }
    }

    static async deleteQRCodeByIndex(index : number) {
        try {
          const qrCodeStore = useQRCodeApi();

          const token = localStorage.getItem('authToken'); 
  
          const response = await http.delete(`http://localhost:3000/qrcodes/${qrCodeStore.qrcodeNames[index][1]}`, {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });
  
          if (response.status == 200) {

            qrCodeStore.qrcodeNames.splice(index, 1);
            qrCodeStore.qrcodeUrls.splice(index, 1);
          }
      
        } catch (error) {
          console.error('Error fetching QR codes:', error);
          alert('Error fetching QR codes.');
        }
    }

    static async updateQRCodeByIndex(index: number, updatedQRCode: { name: string; url: string }) {
        try {
          const qrCodeStore = useQRCodeApi();
          
          const token = localStorage.getItem('authToken'); 
  
          const response = await http.put(`http://localhost:3000/qrcodes/${qrCodeStore.qrcodeNames[index][1]}`, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
            body: updatedQRCode,
          });
      
          if (response.status == 200) {

            qrCodeStore.qrcodeUrls[index] = updatedQRCode.url;
          }
        } catch (error) {
          console.error('Error updating QR code:', error);
          alert('Error updating QR code.');
        }
    }
}

export { QrCodeService };