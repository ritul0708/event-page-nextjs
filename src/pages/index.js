import EventList from "@/components/events/EventList";
import { getFeaturedEvents } from "@/utils/api-utils";

const Home = ({ featuredEvents }) => {
  return (
    <div>
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