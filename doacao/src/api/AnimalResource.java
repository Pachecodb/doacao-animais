package api;

import java.util.List;

import javax.ejb.EJB;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import auth.JWTTokenNeeded;
import dao.AnimalDao;
import model.Animal;

@Path("/animais")
@JWTTokenNeeded
public class AnimalResource {
	
	@EJB
	private AnimalDao animalDao;
	
	// Inclusao de animal (POST)
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response incluir(Animal animal) {
		Animal animalSalva = animalDao.inserir(animal);
		return Response.ok(animalSalva).build();
	}
	
	// Alteracao de softwares (PUT)
	@PUT
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response alterar(Animal animal) {
		Animal animalSalva = animalDao.alterar(animal);
		return Response.ok(animalSalva).build();		
	}
	
	// Exclusao de softwares (DELETE)
	@DELETE
	@Path("{id}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response excluir(@PathParam("id") Integer id) {
		animalDao.excluir(id);
		return Response.ok("{}").build();
	}
	
	// Pesquisa de softwares (GET)
//	@GET
//	@Path("{nome}")
//	@Consumes(MediaType.APPLICATION_JSON)
//	@Produces(MediaType.APPLICATION_JSON)
//	public Response pesquisarPorNome(@PathParam("nome") String nome) {
//		List<Animal> animais = animalDao.pesquisarPorNome(nome);
//		return Response.ok(animais).build();
//	}

	// Todas as softwares (GET)
	@GET
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response listarTodos() {
		List<Animal> animais = animalDao.listarTodas();
		return Response.ok(animais).build();
	}
	
	// Pesquisa de softwares (GET)
	@GET
	@Path("{id}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response pesquisarPorId(@PathParam("id") Integer id) {
		Animal animal = animalDao.pesquisarPorId(id);
		return Response.ok(animal).build();
	}

}
