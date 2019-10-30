package dao;

import java.util.List;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import model.Animal;

@Stateless
public class AnimalDao {

	@PersistenceContext(unitName = "doacao")
	private EntityManager entityManager;

	public Animal inserir(Animal animal) {
		entityManager.persist(animal);
		return animal;
	}

	public Animal alterar(Animal animal) {
		entityManager.merge(animal);
		return animal;
	}

	public void excluir(Integer id) {
		Animal animal = entityManager.find(Animal.class, id);
		entityManager.remove(animal);
	}

	public List<Animal> pesquisarPorNome(String nome) {
		Query q = entityManager.createNamedQuery("Animal.findByNome");
		q.setParameter("nome", nome + "%");
		List<Animal> animais = q.getResultList();
		return animais;
	}
	
	public List<Animal> listarTodas() {
		Query q = entityManager.createNamedQuery("Animal.findAll");
		List<Animal> animais = q.getResultList();
		return animais;
	}
	
	public Animal pesquisarPorId(Integer id) {
		Animal animal = entityManager.find(Animal.class, id);
		return animal;		
	}
	

}
