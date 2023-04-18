import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.scss'
import HeaderComponent from '@/components/header'
import { useEffect, useLayoutEffect, useState } from 'react'
import DiscountModalComponent from '@/components/discountModal'

export default function Home() {

  const [discountModalOpen, setDiscountModalOpen] = useState<boolean>(false);
  const [discountPercentage, setDiscountPercentage] = useState<number>(0);
  const [initialCostPer, setInitialCostPer] = useState<number>(1.85);
  const [recurringCostPer, setRecurringCostPer] = useState<number>(1.5);
  const [initialTotal, setInitialTotal] = useState<number>(0);
  const [recurringTotal, setRecurringTotal] = useState<number>(0);
  const [discountedInitialTotal, setDiscountedInitialTotal] = useState<number>(0);
  const [discountedRecurringTotal, setDiscountedRecurringTotal] = useState<number>(0);
  const [disableCalculateButton, setDisableCalculateButton] = useState<boolean>(true);
  const [showDiscountData, setShowDiscountData] = useState<boolean>(false);

  useLayoutEffect(() => {
    if(Number((document.getElementById("squareFeet") as HTMLInputElement).value)) {
      setDisableCalculateButton(false);
      console.log("boo")
    }
  }, [discountPercentage])

  const calculateTotals = () => {
    console.log("calc")
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
              <div className={styles.topContainer}>
                <label htmlFor="squareFeet">Square Feet</label>
                <input onChange={() => setDisableCalculateButton(false)} name='squareFeet' id='squareFeet' type="number" />
              </div>
              <div className={styles.resultsContainer}>
                <div className={styles.row}>
                  <span className={styles.rowLabel}>Initial</span>
                  <span>
                    <span style={{textDecoration: showDiscountData ? "line-through" : "none"}} className={styles.cost}>${initialTotal}</span>
                    <span style={{display: showDiscountData ? "inline-block" : "none"}} className={styles.costLowered}>${discountedInitialTotal}</span>
                  </span>
                </div>
                <div className={styles.row}>
                  <span className={styles.rowLabel}>Recurring</span>
                  <span>
                    <span style={{textDecoration: showDiscountData ? "line-through" : "none"}} className={styles.cost}>${recurringTotal}</span>
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
                  <button onClick={() => setDiscountModalOpen(true)} className={styles.clear}>DISCOUNT</button>
                  <button style={{opacity: disableCalculateButton ? 0.6 : 1}} disabled={disableCalculateButton} onClick={calculateTotals} className={styles.calculate}>CALCULATE</button>
                </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
