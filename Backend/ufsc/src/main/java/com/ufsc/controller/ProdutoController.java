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
public class ProdutoController {
	
	@Autowired
	private ProdutoService produtoService;

	@Autowired
	private CategoriaService categoriaService;
	
	@PutMapping(value = "/produtos/{id}")
	public ResponseEntity<Produto> update(@PathVariable Long id, @RequestBody Produto produto){
		Produto produtoAtualizado = produtoService.update(id, produto);
		return ResponseEntity.ok().body(produtoAtualizado);
	}
	
	
	@DeleteMapping(value = "/produtos/{id}")
	public ResponseEntity<Void> deleteById(@PathVariable Long id){
		produtoService.deleteById(id);
		return ResponseEntity.noContent().build();
	}
	
	@PostMapping(value = "/produtos")
	public ResponseEntity<Produto> save(@RequestBody Produto produto){
		Produto produtoSaved = produtoService.save(produto);
		
		URI uri = ServletUriComponentsBuilder.fromCurrentContextPath().path("/produtos/{id}")
				.buildAndExpand(produtoSaved.getId()).toUri();
		
		return ResponseEntity.created(uri).body(produtoSaved);		
	}
	
	@GetMapping(value = "/produtos")
	public ResponseEntity<List<Produto>> findAll(){
		
		List<Produto> produtos = produtoService.findAll();		
		return ResponseEntity.ok().body(produtos);		
	}
	
	@GetMapping(value = "/produtos/{id}")
	public ResponseEntity<Produto> findById(@PathVariable Long id){
		
		Produto c = produtoService.findById(id);
		return ResponseEntity.ok().body(c);		
		
	}

	@GetMapping(value = "/produtos/categoria/{id}")
	public ResponseEntity<List<Produto>> getProdutosByCategoriaId(@PathVariable Long id){

		List<Produto> produtos = produtoService.getProdutosByCategoriaId(id);
		return ResponseEntity.ok().body(produtos);

	}

}
