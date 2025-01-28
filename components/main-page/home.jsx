import Head from 'next/head';
import { HomeHeader } from '@/components/main-page/home_header';
import { Footer } from '@/components/main-page/footer';
import { Hero } from '@/components/main-page/hero';
import { GallerySection } from './gallery_section';
import { SocialJob } from './social_job';
import { Jobs } from './jobs';
import { CTA } from './cta';
import { PromotionalVideo } from './promotional_video';
import { Testimonials } from './testimonials_job';
import CompanyLogos from './company_logos';

export function Home({
  jobs,
  company,
  photoPath,
  style,
  child_companies_logo,
  type,
  company_page_url,
}) {
  return (
    <div style={style}>
      <Head>
        <title>{company?.name || 'Mavielo RH'}</title>
        <meta name="mavielorh.com.br" content="mavielorh.com.br." />
      </Head>
      <HomeHeader
        company_id={company.company_id}
        type={type}
        logo={company?.f_logo}
        photoPath={photoPath}
        website={company?.social_medias?.website}
        style={style}
        company_page_url={company_page_url}
      />
      <main>
        <Hero company_name={company?.name} text={company?.hero_text} banner={company?.f_banner} />
        {/* <SecondaryFeatures company={company} /> */}
        <Jobs jobs={jobs} />
        {company?.public_about && (
          <CTA
            about={company?.public_about}
            about_image={company?.f_about}
            mission={company?.mission}
            vision={company?.vision}
            values={company?.values}
            style={style}
          />
        )}
        {type === 'business' && company?.gallery?.length >= 4 && (
          <GallerySection gallery={company?.gallery} name={company?.name || 'Mavielo RH'} />
        )}
        {type === 'partner' && child_companies_logo && child_companies_logo?.length >= 5 && (
          <CompanyLogos child_companies_logo={child_companies_logo} company_name={company?.name} />
        )}
        {(company?.testimonies?.length || 0) >= 2 && (
          <Testimonials testimonies={company.testimonies} />
        )}
        {company?.social_medias && Object.keys(company?.social_medias).length > 0 && (
          <SocialJob social_medias={company?.social_medias} />
        )}
        {company?.f_video && <PromotionalVideo video={company.f_video} />}
        {/* <WhatsappCanal/> */}
      </main>
      <Footer />
    </div>
  );
}
