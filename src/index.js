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

var GA_TRACKING_ID = 'UA-109227896-1';

//=========================================================================================================================================
//TODO: The items below this comment need your attention.
//=========================================================================================================================================

//Replace with your app ID (OPTIONAL).  You can find this value at the top of your skill's page on http://developer.amazon.com.
//Make sure to enclose your value in quotes, like this: const APP_ID = 'amzn1.ask.skill.bb4045e6-b3e8-4133-b650-72923c5980f1';
const APP_ID = 	'amzn1.ask.skill.1b982507-fd3d-4a69-8898-082d70c813c6';

const SKILL_NAME = 'Twisted Movie Quotes';
const GET_QUOTE_MESSAGE = "Here's your twisted movie quote: ";
const HELP_MESSAGE = 'You can say tell me a twisted movie quote, or, you can say stop... What can I help you with?';
const HELP_REPROMPT = 'What can I help you with?';
const STOP_MESSAGE = 'Goodbye!';

//=========================================================================================================================================
//TODO: Replace this data with your own.  You can find translations of this data at http://github.com/alexa/skill-sample-node-js-fact/data
//=========================================================================================================================================
const data = [

      "Frankly, rrrr, I don't give a damn. ",
      "I'm gonna make rrrr an offer he can't refuse. ",
      "rrrr you don't understand! I coulda had class. I coulda been a contender. I could've been somebody, instead of a bum, which is what I am. ",
      "rrrr, I've a feeling we're not in Kansas anymore. ",
      "Here's looking at you, rrrr. ",
      "All right, rrrr I'm ready for my close-up. ",
      "rrrr phone home. ",
      "They call me rrrr! ",
      "rrrr, I think this is the beginning of a beautiful friendship. ",
      "Play it, rrrr. Play As Time Goes By. ",
      "rrrr you can't handle the truth! ",
      "I'll have what rrrr's having. ",
      "You know how to whistle, don't you, rrrr? You just put your lips together and blow. ",
      "rrrr You're gonna need a bigger boat. ",
      "If you build it rrrr, he will come. ",
      "rrrr! Hey, rrrr! ",
      "Oh, rrrr, don't let's ask for the moon. We have the stars. ",
      "rrrr. rrrr. Come back! ",
      "rrrr, we have a problem. ",
      "rrrr You've got to ask yourself one question: 'Do I feel lucky?' Well, do ya, punk? ",
      "rrrr, you're trying to seduce me. Aren't you? ",
      "rrrr, you can't fight in here! This is the War Room! ",
      "Elementary, my dear rrrr. ",
      "Here's rrrr! ",
      "Mother of mercy, is this the end of rrrr? ",
      "Forget it, rrrr, it's Chinatown. ",
      "Open the pod bay doors, please, rrrr. ",
      "Yo, rrrr! ",
      "rrrr you're going out a youngster, but you've got to come back a star! ",
      "Listen to me, rrrr. You're my knight in shining armor. Don't you forget it. You're going to get back on that horse, and I'm going to be right behind you, holding on tight, and away we're gonna go, go, go! ",
      "Tell 'em to go out there with all they got and win just one for the rrrr. ",
      "Nobody puts rrrr in a corner. ",
      "If you let rrrr go now, that'll be the end of it. I will not look for you, I will not pursue you. But if you don't, I will look for you, I will find you, and I will kill you. ",
      "My name is rrrr, commander of the Armies of the North, General of the Felix Legions and loyal servant to the true emperor, Marcus Aurelius. Father to a murdered son, husband to a murdered wife. And I will have my vengeance, in this life or the next. ",
      "rrrr, we're home. ",
      "I wish I knew how to quit you rrrr. ",
      "Help me, rrrr. You're my only hope. ",
      "rrrr You is kind. You is smart. You is important. ",
      "The rrrr abides. ",
      "The greatest trick rrrr ever pulled was convincing the world he didn't exist. ",
      "Hello. My name is rrrr. You killed my father. Prepare to die. ",
      "Winning that ticket, rrrr, was the best thing that ever happened to me... it brought me to you. And I'm thankful for that, rrrr. I'm thankful. You must do me this honor. Promise me you'll survive. That you won't give up, no matter what happens, no matter how hopeless. Promise me now, rrrr, and never let go of that promise. ",
      "I don't know if we each have a destiny, or if we're all just floating around accidental — like on a breeze, but I think maybe it's both. Maybe both is happening at the same time. I miss you, rrrr. If there's anything you need, I won't be far away. ",
      "I would rather share one lifetime with you rrrr than face all the ages of this world alone. ",
      "That’ll do, rrrr, that’ll do. ",
      "rrrr when you realize you want to spend the rest of your life with somebody, you want the rest of your life to start as soon as possible. ",
      "rrrr You can lose lots of money chasing women, but you will never lose women by chasing money. ",
      "So we finish 18 and he's gonna stiff me. And I say, 'Hey, rrrr, hey, how about a little somethin', you know, for the effort, you know.' And he says, 'Oh, uh, there won't be any money, but when you die, on your deathbed, you will receive total consciousness.' So I got that goin' for me, which is nice. ",
      "Your mother's in here with us, rrrr. Would you like to leave a message? I'll see that she gets it. ",
      "You hear me talkin', rrrr I ain't through with you by a damn sight. I'm gonna get Medieval on your ass. ",
]


