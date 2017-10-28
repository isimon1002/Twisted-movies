/* eslint-disable  func-rrrrs */
/* eslint quote-props: ["error", "consistent"]*/
/**
 * This sample demonstrates a simple skill built with the Amazon Alexa Skills
 * nodejs skill development kit.
 * This sample supports multiple lauguages. (en-US, en-GB, de-DE).
 * The Intent Schema, Custom Slots and Sample Utterances for this skill, as well
 * as testing instructions are located at https://github.com/alexa/skill-sample-nodejs-fact
 **/

'use strict';
const Alexa = require('alexa-sdk');

//=========================================================================================================================================
//TODO: The items below this comment need your attention.
//=========================================================================================================================================

//Replace with your app ID (OPTIONAL).  You can find this value at the top of your skill's page on http://developer.amazon.com.
//Make sure to enclose your value in quotes, like this: const APP_ID = 'amzn1.ask.skill.bb4045e6-b3e8-4133-b650-72923c5980f1';
const APP_ID = 	'amzn1.ask.skill.1b982507-fd3d-4a69-8898-082d70c813c6';

const SKILL_NAME = 'Twisted Movie Quotes';
const GET_QUOTE_MESSAGE = "Here's your twisted movie quote: ";
const HELP_MESSAGE = 'You can say tell me a twisted movie quote, or, you can say exit... What can I help you with?';
const HELP_REPROMPT = 'What can I help you with?';
const STOP_MESSAGE = 'Goodbye!';

//=========================================================================================================================================
//TODO: Replace this data with your own.  You can find translations of this data at http://github.com/alexa/skill-sample-node-js-fact/data
//=========================================================================================================================================
const data = [

      "Frankly, rrrr, I don't give a damn. What first name do you want used in your next quote?",
      "I'm gonna make rrrr an offer he can't refuse. What first name do you want used in your next quote?",
      "rrrr you don't understand! I coulda had class. I coulda been a contender. I could've been somebody, instead of a bum, which is what I am. What first name do you want used in your next quote?",
      "rrrr, I've a feeling we're not in Kansas anymore. What first name do you want used in your next quote?",
      "Here's looking at you, rrrr. What first name do you want used in your next quote?",
      "All right, rrrr I'm ready for my close-up. What first name do you want used in your next quote?",
      "rrrr phone home. What first name do you want used in your next quote?",
      "They call me rrrr! What first name do you want used in your next quote?",
      "rrrr, I think this is the beginning of a beautiful friendship. What first name do you want used in your next quote?",
      "Play it, rrrr. Play As Time Goes By. What first name do you want used in your next quote?",
      "rrrr you can't handle the truth! What first name do you want used in your next quote?",
      "I'll have what rrrr's having. What first name do you want used in your next quote?",
      "You know how to whistle, don't you, rrrr? You just put your lips together and blow. What first name do you want used in your next quote?",
      "rrrr You're gonna need a bigger boat. What first name do you want used in your next quote?",
      "If you build it rrrr, he will come. What first name do you want used in your next quote?",
      "rrrr! Hey, rrrr! What first name do you want used in your next quote?",
      "Oh, rrrr, don't let's ask for the moon. We have the stars. What first name do you want used in your next quote?",
      "rrrr. rrrr. Come back! What first name do you want used in your next quote?",
      "rrrr, we have a problem. What first name do you want used in your next quote?",
      "rrrr You've got to ask yourself one question: 'Do I feel lucky?' Well, do ya, punk? What first name do you want used in your next quote?",
      "rrrr, you're trying to seduce me. Aren't you? What first name do you want used in your next quote?",
      "rrrr, you can't fight in here! This is the War Room! What first name do you want used in your next quote?",
      "Elementary, my dear rrrr. What first name do you want used in your next quote?",
      "Here's rrrr! What first name do you want used in your next quote?",
      "Mother of mercy, is this the end of rrrr? What first name do you want used in your next quote?",
      "Forget it, rrrr, it's Chinatown. What first name do you want used in your next quote?",
      "Open the pod bay doors, please, rrrr. What first name do you want used in your next quote?",
      "Yo, rrrr! What first name do you want used in your next quote?",
      "rrrr you're going out a youngster, but you've got to come back a star! What first name do you want used in your next quote?",
      "Listen to me, rrrr. You're my knight in shining armor. Don't you forget it. You're going to get back on that horse, and I'm going to be right behind you, holding on tight, and away we're gonna go, go, go! What first name do you want used in your next quote?",
      "Tell 'em to go out there with all they got and win just one for the rrrr. What first name do you want used in your next quote?",
      "Nobody puts rrrr in a corner. What first name do you want used in your next quote?",
      "If you let rrrr go now, that'll be the end of it. I will not look for you, I will not pursue you. But if you don't, I will look for you, I will find you, and I will kill you. What first name do you want used in your next quote?",
      "My name is rrrr, commander of the Armies of the North, General of the Felix Legions and loyal servant to the true emperor, Marcus Aurelius. Father to a murdered son, husband to a murdered wife. And I will have my vengeance, in this life or the next. What first name do you want used in your next quote?",
      "rrrr, we're home. What first name do you want used in your next quote?",
      "I wish I knew how to quit you rrrr. What first name do you want used in your next quote?",
      "Help me, rrrr. You're my only hope. What first name do you want used in your next quote?",
      "rrrr You is kind. You is smart. You is important. What first name do you want used in your next quote?",
      "The rrrr abides. What first name do you want used in your next quote?",
      "The greatest trick rrrr ever pulled was convincing the world he didn't exist. What first name do you want used in your next quote?",
      "Hello. My name is rrrr. You killed my father. Prepare to die. What first name do you want used in your next quote?",
      "Winning that ticket, rrrr, was the best thing that ever happened to me... it brought me to you. And I'm thankful for that, rrrr. I'm thankful. You must do me this honor. Promise me you'll survive. That you won't give up, no matter what happens, no matter how hopeless. Promise me now, rrrr, and never let go of that promise. What first name do you want used in your next quote?",
      "I don't know if we each have a destiny, or if we're all just floating around accidental — like on a breeze, but I think maybe it's both. Maybe both is happening at the same time. I miss you, rrrr. If there's anything you need, I won't be far away. What first name do you want used in your next quote?",
      "I would rather share one lifetime with you rrrr than face all the ages of this world alone. What first name do you want used in your next quote?",
      "That’ll do, rrrr, that’ll do. What first name do you want used in your next quote?",
      "rrrr when you realize you want to spend the rest of your life with somebody, you want the rest of your life to start as soon as possible. What first name do you want used in your next quote?",
      "rrrr You can lose lots of money chasing women, but you will never lose women by chasing money. What first name do you want used in your next quote?",
      "So we finish 18 and he's gonna stiff me. And I say, 'Hey, rrrr, hey, how about a little somethin', you know, for the effort, you know.' And he says, 'Oh, uh, there won't be any money, but when you die, on your deathbed, you will receive total consciousness.' So I got that goin' for me, which is nice. What first name do you want used in your next quote?",
      "Your mother's in here with us, rrrr. Would you like to leave a message? I'll see that she gets it. What first name do you want used in your next quote?",
      "You hear me talkin', rrrr I ain't through with you by a damn sight. I'm gonna get Medieval on your ass. What first name do you want used in your next quote?",
]


