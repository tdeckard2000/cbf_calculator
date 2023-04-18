import React, { useEffect, useRef, useState } from "react";
import styles from "@/styles/SettingsComponent.module.scss"
import Image from "next/image";
import { getSettings, updateSettings } from "@/storageHandler";

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
        const storedSettings = getSettings();
        if (!storedSettings) {
            //if no settings exist
            setDefaultSettings();
        } else {
            setUserSettings(storedSettings);
        }
    }

    const setDefaultSettings = () => {
        const defaultSettings: ISettings = {
            initial: 1.85,
            recurring: 1.45,
            semiannual: 5,
            quarterly: 10,
            bimonthly: 15,
            monthly: 20
        }
        updateSettings(defaultSettings);
    }

    const applyClicked = () => {
        if(!userSettings) return;
        updateSettings(userSettings);
        props.closeCallback();
    }

    const onKeyUp = (event: any) => {
        const inputId: "initial" | "recurring" | "semiannual" | "quarterly" | "bimonthly" | "monthly" = event.target.id;
        const currentSettings = userSettings;
        if(!currentSettings) return
        currentSettings[inputId] = event.target.value;
        setEnableApply(true)
    }

    const cancelClicked = () => {
        revertChanges();
        props.closeCallback(); 
        console.log("CANCEL TIME")
    }

    const revertChanges = () => {
        const localSettings = getSettings();
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
                    <input defaultValue={userSettings?.initial} onKeyUp={(e) => onKeyUp(e)} type="number" name="" id="initial" />
                </div>
                <div>
                    <label htmlFor="initial">Recurring</label>
                    <input defaultValue={userSettings?.recurring} onKeyUp={(e) => onKeyUp(e)} type="number" name="" id="recurring" />
                </div>
                <h3 style={{marginTop: "20px"}}>Discount Percent</h3>
                <div>
                    <label htmlFor="initial">Semiannual</label>
                    <input defaultValue={userSettings?.semiannual} onKeyUp={(e) => onKeyUp(e)} pattern='[0-9]*' type="number" name="" id="semiannual" />
                </div>
                <div>
                    <label htmlFor="initial">Quarterly</label>
                    <input defaultValue={userSettings?.quarterly} onKeyUp={(e) => onKeyUp(e)} pattern='[0-9]*' type="number" name="" id="quarterly" />
                </div>
                <div>
                    <label htmlFor="initial">Bimonthly</label>
                    <input defaultValue={userSettings?.bimonthly} onKeyUp={(e) => onKeyUp(e)} pattern='[0-9]*' type="number" name="" id="bimonthly" />
                </div>
                <div>
                    <label htmlFor="initial">Monthly</label>
                    <input defaultValue={userSettings?.monthly} onKeyUp={(e) => {onKeyUp(e)}} pattern='[0-9]*' type="number" name="" id="monthly" />
                </div>
            </div>
            <div className={styles.settingsButtonsContainer}>
                <button onClick={() => {cancelClicked()}} className={styles.cancel}>Cancel</button>
                <button onClick={() => {applyClicked(); setEnableApply(false)}} disabled={!enableApply} style={{opacity: enableApply ? 1 : .6}} className={styles.apply}>Apply</button>
            </div>
        </div>
    )
}