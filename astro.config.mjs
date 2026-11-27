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
			customCss: [
				'@fontsource/be-vietnam-pro/500.css',
				'@fontsource/be-vietnam-pro/600.css',
				'@fontsource/be-vietnam-pro/700.css',
				'@fontsource/be-vietnam-pro/800.css',
				'@fontsource/inter/400.css',
				'@fontsource/inter/500.css',
				'@fontsource/inter/600.css',
				'@fontsource/jetbrains-mono/400.css',
				'@fontsource/jetbrains-mono/500.css',
				'./src/styles/raymond-theme.css',
			],
			// Khung code luôn tối ở cả hai giao diện
			expressiveCode: {
				themes: ['github-dark-default'],
				useStarlightUiThemeColors: false,
				styleOverrides: {
					borderRadius: '12px',
					borderColor: 'var(--code-border)',
					codeBackground: 'var(--code-bg)',
					codeFontFamily: "'JetBrains Mono', monospace",
					codeFontSize: '13.75px',
					codeLineHeight: '1.85',
					frames: {
						editorTabBarBackground: 'var(--code-head)',
						editorActiveTabBackground: 'var(--code-head)',
						terminalBackground: 'var(--code-bg)',
						terminalTitlebarBackground: 'var(--code-head)',
						terminalTitlebarBorderBottomColor: 'var(--code-border)',
					},
				},
			},
			components: {
				PageTitle: './src/components/docs/PageTitle.astro',
				SiteTitle: './src/components/docs/SiteTitle.astro',
				SocialIcons: './src/components/docs/SocialIcons.astro',
				ThemeSelect: './src/components/docs/ThemeSelect.astro',
			},
			head: [
				{
					// Lựa chọn ở trang chủ / Blog (key `theme`) áp dụng cho Docs. Chưa chọn thì theo hệ thống.
					tag: 'script',
					content: `try {
	const theme = localStorage.getItem('theme');
	if (theme) localStorage.setItem('starlight-theme', theme);
} catch {}`,
				},
				{
					// Dưới 900px sidebar thành menu ☰. Starlight chỉ làm việc này dưới 800px.
					tag: 'script',
					content: `addEventListener('DOMContentLoaded', () => {
	const pane = document.getElementById('starlight__sidebar');
	if (!pane) return;
	const narrow = matchMedia('(max-width: 899px)');
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
