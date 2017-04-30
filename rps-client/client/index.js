import $ from "jquery";

$(() => {
    let txtUsername = $( "#txtUsername" );
    let btnSubmit = $( "#btnSubmit" );

    txtUsername.keyup( e => {
        if ( e.key === "Enter" ) {
            btnSubmit.click();
        }
    } );

    btnSubmit.click(() => {
        $.ajax( {
            
        } );
    } );
} );