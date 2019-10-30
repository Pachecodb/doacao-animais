package dao;

import javax.ejb.Stateless;
import javax.persistence.Query;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import model.User;

@Stateless
public class UserDao {

	@PersistenceContext(unitName = "doacao")
	private EntityManager entityManager;

	public User login(String login, String password) {
		User user = null;
		try {
			Query q = entityManager.createNamedQuery("User.findByLoginPassword");
			q.setParameter("login", login);
			q.setParameter("password", password);
			user = (User) q.getSingleResult();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return user;

	}
}
