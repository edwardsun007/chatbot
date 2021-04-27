'use strict'
const dialogflow = require('dialogflow');
const structjson = require('./structjson');
const config = require('../config/keys');

const sessionClient = new dialogflow.SessionsClient();

const sessionPath = sessionClient.sessionPath(config.googleProjectID, config.dialogFlowSessionID);


module.exports = {
  textQuery: async function(text, parameters={}) {
    let self = module.exports; // get ref to this module so we can use other methods here
    const request = {
      session: sessionPath,
      queryInput: {
        text: {
          // The query to send to the dialogflow agent
          text: text,
          // The language used by the client (en-US)
          languageCode: config.dialogFlowSessionLanguageCode,
        },
      },
      queryParams: {
        payload: {
          data: parameters
        }
      }
    };

    try {
      let responses = await sessionClient.detectIntent(request);
      responses = await self.handleAction(responses);
      return responses;
    } catch (err) {
      console.error(err);
      return null;
    }
  },

  eventQuery: async function(event, parameters={}) {
    let self = module.exports; // get ref to this module so we can use other methods here
    const request = {
      session: sessionPath,
      queryInput: {
        event: {
          name: event,
          parameters: structjson.structProtoToJson(parameters),
          languageCode: config.dialogFlowSessionLanguageCode,
        },
      }
    };

    let responses = await sessionClient.detectIntent(request);
    responses = await self.handleAction(responses);
    return responses;
  },

  handleAction: function(responses){
    return responses;
  }
}