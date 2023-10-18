function config() {
    let styles = {
        activeColor: '#0038FF',//0038FF
        secondaryColor: '#0025A8',
        inactiveColor: '#353535',
        activeMono: '#FFF',
        secondaryMono: '#777',
        inactiveMono: '#353535',
        borderRadius: '5px',
        borderRadius20: '20px',
        borderRadius10: '10px',
        largeDesktopFont: '27px',
        veryLargeDesktopFont: '31px',
        titleDesktopFont: '60px',
        regularDesktopFont: '25px',
        smallDesktopFont: '17px',
        mediumDesktopFont: '21px',
        footnoteDesktopFont: '12px',
        veryLargeMobileFont: '31px',
        largeMobileFont: '19px',
        regularMobileFont: '16px',
        smallMobileFont: '10px',
        footnoteMobileFont: '8px',
        updateStyle: updateStyle,
    }

    function updateStyle(key, value) {
        if (styles[key] != undefined && value != undefined) {
            styles[key] = value;
        }
    }

    return styles;
}

export default config;