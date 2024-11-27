<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import QrcodeVue from 'qrcode.vue'
import InputComponent from './InputComponent.vue';
import ButtonComponent from './ButtonComponent.vue';
import ListComponent from './ListComponent.vue';
import { useQRCodeApi } from '../stores/QRCodeApi';
import { QrCodeService } from '../service/QrCodeService';



export default defineComponent({
  components: {
    InputComponent,
    QrcodeVue,
    ButtonComponent,
    ListComponent,
  },
  setup() {
    const qrCodeApiInstance = useQRCodeApi();
    const name = ref('');
    const link = ref('');
    const QRisHidden = ref(true);
    const editisHidden = ref(true); 

    const qrCodeLink = ref('')
    const qrName = ref('')

    const index1 = ref(0)
    
    const saveQRCode = async () => {
      if (name.value && link.value) {
          await QrCodeService.saveQRCode(name.value, link.value);
          QRisHidden.value = false; 
          qrCodeLink.value = window.location.href.concat('/', String(qrCodeApiInstance.qrcodeNames.length - 1))
          qrName.value = name.value
          name.value = '';
          link.value = '';
      } else {
        alert('Please enter a name and a link!');
      }
    };

    const deleteQRCode = async (index: number) => {
      await QrCodeService.deleteQRCodeByIndex(index);
      QRisHidden.value = true;
      console.log(`QR Code at index ${index} deleted successfully.`);
    };

    const showQRCode = (index : number) => {
      editisHidden.value = true;
      QRisHidden.value = false;
      qrCodeLink.value = window.location.href.concat('/', String(index))
      qrName.value = qrCodeApiInstance.qrcodeNames[index][0]
    } 

    const editQRCode = (index : number) => {
      QRisHidden.value = true;
      editisHidden.value = false;
      qrCodeLink.value = qrCodeApiInstance.qrcodeUrls[index]
      qrName.value = qrCodeApiInstance.qrcodeNames[index][0]
      index1.value = index
    } 

    const handleUpdate = async () => {
          await QrCodeService.updateQRCodeByIndex(index1.value, { name : qrName.value , url: qrCodeLink.value});
          editisHidden.value = true;
    };

    const downloadQRCode = () => {
      const canvas = document.querySelector('canvas');
      console.log(canvas)
      if (canvas) {
        const link = document.createElement("a");
        link.href = canvas.toDataURL("image/png");
        link.download = `${qrName.value}.png`; 
        link.click();
      }
    };

    onMounted(() => {
      QrCodeService.getQRCodes();
    });

    return {
      qrCodeApiInstance,
      name,
      link,
      QRisHidden,
      saveQRCode,
      qrCodeLink,
      qrName,
      deleteQRCode,
      showQRCode,
      editQRCode,
      editisHidden,
      handleUpdate,
      downloadQRCode,
    };
  },
  computed: {
  firstElements() {
    return this.qrCodeApiInstance.qrcodeNames.map(([first]) => first);
  },
}
});
</script>

<template>
    <div   class="flex mobile-qrcode-position">
        <div  class="pad leftSideWidth" >
            <div class="flex mobile-input-camps" >
                <InputComponent v-model="name" type="text" class="pad" label="Nome do QRCode" style="max-width: 380px;"></InputComponent>
                <InputComponent v-model="link" type="text" class="pad" label="Link do QRCode" style="width: 100%; max-width: 380px;"></InputComponent>
                <div class="pad" style="display: flex; padding-top: 36px;"><ButtonComponent @click="saveQRCode()" label="Salvar QRCode" ></ButtonComponent></div>
            </div>
            <div class="pad flex mobile-list" style="gap: 30px;">
                <ListComponent style="white-space: nowrap; overflow: hidden; width: 100%; max-width: 200px;" title="Nomes" :elements=firstElements></ListComponent>
                  <ListComponent style="overflow: hidden; width: 100%; max-width: 350px;  text-overflow: ellipsis;  white-space: nowrap; " title="URLs" :elements=qrCodeApiInstance.qrcodeUrls></ListComponent>
                  <div class="flex" style="padding-top: 40px; gap: 20px;">
                    <div style="display: flex; flex-direction: column;">
                      <v-icon style="margin-bottom: 40px;" @click="editQRCode(index)"
                        v-for="(url, index) in qrCodeApiInstance.qrcodeUrls"
                        name="ri-edit-line"
                      />
                    </div>
                    <div style="display: flex; flex-direction: column;">
                      <v-icon style="margin-bottom: 40px;"  @click="deleteQRCode(index)" 
                        v-for="(url, index) in qrCodeApiInstance.qrcodeUrls"
                        name="fa-regular-trash-alt"
                      />
                    </div>
                    <div style="display: flex; flex-direction: column;">
                      <v-icon style="margin-bottom: 40px;" @click="showQRCode(index)"
                        v-for="(url, index) in qrCodeApiInstance.qrcodeUrls"
                        name="io-open-outline"
                      />
                    </div>
                  </div>
              </div>
        </div>
        <div style="display: flex; flex-direction: column;" class="pad" v-if="!QRisHidden" >
            <qrcode-vue id="qrCodeCanvas" :value=qrCodeLink :size=300 level="H" render-as="canvas" />
            <div  class="flex space-between pad mobile-qrcode-name">
              <span style="font-size: 1.2rem; padding-top: 20px; padding-right: 20px;">{{  qrName }}</span>
              <v-icon @click="downloadQRCode()"
                    name="md-filedownload-sharp" style="padding-top: 20px"
                  />
            </div>
        </div>
        <div v-if="!editisHidden" class="pad" style="display: flex; flex-direction: column; width: 100%; max-width: 400px;">
          <InputComponent class="pad" v-model="qrCodeLink" type="text"  :label="'Novo link de ' + qrName"></InputComponent>
          <div class="pad" style="text-align: right;"><ButtonComponent @click="handleUpdate()" label="Mudar link" ></ButtonComponent></div>
        </div>
    </div>

</template>

<style scoped>
    .pad{
        padding: 12px;
    }
    .flex{
      display: flex;
    }
    .space-between{
      justify-content: space-between;
    }
    .leftSideWidth{
      width: 70%;
    }


  @media (max-width: 1285px) {
    .mobile-qrcode-position{
      display: block;

    }
    .mobile-qrcode-name{
      justify-content:flex-start;
    }
    .mobile-list{
      display: block;
    }
    .mobile-list-icons{
      display: flex;
    }
    .leftSideWidth{
      width: 100%;
    }
  }

  @media (max-width: 782px) {
    .mobile-input-camps{
      display: block;
    }
  }

  @media (max-width: 640px) {
    .colorPicker{
      flex-direction: column;
    }
  }
</style>
