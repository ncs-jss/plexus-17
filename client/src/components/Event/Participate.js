import React from 'react';
import { default as request } from 'superagent';

const Participate = ({ eventId }) => {
  const participateInEvent = async () => {
    try {
      const res = await request.post(`/api/events/${eventId}/participate`);
      const arenaId = res.body._id;
      console.log('arenaId', arenaId);
    } catch (err) {
      console.error('err', err);
    }
  };
  return (
    <button className="btn btn-outline-primary" onClick={participateInEvent}>
      Participate
    </button>
  );
};

export default Participate;
