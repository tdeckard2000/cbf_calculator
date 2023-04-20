import React from "react";
import styles from "@/styles/StatusModal.module.scss"

interface Props {
    children: any
}

export default function StatusModalComponent (props: Props) {
    return(
        <div className={styles.backdrop}>
            <div className={styles.modal}>
                <div className={styles.bodyText}>
                    {props.children}
                </div>
            </div>
        </div>
    )
}