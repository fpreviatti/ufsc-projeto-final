package com.ufsc.entities;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.io.Serializable;

@Entity
public class Arquivo implements Serializable{
	
	private static final long serialVersionUID = 1L;

	@Id
	@Column(name = "arquivo_id")
	@GeneratedValue(generator = "uuid")
	@GenericGenerator(name = "uuid", strategy = "uuid2")
	private String id;
	
	private String nome;
	private String tipo;

	@OneToOne(mappedBy = "arquivo")
	private Produto produto;


	@Lob
	private byte[] dadosArquivo;

	public Arquivo() {}
	
	public Arquivo(String id, String nome, String tipo, byte[] dadosArquivo) {
		super();
		this.id = id;
		this.nome = nome;
		this.tipo = tipo;
		this.dadosArquivo = dadosArquivo;
	}

	
	public String getTipo() {
		return tipo;
	}

	public void setTipo(String tipo) {
		this.tipo = tipo;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public byte[] getDadosArquivo() {
		return dadosArquivo;
	}

	public void setDadosArquivo(byte[] dadosArquivo) {
		this.dadosArquivo = dadosArquivo;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Arquivo other = (Arquivo) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		return true;
	}
	
	

}
