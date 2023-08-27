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

<svg {width} {height} style="position: absolute; top: {top}; left: {left}; {style}" viewBox="0 0 132 47" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="119" height="3" rx="1.5" fill={color}/>
<rect y="11" width="102" height="3" rx="1.5" fill={color}/>
<rect y="22" width="132" height="3" rx="1.5" fill={color}/>
<rect y="33" width="126" height="3" rx="1.5" fill={color}/>
<rect y="44" width="105" height="3" rx="1.5" fill={color}/>
</svg>