//=========================================================================================================================================
//Editing anything below this line might break your skill.
//=========================================================================================================================================

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.appId = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

const handlers = {
    'LaunchRequest': function () {

        this.emit('AskNameIntent');
    },
    'AskNameIntent': function () {
         this.response.speak("What is your first name?");
         this.emit(':responseReady');
       },

     'GetNameIntent': function () {
      const name = this.event.request.intent.slots.name.value;
      const quoteArr = data;
      const quoteIndex = Math.floor(Math.random() * quoteArr.length);
      const randomQuote = quoteArr[quoteIndex].replace("rrrr", name);
      const randomQuote1 = randomQuote.replace("rrrr", name);
      const randomQuote2 = randomQuote1.replace("rrrr", name);
      const randomQuote3 = randomQuote2.replace("rrrr", name);
      const randomQuote4 = randomQuote3.replace("rrrr", name);
      const speechOutput = GET_QUOTE_MESSAGE + randomQuote4;

      console.log(randomQuote)

    this.response.cardRenderer(SKILL_NAME, randomQuote4);
    this.response.speak(speechOutput);
    this.emit(':responseReady');
  },


    // 'TwistedMovieQuotesIntent': function () {
    //     var name = GetNameIntent.event.request.intent.slots.name.value;
    //     const quoteArr = data;
    //     const quoteIndex = Math.floor(Math.random() * quoteArr.length);
    //     const randomQuote = quoteArr[quoteIndex].replace("rrrr", name);
    //     const speechOutput = GET_QUOTE_MESSAGE + randomQuote;
    //
    //     console.log(randomQuote)
    //
    //     this.response.cardRenderer(SKILL_NAME, randomQuote);
    //     this.response.speak(speechOutput);
    //     this.emit(':responseReady');
    // },
    'AMAZON.HelpIntent': function () {
        const speechOutput = HELP_MESSAGE;
        const reprompt = HELP_REPROMPT;

        this.response.speak(speechOutput).listen(reprompt);
        this.emit(':responseReady');
    },
    'AMAZON.CancelIntent': function () {
        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    },
    'AMAZON.StopIntent': function () {
        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    },
  };
