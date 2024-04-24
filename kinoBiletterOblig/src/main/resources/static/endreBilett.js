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


    $.post("/endreEnBilett", bilett, function (){
        window.location.href = "index.html";
    })
}