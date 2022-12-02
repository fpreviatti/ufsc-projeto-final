package com.ufsc.controller;

import com.ufsc.entities.Categoria;
import com.ufsc.entities.Produto;
import com.ufsc.services.CategoriaService;
import com.ufsc.services.ProdutoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
public class CategoriaController {
	
	@Autowired
	private CategoriaService categoriaService;

	@Autowired
	private ProdutoService produtoService;

	@PutMapping(value = "/categorias/{id}")
	public ResponseEntity<Categoria> update(@PathVariable Long id, @RequestBody Categoria categoria){
		Categoria categoriaAtualizado = categoriaService.update(id, categoria);
		return ResponseEntity.ok().body(categoriaAtualizado);
	}
	
	
	@DeleteMapping(value = "/categorias/{id}")
	public ResponseEntity<Void> deleteById(@PathVariable Long id){

		List<Produto> produtos = produtoService.findAll();

		for(int i=0; i<produtos.size();i++){
			if(produtos.get(i).getCategoria().getId() == id){
				produtoService.deleteById(produtos.get(i).getId());
			}
		}

		categoriaService.deleteById(id);

		return ResponseEntity.noContent().build();
	}
	
	@PostMapping(value = "/categorias")
	public ResponseEntity<Categoria> save(@RequestBody Categoria categoria){
		Categoria categoriaSaved = categoriaService.save(categoria);
		
		URI uri = ServletUriComponentsBuilder.fromCurrentContextPath().path("/categorias/{id}")
				.buildAndExpand(categoriaSaved.getId()).toUri();
		
		return ResponseEntity.created(uri).body(categoriaSaved);		
	}
	
	@GetMapping(value = "/categorias")
	public ResponseEntity<List<Categoria>> findAll(){
		
		List<Categoria> categorias = categoriaService.findAll();		
		return ResponseEntity.ok().body(categorias);		
	}
	
	@GetMapping(value = "/categorias/{id}")
	public ResponseEntity<Categoria> findById(@PathVariable Long id){
		
		Categoria c = categoriaService.findById(id);
		return ResponseEntity.ok().body(c);		
		
	}

}
