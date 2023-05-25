import EventContent from "@/components/eventDetail/EventContent";
import EventLogistics from "@/components/eventDetail/EventLogistics";
import EventSummary from "@/components/eventDetail/EventSummary";
import { getEventById, getFeaturedEvents } from "@/utils/api-utils";

const EventDetailPage = ({ selectedEvent }) => {

  if(!selectedEvent) {
    return (
      <div className="center">
        <p>Loading...</p>
      </div>
    )
      
  }

  return (
    <>
      <EventSummary title={selectedEvent.title} />
      <EventLogistics
        date={selectedEvent.date}
        address={selectedEvent.location}
        image={selectedEvent.image}
        imageAlt={selectedEvent.title} 
      />
      <EventContent>
        <p>{selectedEvent.description}</p>
      </EventContent>
    </>
  )
}

export const getStaticProps = async (context) => {
  const eventId = context.params.eventId;
  const event = await getEventById(eventId);

  return {
    props: {
      selectedEvent: event
    },
    revalidate: 300
  }
}

export const getStaticPaths = async () => {
  const events = await getFeaturedEvents();
  const paths = events.map(event => ({params: {eventId: event.id}}))
  return {
    paths: paths,
    // fallback: true,
    fallback: 'blocking',
  }
}

export default EventDetailPage