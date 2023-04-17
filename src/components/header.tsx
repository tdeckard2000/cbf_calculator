import React from "react";
import styles from "@/styles/Header.module.scss"
import Image from "next/image";

export default function HeaderComponent() {
    return(
        <div className={styles.main}>
            <div>
                
            </div>
            <div>
                <Image src={"/logoMain.png"} width={80.38} height={32} alt="company logo"></Image>
            </div>
            <div>
                <Image src={"/menuIconBold.svg"} height={20} width={20} alt="manu icon"></Image>
            </div>
        </div>
    )
}