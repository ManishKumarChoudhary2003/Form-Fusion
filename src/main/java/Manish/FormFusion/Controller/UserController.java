package Manish.FormFusion.Controller;


import Manish.FormFusion.Entity.AuthRequest;
import Manish.FormFusion.Entity.User;
import Manish.FormFusion.Filter.JwtService;
import Manish.FormFusion.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/auth")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private JwtService jwtService;

    @GetMapping("/welcome")
    public String welcome(){
        return "Welcome to Spring Security tutorials !!";
    }

    @PostMapping("/addUser")
    public String addUser(@RequestBody User user){
        return userService.addUser(user);

    }
    @PostMapping("/login")
    public String addUser(@RequestBody AuthRequest authRequest){
        Authentication authenticate = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword()));
        if(authenticate.isAuthenticated()){
            return jwtService.generateToken(authRequest.getUsername());
        }else {
            throw new UsernameNotFoundException("Invalid user request");
        }
    }
    @GetMapping("/getUsers")
    @PreAuthorize("hasAuthority('ADMIN_ROLES')")
    public List<User> getAllUsers(){
        return userService.getAllUsers();
    }
    @GetMapping("/getUsers/{id}")
    @PreAuthorize("hasAuthority('USER_ROLES')")
    public User getAllUsers(@PathVariable Long id){
        return userService.getUser(id);
    }



















//    @Autowired
//    private UserRepository userRepository;
//
//    @GetMapping("/")
//    public String createUser(){
//        return  "Welcome To Form Fusion";
//    }
//
//    @GetMapping("/user/{userId}")
//    public User getUser(@PathVariable long userId){
//        List<User> user = userRepository.findByuserId(userId);
//        return user.get(0);
//    }
//
//    @PutMapping("/update-user/{userId}")
//    public void updateUser(@PathVariable long userId){
//        List<User> users = userRepository.findByuserId(userId);
//        User user = users.get(0);
//        String username = "Manish Choudhary";
//        String email = "manishchoudhary@mail.com";
//
//        user.setUsername(username);
//        user.setEmail(email);
//
//        userRepository.save(user);
//    }
//
//    @PostMapping("/create-user")
//    public void createUser(@RequestBody User user){
//        userRepository.save(user);
//    }
}
