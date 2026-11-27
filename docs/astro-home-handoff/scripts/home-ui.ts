// Menu di động, nút "Xem thêm" và hiệu ứng hiện khi cuộn. Theme do ThemeSelect.astro lo.

const menuBtn = document.getElementById('menuBtn')!;
const menuIcon = menuBtn.querySelector('use')!;

const setDrawer = (open: boolean) => {
	document.body.classList.toggle('drawer-open', open);
	menuBtn.setAttribute('aria-expanded', String(open));
	menuBtn.setAttribute('aria-label', open ? 'Đóng menu' : 'Mở menu');
	menuIcon.setAttribute('href', open ? '#i-x' : '#i-menu');
};

menuBtn.addEventListener('click', () => setDrawer(!document.body.classList.contains('drawer-open')));
document.getElementById('scrim')!.addEventListener('click', () => setDrawer(false));
document.querySelectorAll('#drawer a').forEach((link) => link.addEventListener('click', () => setDrawer(false)));
document.addEventListener('keydown', (event) => {
	if (event.key !== 'Escape' || !document.body.classList.contains('drawer-open')) return;
	setDrawer(false);
	menuBtn.focus();
});
matchMedia('(min-width: 900px)').addEventListener('change', (event) => event.matches && setDrawer(false));

document.querySelectorAll<HTMLButtonElement>('.toggle').forEach((button) => {
	button.addEventListener('click', () => {
		const card = document.getElementById(button.getAttribute('aria-controls')!)!;
		const open = card.classList.toggle('open');
		button.setAttribute('aria-expanded', String(open));
		button.querySelector('span')!.textContent = open ? 'Thu gọn' : 'Xem thêm';
	});
});

const items = document.querySelectorAll<HTMLElement>('.reveal');
if (!('IntersectionObserver' in window) || matchMedia('(prefers-reduced-motion: reduce)').matches) {
	items.forEach((item) => item.classList.add('in'));
} else {
	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (!entry.isIntersecting) return;
				entry.target.classList.add('in');
				observer.unobserve(entry.target);
			});
		},
		{ rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
	);
	items.forEach((item) => {
		const siblings = [...item.parentElement!.querySelectorAll(':scope > .reveal')];
		item.style.transitionDelay = `${Math.min(siblings.indexOf(item), 4) * 60}ms`;
		observer.observe(item);
	});
}
