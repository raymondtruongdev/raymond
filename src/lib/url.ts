// Thêm `base` (nếu có trong astro.config.mjs) vào link và ảnh nội bộ
const base = import.meta.env.BASE_URL.replace(/\/?$/, '/');

export const url = (path = '') => base + path.replace(/^\//, '');
