package com.example.kinobiletteroblig;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
public class bilettController {

    @Autowired
    private bilettRepository rep;

    @PostMapping("lagreBilett")
    public void lagreBilett(bilett bilett){
        rep.lagreBilett(bilett);
    }

    @GetMapping("hentBilett")
    public List<bilett> alleBiletter() {
        return rep.alleBiletter();
    }

    @GetMapping("hentFilm")
    public List<film> hentFilm(){
        List<film> filmList = new ArrayList<>();
        filmList.add(new film("Avengers"));
        filmList.add(new film("Inception"));
        filmList.add(new film("Bladerunner 2049"));
        filmList.add(new film("Arrival"));
        filmList.add(new film("Dune 2"));
        return filmList;
    }
    @GetMapping("slettBiletter")
   public void slettAlleKunder(){
        rep.slettBiletter();
    }
}
