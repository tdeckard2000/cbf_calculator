import React, { useEffect, useRef, useState } from "react";
import styles from "@/styles/SettingsComponent.module.scss"
import Image from "next/image";

interface Props {
    closeCallback: Function;
    // semiannualDiscount: number;
    // quarterlyDiscount: number;
    // bimonthlyDiscount: number;
    // monthlyDiscount: number;
}

export default function SettingsComponent(props: Props) {

    const [enableApply, setEnableApply] = useState<boolean>(false);
    const [userSettings, setUserSettings] = useState<ISettings>();
    // const [semiannualDiscount, setSemiannualDiscount] = useState<number>(5);
    // const [quarterlyDiscount, setQuarterlyDiscount] = useState<number>(10);
    // const [bimonthlyDiscount, setBimonthlyDiscount] = useState<number>(15);
    // const [monthlyDiscount, setMonthlyDiscount] = useState<number>(20);

    useEffect (() => {
        initializeSettings();
        // populateFields()
    }, [])

    const initializeSettings = () => {
        const localRaw = localStorage.getItem("settings");
        if (!localRaw) {
            //if no settings exist
            setDefaultSettings();
        } else {
            const settings = JSON.parse(localRaw);
            setUserSettings(settings);
            return settings;
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
        localStorage.setItem("settings", JSON.stringify(defaultSettings));
    }

    const applyClicked = () => {
        localStorage.setItem("settings", JSON.stringify(userSettings));
    }

    const onKeyUp = (event: any) => {
        const inputId: "initial" | "recurring" | "semiannual" | "quarterly" | "bimonthly" | "monthly" = event.target.id;
        const localRaw = localStorage.getItem("settings");
        const inputValue = event.target.value;
        if(!localRaw) return
        const localSavedData: ISettings = JSON.parse(localRaw);
        localSavedData[inputId] = inputValue;
        setUserSettings(localSavedData);
        setEnableApply(true);
    }

    const cancelClicked = () => {
        console.log("CANCEL TIME")
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
                    <input defaultValue={userSettings?.recurring} onKeyUp={(e) => onKeyUp(e)} pattern='[0-9]*' type="number" name="" id="recurring" />
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
                    <input defaultValue={userSettings?.monthly} onKeyUp={(e) => onKeyUp(e)} pattern='[0-9]*' type="number" name="" id="monthly" />
                </div>
            </div>
            <div className={styles.settingsButtonsContainer}>
                <button onClick={() => {props.closeCallback(); cancelClicked()}} className={styles.cancel}>Cancel</button>
                <button onClick={() => {applyClicked; setEnableApply(false)}} disabled={!enableApply} style={{opacity: enableApply ? 1 : .6}} className={styles.apply}>Apply</button>
            </div>
        </div>
    )
}