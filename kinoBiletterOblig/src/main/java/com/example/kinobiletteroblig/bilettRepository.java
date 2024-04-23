package com.example.kinobiletteroblig;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class bilettRepository {

    @Autowired
    private JdbcTemplate db;

    public void lagreBilett(bilett bilett){
        String sql = "INSERT INTO bilett (tittel, antall, fornavn, etternavn, telefonnr, epost) VALUES (?,?,?,?,?,?)";
        db.update(sql, bilett.getTittel(), bilett.getAntall(),bilett.getFornavn(), bilett.getEtternavn(), bilett.getTelefonnr(), bilett.getEpost());


    }
    public List<bilett> alleBiletter(){
    String sql = "SELECT * FROM bilett ORDER BY etternavn";
    List<bilett> bilettList = db.query(sql, new BeanPropertyRowMapper<>(bilett.class));
    return bilettList;
    }

    public void slettBiletter(){
        String sql = "DELETE FROM bilett";
        db.update(sql);
    }

    public bilett hentEnBilett (int id){
        String sql = "SELECT * FROM bilett WHERE id=?";
        bilett bilett = db.queryForObject(sql, BeanPropertyRowMapper.newInstance(com.example.kinobiletteroblig.bilett.class),id);
        return bilett;
    }

    public void endreEnBilett(bilett bilett){
        String sql = "UPDATE bilett SET tittel=?, antall=?, fornavn=?, etternavn=?, telefonnr=?, epost=? WHERE id=?";
        db.update(sql, bilett.getTittel(),  bilett.getAntall(), bilett.getFornavn(), bilett.getEtternavn(), bilett.getTelefonnr(), bilett.getEpost(), bilett.getId());
    }

    public void slettEnBilett(int id){
        String sql = "DELETE FROM bilett WHERE id=?";
        db.update(sql, id);
    }

}
