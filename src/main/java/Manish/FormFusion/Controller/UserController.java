package Manish.FormFusion.Controller;


import Manish.FormFusion.Entity.User;
import Manish.FormFusion.Repository.UserRepository;
import Manish.FormFusion.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;


    @GetMapping("/all")
    public ResponseEntity<List<User>> getAllUsers() {
        try {
            List<User> users = userRepository.findAll();
            return ResponseEntity.ok(users);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }


    @GetMapping("/{userId}")
    public ResponseEntity<User> getUserById(@PathVariable Long userId) {
        try {
            Optional<User> user = userRepository.findById(userId);
            if (user.isPresent()) {
                return ResponseEntity.ok(user.get());
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }


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