//=========================================================================================================================================
//Editing anything below this line might break your skill.
//=========================================================================================================================================
function trackEvent(category, action, label, value, callbback) {
  var data = {
    v: '1', // API Version.
    tid: GA_TRACKING_ID, // Tracking ID / Property ID.
    // Anonymous Client Identifier. Ideally, this should be a UUID that
    // is associated with particular user, device, or browser instance.
    cid: '555',
    t: 'event', // Event hit type.
    ec: category, // Event category.
    ea: action, // Event action.
    el: label, // Event label.
    ev: value, // Event value.
  };

  request.post(
    'http://www.google-analytics.com/collect', {
      form: data
    },
    function(err, response) {
      if (err) { return callbback(err); }
      if (response.statusCode !== 200) {
        return callbback(new Error('Tracking failed'));
      }
      callbback();
    }
  );
}

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.appId = APP_ID;
    alexa.dynamoDBTableName = 'TwistedMovieQuotesUserData';
    alexa.registerHandlers(handlers);
    alexa.execute();
};

const handlers = {
    'LaunchRequest': function () {
        if(this.attributes['FirstName'] == undefined){
        this.emit('AskNameIntent');
      }
      else{
        this.emit('TwistedMovieQuotesIntent')
      }
    },
    'AskNameIntent': function () {
         this.response.speak("What is your first name?").listen("You can always tell me your name later.");
         this.emit(':responseReady');
       },

     'GetNameIntent': function () {
      const name = this.event.request.intent.slots.name.value;
      this.attributes['FirstName'] = name;
      this.response.speak("Is your first name " + name + "?").listen("You can always tell me later.");
      this.emit(':responseReady');
    //const speechOutput = GET_QUOTE_MESSAGE + randomQuote4 + '<break time=\'1.618s\'/>' + GET_QUOTE_MESSAGE;
    //this.response.speak(speechOutput).listen("What first name do you want used in your next quote?");
  },


    'TwistedMovieQuotesIntent': function () {
        const name = this.attributes['FirstName']
        const quoteArr = data;
        const quoteIndex = Math.floor(Math.random() * quoteArr.length);
        const randomQuote = quoteArr[quoteIndex].replace("rrrr", name);
        const randomQuote1 = randomQuote.replace("rrrr", name);
        const randomQuote2 = randomQuote1.replace("rrrr", name);
        const randomQuote3 = randomQuote2.replace("rrrr", name);
        const randomQuote4 = randomQuote3.replace("rrrr", name);
        const speechOutput = GET_QUOTE_MESSAGE + randomQuote4;

        console.log(randomQuote)

        if(name == undefined){
          this.emit('AskNameIntent')
        }
        else{
          this.response.cardRenderer(SKILL_NAME, randomQuote4);
          this.response.speak(speechOutput);
          this.emit(':responseReady');
        }
    },
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
    //example usage in an intent handler
    "AMAZON.NoIntent": function (intent, session, response) {
        trackEvent(
          'Intent',
          'AMAZON.NoIntent',
          'na',
          '100', // Event value must be numeric.
          function(err) {
            if (err) {
                return next(err);
            }
            var speechOutput = "Okay.";
            response.tell(speechOutput);
          });
    }
  };
