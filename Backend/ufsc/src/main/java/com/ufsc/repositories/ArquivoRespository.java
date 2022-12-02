package com.ufsc.repositories;


import com.ufsc.entities.Arquivo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ArquivoRespository extends JpaRepository<Arquivo, String>{

}
