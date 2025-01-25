import './Inbox.css'
import Email from '../inbox/Email'



function Inbox() {

  return (
    <>
    
      <div className='inbox-header'>
        <div className='selection'>
            <button  className='frst-btn'><img src='src/assets/icons/stop.png'/></button>
            <button  className='scnd-btn'><img src='src/assets/icons/down-arrow.png'/></button>
        </div>
        <button><img src='src/assets/icons/reload.png'/></button>
        <button><img src='src/assets/icons/vertical-dots.png'/></button>

      </div>

      <div className='inbox-body'>
        <Email />
        <Email /><Email /><Email /><Email />
        <Email /><Email /><Email /><Email /><Email /><Email /><Email /><Email /><Email /><Email /><Email />
      </div>

      <div className='pagination'>
        <button><img src='src/assets/icons/left.png'/></button>
        <button><img src='src/assets/icons/right.png'/></button>
      </div>

    </>
  )
}

export default Inbox
