/* eslint-disable no-use-before-define */
// imports
import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';

// local imports
import { FirebaseContext } from '../../firebase';
import { LinkItem } from './LinkItem';
import { LINKS_PER_PAGE } from '../../utils';

function LinkList(props) {
  const { firebase } = useContext(FirebaseContext);
  const [links, setLinks] = useState([]);
  // cursor based pagination
  const [cursor, setCursor] = useState(null);
  const { location, match } = props;
  const page = Number(match.params.page);

  const isNewPage = location.pathname.includes('new');
  const isTopPage = location.pathname.includes('top');

  useEffect(() => {
    const unsubscribe = getLinks();
    return () => unsubscribe;
  }, [isTopPage, page]);

  function getLinks() {
    const hasCursor = Boolean(cursor);

    if (isTopPage) {
      return firebase.db
        .collection('links')
        .orderBy('voteCount', 'desc')
        .limit(LINKS_PER_PAGE)
        .onSnapshot(handleSnapShot);
    }
    if (page === 1) {
      return firebase.db
        .collection('links')
        .orderBy('created', 'desc')
        .limit(LINKS_PER_PAGE)
        .onSnapshot(handleSnapShot);
    }
    if (hasCursor) {
      return firebase.db
        .collection('links')
        .orderBy('created', 'desc')
        .startAfter(cursor.created)
        .limit(LINKS_PER_PAGE)
        .onSnapshot(handleSnapShot);
    }
    // const offset = page * LINKS_PER_PAGE - LINKS_PER_PAGE;
    // axios
    //   .get(
    //     `https://console.firebase.google.com/project/legendary-parakeet/overview?offset=${offset}`
    //   )
    // .then(resp => {
    //   const linksResp = resp.data;
    //   const lastLinkResp = linksResp[linksResp.length - 1];
    //   setLinks(linksResp);
    //   setCursor(lastLinkResp);
    // });
    // return () => {};
    const offset = page * LINKS_PER_PAGE - LINKS_PER_PAGE;
    axios
      .get(
        `https://us-central1-legendary-parakeet.cloudfunctions.net/linksPagination?offset=${offset}`
      )
      .then(resp => {
        const linksResp = resp.data;
        const lastLinkResp = linksResp[linksResp.length - 1];
        setLinks(linksResp);
        setCursor(lastLinkResp);
      });
    return () => {};
  }

  function handleSnapShot(snapShot) {
    const snapLinks = snapShot.docs.map(doc => {
      return { id: doc.id, ...doc.data() };
    });
    const lastLink = snapLinks[snapLinks.length - 1];
    setLinks(snapLinks);
    setCursor(lastLink);
  }

  function visitPrevPage() {
    if (page > 1) {
      props.history.push(`/new/${page - 1}`);
    }
  }

  function visitNextPage() {
    if (page <= links.length / LINKS_PER_PAGE) {
      props.history.push(`/new/${page + 1}`);
    }
  }

  const pageIndex = page ? (page - 1) * LINKS_PER_PAGE + 1 : 0;

  return (
    <div>
      {links.map((link, index) => (
        <LinkItem key={link.id} showCount link={link} index={index + pageIndex} />
      ))}
      {isNewPage && (
        <div className="pagination">
          {' '}
          <div
            className="pointer mr2"
            role="button"
            tabIndex="-1"
            onKeyDown={visitPrevPage}
            onClick={visitPrevPage}
          >
            Previous{' '}
          </div>
          <div
            className="pointer"
            role="button"
            tabIndex="-1"
            onKeyDown={visitNextPage}
            onClick={visitNextPage}
          >
            Next{' '}
          </div>{' '}
        </div>
      )}
    </div>
  );
}

export { LinkList };
