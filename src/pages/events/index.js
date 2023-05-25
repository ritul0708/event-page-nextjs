import EventList from "@/components/events/EventList";
import EventsSearch from "@/components/events/EventSearch";
import { getAllEvents } from "@/utils/api-utils";
import { useRouter } from "next/router";

const AllEventsPage = ({ allEvents }) => {
  const router = useRouter();

  const eventSearchHandler = (year, month) => {
    const fullPath = `/events/${year}/${month}`;

    router.push(fullPath);
  }

  return (
    <div>
      <EventsSearch onSearch={eventSearchHandler} />
      <EventList items={allEvents} />
    </div>
  )
}

export const getStaticProps = async () => {
  const allEvents = await getAllEvents();

  return {
    props: {
      allEvents: allEvents,
    },
    revalidate: 60
  }
}

export default AllEventsPage