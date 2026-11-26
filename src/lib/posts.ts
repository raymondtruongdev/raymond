import { getCollection } from 'astro:content';

export const getPosts = async () =>
	(await getCollection('blog')).sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());

export const formatDate = (date: Date) =>
	date.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric', timeZone: 'UTC' });
