const updateSettings = (settings: ISettings) => {
    localStorage.setItem("settings", JSON.stringify(settings));
    window.dispatchEvent(new Event("storage"));
}

const getSettings = ():ISettings | null => {
    const localRaw = localStorage.getItem("settings");
    if(!localRaw) {
        return null
    } else {
        const storedSettings: ISettings = JSON.parse(localRaw);
        return storedSettings;
    }
}

export {
    updateSettings,
    getSettings
}