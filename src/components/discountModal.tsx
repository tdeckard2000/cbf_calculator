import React, { useEffect, useState } from "react";
import styles from "@/styles/DiscountModal.module.scss"
import Image from "next/image";
import { localStorageGet } from "@/storageHandler";

interface Props {
    setDiscountPercentage: Function;
    closeCallback: Function;
}

export default function DiscountModalComponent(props: Props) {

    const [percentage, setPercentage] = useState<number>(0);
    const [showCustomInput, setShowCustomInput] = useState<boolean>(false)
    const [semiannualDiscount, setSemiannualDiscount] = useState<number>(5);
    const [quarterlyDiscount, setQuarterlyDiscount] = useState<number>(10);
    const [bimonthlyDiscount, setBimonthlyDiscount] = useState<number>(15);
    const [monthlyDiscount, setMonthlyDiscount] = useState<number>(20);
    const [enableApplyButton, setEnableApplyButton] = useState<boolean>(false);

    useEffect(() => {
        window.addEventListener("storage", storageEventHandler);
        storageEventHandler();
    })

    const storageEventHandler = () => {
        const localSettings = localStorageGet();
        setSemiannualDiscount(localSettings?.semiannual || 0);
        setQuarterlyDiscount(localSettings?.quarterly || 0);
        setBimonthlyDiscount(localSettings?.bimonthly || 0);
        setMonthlyDiscount(localSettings?.monthly || 0);

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

    const close = (clearValue?: boolean) => {
        props.closeCallback();
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
                    <button onClick={() => setShowCustomInput(true)} style={{display: showCustomInput ? "none" : "block"}}>CUSTOM</button>
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