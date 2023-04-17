import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.scss'
import HeaderComponent from '@/components/header'
import { useEffect } from 'react'

export default function Home() {
  // ios viewport fix
  const appHeight = () => {
    console.log("height reset")
    const doc = document.documentElement;
    doc.style.setProperty('--app-height', `${window.innerHeight}px`)
  }

  useEffect(() => {
    // ios viewport fix
    window.addEventListener('resize', appHeight);
    appHeight();
  })
  
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
        <div className={styles.calcBg}>
          <div className={styles.sectionTitle}>
            <Image className={styles.leafIcon} src={"/leaf.svg"} height={20} width={20} alt='leaf icon'></Image>
            <span>Turf Cleaning</span>
          </div>
          <div className={styles.calcBackdrop}>
            <div className={styles.calcContainer}>
              <div className={styles.topContainer}>
                <label htmlFor="squareFeet">Square Feet</label>
                <input name='squareFeet' id='squareFeet' type="text" />
              </div>
              <div className={styles.resultsContainer}>
              {/* <div className={styles.discountRow}>$180</div> */}
                <div className={styles.row}>
                  <span className={styles.rowLabel}>Initial</span>
                  <span className={styles.rowCost}>$325</span>
                </div>
                {/* <div className={styles.discountRow}>$180</div> */}
                <div className={styles.row}>
                  <span className={styles.rowLabel}>Recurring</span>
                  <span>
                    <span className={styles.cost}>$150</span>
                    <span className={styles.costLowered}>$100</span>
                  </span>
                </div>
                <div className={styles.discountBlock}>
                  <span className={styles.text}>Discount: 25%
                   {/* <Image src={"/check.svg"} alt='checkmark' width={22} height={22}></Image> */}
                   </span>
                  {/* <span className={styles.rowCost}>25%</span> */}
                </div>
              </div>
                <div className={styles.buttonsContainer}>
                  <button className={styles.clear}>DISCOUNT</button>
                  <button className={styles.calculate}>CALCULATE</button>
                </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
