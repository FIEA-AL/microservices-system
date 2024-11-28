import http from "./config";
import { useQRCodeApi } from '../stores/QRCodeApi';

class QrCodeService {
    static async saveQRCode(name: string, url: string) : Promise<{} | undefined> {
        const qrCodeData = {
            name: name,
            url: url,
        };
        try {
            const token = localStorage.getItem('authToken'); 
            const response = await http.post('http://localhost:3000/qrcodes', qrCodeData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
        });

            alert('QR code saved!');
            return [response.data]
        } catch (error) {
            console.error('Error saving QR code:', error);
            alert('Error saving QR code.');
            return
        }
    }

    static async getQRCodes() :  Promise<{} | undefined>{
        try {
            const token = localStorage.getItem('authToken'); 
    
            const response = await http.get('http://localhost:3000/qrcodes', {
                headers: {
                'Authorization': `Bearer ${token}`,
                },
            });
    
            return response.data
        } catch (error) {
            console.error('Error fetching QR codes:', error);
            alert('Error fetching QR codes.');
            return 
        }
    }

    static async deleteQRCodeByIndex(index : number): Promise<boolean> {
        try {
          const qrCodeStore = useQRCodeApi();

          const token = localStorage.getItem('authToken'); 
  
          const response = await http.delete(`http://localhost:3000/qrcodes/${qrCodeStore.qrcodeNames[index][1]}`, {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });
  
          if (response.status == 200) {
            alert('QrCode deleted');
            return true;
          }
          return false;
      
        } catch (error) {
          console.error('Error fetching QR codes:', error);
          alert('Error fetching QR codes.');
          return false;
        }
    }

    static async updateQRCodeByIndex(index: number, updatedQRCode: { name: string; url: string }) : Promise<boolean> {
        try {
          const qrCodeStore = useQRCodeApi();
          
          const token = localStorage.getItem('authToken'); 
  
          const response = await http.put(`http://localhost:3000/qrcodes/${qrCodeStore.qrcodeNames[index][1]}`, updatedQRCode, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            }
          });
      
          if (response.status == 200) {
            return true
          }
          return false
        } catch (error) {
          console.error('Error updating QR code:', error);
          alert('Error updating QR code.');
          return false

        }
    }
}

export { QrCodeService };