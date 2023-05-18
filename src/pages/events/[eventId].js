import EventContent from "@/components/eventDetail/EventContent";
import EventLogistics from "@/components/eventDetail/EventLogistics";
import EventSummary from "@/components/eventDetail/EventSummary";
import ErrorAlert from "@/components/ui/ErrorAlert";
import { getEventById } from "@/dummy-data";
import { useRouter } from "next/router"

const EventDetailPage = () => {
  const router = useRouter();
  const eventId = router.query.eventId;
  const event = getEventById(eventId);

  if(!event) {
    return (
      <ErrorAlert>
        <p>No event Found</p>
      </ErrorAlert>
    )
      
  }

  return (
    <>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title} 
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </>
  )
}

export default EventDetailPage