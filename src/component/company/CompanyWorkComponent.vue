<template>
    <div class="grid grid-cols-3 gap-[16px]">
        <button v-for="(image, index) in works" :key="index" @click="() => showImg(index)">
            <img :src="image.src" width="100%" class="rounded-[8px]" />
        </button>
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
const works = ref<{ src: string; w: number; h: number }[]>([]);
const loadImages = async () => {
    const imagePromises = props.company.works.map(async (item) => {
        const src = `${STORAGE}/${item.picture}`;
        const size = await getImageSize(src);
        return { src, ...size };
    });
    works.value = await Promise.all(imagePromises);
};

// LIGHTBOX
let lightbox: PhotoSwipeLightbox | null = null;
const showImg = (index: number) => { lightbox?.loadAndOpen(index) };
onMounted(async () => {
    await loadImages();
    lightbox = new PhotoSwipeLightbox({
        pswpModule: () => import('photoswipe'),
        dataSource: works.value,
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
