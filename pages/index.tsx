import { useRef } from 'react';

import { LandingPage } from '../src/types/CMSType';
import { getCMSResource } from '../src/service/cms';

import { LandingHeader } from '../src/components/organism/LandingHeader/LandingHeader'
import { FeatureSection } from '../src/components/organism/FeatureSection/FeatureSection';
import { HeroMarketingSection } from '../src/components/organism/HeroMarketingSection/HeroMarketingSection';
import { LandingFooter } from '../src/components/organism/LandingFooter/LandingFooter';

import styles from "./index.module.css"

type HomeProps = {
  cmsData: LandingPage
}

export default function Home({ cmsData }: HomeProps) {
  const homeRef = useRef<HTMLDivElement>(null)
  const featuresRef = useRef<HTMLDivElement>(null)
  const contactRef = useRef<HTMLDivElement>(null)

  const handleScroll = (id: string) => {
    const refs = { home: homeRef, features: featuresRef, contact: contactRef }
    const clickerRef = refs[id]
    if (clickerRef) {
      clickerRef.current.scrollIntoView()
    }
  }

  return (
    <div>
      <LandingHeader onClick={handleScroll} />
      <main className={styles.content}>
        <div ref={homeRef} className={`${styles.contentSection} ${styles.contrastSection}`}>
          <HeroMarketingSection hero={cmsData.hero} carousel={cmsData.carousel} cover={cmsData.cover} />
        </div>
        <div ref={featuresRef} className={styles.contentSection}>
          <FeatureSection features={cmsData.features} />
        </div>
        <div ref={contactRef} className={`${styles.contentSection} ${styles.contrastSection}`}>
          <LandingFooter socialLinks={cmsData.social} />
        </div>
      </main>
    </div>
  )
}

export async function getStaticProps({ locale }) {
  const landingPage = await getCMSResource<LandingPage>(`landing_page?locale=${locale}`)

  return {
    props: {
      cmsData: landingPage
    },
  };
}