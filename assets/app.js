// Before you can make any part of our site work, you need to create an array of strings, each one related to a topic that interests you. Save it to a variable called topics.
// We chose animals for our theme, but you can make a list to your own liking.
// Your app should take the topics in this array and create buttons in your HTML.
// Try using a loop that appends a button for each string in the array.
// When the user clicks on a button, the page should grab 10 static, non-animated gif images from the GIPHY API and place them on the page.
// When the user clicks one of the still GIPHY images, the gif should animate. If the user clicks the gif again, it should stop playing.
// Under every gif, display its rating (PG, G, so on).
// This data is provided by the GIPHY API.
// Only once you get images displaying with button presses should you move on to the next step.
// Add a form to your page takes the value from a user input box and adds it into your topics array. Then make a function call that takes each topic in the array remakes the buttons on the page.
// Deploy your assignment to Github Pages.
// Rejoice! You just made something really cool.


//get api key
//access data by button

//Global varibales up top
//global functions
//main process/logic call


//global variable
var jungleBook = ["Shere Khan", "Baloo", "kaa"];

//global function for animate
var change = function() {

    if ($(this).attr("data-state") === "still") {
        $(this).attr("src", $(this).attr("animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("still"));
        $(this).attr("data-state", "still");
    }
};

//global function for dynamically creating buttons 
var makeBtn = function() {
    $(".btn-box").empty();
    for (var i = 0; i < jungleBook.length; i++) {
        var btn = $("<button>").text(jungleBook[i]);
        btn.attr("data-animal", jungleBook[i]).addClass('btn btn-primary topic');
        $(".btn-box").append(btn);
    }
};

//function fo users input
function addButton() {
    var input = $('#userInput').val();
    //push the users new input into an array and redisplaying
    jungleBook.push(input);
    makeBtn();

}

//main ajax call function

function call() {
    var x = $(this).attr("data-animal");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + x + "&api_key=dc6zaTOxFJmzC&limit=10";
    console.log(queryURL);
    //ajax request
    $.ajax({ url: queryURL, method: 'GET' })
        .done(function(response) {

            // console.log(response.data);
            //loop for query request and  data access
            for (var i = 0; i < response.data.length; i++) {

                //variables for creating new html tags
                var newdiv = $("<div>");
                var newimg = $("<img>");
                var rating = $("<p>");

                //appending and adding attributes to our new html tags
                rating.text("Rating:" + response.data[i].rating);
                newimg.attr("src", response.data[i].images.downsized_still.url);
                newimg.addClass("move");
                newimg.attr("animate", response.data[i].images.downsized.url);
                newimg.attr("data-state", "still");
                newimg.attr("still", response.data[i].images.downsized_still.url);
                newimg.click(change);
                newdiv.append(rating);
                newdiv.append(newimg);

                //prepending to new div
                $(".gifs").prepend(newdiv);

            }
        })
}

//main logic


$(window).on("load", function() {
    makeBtn();

        $("#submit").on("click", function(){
            addButton();
        })

    $(document).on("click", ".topic", call);
});
