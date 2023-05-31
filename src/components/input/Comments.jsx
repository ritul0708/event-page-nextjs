import { useContext, useEffect, useState } from 'react';

import CommentList from './CommentList';
import NewComment from './NewComment';
import classes from './Comments.module.css';
import NotificationContext from '@/store/notification-context';

const Comments = (props) => {
  const { eventId } = props;
  const notificationCtx = useContext(NotificationContext);

  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [isFetchingComments, setIsFetchingComments] = useState(false);

  useEffect(() => {
    if(showComments) {
      setIsFetchingComments(true)
      fetch(`/api/comments/${eventId}`)
        .then(res => res.json())
        .then(data => {
          setComments(data.comments);
          setIsFetchingComments(false)
        })
    }
  }, [showComments])

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  function addCommentHandler(commentData) {

    notificationCtx.showNotification({
      title: 'Adding Comment',
      message: 'YOur comment is currently being stored into a database',
      status: 'pending'
    })

    fetch(`/api/comments/${eventId}`,{
      method: 'POST',
      body: JSON.stringify(commentData),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(async response => {
        if(response.ok) {
          return response.json();
        }
        const data = await response.json();
        throw new Error(data.message || 'Something went wrong!');
      }) 
      .then(data => {
        notificationCtx.showNotification({
          title: 'Comment Added',
          message: 'Your comment has been added to the database',
          status: 'success'
        })
      })
      .catch(error => {
        notificationCtx.showNotification({
          title: 'Adding comment failed ',
          message: error.message || 'Your comment was not added to the database',
          status: 'error'
        })
      })
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? 'Hide' : 'Show'} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && !isFetchingComments && <CommentList comments={comments} />}
      {showComments && isFetchingComments && <p>Loading...</p>}
    </section>
  );
}

export default Comments;