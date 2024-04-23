$(document).ready(function (){ //Henter hentFilm når dokumenter er klart

   hentFilm();
   hentBilett();

})
function hentFilm(){ //henter film fra server
    $.get("/hentFilm", function (film){

        formaterFilm(film); //kaller på formaterFilm
    })
}

function formaterFilm(film){ //function for å formatere film
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

//kjøpsfunksjon
$("#kjopBilett").click(function kjopBilett(){




    //lager bilett objekt
    const bilett = {
        tittel : $("#valgFilm").val(),
        antall : $("#antall").val(),
        fornavn : $("#fornavn").val(),
        etternavn : $("#etternavn").val(),
        telefonnr : $("#telefonnr").val(),
        epost : $("#epost").val()
    };
    //sjekker likhet
    if (valideringBilett(bilett))
    $.post("/lagreBilett", bilett , function () {
        console.log(bilett);
        hentBilett();

        //resetter input felt

        $("#antall").val("");
        $("#fornavn").val("");
        $("#etternavn").val("");
        $("#telefonnr").val("");
        $("#epost").val("");



    })

});

//henter bilett fra server
function hentBilett(){
    $.get("/hentBilett", function (bilett){
        //kaller på funksjon
        formaterBilett(bilett);
    })
}

//formaterer bilett
function formaterBilett(bilett){
    let ut = "<table class = 'table table-striped'><tr><th>Valgt film</th><th>Antall</th><th>Fornavn</th><th>Etternavn</th><th>Telefonnr</th><th>Epost</th></tr>";
    //går gjennom bilett
    for ( const biletten of bilett){
        ut += "<tr>";
        ut += "<td>" + biletten.tittel + "</td>";
        ut += "<td>" + biletten.antall + "</td>";
        ut += "<td>" + biletten.fornavn + "</td>";
        ut += "<td>" + biletten.etternavn+ "</td>";
        ut += "<td>" + biletten.telefonnr + "</td>";
        ut += "<td>" + biletten.epost + "</td>";
        ut += "<td> <a class='btn btn-primary' href='endreBilett.html?id="+biletten.id+"'>Endre</a></td>"+
        "<td> <button class='btn btn-danger' onclick='slettEnBilett("+biletten.id+")'>Slett</button></td>"+
        "</tr>";

    }
    ut += "</table>"
    //legger til bilett
    $("#biletter").html(ut);
}

function slettEnBilett(id){
    const url ="/slettEnBilett?id="+id;
    $.get(url, function (){
        window.location.href = "/";
    })
}

//slette funksjon
$("#slettKnapp").click(function slettBilett(){
    //henter slettBilett fra server
    $.get("/slettBiletter", function (){
        //kaller på funksjon for å oppdatere biletter
        hentBilett();
    })
})

