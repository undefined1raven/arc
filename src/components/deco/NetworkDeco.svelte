<script>
	import globalStyle from '../../stores/globalStyles';
	let lglobalStyles = $globalStyle;
	globalStyle.subscribe((gs) => {
		lglobalStyles = gs;
	});
	let height = '5vh';
	let width = '5vh';
	let left = 'auto';
	let top = 'auto';
	let style = '';
	let color = lglobalStyles.activeColor;

	export { height, width, left, top, style, color };
</script>

<svg
	{width}
	{height}
	style="position: absolute; top: {top}; left: {left}; {style}"
	viewBox="0 0 10 13"
	fill="none"
	xmlns="http://www.w3.org/2000/svg"
>
	<path
		d="M4 12.2929V0.5C4 0.223858 3.77614 0 3.5 0C3.22386 0 3 0.223858 3 0.5V9C3 9.73805 2.10767 10.1077 1.58579 9.58579L1.5 9.5C1.22386 9.22386 0.776142 9.22386 0.5 9.5C0.223858 9.77614 0.223858 10.2239 0.5 10.5L2.79289 12.7929C2.9255 12.9255 3.10536 13 3.29289 13C3.68342 13 4 12.6834 4 12.2929Z"
		fill={color}
	/>
	<path
		d="M6 0.707107L6 12.5C6 12.7761 6.22386 13 6.5 13C6.77614 13 7 12.7761 7 12.5L7 4C7 3.26195 7.89233 2.89233 8.41421 3.41421L8.5 3.5C8.77614 3.77614 9.22386 3.77614 9.5 3.5C9.77614 3.22386 9.77614 2.77614 9.5 2.5L7.20711 0.207107C7.0745 0.0744982 6.89464 0 6.70711 0C6.31658 0 6 0.316583 6 0.707107Z"
		fill={color}
	/>
</svg>
