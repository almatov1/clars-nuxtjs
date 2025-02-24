<template>
    <div
        :class="['mb-[24px] w-full rounded-b-[16px]', COMPANY_CABINET_ROUTES.includes(route.path) ? 'bg-blue-400' : 'border-b-[1px] border-pale-500']">
        <div class="max-w-[1440px] mx-auto px-[80px] py-[16px] flex justify-between items-center">
            <NuxtLink :to="DEFAULT_ROUTE.HOME">
                <img :src="COMPANY_CABINET_ROUTES.includes(route.path) ? LogotypeWhite : Logotype" />
            </NuxtLink>
            <div ref="target" class="flex items-center gap-[16px]">
                <NuxtLink v-if="!company.data" :to="COMPANY_ROUTE.CREATE" @click="() => isOpen = false"
                    class="flex items-center gap-[8px] bg-red-400 h-[32px] px-[12px] rounded-[8px]">
                    <img :src="PlusIcon" />
                    <div class="font-medium text-[16px] text-white-950">Создать бизнес</div>
                </NuxtLink>
                <NuxtLink v-else :to="COMPANY_ROUTE.CABINET" @click="() => isOpen = false"
                    :class="['text-[16px] font-normal', COMPANY_CABINET_ROUTES.includes(route.path) ? 'text-white-950' : 'text-black-500']">
                    Мой бизнес
                </NuxtLink>
                <button @click="isOpen = !isOpen"
                    class="flex items-center gap-[8px] border-pale-500 border-[1px] h-[32px] px-[12px] rounded-[8px]">
                    <img :src="COMPANY_CABINET_ROUTES.includes(route.path) ? ListWhiteIcon : ListIcon" />
                    <img :src="COMPANY_CABINET_ROUTES.includes(route.path) ? UserWhiteIcon : UserIcon" />
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
    </div>
</template>

<script setup lang="ts">
import Logotype from "../../core/assets/image/home/logotype.svg?inline";
import LogotypeWhite from "../../core/assets/image/home/logotype-white.svg?inline";
import PlusIcon from "../../core/assets/image/home/plus.svg?inline";
import ListIcon from "../../core/assets/image/home/list.svg?inline";
import ListWhiteIcon from "../../core/assets/image/home/list-white.svg?inline";
import UserIcon from "../../core/assets/image/home/user.svg?inline";
import UserWhiteIcon from "../../core/assets/image/home/user-white.svg?inline";
import { ACCOUNT_ROUTE, COMPANY_CABINET_ROUTES, COMPANY_ROUTE, DEFAULT_ROUTE, ORDER_ROUTE } from "~/src/core/config/route";
import { LogoutService } from "~/src/module/user/service/LogoutService";
import { useUserStore } from "~/src/module/user/store/user";
import { useCompanyStore } from "~/src/module/company/store/company";
import { onClickOutside } from '@vueuse/core'
import { NuxtLink } from "#components";
const target = ref(null);
const user = useUserStore();
const company = useCompanyStore();
onClickOutside(target, (event) => isOpen.value = false);
const route = useRoute();

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