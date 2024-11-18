<script lang="ts">
    import { defineComponent } from 'vue';
    import QrcodeVue from 'qrcode.vue'
    import InputComponent from './InputComponent.vue';
import ButtonComponent from './ButtonComponent.vue';
import ListComponent from './ListComponent.vue';
import { useRoute, useRouter } from 'vue-router';

export default defineComponent({
    components: {
    InputComponent,
    QrcodeVue,
    ButtonComponent,
    ListComponent
    },
    data() {
        return {
            name : '',
            link : '',
            qrcodeNames : [] as string[],
            qrcodeUrls : [] as string[],
            isHidden: true
        }
    },
    methods: {
        async saveQRCode() {

                const qrCodeData = {
                    text: this.name,
                    qrCodeUrl: this.link,
                };

                try {
                    const response = await fetch("http://localhost:3000/qrcodes", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(qrCodeData),
                    });

                    if (response.ok) {
                    alert("QR code saved!");
                    this.updateQRCodeList();
                    this.isHidden = false;
                    } else {
                    alert("Failed to save QR code.");
                    }
                } catch (error) {
                    console.error("Error saving QR code:", error);
                    alert("Error saving QR code.");
                }
            },
            async getQRCodes() {
    
                try {
                    const response = await fetch("http://localhost:3000/qrcodes", {
                    method: "GET"
                    });
    
                    const qrcodes = await response.json();
                    qrcodes.forEach((element : any) => {
                        this.qrcodeNames.push(element.text);
                        this.qrcodeUrls.push(element.qrCodeUrl);
                    });
                } catch (error) {
                    console.error("Error saving QR code:", error);
                    alert("Error saving QR code.");
                }
            },
            updateQRCodeList() {
                this.qrcodeNames.push(this.name);
                this.qrcodeUrls.push(this.link);
            },
            handleRouteParam(redirect : string) {

                const router = useRouter();

                // Check if a `name` parameter exists in the route

                    // Find the matching QR code
                    const index = this.qrcodeNames.indexOf(redirect);
                    if (index !== -1) {
                    const redirectUrl = this.qrcodeUrls[index];
                    window.location.href = redirectUrl; // Redirect to the QR code URL
                    } else {
                    alert('QR code not found.');
                    router.push('/qrcodes'); // Redirect back to the list if not found
                    }
            }
        },
        mounted() {
            this.getQRCodes();
            const route = useRoute();
            if (route.params.name){
                this.handleRouteParam(route.params.name as string)
            }
        },
});
</script>

<template>
    <div class="flex">
        <div v-if="!isHidden" class="pad">
            <qrcode-vue :value=link :size=300 level="H" render-as="svg" />
        </div>
        <div  class="pad"  style="width: 70%;">
            <div class="flex" style="justify-content: space-evenly;">
                <InputComponent v-model="name" type="text" class="pad" label="Nome do QRCode"></InputComponent>
                <InputComponent v-model="link" type="text" class="pad" label="Link do QRCode"></InputComponent>
                <div class="pad flex" style="padding-top: 36px;"><ButtonComponent @click="saveQRCode()" label="Salvar QRCode" ></ButtonComponent></div>
            </div>
            <div class="flex" style="justify-content: space-evenly;">
                <ListComponent title="Nomes" :elements=qrcodeNames></ListComponent>
                <ListComponent title="URLs" :elements=qrcodeUrls></ListComponent>
            </div>
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
</style>
