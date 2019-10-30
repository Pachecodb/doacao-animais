package dao;

import java.util.List;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import model.Especie;

@Stateless
public class EspecieDao {

	@PersistenceContext(unitName = "doacao")
	private EntityManager entityManager;

	public Especie inserir(Especie especie) {
		entityManager.persist(especie);
		return especie;
	}

	public Especie alterar(Especie especie) {
		entityManager.merge(especie);
		return especie;
	}

	public void excluir(Integer id) {
		Especie especie = entityManager.find(Especie.class, id);
		entityManager.remove(especie);
	}

	public List<Especie> pesquisarPorNome(String nome) {
		Query q = entityManager.createNamedQuery("Especie.findByNome");
		q.setParameter("nome", nome + "%");
		List<Especie> especies = q.getResultList();
		return especies;
	}
	
	public List<Especie> listarTodas() {
		Query q = entityManager.createNamedQuery("Especie.findAll");
		List<Especie> especies = q.getResultList();
		return especies;
	}
	
	public Especie pesquisarPorId(Integer id) {
		Especie especie = entityManager.find(Especie.class, id);
		return especie;		
	}
	

}
