<script lang="ts" setup>
import {  computed, onMounted, ref } from 'vue';
import { useQRCodeApi } from '../../stores/QRCodeApi';
import InputComponent from '../../components/InputComponent.vue';
import ButtonComponent from '../../components/ButtonComponent.vue';
import { useRouter } from 'vue-router';


    const props = defineProps<{
        index: number;
    }>();

    const qrCodeApiInstance = useQRCodeApi();
    const router = useRouter();

    const editFlag = ref(false)

    const name = ref('');
    const link = ref('');


    const saveQRCode = async () => {
      if (name.value && link.value) {
        if(editFlag){
            await qrCodeApiInstance.updateQrCode(props.index, name.value, link.value)
        }
        else{
            await qrCodeApiInstance.saveQrCode(name.value, link.value);
        }
      } else {
        alert('Please enter a name and a link!');
      }
    };

    const back = () => {
        router.go(0)
    }

    onMounted(() => {
      if (props.index != -1){
        editFlag.value = true;
        name.value = qrCodeApiInstance.qrcodeNames[props.index][0];
        link.value = qrCodeApiInstance.qrcodeUrls[props.index];
      }
    });
    

    
</script>

<template>
    <div>
        <div class="flex">
            <span class="dot">
                <v-icon @click="back()" style="cursor: pointer;"
                        name="io-arrow-back"
                />
            </span>
            <h2>{{ editFlag ? 'Editar QR Code Dinâmico' : 'Criar QR Code Dinâmico' }}</h2>
        </div>
        <InputComponent v-model="name"  type="text" class="pad12" label="Nome de identificação"></InputComponent>
        <InputComponent v-model="link"  type="text" class="pad12" label="Link do QRCode"></InputComponent>
        <div class="pad12 flex" style="justify-content: flex-end;"><ButtonComponent @click="saveQRCode()" :label="editFlag ? 'Editar QRCode' : 'Salvar QRCode'" ></ButtonComponent></div>
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
