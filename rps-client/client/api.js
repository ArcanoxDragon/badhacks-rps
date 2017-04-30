import $ from "jquery";

export default function ( serviceName, url, data ) {
    return new Promise(( res, rej ) => {
        $.ajax( {
            url: `http://${servicesConfig[ serviceName ]}/${url}`,
            method: "POST",
            contentType: "application/json",
            data,
            success: ( result ) => res( result ),
            error: ( xhr, err, status ) => rej( { status: xhr.status, message: xhr.statusText } )
        } )
    } );
}