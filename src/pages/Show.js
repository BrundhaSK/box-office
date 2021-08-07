import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { apiGet } from '../misc/Config';

const Show = () => {
  const { id } = useParams();

  const [Show, setShow] = useState(null);

  useEffect(() => {
    apiGet(`/shows/${id}?embed[]=seasons&embed[]=cast`).then(results => {
      setShow(results);
    });
  }, [id]);
  console.log('Show', Show);
  return <div>This is a show page</div>;
};

export default Show;
