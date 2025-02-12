<template>
    <div>
        <button v-if="intros[0]" @click="() => showImg(0)" class="w-full">
            <img :src="intros[0].src" class="rounded-[8px] w-full" />
        </button>
        <div v-if="intros.slice(1).length > 0" class="flex flex-wrap gap-[12px] pt-[6px]">
            <button v-for="(image, index) in intros.slice(1)" :key="index" @click="() => showImg(index + 1)">
                <img :src="image.src" width="80" class="rounded-[8px]" />
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import PhotoSwipeLightbox from 'photoswipe/lightbox';
import { STORAGE } from '~/src/core/config/shared';
import getImageSize from '~/src/core/util/getImageSize';
import type { CompanyModel } from '~/src/module/company/model/CompanyModel';

// DEFINE
const props = defineProps<{
    company: CompanyModel;
}>();

// IMAGES
const intros = ref<{ src: string; w: number; h: number }[]>([]);
const loadImages = async () => {
    const imagePromises = props.company.intros.map(async (item) => {
        const src = `${STORAGE}/${item.picture}`;
        const size = await getImageSize(src);
        return { src, ...size };
    });
    intros.value = await Promise.all(imagePromises);
};

// LIGHTBOX
let lightbox: PhotoSwipeLightbox | null = null;
const showImg = (index: number) => { lightbox?.loadAndOpen(index) };
onMounted(async () => {
    await loadImages();
    lightbox = new PhotoSwipeLightbox({
        pswpModule: () => import('photoswipe'),
        dataSource: intros.value,
        initialZoomLevel: 'fit',
        secondaryZoomLevel: 1.5,
        maxZoomLevel: 6,
        pinchToClose: false
    });
    lightbox.init()
});
onUnmounted(() => {
    if (lightbox) {
        lightbox.destroy();
        lightbox = null;
    }
});
</script>

<style scoped></style>
