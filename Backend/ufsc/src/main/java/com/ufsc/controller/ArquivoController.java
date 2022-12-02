package com.ufsc.controller;

import com.ufsc.entities.Arquivo;
import com.ufsc.entities.Produto;
import com.ufsc.services.ArquivoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

@RestController
public class ArquivoController {
	
	@Autowired
	private ArquivoService arquivoService;
	
	@PostMapping("/arquivo")
	public ResponseEntity<Arquivo> save(@RequestParam("image") MultipartFile multipartFile) throws IOException{
		
		Arquivo arquivo = arquivoService.save(multipartFile);
		
		return ResponseEntity.ok().body(arquivo);	
	}


	@RequestMapping(value = "/arquivo/{id}", method = RequestMethod.GET)
	@ResponseBody
	public void showImage(@PathVariable String id, HttpServletResponse response) throws IOException {
		
	    Arquivo arquivo = arquivoService.get(id);

		response.setContentType(arquivo.getTipo());
		response.getOutputStream().write(arquivo.getDadosArquivo());
		response.getOutputStream().close();	
	
	}

	@RequestMapping(value = "/arquivo", method = RequestMethod.GET)
	@ResponseBody
	public void getArquivos(@PathVariable String id, HttpServletResponse response) throws IOException {

		Arquivo arquivo = arquivoService.get(id);

		response.setContentType(arquivo.getTipo());
		response.getOutputStream().write(arquivo.getDadosArquivo());
		response.getOutputStream().close();

	}

	@GetMapping(value = "/arquivos")
	public ResponseEntity<List<Arquivo>> findAll(){

		List<Arquivo> arquivos = arquivoService.findAll();
		return ResponseEntity.ok().body(arquivos);
	}


	@GetMapping(value = "/retornaArquivo/{id}")
	public ResponseEntity<Arquivo>findArquivoById(@PathVariable String id){

		Arquivo arquivo = arquivoService.get(id);
		return ResponseEntity.ok().body(arquivo);
	}
	
	
	
}
