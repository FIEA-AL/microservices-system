<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue';
import { useQRCodeApi } from '../../stores/QRCodeApi';
import ListComponent from '../../components/ListComponent.vue';
import InputComponent from '../../components/InputComponent.vue';
import ButtonComponent from '../../components/ButtonComponent.vue';
import QrCode from './QrCode.vue';
import Forms from './Forms.vue';

    const qrCodeApiInstance = useQRCodeApi();
    const name = ref('');
    const QRisHidden = ref(true);
    const editisHidden = ref(true); 


    const qrCodeNamesList = computed(() => qrCodeApiInstance.filterOutIds);

    const filteredQRCodeNamesList = computed(() =>
        qrCodeNamesList.value.filter(element =>
            element.toLowerCase().includes(name.value.toLowerCase())
        )
    );

    const indexToEdit = ref(-1)

    const deleteQRCode = async (index: number) => {
      await qrCodeApiInstance.deleteFromStates(index);
      QRisHidden.value = true;
      console.log(`QR Code at index ${index} deleted successfully.`);
    };

    const showQRCode = (name : string) => {
      QRisHidden.value = false;
      editisHidden.value = false;
      const index = qrCodeApiInstance.qrcodeNames.findIndex((element) => element[0] === name);
      indexToEdit.value = index;
    } 

    const newQrCode = () => {
      editisHidden.value = false;
    } 


    onMounted(() => {
      qrCodeApiInstance.getQrCodes();
    });
    
</script>

<template>
    <div   class="flex">
        <div v-if="editisHidden" class="pad12 leftSideWidth" style="padding-top: 36px;" >
            <div style="display: flex; justify-content: space-between;"><h2>QR Code Dinâmico</h2> <ButtonComponent @click="newQrCode()" label="Novo QRCode" ></ButtonComponent></div>
            <div class="flex" >
                <InputComponent v-model="name" type="text" placeholder="Filtro por nome" class="pad12 maxWidth"></InputComponent>
            </div>
            <div class="pad12 flex">
                <ul class="maxWidth">
                    <li class="listElement flex space-between" v-for="element in filteredQRCodeNamesList">
                        <strong style="color: #5C5C5C;">{{ element }}</strong>
                        <span class="dot">
                            <v-icon @click="showQRCode(element)" style="cursor: pointer;"
                                    name="io-arrow-forward"
                            />
                        </span>
                    </li>
                </ul>
            </div> 
        </div>
        <div  v-if="!editisHidden" class="pad12 leftSideWidth" style="padding-top: 36px;" >
            <Forms :index=indexToEdit ></Forms>
        </div>
        <div  class="rightSide" >
            <div v-if="!QRisHidden"><QrCode :index=indexToEdit></QrCode></div>
        </div>
    </div>

</template>

<style scoped>
    ul {
        list-style: none;
        white-space: nowrap; 
        overflow: hidden;
    }
    .pad12{
        padding: 12px;
    }
    .pad24{
        padding: 24px;
    }
    .flex{
      display: flex;
    }
    .space-between{
      justify-content: space-between;
    }
    .leftSideWidth{
      width: 60%;
    }
    .rightSide{
        margin-top: 1.7vh;
        height: 75vh;
        width: 40%;
        background-color: #F3F5F8;
        border-top-left-radius: 25px;
        border-bottom-left-radius: 25px;
    }
    .maxWidth{
      width: 100%;
    }
    .listElement{
        text-align: left;
        padding-top: 20px;
        padding-bottom: 20px;
        margin-bottom: 8px;
        padding-left: 20px;
        background-color: #F3F5F8;
        border-bottom: 1px solid #E4E4E4;
    }

</style>
