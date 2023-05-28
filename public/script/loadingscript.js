$(document).ready(function(){
    // --------------------------------------------------
    // User Defined functions
    // --------------------------------------------------
    function addLoadingSpinner() {
        $('#loading-overlay').css({'display' :'block'});
        $('#loading-overlay').addClass('loading-overlay');
        $('#spinner').addClass('spinner');
    }

    function removeLoadingSpinner() {
        $('#loading-overlay').removeClass('loading-overlay');
        $('#loading-overlay').css({'display' :'none'});
        $('#spinner').removeClass('spinner');
    }
    // -----------------------------------------------
    // -----------------------------------------------
});