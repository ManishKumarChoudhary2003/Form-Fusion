package Manish.FormFusion.controller;


import Manish.FormFusion.entity.User;
import Manish.FormFusion.repository.UserRepository;
import Manish.FormFusion.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/all")
    public ResponseEntity<String> getAllUsers() {
        try {
            List<User> users = userRepository.findAll();
            return ResponseEntity.ok(users.toString());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }


    @GetMapping("/{userId}")
    public ResponseEntity<String> getUserById(@PathVariable Long userId) {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String username = authentication.getName();
            User user = userRepository.findByUsername(username);

            if (userId != null && !userId.equals(user.getUserId())) {
                throw new UsernameNotFoundException("Provided userId does not match the authenticated user");
            }

            return ResponseEntity.ok(user.toString());

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }


//    @GetMapping("/{userId}")
//    public ResponseEntity<User> getUserById(@PathVariable Long userId) {
//        try {
//            Optional<User> user = userRepository.findById(userId);
//            if (user.isPresent()) {
//                return ResponseEntity.ok(user.get());
//            } else {
//                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
//            }
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
//        }
//    }


//    @GetMapping("/getUsers")
//    @PreAuthorize("hasAuthority('ADMIN_ROLES')")
//    public List<User> getAllUsers(){
//        return userService.getAllUsers();
//    }
//
//    @GetMapping("/getUsers/{id}")
//    @PreAuthorize("hasAuthority('USER_ROLES')")
//    public ResponseEntity<Object> getAllUsers(@PathVariable Long id) {
//        User user = userService.getUser(id);
//
//        if (user == null) {
//            return ResponseEntity.status(HttpStatus.NOT_FOUND)
//                    .body("User Not Found");
//        }
//
//        return ResponseEntity.ok(user);
//    }


//    @GetMapping("/getUsers/{id}")
//    @PreAuthorize("hasAuthority('USER_ROLES')")
//    public User getAllUsers(@PathVariable Long id){
//        System.out.println("Inside the getAllUsers");
//        return userService.getUser(id);
//    }

}
