import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.scss'
import HeaderComponent from '@/components/header'
import { useEffect, useState } from 'react'
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
  
  const calculateTotals = () => {
    const squareFeet = Number((document.getElementById("squareFeet") as HTMLInputElement).value);
    const initialTotal = Number((squareFeet * initialCostPer).toFixed(0));
    const recurringTotal = Number((squareFeet * recurringCostPer).toFixed(0));
    setInitialTotal(initialTotal);
    setRecurringTotal(recurringTotal);
    
    if(discountPercentage > 0){
      const discountedInitialTotal = Number((initialTotal - (initialTotal * (discountPercentage * .01))).toFixed(0));
      const discountedRecurringTotal = Number((recurringTotal - (recurringTotal * (discountPercentage * .01))).toFixed(0));
      setDiscountedInitialTotal(discountedInitialTotal);
      setDiscountedRecurringTotal(discountedRecurringTotal);
    } else {
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
            // currentDiscountPercentage={discountPercentage}
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
                <input name='squareFeet' id='squareFeet' type="number" />
              </div>
              <div className={styles.resultsContainer}>
                <div className={styles.row}>
                  <span className={styles.rowLabel}>Initial</span>
                  <span>
                    <span className={styles.cost}>${initialTotal}</span>
                    <span className={styles.costLowered}>${discountedInitialTotal}</span>

                  </span>
                </div>
                <div className={styles.row}>
                  <span className={styles.rowLabel}>Recurring</span>
                  <span>
                    <span className={styles.cost}>${recurringTotal}</span>
                    <span className={styles.costLowered}>${discountedRecurringTotal}</span>
                  </span>
                </div>
                <div className={styles.discountBlock}>
                  <span style={{opacity: discountPercentage && discountPercentage > 0 ? 1 : 0}} className={styles.text}>
                    Discount: {discountPercentage}%
                   </span>
                </div>
              </div>
                <div className={styles.buttonsContainer}>
                  <button onClick={() => setDiscountModalOpen(true)} className={styles.clear}>DISCOUNT</button>
                  <button onClick={calculateTotals} className={styles.calculate}>CALCULATE</button>
                </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
