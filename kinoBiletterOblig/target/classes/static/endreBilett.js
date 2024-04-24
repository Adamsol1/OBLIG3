$(document).ready(function (){
    hentFilm();
    const id = window.location.search.substring(1);
    const url = "/hentEnBilett?"+id;
    $.get(url, function (biletten){
        $("#id").val(biletten.id);
        $("#fornavn").val(biletten.fornavn);
        $("#etternavn").val(biletten.etternavn);
        $("#antall").val(biletten.antall);
        $("#telefonnr").val(biletten.telefonnr);
        $("#epost").val(biletten.epost);
        $("#valgFilm").val(biletten.tittel);
    })
})


function hentFilm(){
    $.get("/hentFilm", function (film){
        formaterFilm(film)
    })
}
function formaterFilm(film){ //function for å formatere film
    let ut = "<select id='valgFilm' >";
    let forrigeFilm = "";

    for (const filmen of film){
        if (filmen.tittel !== forrigeFilm){
            ut += "<option value='" + filmen.tittel + "'>" + filmen.tittel + "</option>";
        }
        forrigeFilm = filmen.tittel;
    }
    ut += "</select>";
    $("#film").html(ut); //sender ut til film

}

function valideringBilett(bilett){ //validering for bilett
    let godkjentValidering = true;
    let antallSjekk = true;
    //sjekker antall
    if (bilett.antall === '' || isNaN(bilett.antall) || bilett.antall < 1){
        antallSjekk = false;
        //feilmelding
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
        //feilmelding
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
        //feilmelding
        $("#etternavnValidering").html("Vennligst oppgi etternavn");
    }
    //definerer etternavn til bilett
    else {
        $("#etternavnValidering").html("")


    }
    //sjekker telefonnr input
    let telefonnrSjekk = true;
    let telefonRegex = /^\d{8}$/; //Test for telefonnr
    if (!telefonRegex.test(bilett.telefonnr) ) {
        telefonnrSjekk = false;
        //feilmelding
        $("#telefonnrValidering").html("Vennligst oppgi godkjent telefonnr")
    }
    //definerer telefonnr til bilett
    else {
        $("#telefonnrValidering").html("")

    }
    //sjekker epost input
    let epostSjekk = true;
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(bilett.epost) ) {
        epostSjekk = false;
        //feilmelding
        $("#epostValidering").html("Vennligst oppgi en godkjent epost");


    }
    //definerer epost til bilett
    else {
        $("#epostValidering").html("");

    }
    let valgFilmSjekk = true;
    let valgtFilm = $("#valgFilm").val();
    if (!valgtFilm || valgtFilm === "Velg film"){
        valgFilmSjekk = false;
        //feilmelding
        $("#filmValidering").html("Vennligst velg en film");
    }
    else {
        $("#filmValidering").html("");
    }

    //Sjekker valideringen
    if (antallSjekk  && fornavnSjekk && etternavnSjekk && telefonnrSjekk && epostSjekk && valgFilmSjekk){
        return godkjentValidering;
    }
}



function endreBilett(){
    const bilett = {
        id : $("#id").val(),
        tittel : $("#valgFilm").val(),
        antall : $("#antall").val(),
        fornavn : $("#fornavn").val(),
        etternavn : $("#etternavn").val(),
        telefonnr : $("#telefonnr").val(),
        epost : $("#epost").val()
    };

if (valideringBilett(bilett)){


    $.post("/endreEnBilett", bilett, function (){
        window.location.href = "index.html";
    })
    }
}