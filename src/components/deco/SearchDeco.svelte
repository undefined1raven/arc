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

<svg width="{width}" height="{height}" style="position: absolute; top: {top}; left: {left}; {style}" viewBox="0 0 27 25" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="8.53006" cy="8.53006" r="8.03006" fill={color} fill-opacity="0.5" stroke={color}/>
<rect x="14.2168" y="13.786" width="1.42168" height="15.6384" transform="rotate(-44.1861 14.2168 13.786)" fill={color}/>
</svg>
