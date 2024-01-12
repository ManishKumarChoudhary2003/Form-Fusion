//package Manish.FormFusion.Controller;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.ResponseEntity;
//import org.springframework.security.authentication.AuthenticationManager;
//import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
//import org.springframework.security.core.Authentication;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RestController;
//
//@RestController
//public class AuthController {
//
//    @Autowired
//    private AuthenticationManager authenticationManager;
//
//    @PostMapping("/login")
//    public <AuthRequest> ResponseEntity<String> login(@RequestBody AuthRequest authRequest) {
//        Authentication authentication = authenticationManager.authenticate(
//                new UsernamePasswordAuthenticationToken(authRequest.getClass(), authRequest.getClass()));
//
//        // Generate JWT upon successful authentication
//        String jwt = .generateToken(authentication.getName());
//
//        return ResponseEntity.ok(jwt);
//    }
//}
