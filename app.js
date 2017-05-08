var BasicCard = require('./BasicCard.js');

var ClozeCard = require('./ClozeCard.js');

var inquirer = require('inquirer');

var fs = require ('fs');

// First Choosed the type of Flashcards, 

var addFlashCard = function(){
	inquirer.prompt([{
	    name: "addCard",
	    type: "rawlist",
	    message: "Please choose the type of flashcard you would like",
	    choices: ["Basic Flashcard", "Cloze Flashcard"]
	  }]).then(function(answer) {
	    // based on their answer, either call the bid or the post functions
	    if (answer.addCard === "Basic Flashcard") {
	    	 inquirer.prompt([{
                name: 'front',
                message: 'What is the question?',
                validate: function(input) {
                    if (input === '') {
                        console.log("Seriously ? Just answer the question so we can all go home.");
                        return false;
                    } else {
                        return true;
                    }
                }
          
      },
        {
          	name: 'back',
          	message: "What is the answer?",
          	validate: function(input) {
    				if (input === "") {
    					console.log("So you took the time to add a question... please pause Netflix and just give me an answer");
      				return false;
    				} 
            else {
    				return true;
  			    }
        }
        }]).then(function(answer){
          var newBasicCard = new BasicCard(answer.front, answer.back);
          newBasicCard.create();
          start();
        });
      } else if (answer.addCard === 'Cloze Flashcard') {
        inquirer.prompt([{
          name: 'text',
          message: "What is the full text?",
          validate: function(input){
            if(input === ""){
              console.log("Sigh.... You're killing me, enter the full text so we can get this crap over with");
              return false;
            }
            else {
              return true;
            }
          }

          },
          {
            name: 'cloze',
            message: 'What is the cloze portion?',
            validate: function(input){
              if (input === ''){
                console.log("You just did that to annoy me right ? Please enter the cloze portion ");
                return false;
              }
              else {
                return true;
              }
            
            }
        }]).then(function(answer){
          var text = answer.text;
          var cloze = answer.cloze;
          if (text.includes(cloze)){
            var newClozeCard = new ClozeCard (text, cloze);
            newClozeCard.create();
            start();
          }
          else {
            console.log("Crickets....  Nothing to see here");
          }

        });
      }
  });
};


var start = function() {
  inquirer.prompt({
    name: "questUser",
    type: "rawlist",
    message: "Would you like to [Add a Flashcard]?",
    choices: ["Add a Flashcard", "Flashcards are for Sissies"]
  }).then(function(answer) {
    // based on their answer, either call the bid or the post functions
    if (answer.questUser === "Add a Flashcard") {
      addFlashCard();
    }
    else if (answer.questUser === "Flashcards are for Sissies") {
      console.log("Nice ! (Cocky... but Nice)")
    }
  });
};


start();