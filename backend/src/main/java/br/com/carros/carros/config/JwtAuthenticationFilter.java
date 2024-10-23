package br.com.carros.carros.config;

// JwtAuthenticationFilter.java

import java.io.IOException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {
	@Autowired
	private JwtServiceGenerator jwtService;

	@Autowired
	private UserDetailsService userDetailsService;

	@Override
	protected void doFilterInternal(
			@NonNull HttpServletRequest request,
			@NonNull HttpServletResponse response,
			@NonNull FilterChain filterChain
	) throws ServletException, IOException {
		final String authHeader = request.getHeader("Authorization");
		final String jwt;
		final String userEmail;

		// Logando o cabeçalho de autorização
		System.out.println("Authorization Header: " + authHeader);

		if (authHeader == null || !authHeader.startsWith("Bearer ")) {
			System.out.println("No valid JWT found, proceeding without authentication.");
			filterChain.doFilter(request, response);
			return;
		}

		jwt = authHeader.substring(7);
		userEmail = jwtService.extractUsername(jwt);

		// Logando o usuário extraído do JWT
		System.out.println("Extracted Username: " + userEmail);

		if (userEmail != null && SecurityContextHolder.getContext().getAuthentication() == null) {
			UserDetails userDetails = this.userDetailsService.loadUserByUsername(userEmail);
			// Logando informações do usuário
			System.out.println("UserDetails: " + userDetails);

			if (jwtService.isTokenValid(jwt, userDetails)) {
				UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
						userDetails,
						null,
						userDetails.getAuthorities()
				);
				authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

				// Logando que o token foi validado e o usuário foi autenticado
				System.out.println("Token is valid. Authenticating user: " + userDetails.getUsername());
				SecurityContextHolder.getContext().setAuthentication(authToken);
			} else {
				System.out.println("Invalid JWT token.");
			}
		}

		// Continuar com a cadeia de filtros
		filterChain.doFilter(request, response);
	}
}
