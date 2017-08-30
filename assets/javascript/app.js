
var maxQuestion = 6;
var currQuestion = 0;
//  Variable that will hold our setInterval that runs the stopwatch
var intervalId;
//prevents the clock from being sped up unnecessarily
var clockRunning = false;
var correct = 0;
var incorrect = 0;
var missed = 0;
var givenTime = 10;


// question -string question to be asked
//answers - array of possible answers
//correctAns - correct answer
function Trivia(question, answers, correctAns, image) {
    this.question = question;
    this.correctAns = correctAns;
    this.answers = answers;
    this.image = image;
}

var triviaArray = [];
var q1 = new Trivia("what did Ana want to do with Elsa ? ", ["Rule the World", "Play Princess", "Build a snowman", "Go Rock climbing"], "Build a snowman", "assets/images/olaf.gif");
var q2 = new Trivia("What did Ariel want?", ["Legs", "Wings", "Fins", "Horn"], "Legs", "assets/images/ariel.gif");
var q3 = new Trivia("which house harry potter belongs to?", ["Slytherin", "Ravenclaw", "Hufflepuff", "Gryffindor"], "Gryffindor", "assets/images/potter.gif");
var q4 = new Trivia("Who says my precious in Lord of the rings?", ["Gollum", "Legolas", "Sauron", "Bilbo"], "Gollum", "assets/images/gollum.gif");
var q5 = new Trivia("What is Jasmine's pet's name?", ["Raja", "Zaza", "Fitch", "Ali"], "Raja", "assets/images/raja.gif");
var q6 = new Trivia("What says everything the light touches is our kingdom?", ["Scar", "Mufasa", "Simba", "Naala"], "Mufasa", "assets/images/mufasa.gif");


triviaArray.push(q1);
triviaArray.push(q2);
triviaArray.push(q3);
triviaArray.push(q4);
triviaArray.push(q5);
triviaArray.push(q6);


function showTrivia(position) {
    console.log("in show trivia " + currQuestion + " " + maxQuestion);
    $('#startDiv').css("display", "none");
    $('#gifDiv').css("display", "none");
    $("#message").css("display", "none");

    $('#mainContent').show();

    var trivia = triviaArray[position];
    $("#question").text(triviaArray[position].question);
    // console.log(trivia.answers);
    for (var i = 0; i < trivia.answers.length; i++) {
        var element = trivia.answers[i];
        $("#ans" + i).text(element);
    }
    $('#gifDiv').html('<img src="' + triviaArray[position].image + '" alt="Smiley face" height="300" width="300"> ');
}

function showScore() {
    $('#startDiv').css("display", "none");
    $('#mainContent').css("display", "none");
    $('#gifDiv').css("display", "none");
    $("#message").css("display", "none");
    $("#doneZone").show();
    $("#doneZone").html("Correct Ans : " + correct
        + "<br>" + "Wrong Ans : "
        + incorrect + "<br>" + " Missed : " + missed);
    $("#restart").show();
    $("#restart").html("Click to Restart");

}

//  Our stopwatch object.
var stopwatch = {
    time: givenTime,

    reset: function () {
        clearInterval(intervalId);
        //  TODO: Use clearInterval to stop the count here and set the clock to not be running.
        clockRunning = false;
        this.time = givenTime;
        $("#counter").html("Time Remaining : " + this.time);
        //------------------------------------------------
        currQuestion++;
        if (currQuestion < maxQuestion) {

            showTrivia(currQuestion);

            stopwatch.start();
        }
        else {
            showScore();
        }
        //------------------------------------------------
    },

    start: function () {

        //  TODO: Use setInterval to start the count here and set the clock to running.
        if (!clockRunning) {
            clockRunning = true;
            intervalId = setInterval(function () {
                stopwatch.count();
            }, 1000);
        }
    },

    stop: function () {
        clearInterval(intervalId);
        //  TODO: Use clearInterval to stop the count here and set the clock to not be running.
        clockRunning = false;
    },

    count: function () {
        this.time--;

        //---------------------------------------------------------
        //-------------------------------------------------------
        if (this.time == 0) {
            clearInterval(intervalId);
            clockRunning = false;
            //---------------------------
            missed++;
            $('#mainContent').css("display", "none");
            $('#gifDiv').show();
            $("#message").text("Sorry!!Time Out !! The correct Answer was " + triviaArray[currQuestion].correctAns).show();
            setTimeout(function () {
                stopwatch.reset();
            }, 1000);
            //---------------------------
        }
        $("#counter").html("Time Remaining : " + this.time);
    },


};


//create an object for question with possible answers
$(document).ready(function () {

    $("#start").on("click", function () {

        //reset text for score

        //------------------------------------------------------------
        showTrivia(currQuestion);
        //-----------------------------------------------------------------
        stopwatch.start();
    });
    $(".answer").on("click", function () {
        var selection = $(this).text();
        if (triviaArray[currQuestion].correctAns == selection) {
            $('#mainContent').css("display", "none");
            $('#gifDiv').show();
            $("#message").text("congratulation !!").show();
            correct++;
            console.log("in right " + currQuestion + " " + maxQuestion);

            setTimeout(function () {
                stopwatch.reset();
            }, 3000);
        }
        else {
            $('#mainContent').css("display", "none");

            $('#gifDiv').show();
            $("#message").text("Sorry!! The correct Answer is " + triviaArray[currQuestion].correctAns).show();
            incorrect++;
            console.log("in wrong ans " + currQuestion + " " + maxQuestion);

            setTimeout(function () {
                stopwatch.reset();
            }, 3000);

        }
    });
    $("#restart").on("click", function () {

        //reset variables

        currQuestion = 0;
        clockRunning = false;
        correct = 0;
        incorrect = 0;
        missed = 0;

        $("#doneZone").css("display", "none");
        $("#restart").css("display", "none");
        //------------------------------------------------------------
        showTrivia(currQuestion);
        //-----------------------------------------------------------------
        stopwatch.start();
    });

});