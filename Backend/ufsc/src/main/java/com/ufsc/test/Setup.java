package com.ufsc.test;

import com.ufsc.entities.Arquivo;
import com.ufsc.entities.Categoria;
import com.ufsc.entities.Produto;
import com.ufsc.repositories.ArquivoRespository;
import com.ufsc.repositories.CategoriaRepository;
import com.ufsc.repositories.ProdutoRepository;
import com.ufsc.services.ArquivoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.util.Arrays;

@Configuration
public class Setup implements CommandLineRunner {

    @Autowired
    private ProdutoRepository produtoRepository;

    @Autowired
    private CategoriaRepository categoriaRepository;

    @Autowired
    private ArquivoRespository arquivoRespository;

    @Autowired
    private ArquivoService arquivoService;


    @Override
    public void run(String... args) throws Exception {

        Categoria ca1 = new Categoria(null, "Eletrônicos");
        Categoria ca2 = new Categoria(null, "Automóveis");

        categoriaRepository.saveAll(Arrays.asList(ca1, ca2));

        Produto p1 = new Produto(null, "Fone de Ouvido", 200d, 2);

        p1.setCaminhoImagem("fone.jpg");

        Arquivo a1 = new Arquivo();

        a1.setId(null);


       a1 = arquivoService.save(new MultipartFile() {
            @Override
            public String getName() {
                return null;
            }

            @Override
            public String getOriginalFilename() {
                return null;
            }

            @Override
            public String getContentType() {
                return null;
            }

            @Override
            public boolean isEmpty() {
                return false;
            }

            @Override
            public long getSize() {
                return 0;
            }

            @Override
            public byte[] getBytes() throws IOException {
                return new byte[0];
            }

            @Override
            public InputStream getInputStream() throws IOException {
                return null;
            }

            @Override
            public void transferTo(File dest) throws IOException, IllegalStateException {

            }
        });

        p1.setArquivo(a1);
        p1.setCategoria(ca1);

        produtoRepository.save(p1);


        Produto p2 = new Produto(null, "Ford Fiesta", 80000d, 1);

        p2.setCaminhoImagem("fiesta.jpg");

        Produto p3 = new Produto(null, "Computador", 5000d, 1);

        p3.setCaminhoImagem("computador.png");

        Produto p4 = new Produto(null, "Playstation", 5000d, 5);

        p4.setCaminhoImagem("playstation.png");

        Produto p5 = new Produto(null, "Fiat Uno", 40000d, 2);

        p5.setCaminhoImagem("fiat-uno.jpg");

        Produto p6 = new Produto(null, "Gol", 50000d, 1);

        p6.setCaminhoImagem("gol.jpg");


        p2.setCategoria(ca2);
        p3.setCategoria(ca1);
        p4.setCategoria(ca1);
        p5.setCategoria(ca2);
        p6.setCategoria(ca2);

        produtoRepository.saveAll(Arrays.asList(p2,p3,p4,p5,p6));


    }

}