// imports
import React, { useContext } from 'react';
import { Link, withRouter } from 'react-router-dom';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

// local imports
import { getDomain } from '../../utils';
import { FirebaseContext } from '../../firebase';

function LinkItem({ link, index, showCount, history }) {
  const { firebase, user } = useContext(FirebaseContext);
  function handleVote() {
    if (!user) {
      history.push('/login');
    } else {
      // to update a doc in firestore we need to have a reference to it
      const voteRef = firebase.db.collection('links').doc(link.id);
      // we need to get the referenced doc
      voteRef.get().then(doc => {
        if (doc.exists) {
          const prevVotes = doc.data().votes;
          const newVotes = { votedBy: { id: user.uid, name: user.displayName } };
          const updatedVotes = [...prevVotes, newVotes];
          const voteCount = updatedVotes.length;
          // update expects an object to be passed
          voteRef.update({ votes: updatedVotes, voteCount });
        }
      });
    }
  }

  function handleDeleteLink() {
    const deleteRef = firebase.db.collection('links').doc(link.id);
    deleteRef
      .delete()
      .then(() => console.log(`Document was delete : ${link.id}`))
      .catch(() => console.log('There was a problem in deleting the links'));
  }

  const postedByUser = user && user.uid === link.portedBy.id;

  return (
    <div className="flex item-start mt2">
      <div className="flex items-center">
        {showCount && <span className="gray">{index}. </span>}
        <div
          className="vote-button"
          role="button"
          tabIndex="-1"
          onKeyDown={handleVote}
          onClick={handleVote}
        >
          ▲
        </div>
      </div>
      <div className="ml1">
        <div>
          {' '}
          <a className="black no-underline" href={link.url}>
            {link.description}
          </a>{' '}
          <span className="link">{getDomain(link.url)}</span>
        </div>
        <div className="f6 lh-copy gray">
          {link.voteCount} votes by {link.portedBy.name} {formatDistanceToNow(link.created)} |
          {
            <Link to={`/link/${link.id}`}>
              {link.comments.length > 0 ? `${link.comments.length} comments` : 'discuss'}
            </Link>
          }{' '}
          {postedByUser && (
            <>
              |
              <span
                className="delete-button"
                role="button"
                tabIndex="-1"
                onKeyDown={handleDeleteLink}
                onClick={handleDeleteLink}
              >
                Delete{' '}
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

const hLinkItem = withRouter(LinkItem);

export { hLinkItem as LinkItem };
