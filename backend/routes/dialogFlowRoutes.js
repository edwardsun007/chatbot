const dialogflow = require('dialogflow');
const config = require('../config/keys');

const sessionClient = new dialogflow.SessionsClient();

const sessionPath = sessionClient.sessionPath(config.googleProjectID, config.dialogFlowSessionID);

module.exports = app => {
  app.post('/api/df_text_query', async (req, res)=>{
    console.log(req.body.text);
    const request = {
      session: sessionPath,
      queryInput: {
        text: {
          // The query to send to the dialogflow agent
          text: req.body.text,
          // The language used by the client (en-US)
          languageCode: config.dialogFlowSessionLanguageCode,
        },
      },
    };

    try{
        const responses = await sessionClient.detectIntent(request);
        console.log('Detected intent');
        const result = responses[0].queryResult;
        console.log(`  Query: ${result.queryText}`);
        console.log(`  Response: ${result.fulfillmentText}`);
        res.send(result);
        if (result.intent) {
          console.log(`  Intent: ${result.intent.displayName}`);
        } else {
          console.log(`  No intent matched.`);
        }
    }catch(err){
      console.error('Error', err);
      res.send('Error:', err);
    }
  });
  
  app.post('/users/:userId/books/:bookId', (req, res)=>{
    console.log(req.params);
    res.send('user id with book id route');
  });

  app.post('/api/df_event_query', (req, res)=>{
    res.send({'do': 'event query'})
  });
}