export const API = "http://localhost:3000";

export const STORAGE = "http://localhost:3000/storage";

export type HttpMethod = "GET" | "HEAD" | "PATCH" | "POST" | "PUT" | "DELETE" | "CONNECT" | "OPTIONS" | "TRACE" | "get" | "head" | "patch" | "post" | "put" | "delete" | "connect" | "options" | "trace";

export const SEO = {
    title: "Clars",
    keywords: "Clars",
    description: "Clars"
};

export const IMAGE_CONFIG = {
    MAX_COUNT: 8,
    MAX_SIZE: 10485760, // 10 MB
    MAX_SIZE_IN_TEXT: "10 MB"
};

export const GENDERS = ['Муж', 'Жен'];

export const CATEGORIES = ["Барбершоп", "Ногтевой сервис", "Макияж", "Косметология", "Брови", "Ресницы"];

export const TIMES = Array.from({ length: 24 }, (_, i) =>
    `${String(i).padStart(2, '0')}:00`
);

export const REGIONS = [
    "Акмолинская область",
    "Актюбинская область",
    "Алматинская область",
    "Атырауская область",
    "Восточно-Казахстанская область",
    "Жамбылская область",
    "Жетысуская область",
    "Западно-Казахстанская область",
    "Карагандинская область",
    "Костанайская область",
    "Кызылординская область",
    "Мангистауская область",
    "Павлодарская область",
    "Северо-Казахстанская область",
    "Туркестанская область",
    "Улытауская область",
    "Абайская область",
    "Астана",
    "Алматы",
    "Шымкент"
];  