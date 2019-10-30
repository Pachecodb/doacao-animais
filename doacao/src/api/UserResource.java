package api;

import java.security.Key;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;

import javax.ejb.EJB;
import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;
import javax.ws.rs.core.UriInfo;

import auth.KeyGenerator;
import dao.UserDao;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import model.User;

@Path("/users")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class UserResource {

	@Inject
	private KeyGenerator keyGenerator;

	@EJB
	private UserDao userDao;

	@Context
	private UriInfo uriInfo;

	@POST
	@Path("/login")
	public Response authenticateUser(User user) {

		try {
			User loginUser = userDao.login(user.getLogin(), user.getPassword());

			if (loginUser == null) {
				return Response.status(Status.UNAUTHORIZED).build();

			}

			String token = issueToken(user.getLogin());
			loginUser.setToken(token);

			return Response.ok(loginUser).status(Status.OK).build();
		} catch (Exception e) {
			return Response.status(Status.UNAUTHORIZED).build();
		}

	}

	private String issueToken(String login) {
		Key key = keyGenerator.generateKey();
		String jwtToken = Jwts.builder().setSubject(login).setIssuer(uriInfo.getAbsolutePath().toString())
				.setIssuedAt(new Date())
				.setExpiration(
						Date.from(LocalDateTime.now().plusMinutes(30L).atZone(ZoneId.systemDefault()).toInstant()))
				.signWith(SignatureAlgorithm.HS512, key).compact();

		return jwtToken;
	}

}