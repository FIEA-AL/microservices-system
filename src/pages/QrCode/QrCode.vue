<script lang="ts" setup>
import {  computed, onMounted, ref } from 'vue';
import { useQRCodeApi } from '../../stores/QRCodeApi';
import QrcodeVue from 'qrcode.vue'
import InputComponent from '../../components/InputComponent.vue';
import ButtonComponent from '../../components/ButtonComponent.vue';


    const props = defineProps<{
        index: number;
    }>();

    const qrCodeApiInstance = useQRCodeApi();

    const qrCodeLink = computed(() =>  window.location.href.concat('/', qrCodeApiInstance.qrcodeNames[props.index][1]));
    const qrName = computed(() => qrCodeApiInstance.qrcodeNames[props.index][0]);


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
    
</script>

<template>
    <div class="pad24 flex" style="justify-content: center;">
            <qrcode-vue id="qrCodeCanvas" :value=qrCodeLink :size=300 level="H" render-as="canvas" />
        </div>
    <div class="pad12" >
        <h4 style="padding-bottom: 4px; font-size: 16px;">Personalizar QR Code</h4>
        <hr>
        <div class="flex" style="gap: 50px;">
          <div class="flex" >
            <InputComponent  type="color" label="Cor do fundo" width="100%" class="pad12"></InputComponent>
            <span> color </span>
          </div>
          <div class="flex" >
            <InputComponent  type="color" label="Cor do QR Code" width="100%" class="pad12"></InputComponent>
            <span>backgroundColor </span>
          </div>
        </div>
        <div class="pad12" style="text-align: center;"> <ButtonComponent @click="downloadQRCode()" label="Baixar QR Code" ></ButtonComponent></div>
    </div>

</template>

<style scoped>
    .pad12{
        padding: 12px;
    }
    .pad24{
        padding: 24px;
    }
    .flex{
      display: flex;
    }
</style>
