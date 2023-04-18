import React, { useEffect, useState } from "react";
import styles from "@/styles/DiscountModal.module.scss"
import Image from "next/image";

interface Props {
    setDiscountPercentage: Function;
    closeCallback: Function;
}

export default function DiscountModalComponent(props: Props) {

    const [percentage, setPercentage] = useState<number>(0);

    const keyDown = (event: any) => {
        setPercentage(event.target.value | 0);
    }

    const applyClicked = () => {
        props.setDiscountPercentage(percentage);
        props.closeCallback();
    }

    const clearClicked = async () => {
        setPercentage(0);
        await props.setDiscountPercentage(0);
        close(true);
    }

    const close = (clearValue?: boolean) => {
        props.closeCallback();
        if(clearValue) {
            (document.getElementById("percentage") as HTMLInputElement).value = "";
        }
    }

    return(
        <div id="main" className={styles.main}>
            <div onClick={() => close()} className={styles.bgCover}></div>
            <div className={styles.modalContainer}>
                <button onClick={() => close()} className={styles.closeButton}>
                    <Image src={"/close.svg"} alt="close icon" width={25} height={25}></Image>
                </button>
                <h1>Discount Amount</h1>
                <div className={styles.inputContainer}>
                    <input id="percentage" onKeyUp={(event) => keyDown(event)} type="number" />
                    <span className={styles.percentSymbol}>%</span>
                </div>
                <div className={styles.buttonContainer}>
                    <button onClick={clearClicked} className={styles.clearButton}>CLEAR</button>
                    <button style={{opacity: percentage > 100 ? .6 : 1}}
                    disabled={percentage > 100} className={styles.applyButton}
                    onClick={applyClicked}>APPLY
                    </button>
                </div>
            </div>
        </div>
    )
}