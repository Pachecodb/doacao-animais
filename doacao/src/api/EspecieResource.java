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
import dao.EspecieDao;
import model.Especie;

@Path("/especies")
@JWTTokenNeeded
public class EspecieResource {
	
	@EJB
	private EspecieDao especieDao;
	
	// Inclusao de categorias (POST)
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response incluir(Especie especie) {
		Especie especieSalva = especieDao.inserir(especie);
		return Response.ok(especieSalva).build();
	}
	
	// Alteracao de categorias (PUT)
	@PUT
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response alterar(Especie especie) {
		Especie especieSalva = especieDao.alterar(especie);
		return Response.ok(especieSalva).build();		
	}
	
	// Exclusao de categorias (DELETE)
	@DELETE
	@Path("{id}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response excluir(@PathParam("id") Integer id) {
		especieDao.excluir(id);
		return Response.ok("{}").build();
	}
	
	// Pesquisa de categorias (GET)
//	@GET
//	@Path("{nome}")
//	@Consumes(MediaType.APPLICATION_JSON)
//	@Produces(MediaType.APPLICATION_JSON)
//	public Response pesquisarPorNome(@PathParam("nome") String nome) {
//		List<Especie> especies = especieDao.pesquisarPorNome(nome);
//		return Response.ok(especies).build();
//	}

	// Todas as categorias (GET)
	@GET
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response listarTodas() {
		List<Especie> especies = especieDao.listarTodas();
		return Response.ok(especies).build();
	}
	
	// Pesquisa de categorias (GET)
	@GET
	@Path("{id}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response pesquisarPorId(@PathParam("id") Integer id) {
		Especie especie = especieDao.pesquisarPorId(id);
		return Response.ok(especie).build();
	}


}
