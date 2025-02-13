<template>
    <div class="mb-[24px]">
        <div class="max-w-[1440px] mx-auto px-[80px] py-[16px] flex justify-between items-center">
            <button @click="() => navigateTo(DEFAULT_ROUTE.HOME)">
                <img :src="Logotype" />
            </button>
            <div class="flex items-center gap-[16px]">
                <button v-if="!company.data" @click="() => navigateTo(COMPANY_ROUTE.CREATE)"
                    class="flex items-center gap-[8px] bg-red-400 h-[32px] px-[12px] rounded-[8px]">
                    <img :src="PlusIcon" />
                    <div class="font-medium text-[16px] text-white-950">Создать бизнес</div>
                </button>
                <button v-else @click="() => navigateTo(COMPANY_ROUTE.CABINET)"
                    class="text-[16px] font-normal text-black-500">
                    Мой бизнес
                </button>
                <button @click="isOpen = !isOpen"
                    class="flex items-center gap-[8px] border-pale-500 border-[1px] h-[32px] px-[12px] rounded-[8px]">
                    <img :src="ListIcon" />
                    <img :src="UserIcon" />
                </button>
                <transition enter-active-class="transition ease-out duration-100" enter-from-class="opacity-0 scale-95"
                    enter-to-class="opacity-100 scale-100" leave-active-class="transition ease-in duration-75"
                    leave-from-class="opacity-100 scale-100" leave-to-class="opacity-0 scale-95">
                    <div v-if="isOpen"
                        :class="['absolute z-10 w-[241px] bg-white-400 shadow-[0px_0px_23.7px_0px_rgba(0,0,0,0.25)] rounded-[8px] py-[4px]', user.data ? 'mt-[230px] ml-[-77px]' : 'mt-[150px] ml-[-3px]']">
                        <button v-for="(item, index) in (user.data?.id ? privateItems : publicItems)" :key="index"
                            @click="item.onClick"
                            :class="['block w-full px-[12px] py-[8px] text-left hover:bg-pale-400', item.isRed ? 'text-red-400' : 'text-black-500']">
                            {{ item.label }}
                        </button>
                    </div>
                </transition>
            </div>
        </div>
        <div class="w-full h-[1px] bg-pale-500"></div>
    </div>
</template>

<script setup lang="ts">
import Logotype from "../../core/assets/image/home/logotype.svg?inline";
import PlusIcon from "../../core/assets/image/home/plus.svg?inline";
import ListIcon from "../../core/assets/image/home/list.svg?inline";
import UserIcon from "../../core/assets/image/home/user.svg?inline";
import { ACCOUNT_ROUTE, COMPANY_ROUTE, DEFAULT_ROUTE, ORDER_ROUTE } from "~/src/core/config/route";
import { LogoutService } from "~/src/module/user/service/LogoutService";
import { useUserStore } from "~/src/module/user/store/user";
import { useCompanyStore } from "~/src/module/company/store/company";
const user = useUserStore();
const company = useCompanyStore();

// MENU
const isOpen = ref(false);
const privateItems = [
    {
        label: "Главная страница", onClick: () => {
            navigateTo(DEFAULT_ROUTE.HOME);
            isOpen.value = false;
        }, isRed: false
    },
    {
        label: "Личный кабинет", onClick: () => {
            navigateTo(ACCOUNT_ROUTE.PROFILE);
            isOpen.value = false;
        }, isRed: false
    },
    {
        label: "Мои записи", onClick: () => {
            navigateTo(ORDER_ROUTE.LIST);
            isOpen.value = false;
        }, isRed: false
    },
    {
        label: "Выйти", onClick: async () => {
            const accessToken = useCookie('accessToken').value;

            await LogoutService(accessToken ? {
                request: true,
                accessToken: accessToken
            } : {});
            isOpen.value = false;
        }, isRed: true
    }
];
const publicItems = [
    {
        label: "Главная страница", onClick: () => {
            navigateTo(DEFAULT_ROUTE.HOME);
            isOpen.value = false;
        }, isRed: false
    },
    {
        label: "Войти в кабинет", onClick: () => {
            navigateTo(ACCOUNT_ROUTE.AUTHENTICATION);
            isOpen.value = false;
        }, isRed: true
    }
];
</script>

<style scoped></style>