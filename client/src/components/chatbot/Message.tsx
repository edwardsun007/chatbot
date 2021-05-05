import React from 'react'
import {speaker} from '../constants/constants';

interface IMessageProps {
  speaks: string,
  
  text: string
}

const Message = (props: IMessageProps) => {
  const {speaks, text} = props;

  return (
    <div className="col s12 m8 offset-m2 offset-l3" style={{backgroundColor: 'orange', height: '300px'}}>
      <div className='card-panel grey lighten-5 z-depth-1'>
        <div className='row valign-wrapper'>
          {
            speaks === speaker.bot && 
            (
            <div className='col s2'>
                <a className="btn-floating btn-large waves-effect waves-light red">{speaks}</a>
            </div>
            )
          }
            <div className="col s10">
              <span className="black-text">
                {text}
              </span>
            </div>
            {props.speaks === speaker.me &&
                <div className="col s2">
                    <a href="/" className="btn-floating btn-large waves-effect waves-light red">{speaks}</a>
                </div>
            }
        </div>
      </div>
    </div>
  )
}

export default Message;
