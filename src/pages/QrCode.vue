<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import QrcodeVue from 'qrcode.vue'
import { useQRCodeApi } from '../stores/QRCodeApi';
import ListComponent from '../components/ListComponent.vue';
import ButtonComponent from '../components/ButtonComponent.vue';
import InputComponent from '../components/InputComponent.vue';



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
          await qrCodeApiInstance.saveQrCode(name.value, link.value);
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
      await qrCodeApiInstance.deleteFromStates(index);
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
          await qrCodeApiInstance.updateQrCode(index1.value, qrName.value , qrCodeLink.value);
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
      qrCodeApiInstance.getQrCodes();
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
    <div   class="flex mobile-qrcode-position">
        <div  class="pad12 leftSideWidth" >
            <div class="flex mobile-input-camps" >
                <InputComponent v-model="name" type="text" class="pad12 max-width380 maxWidth" label="Nome do QRCode"></InputComponent>
                <InputComponent v-model="link" type="text" class="pad12 max-width380 maxWidth" label="Link do QRCode"></InputComponent>
                <div class="pad12 flex padtop36"><ButtonComponent @click="saveQRCode()" label="Salvar QRCode" ></ButtonComponent></div>
            </div>
            <div class="pad12 flex mobile-list" style="gap: 30px;">
                  <ListComponent class="namesList maxWidth"title="Nomes" :elements=qrCodeApiInstance.filterOutIds></ListComponent>
                  <ListComponent class="urlList maxWidth" title="URLs" :elements=qrCodeApiInstance.qrcodeUrls></ListComponent>
                  <div class="flex buttonsList">
                    <div class="flex directionColumn">
                      <v-icon class="marginBottom40"  @click="editQRCode(index)"
                        v-for="(url, index) in qrCodeApiInstance.qrcodeUrls"
                        name="ri-edit-line"
                      />
                    </div>
                    <div class="flex directionColumn">
                      <v-icon class="marginBottom40" @click="deleteQRCode(index)" 
                        v-for="(url, index) in qrCodeApiInstance.qrcodeUrls"
                        name="fa-regular-trash-alt"
                      />
                    </div>
                    <div class="flex directionColumn">
                      <v-icon class="marginBottom40" @click="showQRCode(index)"
                        v-for="(url, index) in qrCodeApiInstance.qrcodeUrls"
                        name="io-open-outline"
                      />
                    </div>
                  </div>
              </div>
        </div>
        <div class="pad12 flex directionColumn" v-if="!QRisHidden" >
            <qrcode-vue id="qrCodeCanvas" :value=qrCodeLink :size=300 level="H" render-as="canvas" />
            <div  class="flex space-between pad12 mobile-qrcode-name">
              <span class="qrName">{{ qrName }}</span>
              <v-icon @click="downloadQRCode()"
                    name="md-filedownload-sharp" class="padtop20"
                  />
            </div>
        </div>
        <div v-if="!editisHidden" class="pad12 flex directionColumn maxWidth max-width400" >
          <InputComponent class="pad12" v-model="qrCodeLink" type="text"  :label="'Novo link de ' + qrName"></InputComponent>
          <div class="pad12" style="text-align: right;"><ButtonComponent @click="handleUpdate()" label="Mudar link" ></ButtonComponent></div>
        </div>
    </div>

</template>

<style scoped>
    .pad12{
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
    .maxWidth{
      width: 100%;
    }
    .max-width380{
      max-width: 380px;
    }
    .max-width400{
      max-width: 400px;
    }
    .namesList{
      white-space: nowrap; 
      overflow: hidden; 
      max-width: 200px;
    }
    .urlList{
      overflow: hidden; 
      max-width: 350px;  
      text-overflow: ellipsis;  
      white-space: nowrap;
    }
    .buttonsList{
      padding-top: 40px; 
      gap: 20px;
    }
    .directionColumn{
      flex-direction: column;
    }
    .qrName{
      font-size: 1.2rem; 
      padding-top: 20px; 
      padding-right: 20px;
    }
    .marginBottom40{
      margin-bottom: 40px;
    }
    .padtop36{
      padding-top: 36px;
    }
    .padtop20{
      padding-top: 20px;
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
