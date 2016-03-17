/**
 * Version 1.0, Jan 2012
 */

var Markit = {};


/**
* Define the QuoteService.
* First argument is symbol (string) for the quote. Examples: AAPL, MSFT, JNJ, GOOG.
* Second argument is fCallback, a callback function executed onSuccess of API.
*/
Markit.QuoteService = function(sSymbol, fCallback) {
    this.symbol = sSymbol;
    this.fCallback = fCallback;
    this.DATA_SRC = "http://dev.markitondemand.com/Api/v2/Quote/jsonp";
    this.makeRequest();
};
/**
* Ajax success callback. fCallback is the 2nd argument in the QuoteService constructor.
*/
Markit.QuoteService.prototype.handleSuccess = function(jsonResult) {
    this.fCallback(jsonResult);
};
/**
* Ajax error callback
*/
Markit.QuoteService.prototype.handleError = function(jsonResult) {
    console.error(jsonResult);
};
/**
* Starts a new ajax request to the Quote API
*/
Markit.QuoteService.prototype.makeRequest = function() {
    //Abort any open requests
    if (this.xhr) { this.xhr.abort(); }
    //Start a new request
    this.xhr = $.ajax({
        data: { symbol: this.symbol },
        url: this.DATA_SRC,
        dataType: "jsonp",
        success: this.handleSuccess,
        error: this.handleError,
        context: this
    });
};


$(document).ready(function(){
// new Markit.QuoteService("AAPL");
  $('#symbolSearch').submit(function(event){
    event.preventDefault();
    $(".result").html(" ");
    symbol = $('#userSymbol').val();
    console.log(symbol)
    new Markit.QuoteService(symbol, function(jsonResult){
    console.log(jsonResult);
    console.log(jsonResult.High);
    $(".result").append("<h3>" +jsonResult.Name + "</h3>");
    $(".result").append("<li>Current Price: " + jsonResult.LastPrice+ "</li>");
    $(".result").append("<li>Daily High: " + jsonResult.High+ "</li>");
    $(".result").append("<li>Daily Low: " + jsonResult.Low+ "</li>");

  });
 });
});
