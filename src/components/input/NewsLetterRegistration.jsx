import { useRef, useContext } from 'react';
import classes from './NewsLetterRegistration.module.css';
import NotificationContext from '@/store/notification-context';

const NewsLetterRegistration = () => {
  const emailInputRef = useRef();
  const notificationCtx = useContext(NotificationContext);

  const registrationHandler = (event) => {
    event.preventDefault();

    notificationCtx.showNotification({
      title: 'Signing Up...',
      message: 'Registering for Newsletter',
      status: 'pending'
    })

    fetch('/api/newsletter', {
      method: 'POST',
      body: JSON.stringify({ email: emailInputRef.current.value }),
      headers: {
        'Content-Type': 'application/json',
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
          title: 'Signed Up',
          message: 'Successfully Registered',
          status: 'success'
        })
      })
      .catch(error => {
        notificationCtx.showNotification({
          title: 'Registration failed',
          message: error.message || 'You are not Registered, Try again!',
          status: 'error'
        })
      })
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            type='email'
            id='email'
            placeholder='Your email'
            aria-label='Your email'
            ref={emailInputRef}
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
}

export default NewsLetterRegistration;