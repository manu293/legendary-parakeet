/* eslint-disable no-use-before-define */
// imports
import React, { useContext, useEffect, useState } from 'react';

// local imports
import { FirebaseContext } from '../../firebase';
import { LinkItem } from './LinkItem';

function LinkList() {
  const { firebase } = useContext(FirebaseContext);
  const [links, setLinks] = useState([]);
  useEffect(() => {
    getLinks();
  }, []);

  function getLinks() {
    firebase.db.collection('links').onSnapshot(handleSnapShot);
  }

  function handleSnapShot(snapShot) {
    const snapLinks = snapShot.docs.map(doc => {
      return { id: doc.id, ...doc.data() };
    });
    setLinks(snapLinks);
  }

  return (
    <div>
      {links.map((link, index) => (
        <LinkItem key={link.id} showCount link={link} index={index + 1} />
      ))}
    </div>
  );
}

export { LinkList };
