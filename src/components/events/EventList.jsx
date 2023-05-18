import React from 'react';
import EventItem from './EventItem';
import classes from './EventList.module.css'

const EventList = ({ items }) => {
  return (
    <ul className={classes.list}>
      {items.map((event) => (
        <EventItem 
          key={event.id}
          id={event.id}
          image={event.image}
          location={event.location}
          date={event.date}
          title={event.title}
        />
      ))}
    </ul>
  )
}

export default EventList