import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.scss'
import HeaderComponent from '@/components/header'
import { useEffect, useLayoutEffect, useState } from 'react'
import DiscountModalComponent from '@/components/discountModal'
import SettingsComponent from '@/components/settings'
import { localStorageGet } from '@/storageHandler'

export default function Home() {

  const [discountModalOpen, setDiscountModalOpen] = useState<boolean>(false);
  const [discountPercentage, setDiscountPercentage] = useState<number>(0);
  const [initialCostPer, setInitialCostPer] = useState<number>(0);
  const [recurringCostPer, setRecurringCostPer] = useState<number>(0);
  const [initialTotal, setInitialTotal] = useState<number>(0);
  const [recurringTotal, setRecurringTotal] = useState<number>(0);
  const [discountedInitialTotal, setDiscountedInitialTotal] = useState<number>(0);
  const [discountedRecurringTotal, setDiscountedRecurringTotal] = useState<number>(0);
  const [disableCalculateButton, setDisableCalculateButton] = useState<boolean>(true);
  const [showDiscountData, setShowDiscountData] = useState<boolean>(false);
  const [displaySettings, setDisplaySettings] = useState<boolean>(false);

  useEffect(() => {
    window.addEventListener("storage", storageEventHandler);
    storageEventHandler();
  }, []);

  useEffect(() => {
    if(Number((document.getElementById("squareFeet") as HTMLInputElement).value)) {
      calculateTotals();
    }
  }, [discountPercentage])

  const storageEventHandler = () => {
    const localSettings = localStorageGet();
    setInitialCostPer(Number(localSettings?.initial));
    setRecurringCostPer(Number(localSettings?.recurring));
    setDisableCalculateButton(false);
  }

  const calculateTotals = () => {
    const squareFeet = Number((document.getElementById("squareFeet") as HTMLInputElement).value);
    const initialTotal = Number((squareFeet * initialCostPer).toFixed(0));
    const recurringTotal = Number((squareFeet * recurringCostPer).toFixed(0));
    setInitialTotal(initialTotal);
    setRecurringTotal(recurringTotal);
    setDisableCalculateButton(true);
    
    if(discountPercentage > 0){
      setShowDiscountData(true);
      const discountedInitialTotal = Number((initialTotal - (initialTotal * (discountPercentage * .01))).toFixed(0));
      const discountedRecurringTotal = Number((recurringTotal - (recurringTotal * (discountPercentage * .01))).toFixed(0));
      setDiscountedInitialTotal(discountedInitialTotal);
      setDiscountedRecurringTotal(discountedRecurringTotal);
    } else {
      setShowDiscountData(false);
      setDiscountedInitialTotal(initialTotal);
      setDiscountedRecurringTotal(recurringTotal);
    }
  }

  const closeModal = () => {
    setDiscountModalOpen(false);
  }

  const onKeyDown = (event: any) => {
    if(event.key === "Enter") {
      calculateTotals();
    }
  }
  
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="Can Be Fresh Calculator" content="Can Be Fresh Calculator" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <main className={styles.main}>
        <HeaderComponent></HeaderComponent>
        <div style={{display: discountModalOpen ? "block" : "none"}}>
          <DiscountModalComponent
            closeCallback={closeModal}
            setDiscountPercentage={setDiscountPercentage}
          ></DiscountModalComponent>
        </div>
        <div className={styles.calcBg}>
          <div className={styles.sectionTitle}>
            <Image className={styles.leafIcon} src={"/leaf.svg"} height={20} width={20} alt='leaf icon'></Image>
            <span>Turf Cleaning</span>
          </div>
          <div className={styles.calcBackdrop}>
            <div className={styles.calcContainer}>

              <div style={{display: displaySettings? "none" : "flex"}} className={styles.page1}>
                <div className={styles.topContainer}>
                    <label htmlFor="squareFeet">Square Feet</label>
                    <input onKeyDown={(e) => onKeyDown(e)} onChange={() => setDisableCalculateButton(false)} pattern='[0-9]*' name='squareFeet' id='squareFeet' type="number" />
                  </div>
                  <div className={styles.resultsContainer}>
                    <div className={styles.row}>
                      <span className={styles.rowLabel}>Initial</span>
                      <span>
                        <span style={{textDecoration: showDiscountData ? "line-through" : "none", fontSize: showDiscountData ? 16 : 18}} className={styles.cost}>${initialTotal}</span>
                        <span style={{display: showDiscountData ? "inline-block" : "none"}} className={styles.costLowered}>${discountedInitialTotal}</span>
                      </span>
                    </div>
                    <div className={styles.row}>
                      <span className={styles.rowLabel}>Recurring</span>
                      <span>
                        <span style={{textDecoration: showDiscountData ? "line-through" : "none", fontSize: showDiscountData ? 16 : 18}} className={styles.cost}>${recurringTotal}</span>
                        <span style={{display:showDiscountData ? "inline-block" : "none"}} className={styles.costLowered}>${discountedRecurringTotal}</span>
                      </span>
                    </div>
                    <div className={styles.discountBlock}>
                      <span style={{opacity: discountPercentage > 0 ? 1 : 0}} className={styles.text}>
                        Discount: {discountPercentage}%
                      </span>
                    </div>
                  </div>
                  <div className={styles.buttonsContainer}>
                    <button onClick={() => setDisplaySettings(true)} className={styles.settings}><Image src={"/settings2.svg"} alt='settings icon' height={25} width={25}></Image></button>
                    <button onClick={() => setDiscountModalOpen(true)} className={styles.discount}> <Image src={"/discount.svg"} alt='discount icon' height={25} width={25}></Image></button>
                    <button style={{opacity: disableCalculateButton ? 0.6 : 1}} disabled={disableCalculateButton} onClick={calculateTotals} className={styles.calculate}>CALCULATE</button>
                  </div>
              </div>

              <div style={{display: displaySettings ? "flex" : "none"}} className={styles.page2}>
                <SettingsComponent
                  closeCallback={() => setDisplaySettings(false)}
                ></SettingsComponent>
              </div>
            
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
