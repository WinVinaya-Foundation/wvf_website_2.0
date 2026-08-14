import { PageHero } from '../../components';
import { contactHero } from './contactContent';
import { ContactChannelsSection, ContactFormMapSection, OfficesSection } from '../../sections/contact';

export default function ContactPage() {
  return (
    <>
      <PageHero eyebrow={contactHero.eyebrow} title={contactHero.headline} subtitle={contactHero.subheadline} />
      <ContactChannelsSection />
      <OfficesSection />
      <ContactFormMapSection />
    </>
  );
}
