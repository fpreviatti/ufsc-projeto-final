package com.ufsc.services;

import com.ufsc.entities.Arquivo;
import com.ufsc.entities.Categoria;
import com.ufsc.repositories.ArquivoRespository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
public class ArquivoService {
	
	@Autowired
	private ArquivoRespository arquivoRepository;
	
	public Arquivo save(MultipartFile file) throws IOException {
		String fileName = StringUtils.cleanPath(file.getOriginalFilename());
		Arquivo arquivo = new Arquivo(null, fileName, file.getContentType(), file.getBytes());
		
		return arquivoRepository.save(arquivo);
		
	}

	public Arquivo get(String id) {				
		return arquivoRepository.findById(id).get();
	}


	public List<Arquivo> findAll(){
		return arquivoRepository.findAll();
	}
	
}
