<script lang="ts" setup>
import {  computed, onMounted, ref } from 'vue';
import { useQRCodeApi } from '../../stores/QRCodeApi';
import InputComponent from '../../components/InputComponent.vue';
import ButtonComponent from '../../components/ButtonComponent.vue';
import { useRouter } from 'vue-router';
import QrcodeVue from 'qrcode.vue'



    const props = defineProps<{
        index: number;
    }>();

    const qrCodeApiInstance = useQRCodeApi();
    const router = useRouter();

    const editFlag = ref(false)

    
    const qrCodeLink = ref('')
    const qrName = ref('')

    const name = ref('');
    const link = ref('');
    const color = ref('#000000')
    const backgroundColor = ref('#ffffff')


    const saveQRCode = async () => {
      if (name.value && link.value && color.value && backgroundColor.value) {
        console.log(editFlag.value)
        if(editFlag.value){
            await qrCodeApiInstance.updateQrCode(props.index, name.value, link.value, color.value, backgroundColor.value)
        }
        else{
            await qrCodeApiInstance.saveQrCode(name.value, link.value, color.value, backgroundColor.value);
        }
      } else {
        alert('Please enter a name and a link!');
      }
    };

    const back = () => {
        router.go(0)
    }

    
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
      if (props.index != -1){
        editFlag.value = true;
        qrName.value, name.value = qrCodeApiInstance.qrcodeNames[props.index][0];
        link.value = qrCodeApiInstance.qrcodeUrls[props.index];
        qrCodeLink.value = window.location.href.concat('/', qrCodeApiInstance.qrcodeNames[props.index][1]);
        color.value = qrCodeApiInstance.qrcodeColors[props.index][0];
        backgroundColor.value = qrCodeApiInstance.qrcodeColors[props.index][1];

      }
    });
    

    
</script>

<template>

    <div class="pad12 leftSideWidth flex spacebetween" style="padding-top: 36px; flex-direction: column">
        <section>
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
        </section>
        <section  class="pad12">
                <h3>Funcionamento:</h3><br>

                <span class="fontSmall">
                    O QR Code dinâmico armazena um link que pode ser alterado a qualquer momento. Mesmo que o destino mude,
                    a imagem do QR Code continua o mesmo. Isso permite que você atualize as informações sem precisar criar um novo código.<br><br>
                </span>

                <br><h4>Exemplo:</h4><br>

                <ol type="1" class="pad12 fontSmall" style="padding-left: 16px;" >
                    <li>O QR Code aponta para https://al.sesi.com.br/qr/123.</li>
                    <li>No sistema, você atualiza o destino para um novo link.</li>
                </ol>
                <br><span class="fontSmall">O código permanece o mesmo, mas leva o usuário ao novo endereço!</span>
        </section>
        
    </div>
    <div class="rightSide">
        <div v-if="editFlag" class="pad24 flex" style="justify-content: center;">
            <qrcode-vue  id="qrCodeCanvas" :value=qrCodeLink :background=backgroundColor :foreground=color :size=300 level="H" render-as="canvas" />
        </div>
        <div v-if="editFlag" class="pad12" >
            <h4 class="rightSideSubtitle">Personalizar QR Code</h4>
            <hr>
            <div class="flex mobileColorPickers spacebetween">
                <div class="pad12"> 
                    <span>Cor do QR Code</span>
                    <label class="flex colorLabel"> 
                        <span class="colorSpan" :style="{ backgroundColor: color }"></span>
                        <InputComponent v-model="color" style="display: none;"  type="color" width="100%" class="pad12"></InputComponent>
                        <span style="padding-left: 4px;"> {{color}} </span>
                    </label>
                </div>
                <div class="pad12">
                    <span>Cor do Fundo</span>
                    <label class="flex colorLabel">
                        <span class="colorSpan" :style="{ backgroundColor: backgroundColor }"></span>
                        <InputComponent v-model="backgroundColor" style="display: none;" type="color" width="100%" class="pad12"></InputComponent>
                        <span style="padding-left: 4px;"> {{backgroundColor}} </span>
                    </label>
                </div>
            </div>
            <div v-if="editFlag" class="pad12" style="text-align: center;"> <ButtonComponent @click="downloadQRCode()" label="Baixar QR Code" ></ButtonComponent></div>
        </div>
    </div>

</template>

<style scoped>
    .fontSmall{
        font-size: 0.9rem;
    }
    .colorSpan{
        width: 100px; 
        height: 40px; 
        border-radius: 0.5rem;
    }
    .colorLabel{
        align-items: center;
        padding-top: 4px;
    }
    .spacebetween{
        justify-content: space-between;
    }
    .rightSideSubtitle{
        padding-bottom: 4px; 
        font-size: 16px;
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
    .pad12{
        padding: 12px;
    }
    .pad24{
        padding: 24px;
    }
    .flex{
      display: flex;
    }

    @media (max-width: 1574px) {
        .mobileColorPickers{
            flex-wrap: wrap;
            gap: 0px;
        }
    }

    @media (max-width: 1082px) {
        .leftSideWidth{
            width: 100%;
        }

        .rightSide{
            width: 100%;
        }
    }
</style>
