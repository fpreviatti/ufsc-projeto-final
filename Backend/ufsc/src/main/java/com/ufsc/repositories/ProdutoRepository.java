package com.ufsc.repositories;

import com.ufsc.entities.Produto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ProdutoRepository extends JpaRepository<Produto, Long>{

    @Query("SELECT f FROM Produto f inner JOIN f.categoria d WHERE f.categoria.id = ?1")
    List<Produto> findByCategoria(Long id);
	
}
