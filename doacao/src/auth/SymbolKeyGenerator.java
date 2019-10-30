package auth;

import javax.crypto.spec.SecretKeySpec;
import javax.enterprise.context.Dependent;
import java.security.Key;


@Dependent
public class SymbolKeyGenerator implements KeyGenerator{

	@Override
	public Key generateKey() {
		
		String KeyString = "simplekey";
		Key key =  new SecretKeySpec(KeyString.getBytes(), 0, KeyString.getBytes().length, "DES");
		return key;
		
	}

}
