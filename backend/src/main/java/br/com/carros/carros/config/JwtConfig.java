package br.com.carros.carros.config;

import io.jsonwebtoken.SignatureAlgorithm;

public class JwtConfig {

	//Parâmetros para geração do token
	public static final String SECRET_KEY = "jdn8923bnf9u2qb9uydfw89udbn872329b8392br8e02whdfujsghfboijweufu093f83yf30f";
	public static final SignatureAlgorithm ALGORITMO_ASSINATURA = SignatureAlgorithm.HS256;
	public static final int HORAS_EXPIRACAO_TOKEN = 1;

}
