const chatbot = require('../chatbot/chatbot');

module.exports = app => {
  // query by text input from UI
  app.post('/api/df_text_query', async (req, res)=>{
    let responses = await chatbot.textQuery(req.body.text, req.body.parameters);
    if (responses){
      const result = responses[0].queryResult;
      console.log(`  Query: ${result.queryText}`);
      console.log(`  Response: ${result.fulfillmentText}`);
      res.send(result);
      if (result.intent) {
            console.log(`  Intent: ${result.intent.displayName}`);
      } else {
            console.log(`  No intent matched.`);
      }
    } else {
      res.send('Error: something went wrong with text query');
    }
  });

  // query by event
  app.post('/api/df_event_query', async (req, res)=>{
    let responses = await chatbot.eventQuery(req.body.event, req.body.parameters);
    if (responses){
      const result = responses[0].queryResult;
      console.log(`  Query: ${result.queryText}`);
      console.log(`  Response: ${result.fulfillmentText}`);
      res.send(result);
      if (result.intent) {
            console.log(`  Intent: ${result.intent.displayName}`);
      } else {
            console.log(`  No intent matched.`);
      }
    } else {
      res.send('Error: something went wrong with event query');
    }
  });
  
  app.post('/users/:userId/books/:bookId', (req, res)=>{
    console.log(req.params);
    res.send('user id with book id route');
  });


}