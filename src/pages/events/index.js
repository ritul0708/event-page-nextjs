import EventList from "@/components/events/EventList";
import EventsSearch from "@/components/events/EventSearch";
import { getAllEvents } from "@/dummy-data";
import { useRouter } from "next/router";

const AllEventsPage = () => {
  const router = useRouter();
  const allEvents = getAllEvents();

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

export default AllEventsPage