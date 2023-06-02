import EventList from "@/components/events/EventList";
import { getFeaturedEvents } from "@/utils/api-utils";
import Head from 'next/head';
import NewsletterRegistration from '@/components/input/NewsLetterRegistration';

const Home = ({ featuredEvents }) => {
  return (
    <div>
      <Head>
        <title>NextJS Events</title>
        <meta
          name='description'
          content='Find a lot of great events that allow you to evolve...'
        />
      </Head>
      <NewsletterRegistration />
      <EventList items={featuredEvents} />
    </div>
  )
}

export const getStaticProps = async () => {
  const featuredEvents = await getFeaturedEvents();

  return {
    props: {
      featuredEvents: featuredEvents
    },
    revalidate: 3600,
  }
}

export default Home