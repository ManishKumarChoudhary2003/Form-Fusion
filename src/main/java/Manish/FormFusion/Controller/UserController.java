package Manish.FormFusion.Controller;


import Manish.FormFusion.Entity.User;
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

@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping("/getUsers")
    @PreAuthorize("hasAuthority('ADMIN_ROLES')")
    public List<User> getAllUsers(){
        return userService.getAllUsers();
    }

    @GetMapping("/getUsers/{id}")
    @PreAuthorize("hasAuthority('USER_ROLES')")
    public ResponseEntity<Object> getAllUsers(@PathVariable Long id) {
        User user = userService.getUser(id);

        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("User Not Found");
        }

        return ResponseEntity.ok(user);
    }



//    @GetMapping("/getUsers/{id}")
//    @PreAuthorize("hasAuthority('USER_ROLES')")
//    public User getAllUsers(@PathVariable Long id){
//        System.out.println("Inside the getAllUsers");
//        return userService.getUser(id);
//    }

}
