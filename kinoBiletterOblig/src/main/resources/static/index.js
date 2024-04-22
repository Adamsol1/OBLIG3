$(document).ready(function (){

   hentFilm();

})
function hentFilm(){
    $.get("/hentFilm", function (film){

        formaterFilm(film);
    })
}

function formaterFilm(film){
    let ut = "<select id='valgFilm' >";
    let forrigeFilm = "";
    ut += "<option>Velg film </option>";
    for (const filmen of film){
        if (filmen.tittel !== forrigeFilm){
            ut += "<option>" + filmen.tittel +"</option>"
        }
        forrigeFilm = filmen.tittel;
    }
    ut += "</select>";
    $("#film").html(ut);

}
function valideringBilett(bilett){
    let godkjentValidering = true;
    let antallSjekk = true;
    if (bilett.antall === '' || isNaN(bilett.antall) || bilett.antall < 1){
        antallSjekk = false;
        $("#antallValidering").html("Vennligst kjøp minst en bilett")
    }
    //definerer antall til bilett
    else{
        $("#antallValidering").html("");

    }
    //sjekker fornavn input
    let fornavnSjekk = true;
    if (bilett.fornavn.length === 0) {
        fornavnSjekk = false;
        $("#fornavnValidering").html("Vennligst oppgi et fornavn")

    }
    //definerer fornavn til bilett
    else {
        $("#fornavnValidering").html("")

    }
    //sjekker etternavn input
    let etternavnSjekk = true;
    if (bilett.etternavn.length === 0) {
        etternavnSjekk = false;
        $("#etternavnValidering").html("Vennligst oppgi etternavn");
    }
    //definerer etternavn til bilett
    else {
        $("#etternavnValidering").html("")


    }
    //sjekker telefonnr input
    let telefonnrSjekk = true;
    if (bilett.telefonnr.length !== 8 ) {
        telefonnrSjekk = false;
        $("#telefonnrValidering").html("Vennligst oppgi godkjent telefonnr")
    }
    //definerer telefonnr til bilett
    else {
        $("#telefonnrValidering").html("")

    }
    //sjekker epost input
    let epostSjekk = true;
    if (bilett.epost.indexOf("@") === -1) {
        epostSjekk = false;
        $("#epostValidering").html("Vennligst oppgi en godkjent epost");


    }
    //definerer epost til bilett
    else {
        $("#epostValidering").html("");

    }

    if (antallSjekk  && fornavnSjekk && etternavnSjekk && telefonnrSjekk && epostSjekk){
        return godkjentValidering;
    }
}

$("#kjopBilett").click(function kjopBilett(){



    const selectedFilm = $("#valgFilm").val();
    const bilett = {
        tittel : selectedFilm,
        antall : $("#antall").val(),
        fornavn : $("#fornavn").val(),
        etternavn : $("#etternavn").val(),
        telefonnr : $("#telefonnr").val(),
        epost : $("#epost").val()
    };
    if (valideringBilett(bilett))
    $.post("/lagreBilett", bilett , function () {
        console.log(bilett);
        hentBilett();


        $("#antall").val("");
        $("#fornavn").val("");
        $("#etternavn").val("");
        $("#telefonnr").val("");
        $("#epost").val("");



    })

});


function hentBilett(){
    $.get("/hentBilett", function (bilett){
        formaterBilett(bilett);
    })
}


function formaterBilett(bilett){
    let ut = "<table class = 'table table-striped'><tr><th>Valgt film</th><th>Antall</th><th>Fornavn</th><th>Etternavn</th><th>Telefonnr</th><th>Epost</th></tr>";
    for ( const biletten of bilett){
        ut += "<tr>";
        ut += "<td>" + biletten.tittel + "</td>";
        ut += "<td>" + biletten.antall + "</td>";
        ut += "<td>" + biletten.fornavn + "</td>";
        ut += "<td>" + biletten.etternavn+ "</td>";
        ut += "<td>" + biletten.telefonnr + "</td>";
        ut += "<td>" + biletten.epost + "</td>";



    }
    ut += "</table>"

    $("#biletter").html(ut);
}

$("#slettKnapp").click(function slettBilett(){
    $.get("/slettBiletter", function (){
        hentBilett();
    })
})

