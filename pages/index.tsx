import Head from 'next/head'
import { useRef } from 'react';

import { APP_NAME } from '../src/constants';
import { fetchResource } from '../src/service/cms';
import { Feature, FeatureApiResponse, HeroMarketing, HeroMarketingApiResponse } from '../src/types/CMSType';

import { LandingHeader } from '../src/components/organism/LandingHeader/LandingHeader'
import { FeatureSection } from '../src/components/organism/FeatureSection/FeatureSection';
import { HeroMarketingSection } from '../src/components/organism/HeroMarketingSection/HeroMarketingSection';
import { LandingFooter } from '../src/components/organism/LandingFooter/LandingFooter';

import styles from "./index.module.css"

type HomeProps = {
  cmsData: {
    features: Feature[];
    hero: HeroMarketing;
  }
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
      <Head>
        <title>{APP_NAME}</title>
        <meta name="description" content={APP_NAME} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <LandingHeader onClick={handleScroll} />
      <main className={styles.content}>
        <div ref={homeRef} className={`${styles.contentSection} ${styles.contrastSection}`}>
          <HeroMarketingSection hero={cmsData.hero} />
        </div>
        <div ref={featuresRef} className={styles.contentSection}>
          <FeatureSection features={cmsData.features} />
        </div>
        <div ref={contactRef} className={`${styles.contentSection} ${styles.contrastSection}`}>
          <LandingFooter />
        </div>
      </main>
    </div>
  )
}

export async function getStaticProps() {
  const featuresPromise = fetchResource<FeatureApiResponse>('app_features')
  const heroMarketingPromise = fetchResource<HeroMarketingApiResponse>('app_hero_marketing')

  const [heroMarketing, features] = await Promise.all([heroMarketingPromise, featuresPromise])

  return {
    props: {
      cmsData: {
        features: features.data,
        hero: heroMarketing.data,
      }
    },
  };
}