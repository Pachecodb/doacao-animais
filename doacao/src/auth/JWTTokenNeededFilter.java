package auth;

import java.io.IOException;
import java.security.Key;

import javax.annotation.Priority;
import javax.inject.Inject;
import javax.ws.rs.Priorities;
import javax.ws.rs.container.ContainerRequestContext;
import javax.ws.rs.container.ContainerRequestFilter;
import javax.ws.rs.core.HttpHeaders;
import javax.ws.rs.core.Response;
import javax.ws.rs.ext.Provider;

import io.jsonwebtoken.Jwts;

@Provider
@JWTTokenNeeded
@Priority(Priorities.AUTHENTICATION)
public class JWTTokenNeededFilter implements ContainerRequestFilter {

	@Inject
	private KeyGenerator keyGenerator;

	@Override
	public void filter(ContainerRequestContext requestContext) throws IOException {

		String token = null;

		try {
			String authorizationHeader = requestContext.getHeaderString(HttpHeaders.AUTHORIZATION);

			token = authorizationHeader.substring("Bearer".length()).trim();

			Key key = keyGenerator.generateKey();

			Jwts.parser().setSigningKey(key).parseClaimsJws(token);

			System.out.println("### valid token: " + token);

		} catch (Exception e) {

//e.printStackTrace();
			System.out.println("### invalid token: " + token);

			requestContext.abortWith(Response.status(Response.Status.UNAUTHORIZED).build());

		}

	}

}