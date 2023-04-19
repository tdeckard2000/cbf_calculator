import React, { useEffect, useRef, useState } from "react";
import styles from "@/styles/SettingsComponent.module.scss"
import { localStorageGet, localStorageUpdate } from "@/storageHandler";

interface Props {
    closeCallback: Function;
}

export default function SettingsComponent(props: Props) {

    const [enableApply, setEnableApply] = useState<boolean>(false);
    const [userSettings, setUserSettings] = useState<ISettings>();

    useEffect (() => {
        initializeSettings();
    }, [])

    const initializeSettings = () => {
        const storedSettings = localStorageGet();
        if (!storedSettings) {
            //if no settings exist
            applyDefaultSettings();
        } else {
            setUserSettings(storedSettings);
        }
    }

    const applyDefaultSettings = () => {
        const defaultSettings: ISettings = {
            initial: 1.85,
            recurring: 1.45,
            semiannual: 5,
            quarterly: 10,
            bimonthly: 15,
            monthly: 20
        }
        localStorageUpdate(defaultSettings);
        setUserSettings(defaultSettings);

        (document.getElementById("initial") as HTMLInputElement).value = defaultSettings.initial.toString() || "";
        (document.getElementById("recurring") as HTMLInputElement).value = defaultSettings.recurring.toString() || "";
        (document.getElementById("semiannual") as HTMLInputElement).value = defaultSettings.semiannual.toString() || "";
        (document.getElementById("quarterly") as HTMLInputElement).value = defaultSettings.quarterly.toString() || "";
        (document.getElementById("bimonthly") as HTMLInputElement).value = defaultSettings.bimonthly.toString() || "";
        (document.getElementById("monthly") as HTMLInputElement).value = defaultSettings.monthly.toString() || "";
    }

    const applyClicked = () => {
        if(!userSettings) return;
        localStorageUpdate(userSettings);
        props.closeCallback();
    }

    const onKeyUp = (event: any) => {
        const inputId: "initial" | "recurring" | "semiannual" | "quarterly" | "bimonthly" | "monthly" = event.target.id;
        const currentSettings = userSettings;
        if(!currentSettings) return
        currentSettings[inputId] = event.target.value;
        setUserSettings({...currentSettings});
        setEnableApply(true);
    }

    const cancelClicked = () => {
        revertChanges();
        props.closeCallback(); 
    }

    const revertChanges = () => {
        const localSettings = localStorageGet();
        if(!localSettings) return
        (document.getElementById("initial") as HTMLInputElement).value = localSettings.initial.toString() || "";
        (document.getElementById("recurring") as HTMLInputElement).value = localSettings.recurring.toString() || "";
        (document.getElementById("semiannual") as HTMLInputElement).value = localSettings.semiannual.toString() || "";
        (document.getElementById("quarterly") as HTMLInputElement).value = localSettings.quarterly.toString() || "";
        (document.getElementById("bimonthly") as HTMLInputElement).value = localSettings.bimonthly.toString() || "";
        (document.getElementById("monthly") as HTMLInputElement).value = localSettings.monthly.toString() || "";
    }

    return(
        <div className={styles.main}>
            <h1 className={styles.header}>Settings</h1>
            <div className={styles.inputsContainer}>
                <h3>Cost Per ft<sup style={{fontSize: "10px"}}>2</sup></h3>
                <div>
                    <label htmlFor="initial">Initial</label>
                    <input onKeyUp={(e) => onKeyUp(e)} type="number" name="" id="initial" />
                </div>
                <div>
                    <label htmlFor="initial">Recurring</label>
                    <input onKeyUp={(e) => onKeyUp(e)} type="number" name="" id="recurring" />
                </div>
                <h3 style={{marginTop: "20px"}}>Discount Percent</h3>
                <div>
                    <label htmlFor="initial">Semiannual</label>
                    <input onKeyUp={(e) => onKeyUp(e)} pattern='[0-9]*' type="number" name="" id="semiannual" />
                </div>
                <div>
                    <label htmlFor="initial">Quarterly</label>
                    <input onKeyUp={(e) => onKeyUp(e)} pattern='[0-9]*' type="number" name="" id="quarterly" />
                </div>
                <div>
                    <label htmlFor="initial">Bimonthly</label>
                    <input onKeyUp={(e) => onKeyUp(e)} pattern='[0-9]*' type="number" name="" id="bimonthly" />
                </div>
                <div>
                    <label htmlFor="initial">Monthly</label>
                    <input onKeyUp={(e) => {onKeyUp(e)}} pattern='[0-9]*' type="number" name="" id="monthly" />
                </div>
            </div>
            <div className={styles.settingsButtonsContainer}>
                <button onClick={() => {cancelClicked()}} className={styles.cancel}>Cancel</button>
                <button onClick={() => {applyClicked(); setEnableApply(false)}} disabled={!enableApply} style={{opacity: enableApply ? 1 : .6}} className={styles.apply}>Apply</button>
            </div>
        </div>
    )
}