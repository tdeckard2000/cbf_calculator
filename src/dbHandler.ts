export const getUserSettings = async () => {
    try {
        const res = await fetch("/api/userSettings", { method: "GET" });
        const data = await res.json();
        return data;
    } catch (err) {
        console.warn(err);
    }
}

export const updateUserSettings = async (userSettings: ISettings) => {
    const formattedParams = JSON.stringify(userSettings);
    try {
        
        return;
    } catch (err) {
        console.warn(err);
    }
}