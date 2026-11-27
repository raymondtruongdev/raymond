// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	site: 'https://raymondtruongdev.github.io',
	base: '/raymond',
	integrations: [
		starlight({
			title: 'Raymond',
			defaultLocale: 'root',
			locales: { root: { label: 'Tiếng Việt', lang: 'vi' } },
			// Mỗi nhóm lấy tự động các file trong một thư mục của src/content/docs/docs/
			sidebar: [
				{ label: 'Mục lục', slug: 'docs' },
				{ label: 'Thuật toán', items: [{ autogenerate: { directory: 'docs/algo' } }] },
				{ label: 'C++', items: [{ autogenerate: { directory: 'docs/cpp' } }] },
				{ label: 'HTML / CSS', items: [{ autogenerate: { directory: 'docs/html' } }] },
				{ label: 'Git', items: [{ autogenerate: { directory: 'docs/git' } }] },
				{ label: 'VPS & Server', items: [{ autogenerate: { directory: 'docs/vps' } }] },
			],
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/raymondtruongdev' }],
			lastUpdated: true,
			customCss: ['./src/styles/docs.css'],
			components: { SocialIcons: './src/components/docs/SocialIcons.astro' },
			head: [
				{
					tag: 'link',
					attrs: { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Raleway:wght@300..800&display=swap' },
				},
				{
					// Dùng chung lựa chọn sáng / tối với phần còn lại của web
					tag: 'script',
					content: `try {
	const theme = localStorage.getItem('theme');
	if (theme) localStorage.setItem('starlight-theme', theme);
	document.addEventListener('change', (event) => {
		if (!event.target.closest('starlight-theme-select')) return;
		const value = event.target.value;
		value === 'auto' ? localStorage.removeItem('theme') : localStorage.setItem('theme', value);
	});
} catch {}`,
				},
			],
		}),
	],
	vite: {
		plugins: [tailwindcss()],
	},
});
