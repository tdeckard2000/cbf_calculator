import React, { useEffect, useState } from "react";
import styles from "@/styles/DiscountModal.module.scss"
import Image from "next/image";
// import { localStorageGet } from "@/storageHandler";
import { getUserSettings } from "@/dbHandler";

interface Props {
    setDiscountPercentage: Function;
    closeCallback: Function;
    showDiscountModal: boolean;
    localSettings: ISettings;
}

export default function DiscountModalComponent(props: Props) {

    const [percentage, setPercentage] = useState<number>(0);
    const [showCustomInput, setShowCustomInput] = useState<boolean>(false)
    const [semiannualDiscount, setSemiannualDiscount] = useState<number>(0);
    const [quarterlyDiscount, setQuarterlyDiscount] = useState<number>(0);
    const [bimonthlyDiscount, setBimonthlyDiscount] = useState<number>(0);
    const [monthlyDiscount, setMonthlyDiscount] = useState<number>(0);
    const [enableApplyButton, setEnableApplyButton] = useState<boolean>(false);

    useEffect(() => {
        setDiscountValues();
    }, [props.localSettings])

    const setDiscountValues = async () => {
        // const localSettings = await getUserSettings();
        setSemiannualDiscount(props.localSettings?.semiannual || 0);
        setQuarterlyDiscount(props.localSettings?.quarterly || 0);
        setBimonthlyDiscount(props.localSettings?.bimonthly || 0);
        setMonthlyDiscount(props.localSettings?.monthly || 0);

      }

    const keyUp = (event: any) => {
        setPercentage(Number(event.target.value) || 0);
        setEnableApplyButton(true);
        if(event.key === "Enter" && event.target.value < 100) {
            applyClicked();
        };
    }

    const applyClicked = () => {
        setEnableApplyButton(false);
        props.setDiscountPercentage(percentage);
        props.closeCallback();
    }

    const clearClicked = async () => {
        setPercentage(0);
        setShowCustomInput(false);
        await props.setDiscountPercentage(0);
        close(true);
    }

    const customClicked = () => {
        setShowCustomInput(true);
        setTimeout(() => {
            document.getElementById("percentage")?.focus();
        }, 10)
    }

    const close = (clearValue?: boolean) => {
        props.closeCallback();
        setShowCustomInput(false);
        if(clearValue) {
            (document.getElementById("percentage") as HTMLInputElement).value = "";
        }
    }

    const predefinedClicked = (percentage: number) => {
        setEnableApplyButton(false);
        setShowCustomInput(false);
        setPercentage(percentage);
        props.setDiscountPercentage(percentage);
        close(true);
    }

    return(
        <div id="main" className={styles.main}>
            <div onClick={() => close()} className={styles.bgCover}></div>
            <div className={styles.modalContainer}>
                <button onClick={() => close()} className={styles.closeButton}>
                    <Image src={"/close.svg"} alt="close icon" width={25} height={25}></Image>
                </button>
                <h1>Discount</h1>
                <div className={styles.inputContainer}>
                    <button className={percentage === semiannualDiscount ? styles.selected : ""} onClick={() => {predefinedClicked(semiannualDiscount)}}>SEMIANNUAL</button>
                    <button className={percentage === quarterlyDiscount ? styles.selected : ""} onClick={() => {predefinedClicked(quarterlyDiscount)}}>QUARTERLY</button>
                    <button className={percentage === bimonthlyDiscount ? styles.selected : ""} onClick={() => {predefinedClicked(bimonthlyDiscount)}}>BIMONTHLY</button>
                    <button className={percentage === monthlyDiscount ? styles.selected : ""} onClick={() => {predefinedClicked(monthlyDiscount)}}>MONTHLY</button>
                    <button onClick={customClicked} style={{display: showCustomInput ? "none" : "block"}}>CUSTOM</button>
                    <div style={{display: showCustomInput ? "block" : "none"}} >
                        <input pattern='[0-9]*' id="percentage" onKeyUp={(event) => keyUp(event)} type="number" />
                        <span className={styles.percentSymbol}>%</span>
                    </div>
                </div>
                <div className={styles.buttonContainer}>
                    <button onClick={clearClicked} className={styles.clearButton}>REMOVE</button>
                    <button style={{opacity: percentage <= 100 && enableApplyButton ? 1 : .6}}
                    disabled={percentage > 100} className={styles.applyButton}
                    onClick={applyClicked}>APPLY
                    </button>
                </div>
            </div>
        </div>
    )
}