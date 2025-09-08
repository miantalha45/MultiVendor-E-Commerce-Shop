import React from "react";
import { useSelector } from "react-redux";
import EventCard from "../components/Events/EventCard";
import Header from "../components/Layout/Header";
import Loader from "../components/Layout/Loader";

const EventsPage = () => {
  const { allEvents, isLoading } = useSelector((state) => state.event);
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <Header activeHeading={4} />
          {allEvents &&
            allEvents.length != 0 &&
            allEvents.map((event, index) => (
              <EventCard active={index === 0 && true} data={event} />
            ))}
        </div>
      )}
    </>
  );
};

export default EventsPage;
