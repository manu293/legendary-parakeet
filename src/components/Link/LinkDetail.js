/* eslint-disable no-use-before-define */
// imports
import React, { useEffect, useContext, useState } from 'react';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

// local imports
import { FirebaseContext } from '../../firebase';
import { LinkItem } from './LinkItem';

function LinkDetail(props) {
  const { match } = props;
  const { linkId } = match.params;
  const [link, setLink] = useState(null);
  const [text, setText] = useState('');
  const { firebase, user } = useContext(FirebaseContext);
  const linkRef = firebase.db.collection('links').doc(linkId);

  useEffect(() => {
    getLink();
  }, []);

  function getLink() {
    linkRef.get().then(doc => {
      setLink({ id: doc.id, ...doc.data() });
    });
  }

  function handleAddComment() {
    if (!user) {
      props.history.push('/login');
    } else {
      linkRef.get().then(doc => {
        if (doc.exists) {
          const prevComments = doc.data().comments;
          const comments = {
            postedBy: { id: user.uid, name: user.displayName },
            created: Date.now(),
            text,
          };
          const updatedComments = [...prevComments, comments];
          console.log('The updated comment is: ', updatedComments);
          linkRef.update({ comments: updatedComments });
          setLink(prevState => ({ ...prevState, comments: updatedComments }));
          setText('');
        }
      });
    }
  }

  return !link ? (
    <div>Loading....</div>
  ) : (
    <div>
      <LinkItem showCount={false} link={link} />
      <textarea rows="6" cols="60" onChange={e => setText(e.target.value)} value={text} />
      <div>
        <button className="button" type="button" onClick={handleAddComment}>
          Add Comment
        </button>
      </div>
      {link.comments.map(comment => (
        <div key={link.id}>
          <p className="comment-author">
            {comment.postedBy.name} | {formatDistanceToNow(comment.created)}
          </p>
          <p>{comment.text}</p>
        </div>
      ))}
    </div>
  );
}

export { LinkDetail };
