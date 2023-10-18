import isMobile from "./isMobile";


function getPositionSizeStyles(figmaImport, figmaImportConfig) {
    function locationSizeOutputCompute(value, ref) {
        if (value != undefined && ref != undefined) {
            return `${(parseFloat(value) * 100) / ref}%;`;
        }
    }

    function figmaConfigPropParser(key, value, ref) {
        if (value != undefined) {
            let valueLen = value.toString().length;
            if (value.toString().substring(valueLen - 1, valueLen) == '%') {
                return `${key}: ${value};`;
            }
            if (parseFloat(value) != NaN) {
                let outputValue = locationSizeOutputCompute(parseFloat(value), ref);
                return `${key}: ${outputValue}`;
            }
        } else {
            return `${key}: auto;`;
        }
    }

    function figmaImportDynamicValueGetter(key) {
        let desktopConfig = figmaImport['desktop'];
        let mobileConfig = figmaImport['mobile'];
        if (isMobile()) {
            if (mobileConfig) {
                if (mobileConfig[key] != undefined) {
                    return mobileConfig[key];
                } else {
                    if (desktopConfig) {
                        if (desktopConfig[key]) {
                            return desktopConfig[key];
                        } else {
                            return undefined;
                        }
                    } else {
                        return undefined;
                    }
                }
            } else {
                if (desktopConfig) {
                    if (desktopConfig[key]) {
                        return desktopConfig[key];
                    } else {
                        return undefined;
                    }
                } else {
                    return undefined;
                }
            }
        } else {
            if (desktopConfig != undefined) {
                if (desktopConfig[key]) {
                    return desktopConfig[key];
                } else {
                    return undefined;
                }
            } else {
                return undefined;
            }
        }
    }

    let output = '';
    output += figmaConfigPropParser(
        'width',
        figmaImportDynamicValueGetter('width'),
        figmaImportConfig.containerWidth
    );
    output += figmaConfigPropParser(
        'left',
        figmaImportDynamicValueGetter('left'),
        figmaImportConfig.containerWidth
    );
    output += figmaConfigPropParser(
        'height',
        figmaImportDynamicValueGetter('height'),
        figmaImportConfig.containerHeight
    );
    output += figmaConfigPropParser(
        'top',
        figmaImportDynamicValueGetter('top'),
        figmaImportConfig.containerHeight
    );
    return output;
}


export default getPositionSizeStyles;