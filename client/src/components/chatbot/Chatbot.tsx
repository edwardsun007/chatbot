import React, {useState, useEffect} from 'react';
import axios from 'axios/index';
import Message from './Message';
/**
 * Chatbot component should be available on all pages
 */
type IMessageType = 
{ speaker: string, 
  msg: { text: { text: string } } 
}


const Chatbot = ():React.ReactElement => {
  const [messages, setMessages] = useState<IMessageType[]>([]);

  const df_text_query = async (text: string) => {
    let conversation = {
      speaker: 'me',
      msg: {
        text: {
          text: text
        }
      }
    };

    setMessages([
      ...messages,
      conversation
    ])

    try {
      const res = await axios.post(
        '/api/df_text_query',
        {"text": text}
      )
      
      console.log(res.status);
      
      for(let msg of res.data.fulfillmentMessages) {
        conversation = {
          speaker: 'Eva',
          msg
        };
        setMessages([
          ...messages,
          conversation
        ]);
      }

    } catch (err) {
      console.error(err);
    }
  }

  const df_event_query = async (event: string) => {
    try {
      const res = await axios.post(
        '/api/df_event_query',
        {"event": event}
      )


      if(res.status == 200){
        for(let msg of res.data.fulfillmentMessages) {
          let conversation = {
            speaker: 'bot',
            msg
          };
          setMessages([
            ...messages,
            conversation
          ]);
        }
      }

    } catch (err) {
      console.error(err);
    }
  }


  const renderMessages = (messages: IMessageType[]) => {
    if(messages){
      return messages.map((message, i)=>
        <Message speaks={message.speaker} text={message.msg.text.text} key={i}/>
    )
    }else{
      return null;
    }
  }

  useEffect(()=>{
    df_event_query('Welcome');
  }, [])


  const handleInputKeyPress = (e:React.KeyboardEvent) => {
    console.log(e.key);
    if(e.key === 'Enter'){
      console.log(e.target);
      // df_text_query((e.target.value)
    }
  }

  return (
    <section style={{height: 400, width: 400, float: 'right'}}>
      <div id="chatbot" style={{height: '100%', width: '100%', overflow: 'auto'}}>
        <h3>Chatbot</h3>
        {
          renderMessages(messages)
        }
        <input type='text' onKeyDown={handleInputKeyPress}/>
      </div>
    </section>
  )
}

export default Chatbot;
