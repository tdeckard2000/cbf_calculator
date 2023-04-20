export const getUserSettings = async () => {
    try {
        const res = await fetch("/api/userSettings", { method: "GET" });
        const data = await res.json();
        return data[0].userSettings;
    } catch (error) {
        console.warn("Error with get settings request: ", error);
    }
}

export const updateUserSettings = async (userSettings: ISettings) => {

    try {
        const response = await fetch("/api/userSettings", {
            method: "POST",
            body: JSON.stringify(userSettings)
        });
        return("success");

    } catch (error) {
        console.warn("Error with update settings request: ", error);
    }


    // console.log("update: ", formattedUserSettings)
    // try {
        
    //     return;
    // } catch (err) {
    //     console.warn(err);
    // }
}