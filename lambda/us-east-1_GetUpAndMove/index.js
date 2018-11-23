/* eslint-disable  func-names */
/* eslint-disable  no-console */

const Alexa = require('ask-sdk-core');

const appName = 'Get up and move';
const continueMessage = 'Would you like to keep moving?';
const finishMessage = 'Thanks for playing. Goodbye!';


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

        const welcomeReprompt = "Are you ready to move?";

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
    Then follow my instructions.`;

        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
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


const activities = [
    `Follow my instructions as fast as you can.  <say-as interpret-as="interjection">good luck</say-as>.
        <break time= "0.5s" />
        Put your hands straight up in the air. 
        <break time= "1.5s" />
        Touch your knees. 
        <break time= "1.5s" />
        Touch your head. 
        <break time= "1.5s" />
        Touch your toes. 
        <break time= "1.5s" />
        Touch your ears. 
        <break time= "1.5s" />
        Touch your elbows. 
        <break time= "1.5s" />
        Good job!
        <break time= "1s" />
        `,
    `Follow my instructions.
        <break time= "0.5s" />
        Stand up tall on your tippy toes. 
        <break time= "1.5s" />
        Crouch down as small as you can. 
        <break time= "1.5s" />
        Stand up tall on your tippy toes.
        <break time= "1.5s" />
        Crouch down as small as you can. 
        <break time= "1.5s" />
        Stand up tall on your tippy toes.
        <break time= "1.5s" />
        Last time! Crouch down as small as you can.
        <break time= "1.5s" />
        <say-as interpret-as="interjection">well done</say-as>.
        <break time= "1s" />
        `,
    `Run on the spot slowly as I count to 5.
        1 <break time= "1s" /> 
        2 <break time= "1s" />
        3 <break time= "1s" />
        4 <break time= "1s" />
        5 <break time= "1s" />
        <say-as interpret-as="interjection">well done</say-as>.
        <break time= "1s" />`,
    `Run on the spot as fast as you can. I'll count to five.
        <prosody rate="fast">Go</prosody>.
        1 <break time= "1s" /> 
        2 <break time= "1s" />
        3 <break time= "1s" />
        4 <break time= "1s" />
        5 <break time= "1s" />
        <say-as interpret-as="interjection">way to go</say-as>.
        <break time= "1s" />`,
    `Run on the spot slowly as I count to 5.
        1 <break time= "1s" /> 
        2 <break time= "1s" />
        3 <break time= "1s" />
        4 <break time= "1s" />
        5 <break time= "1s" />
        <say-as interpret-as="interjection">well done</say-as>.
        <break time= "1s" />`,
    `Flap like a bird for a count of 3.
        1 <break time= "1s" /> 
        2 <break time= "1s" />
        3 <break time= "1s" />
        <break time= "1s" />`,
    `Squat down and Jump like a frog.
        <break time= "1s" /> 
        <say-as interpret-as="interjection">ribbit</say-as> <break time= "1s" /> 
        <say-as interpret-as="interjection">ribbit</say-as> <break time= "1s" />
        <say-as interpret-as="interjection">ribbit</say-as> <break time= "1s" />
        <say-as interpret-as="interjection">ribbit</say-as> <break time= "1s" />
        <break time= "1s" />`,
    `Ok now lick your elbow! <break time= "2s" />.  
        <say-as interpret-as="interjection">just kidding</say-as>. Nobody can do that.
        <break time= "1s" />`,
    `March around in a circle.
        March <break time= "0.5s" /> 
        March <break time= "0.2s" />
        March <break time= "0.5s" />
        March. Keep going! <break time= "0.5s" />
        March <break time= "0.5s" />
        March <break time= "0.2s" />
        March <break time= "0.5s" />
        March <break time= "0.5s" />
        <say-as interpret-as="interjection">well done</say-as>.
        <break time= "1s" />`,
    `Let's make some faces.
        <break time= "0.8s" /> 
        Make a happy face <break time= "2s" /> 
        Make a sad face <break time= "2s" />
        Make a angry face <break time= "2s" />
        Make a scary face <break time= "2s" />
        Make a silly face <break time= "2s" />
        <say-as interpret-as="interjection">well done</say-as>.
        <break time= "1s" />`,
    `Spin around 3 times.
        <break time= "0.6s" /> 
        1 <break time= "1s" /> 
        2 <break time= "1s" />
        3 <break time= "1s" />
        Don't get too dizzy!
        <break time= "1s" />`,
    `Clap your hands as I count.
        <break time= "0.6s" /> 
        1 <break time= "1s" /> 
        2 <break time= "1s" />
        3 <break time= "1s" />
        4 <break time= "1s" />
        5 <break time= "1s" />
        <audio src='soundbank://soundlibrary/human/amzn_sfx_crowd_applause_01'/>
        <break time= "1s" />`,
    `Stomp your feet as I count.
        <break time= "1s" /> 
        1 <break time= "1s" /> 
        2 <break time= "1s" />
        3 <break time= "1s" />
        4 <break time= "1s" />
        5 <break time= "1s" />
        <break time= "1s" />`,
    `Let's really move. Shake your whole body and freeze when I say.
        <break time= "1s" /> 
        Shake <break time= "1s" /> 
        Shake <break time= "0.6s" />
        Shake <break time= "1s" />
        <prosody volume="x-loud">Freeze</prosody> <break time= "1.5s" />
        Shake <break time= "1s" />
        Shake <break time= "1.1s" /> 
        Shake <break time= "0.8s" />
        Shake <break time= "1s" /> 
        Shake <break time= "0.888s" /> 
        <prosody volume="x-loud">Freeze.</prosody> Try and hold still <break time= "1.5s" />
        Shake <break time= "1s" />
        Shake <break time= "1s" /> 
        Shake <break time= "1s" />
        <prosody volume="x-loud">Freeze</prosody> <break time= "1.5s" />
        <say-as interpret-as="interjection">well done</say-as>. 
        <break time= "1s" />
        `,
    `Wiggle your arms.
        <break time= "1s" /> 
        Wiggle <break time= "0.6s" /> 
        Wiggle <break time= "1s" />
        <prosody volume="x-loud">Freeze</prosody> <break time= "1s" />
        Wiggle <break time= "1s" />
        Wiggle <break time= "0.7s" /> 
        Wiggle <break time= "1s" />
        Wiggle <break time= "0.4s" /> 
        <prosody volume="x-loud">Freeze</prosody> <break time= "1s" />
        Wiggle <break time= "1s" />
        Wiggle <break time= "0.8s" /> 
        Wiggle <break time= "1s" />
        <prosody volume="x-loud">Freeze</prosody> <break time= "1s" />
        <say-as interpret-as="interjection">well done</say-as>. 
        <break time= "1s" />
        `,
];