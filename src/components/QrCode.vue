<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import QrcodeVue from 'qrcode.vue'
import InputComponent from './InputComponent.vue';
import ButtonComponent from './ButtonComponent.vue';
import ListComponent from './ListComponent.vue';
import { useQRCodeApi } from '../stores/QRCodeApi';



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
          await qrCodeApiInstance.saveQRCode(name.value, link.value);
          QRisHidden.value = false; 
          qrCodeLink.value = window.location.href.concat('/',name.value)
          qrName.value = name.value
          name.value = '';
          link.value = '';
      } else {
        alert('Please enter a name and a link!');
      }
    };

    const deleteQRCode = async (index: number) => {
      await qrCodeApiInstance.deleteQRCodeByIndex(index);
      QRisHidden.value = true;
      console.log(`QR Code at index ${index} deleted successfully.`);
    };

    const showQRCode = (index : number) => {
      editisHidden.value = true;
      QRisHidden.value = false;
      qrCodeLink.value = window.location.href.concat('/',qrCodeApiInstance.qrcodeNames[index])
      qrName.value = qrCodeApiInstance.qrcodeNames[index]
    } 

    const editQRCode = (index : number) => {
      QRisHidden.value = true;
      editisHidden.value = false;
      qrCodeLink.value = qrCodeApiInstance.qrcodeUrls[index]
      qrName.value = qrCodeApiInstance.qrcodeNames[index]
      index1.value = index
    } 

    const handleUpdate = async () => {
          await qrCodeApiInstance.updateQRCodeByIndex(index1.value, { name : qrName.value , url: qrCodeLink.value});
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
      qrCodeApiInstance.getQRCodes();
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
});
</script>

<template>
    <div  style="display: flex;">
        <div  class="pad" style="width: 70%;">
            <div style="display: flex;">
                <InputComponent v-model="name" type="text" class="pad" label="Nome do QRCode"></InputComponent>
                <InputComponent v-model="link" type="text" class="pad" label="Link do QRCode" style="width: 40%;"></InputComponent>
                <div class="pad" style="display: flex; padding-top: 36px;"><ButtonComponent @click="saveQRCode()" label="Salvar QRCode" ></ButtonComponent></div>
            </div>
            <div class="pad" style="display: flex; gap: 30px;">
                <ListComponent style="white-space: nowrap; overflow: hidden; width: 20%;" title="Nomes" :elements=qrCodeApiInstance.qrcodeNames></ListComponent>
                <ListComponent style="overflow: hidden; width: 38%;  text-overflow: ellipsis;  white-space: nowrap; " title="URLs" :elements=qrCodeApiInstance.qrcodeUrls></ListComponent>
                <div style="display: flex; flex-direction: column; padding-top: 40px;">
                  <v-icon style="margin-bottom: 42px;" @click="editQRCode(index)"
                    v-for="(url, index) in qrCodeApiInstance.qrcodeUrls"
                    name="ri-edit-line"
                  />
                </div>
                <div style="display: flex; flex-direction: column; padding-top: 40px;">
                  <v-icon style="margin-bottom: 42px;"  @click="deleteQRCode(index)" 
                    v-for="(url, index) in qrCodeApiInstance.qrcodeUrls"
                    name="fa-regular-trash-alt"
                  />
                </div>
                <div style="display: flex; flex-direction: column; padding-top: 40px;">
                  <v-icon style="margin-bottom: 42px;" @click="showQRCode(index)"
                    v-for="(url, index) in qrCodeApiInstance.qrcodeUrls"
                    name="io-open-outline"
                  />
                </div>
            </div>
        </div>
        <div style="display: flex; flex-direction: column;" class="pad" v-if="!QRisHidden" >
            <qrcode-vue id="qrCodeCanvas" :value=qrCodeLink :size=300 level="H" render-as="canvas" />
            <div style="display: flex; justify-content: space-between;" class="pad">
              <span style="font-size: 1.2rem; padding-top: 20px">{{  qrName }}</span>
              <v-icon @click="downloadQRCode()"
                    name="md-filedownload-sharp" style="padding-top: 20px"
                  />
            </div>
        </div>
        <div v-if="!editisHidden" class="pad" style="display: flex; flex-direction: column; width: 25%;">
          <InputComponent class="pad" v-model="qrCodeLink" type="text"  :label="'Novo link de ' + qrName"></InputComponent>
          <div class="pad" style="text-align: right;"><ButtonComponent @click="handleUpdate()" label="Mudar link" ></ButtonComponent></div>
        </div>
    </div>

</template>

<style scoped>
    .pad{
        padding: 12px;
    }
</style>
