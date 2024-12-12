<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue';
import { useQRCodeApi } from '../../stores/QRCodeApi';
import InputComponent from '../../components/InputComponent.vue';
import ButtonComponent from '../../components/ButtonComponent.vue';
import { useRouter } from 'vue-router';

    const qrCodeApiInstance = useQRCodeApi();
    const name = ref('');
    const router = useRouter()

    const filteredQRCodeNamesList = computed(() =>
        qrCodeApiInstance.qrCodes.filter(element =>
            element.name.toLowerCase().includes(name.value.toLowerCase())
        )
    );

    const deleteQRCode = async (index: number) => {
      await qrCodeApiInstance.deleteFromStates(index);
      console.log(`QR Code at index ${index} deleted successfully.`);
    };

    const showQRCode = (id : string) => {
      router.push(`/qrcode/edit/${id}`)
    } 

    const newQrCode = () => {
        router.push('/qrcode/create');
    } 

    onMounted(async () => {
      await qrCodeApiInstance.getQrCodes();
    });   
</script>

<template>
    <div class="flex mobileEdit">
        <div class="pad12 leftSideWidth" style="padding-top: 36px;" >
            <div class="pad12 titleAndCreate"><h2>QR Code Dinâmico</h2> <ButtonComponent @click="newQrCode()" label="Novo QRCode" ></ButtonComponent></div>
            <div class="flex" >
                <InputComponent v-model="name" type="text" placeholder="Filtro por nome" class="pad12 maxWidth"></InputComponent>
            </div>
            <div class="pad12 flex">
                <ul class="maxWidth">
                    <li class="listElement flex space-between" v-for="element in filteredQRCodeNamesList">
                        <strong style="color: #5C5C5C;">{{ element.name }}</strong>
                        <span class="dot">
                            <v-icon @click="showQRCode(element.id)" style="cursor: pointer;"
                                    name="io-arrow-forward"
                            />
                        </span>
                    </li>
                </ul>
            </div> 
        </div>
        <div class="rightSide">
        </div>
    </div>
</template>

<style scoped>  
    .titleAndCreate{
        display: flex; 
        justify-content: space-between; 
        align-items: center; 
        padding-top: 0px;
    }
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
        height: 710px;
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

    @media (max-width: 1082px) {
        .mobileEdit{
            display: block;
        }
        .leftSideWidth{
            width: 100%;
        }
        .rightSide{
            width: 100%;
        }
    }
</style>
