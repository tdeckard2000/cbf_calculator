import React, { useState } from "react";
import styles from "@/styles/SettingsComponent.module.scss"
import Image from "next/image";

interface Props {
    closeCallback: Function;
}

export default function SettingsComponent(props: Props) {

    const [enableApply, setEnableApply] = useState<boolean>(false);

    return(
        <div className={styles.main}>
            <h1 className={styles.header}>Settings</h1>
            <div className={styles.inputsContainer}>
                <h3>Cost Percent</h3>
                <div>
                    <label htmlFor="initial">Initial</label>
                    <input pattern='[0-9]*' type="number" name="" id="initial" />
                </div>
                <div>
                    <label htmlFor="initial">Recurring</label>
                    <input pattern='[0-9]*' type="number" name="" id="initial" />
                </div>
                <h3 style={{marginTop: "20px"}}>Discount Percent</h3>
                <div>
                    <label htmlFor="initial">Semiannual</label>
                    <input pattern='[0-9]*' type="number" name="" id="initial" />
                </div>
                <div>
                    <label htmlFor="initial">Quarterly</label>
                    <input pattern='[0-9]*' type="number" name="" id="initial" />
                </div>
                <div>
                    <label htmlFor="initial">Bimonthly</label>
                    <input pattern='[0-9]*' type="number" name="" id="initial" />
                </div>
                <div>
                    <label htmlFor="initial">Monthly</label>
                    <input pattern='[0-9]*' type="number" name="" id="initial" />
                </div>
            </div>
            <div className={styles.settingsButtonsContainer}>
                <button onClick={() => {props.closeCallback()}} className={styles.cancel}>Cancel</button>
                <button style={{opacity: enableApply ? 1 : .6}} className={styles.apply}>Apply</button>
            </div>
        </div>
    )
}