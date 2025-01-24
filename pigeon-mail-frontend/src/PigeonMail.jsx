import './PigeonMail.css'
import Inbox from './inbox/Inbox'

function PigeonMail() {

  return (
    <>
    <div className='base'>

      <div className='sidebar'>

      </div>

      <div className='main'>

            <div className='toolbar'>

            </div>

            <div className='main-body'>
              <Inbox />

            </div>

      </div>


    </div>



    </>
  )
}

export default PigeonMail
