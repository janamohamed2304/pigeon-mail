import './Email.css'


import PropTypes from 'prop-types';

function Email({email}) {

  return (
    <>
    <div className='email-component'>
      <button><img src='src/assets/icons/stop.png'/></button>
      <button><img src='src/assets/icons/star-empty.png'/></button>
        <div>{email.fromEmail}</div>
        <div>{email.subject}</div>
        <div>{email.message}</div>
        <div>{email.priority}</div>
        <div>{email.sentAt}</div>
      <button className='bin'><img src='src/assets/icons/bin.png'/></button>
    </div>

    </>
  )
}
Email.propTypes = {
  email: PropTypes.shape({
    fromEmail: PropTypes.string.isRequired,
    subject: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    priority: PropTypes.string.isRequired,
    sentAt: PropTypes.string.isRequired
  }).isRequired
};

export default Email;

