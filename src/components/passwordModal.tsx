import React, { FormEvent, useEffect, useState } from "react";
import styles from "@/styles/PasswordModal.module.scss";

interface Props {
    cancelCallback: Function;
    validPasswordCallback: Function;
    showPasswordModal: boolean;
}

export default function PasswordModalComponent (props: Props) {

    const [invalidPassword, setInvalidPassword] = useState<boolean>(false);

    useEffect(() => {
        if(props.showPasswordModal) {
            document.getElementById("password")?.focus();
        }
    }, [props.showPasswordModal])

    const submitClicked = (e: FormEvent) => {
        e.preventDefault();
        console.log(e)
        const inputValue = (document.getElementById("password") as HTMLInputElement).value;
        if(passwordIsValid(inputValue)) {
            closeAndClearInput();
            props.validPasswordCallback();
        }
    }

    const closeAndClearInput = () => {
        props.cancelCallback();
        (document.getElementById("password") as HTMLInputElement).value = "";
        setInvalidPassword(false);
    }
    
    const passwordIsValid = (password: string): boolean => {
        console.log(password, " vs ", process.env.NEXT_PUBLIC_SETTINGS_PASSWORD)
        if(password === process.env.NEXT_PUBLIC_SETTINGS_PASSWORD) {
            console.log("value")
            return true;
        } else {
            setInvalidPassword(true);
            return false;
        }
    }

    return (
        <div className={styles.backdrop}>
            <div className={styles.modal}>
                <h1>Password</h1>
                <form action="">
                    <input onKeyDown={() => setInvalidPassword(false)} style={{borderColor: invalidPassword ? "red" : '#a5a5a5'}} className={styles.input} type="password" name="" id="password" autoComplete="password" />
                    <div className={styles.buttonContainer}>
                        <button onClick={closeAndClearInput} type="button" className={styles.cancel}>Cancel</button>
                        <button type="submit" onClick={(e) => submitClicked(e)} className={styles.submit}>Submit</button>
                    </div>
                </form>
            </div>
        </div>
    )
}