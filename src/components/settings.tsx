import React, { useEffect, useRef, useState } from "react";
import styles from "@/styles/SettingsComponent.module.scss"
import { localStorageGet, localStorageUpdate } from "@/storageHandler";

interface Props {
    closeCallback: Function;
}

export default function SettingsComponent(props: Props) {

    const [enableApply, setEnableApply] = useState<boolean>(false);

    useEffect (() => {
        initializeSettings();
    }, [])

    const initializeSettings = () => {
        const storedSettings = localStorageGet();
        if (!storedSettings) {
            applyDefaultSettings();
        } else {
            updateInputFields(storedSettings);
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
        updateInputFields(defaultSettings);
    }

    const applyClicked = () => {
        const newSettings = getSettingsFromInputFields()
        localStorageUpdate(newSettings);
        props.closeCallback();
    }

    const onKeyUp = (event: any) => {
        setEnableApply(true);
    }

    const cancelClicked = () => {
        revertChanges();
        props.closeCallback(); 
    }

    const revertChanges = () => {
        const localSettings = localStorageGet();
        if(!localSettings) return
        updateInputFields(localSettings);
    }

    const updateInputFields = (settings: ISettings) => {
        (document.getElementById("initial") as HTMLInputElement).value = settings.initial.toString() || "";
        (document.getElementById("recurring") as HTMLInputElement).value = settings.recurring.toString() || "";
        (document.getElementById("semiannual") as HTMLInputElement).value = settings.semiannual.toString() || "";
        (document.getElementById("quarterly") as HTMLInputElement).value = settings.quarterly.toString() || "";
        (document.getElementById("bimonthly") as HTMLInputElement).value = settings.bimonthly.toString() || "";
        (document.getElementById("monthly") as HTMLInputElement).value = settings.monthly.toString() || "";
    }

    const getSettingsFromInputFields = ():ISettings => {
        return {
            initial: Number((document.getElementById("initial") as HTMLInputElement).value),
            recurring: Number((document.getElementById("recurring") as HTMLInputElement).value),
            semiannual: Number((document.getElementById("semiannual") as HTMLInputElement).value),
            quarterly: Number((document.getElementById("quarterly") as HTMLInputElement).value),
            bimonthly: Number((document.getElementById("bimonthly") as HTMLInputElement).value),
            monthly: Number((document.getElementById("monthly") as HTMLInputElement).value)
        }
    };

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