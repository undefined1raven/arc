import isMobile from "../fn/isMobile";

function getFigmaImportConfig() {
    return {
        containerWidth: isMobile() ? 360 : 1920,
        containerHeight: isMobile() ? 640 : 1080
    };
}


export default getFigmaImportConfig;