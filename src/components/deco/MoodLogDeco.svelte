<script>
	import globalStyle from '../../stores/globalStyles';
	let lglobalStyles = $globalStyle;
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
	viewBox="0 0 25 30"
	fill="none"
	xmlns="http://www.w3.org/2000/svg"
>
	<path
		d="M11.5 0.57735C12.1188 0.220084 12.8812 0.220085 13.5 0.57735L22.3253 5.67265C22.9441 6.02992 23.3253 6.69017 23.3253 7.4047V17.5953C23.3253 18.3098 22.9441 18.9701 22.3253 19.3274L13.5 24.4227C12.8812 24.7799 12.1188 24.7799 11.5 24.4226L2.67468 19.3273C2.05588 18.9701 1.67468 18.3098 1.67468 17.5953V7.4047C1.67468 6.69017 2.05588 6.02992 2.67468 5.67265L11.5 0.57735Z"
		fill={color}
		fill-opacity="0.2"
	/>
	<path
		d="M11.5 5.57735C12.1188 5.22008 12.8812 5.22008 13.5 5.57735L22.3253 10.6727C22.9441 11.0299 23.3253 11.6902 23.3253 12.4047V22.5953C23.3253 23.3098 22.9441 23.9701 22.3253 24.3274L13.5 29.4227C12.8812 29.7799 12.1188 29.7799 11.5 29.4226L2.67468 24.3273C2.05588 23.9701 1.67468 23.3098 1.67468 22.5953V12.4047C1.67468 11.6902 2.05588 11.0299 2.67468 10.6726L11.5 5.57735Z"
		fill={color}
		fill-opacity="0.2"
	/>
</svg>
