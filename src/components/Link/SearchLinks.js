/* eslint-disable no-use-before-define */
// imports
import React, { useState, useEffect, useContext } from 'react';

// local imports
import { FirebaseContext } from '../../firebase';
import { LinkItem } from './LinkItem';

function SearchLinks() {
  const [filter, setFilter] = useState('');
  const [links, setLinks] = useState([]);
  const [filteredArr, setFilteredArr] = useState([]);
  const { firebase } = useContext(FirebaseContext);
  useEffect(() => {
    getInitialLinks();
  }, []);

  function getInitialLinks() {
    firebase.db
      .collection('links')
      .get()
      .then(snapshot => {
        const resultLlinks = snapshot.docs.map(snap => {
          return { id: snap.id, ...snap.data() };
        });
        setLinks(resultLlinks);
      })
      .catch(err => console.log('Cannot fetch result: ', err.message));
  }

  function handleSearch(e) {
    e.preventDefault();
    const query = filter.toLowerCase();
    const matchedLinks = links.filter(link => {
      return (
        link.description.toLowerCase().includes(query) ||
        link.url.toLowerCase().includes(query) ||
        link.portedBy.name.toLowerCase().includes(query)
      );
    });
    setFilteredArr(matchedLinks);
  }

  return (
    <div>
      <form onSubmit={handleSearch}>
        <div>
          Search <input onChange={e => setFilter(e.target.value)} />
          <button type="submit">Search</button>
        </div>
      </form>
      {filteredArr.map((fa, index) => (
        <LinkItem key={fa.id} showCount={false} link={fa} index={index} />
      ))}
    </div>
  );
}

export { SearchLinks };
