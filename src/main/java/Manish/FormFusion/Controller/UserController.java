package Manish.FormFusion.Controller;


import Manish.FormFusion.Entity.User;
import Manish.FormFusion.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {
    @Autowired
    private UserRepository userRepository;

    @GetMapping("/")
    public String createUser(){
        return  "Welcome To Form Fusion";
    }

    @PostMapping("/create-user")
    public void createUser(@RequestBody User user){
        userRepository.save(user);
    }
}
