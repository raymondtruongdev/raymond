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
				{ label: 'Thuật toán', collapsed: true, items: [{ autogenerate: { directory: 'docs/algo' } }] },
				{ label: 'C++', collapsed: true, items: [{ autogenerate: { directory: 'docs/cpp' } }] },
				{ label: 'HTML / CSS', collapsed: true, items: [{ autogenerate: { directory: 'docs/html' } }] },
				{ label: 'Git', collapsed: true, items: [{ autogenerate: { directory: 'docs/git' } }] },
				{ label: 'VPS & Server', collapsed: true, items: [{ autogenerate: { directory: 'docs/vps' } }] },
			],
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/raymondtruongdev' }],
			lastUpdated: true,
			customCss: ['./src/styles/docs.css'],
			components: {
				PageTitle: './src/components/docs/PageTitle.astro',
				SiteTitle: './src/components/docs/SiteTitle.astro',
				SocialIcons: './src/components/docs/SocialIcons.astro',
				ThemeSelect: './src/components/docs/ThemeSelect.astro',
			},
			head: [
				{
					// Dùng chung lựa chọn sáng / tối với phần còn lại của web
					tag: 'script',
					content: `try {
	const theme = localStorage.getItem('theme');
	if (theme) localStorage.setItem('starlight-theme', theme);
	// Chưa chọn gì thì Docs dùng nền tối
	else if (localStorage.getItem('starlight-theme') === null) localStorage.setItem('starlight-theme', 'dark');
} catch {}`,
				},
				{
					// Dưới 996px sidebar thành menu ☰. Starlight chỉ làm việc này dưới 800px.
					tag: 'script',
					content: `addEventListener('DOMContentLoaded', () => {
	const pane = document.getElementById('starlight__sidebar');
	if (!pane) return;
	const narrow = matchMedia('(max-width: 996px)');
	const update = () => (pane.popover = narrow.matches ? 'auto' : null);
	update();
	narrow.addEventListener('change', update);
	matchMedia('(min-width: 50em)').addEventListener('change', () => queueMicrotask(update));
});`,
				},
			],
		}),
	],
	vite: {
		plugins: [tailwindcss()],
	},
});
