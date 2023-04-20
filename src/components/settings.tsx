import React, { useEffect, useRef, useState } from "react";
import styles from "@/styles/SettingsComponent.module.scss"
// import { localStorageUpdate } from "@/storageHandler";
import { getUserSettings, updateUserSettings } from "@/dbHandler";

interface Props {
    closeCallback: Function;
    showSettings: boolean;
    setShowLoadingModal: Function;
    setShowSavingModal: Function;
}

export default function SettingsComponent(props: Props) {

    const [enableApply, setEnableApply] = useState<boolean>(false);

    useEffect (() => {
        if(props.showSettings) {
            initializeSettings();
        }
    }, [props.showSettings])

    const initializeSettings = async () => {
        clearInputFields();
        props.setShowLoadingModal(true);
        const settingsFromDb = await getUserSettings();
        updateInputFields(settingsFromDb);

        setTimeout(() => {
            props.setShowLoadingModal(false);
        }, 800);
    }

    const applyClicked = async () => {
        props.setShowSavingModal(true);
        const newSettings = getSettingsFromInputFields();
        await updateUserSettings(newSettings);
        props.closeCallback();
        setTimeout(() => {
            props.setShowSavingModal(false);
        }, 800)
    }

    const onKeyUp = (event: any) => {
        setEnableApply(true);
    }

    const cancelClicked = () => {
        revertChanges();
        props.closeCallback(); 
    }

    const revertChanges = () => {
        // const localSettings = localStorageGet();
        // if(!localSettings) return
        // updateInputFields(localSettings);
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

    const clearInputFields = () => {
        (document.getElementById("initial") as HTMLInputElement).value = "";
        (document.getElementById("recurring") as HTMLInputElement).value = "";
        (document.getElementById("semiannual") as HTMLInputElement).value = "";
        (document.getElementById("quarterly") as HTMLInputElement).value = "";
        (document.getElementById("bimonthly") as HTMLInputElement).value = "";
        (document.getElementById("monthly") as HTMLInputElement).value = "";
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