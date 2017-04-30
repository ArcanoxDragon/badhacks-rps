import $ from "jquery";
import t from "toastr";
import cookies from "js-cookie";
import api from "./api";

$(() => {
    let txtUsername = $( "#txtUsername" );
    let btnSubmit = $( "#btnSubmit" );

    txtUsername.keyup( e => {
        if ( e.key === "Enter" ) {
            btnSubmit.click();
        }
    } );

    btnSubmit.click(() => {
        let username = txtUsername.val();

        if ( !username || username.trim().length === 0 ) {
            t.error( "You must enter a username" );
            return;
        }

        api( "register", "register", { username } )
            .then( result => {
                console.log( "session id:", result.sessionid );
                cookies.set( "sessionid", result.sessionid );
            } )
            .catch( err => {``
                t.error( "An error occurred. See the console for details." );
                console.log( `Error: [${err.status}] ${err.message}` );
            } );
    } );
} );