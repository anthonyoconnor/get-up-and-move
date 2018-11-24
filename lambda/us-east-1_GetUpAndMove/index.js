/* eslint-disable  func-names */
/* eslint-disable  no-console */

const Alexa = require('ask-sdk-core');
const activities = require('./activities');

const appName = 'Get up and move';
const continueMessage = 'Would you like to keep moving?';
const finishMessage = 'Thanks for playing. Goodbye!';
const welcomeReprompt = "Are you ready to move?";

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
    },
    handle(handlerInput) {

        const attributesManager = handlerInput.attributesManager;
        const sessionAttributes = attributesManager.getSessionAttributes();
        sessionAttributes.usedActivities = [];

        const welcomeOutput = `Welcome to get up and move! You will need some room to move. 
    <break time= "0.8s" /> 
    Stand in the middle of the room and stretch your arms out.
    <break time= "1s" /> 
    Make sure you are not touching anything or anybody. 
    <break time= "1s" /> 
    Are you ready to start?`;

        return handlerInput.responseBuilder
            .speak(welcomeOutput)
            .reprompt(welcomeReprompt)
            .withSimpleCard(appName, `Welcome to get up and move! Let's do some moving.`)
            .getResponse();
    },
};

const ContinueIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'ContinueIntent';
    },
    handle(handlerInput) {

        const speechOutput = getSetOfActivities(handlerInput) + ' ' + continueMessage;

        return handlerInput.responseBuilder
            .speak(speechOutput)
            .reprompt(continueMessage)
            .withSimpleCard(appName, 'Follow my instructions.')
            .getResponse();
    },
};

const FinishIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'FinishIntent';
    },
    handle(handlerInput) {
        return handlerInput.responseBuilder
            .speak(finishMessage)
            .withSimpleCard(appName, finishMessage)
            .getResponse();
    },
};

const HelpIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speechText = `Stand in the middle of the room and make sure you have some space. 
    Then follow my instructions. ` + welcomeReprompt;

        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(welcomeReprompt)
            .withSimpleCard(appName, speechText)
            .getResponse();
    },
};

const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent'
                || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {

        return handlerInput.responseBuilder
            .speak(finishMessage)
            .withSimpleCard(appName, finishMessage)
            .getResponse();
    },
};

const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        console.log(`Session ended with reason: ${handlerInput.requestEnvelope.request.reason}`);

        return handlerInput.responseBuilder.getResponse();
    },
};

const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        console.log(`Error handled: ${error.message}`);
        const message = `Sorry, I can't understand the command. ${continueMessage}`;
        return handlerInput.responseBuilder
            .speak(message)
            .reprompt(message)
            .getResponse();
    },
};

const skillBuilder = Alexa.SkillBuilders.custom();

exports.handler = skillBuilder
    .addRequestHandlers(
        LaunchRequestHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        SessionEndedRequestHandler,
        ContinueIntentHandler,
        FinishIntentHandler
    )
    .addErrorHandlers(ErrorHandler)
    .lambda();


function getSetOfActivities(handlerInput) {

    const attributesManager = handlerInput.attributesManager;
    const sessionAttributes = attributesManager.getSessionAttributes();

    let usedActivities = sessionAttributes.usedActivities;
    const numberOfActivities = 3;
    if (usedActivities.length >= activities.length - numberOfActivities) {
        usedActivities = [];
    }

    let nextActivities = getNextActivityIndexes(numberOfActivities, activities.length, usedActivities);

    let output = "";

    for (let index of nextActivities) {
        output += "<audio src='soundbank://soundlibrary/cartoon/amzn_sfx_boing_short_1x_01'/> " + activities[index];
        usedActivities.push(index);
    }

    sessionAttributes.usedActivities = usedActivities;

    return output;
}

function getNextActivityIndexes(numberOfActivities, activiesLength, usedActivities) {
    if (usedActivities.length >= activiesLength - numberOfActivities) {
        usedActivities = [];
    }

    var usedSet = new Set(usedActivities);
    var set = new Set();
    while (set.size < numberOfActivities) {
        const index = Math.floor(Math.random() * activiesLength);
        if (!usedSet.has(index) && !set.has(index)) {
            set.add(index);
        }
    }

    return set;
}
