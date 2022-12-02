package com.ufsc.services;

import com.ufsc.entities.Categoria;
import com.ufsc.entities.Produto;
import com.ufsc.repositories.CategoriaRepository;
import com.ufsc.repositories.ProdutoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.NoSuchElementException;

@Service
public class ProdutoService {

	@Autowired
	private ProdutoRepository produtoRepository;

	@Autowired
	private CategoriaRepository categoriaRepository;

	public Produto addCategoria(Long idProduto, Long idCategoria) {
		Produto produto = produtoRepository.findById(idProduto).get();
		Categoria categoria  = categoriaRepository.findById(idCategoria).get();

		produto.setCategoria(categoria);

		produtoRepository.save(produto);

		return produto;
	}

	public Produto removeCategoria(Long idProduto, Long idCategoria) {
		Produto produto = produtoRepository.findById(idProduto).get();
		Categoria categoria  = categoriaRepository.findById(idCategoria).get();

		produto.setCategoria(null);

		produtoRepository.save(produto);

		return produto;
	}


	public Produto update(Long id, Produto produto) {
		Produto produtoEntity = produtoRepository.getReferenceById(id);

		produtoEntity.setDescricao(produto.getDescricao());
		produtoEntity.setPreco(produto.getPreco());
		produtoEntity.setQuantidade(produto.getQuantidade());
		produtoEntity.setArquivo(produto.getArquivo());
		produtoEntity.setCaminhoImagem(produto.getCaminhoImagem());

		return produtoRepository.save(produtoEntity);
	}


	public void deleteById(Long id) {
		produtoRepository.deleteById(id);

	}


	public Produto save(Produto produto) {
		return produtoRepository.save(produto);
	}

	public List<Produto> findAll(){
		return produtoRepository.findAll();
	}

	public Produto findById(Long id) {
		try {
			return produtoRepository.findById(id).get();
		} catch(NoSuchElementException e) {
			throw new EntityNotFoundException("EntityNotFoundException Produto id: " + id);
		}
	}

	public List<Produto> getProdutosByCategoriaId(Long id) {
		try {
			return produtoRepository.findByCategoria(id);
		} catch(NoSuchElementException e) {
			throw new EntityNotFoundException("EntityNotFoundException Produto id: " + id);
		}
	}

}
