package Manish.FormFusion.Controller;

import Manish.FormFusion.Entity.Form;
import Manish.FormFusion.Entity.User;
import Manish.FormFusion.Repository.FormRepository;
import Manish.FormFusion.Repository.UserRepository;
import Manish.FormFusion.Service.UserInfoDetails;
import Manish.FormFusion.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
public class FormController {

    @Autowired
    private FormRepository formRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

//    @PostMapping("/auth/create-form")
//    public String createForm(@RequestBody Form form) {
//        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//        String authenticatedUsername = authentication.getName();
//        User authenticatedUser = userRepository.findByUsername(authenticatedUsername);
//
//        Long finalUserId = authenticatedUser.getUserId();
//        User user = userRepository.findById(finalUserId)
//                .orElseThrow(() -> new RuntimeException("User not found with id: " + finalUserId));
//
//        form.setUser(user);
//        formRepository.save(form);
//
//        return "Form successfully created for user" + finalUserId;
//    }


    @PostMapping("/auth/{userId}/create-form")
    public String createForm(@PathVariable(name = "userId", required = false) Long userId,
                             @RequestBody Form form) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String authenticatedUsername = authentication.getName();
        User authenticatedUser = userRepository.findByUsername(authenticatedUsername);

        if (userId != null) {
            if (!userId.equals(authenticatedUser.getUserId())) {
                throw new RuntimeException("Provided userId does not match the authenticated user's userId");
            }
        } else {
            userId = authenticatedUser.getUserId();
        }

        Long finalUserId = userId;
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + finalUserId));

        form.setUser(user);
        formRepository.save(form);

        return "Form successfully created for user";
    }


//    @PostMapping("/auth/{userId}/create-form")
//    public String createForm(@PathVariable(name = "userId", required = false) Long userId,
//                             @RequestBody Form form) {
//
//        if (userId != null) {
//            User user = userRepository.findById(userId)
//                    .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));
//            form.setUser(user);
//        } else {
//            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//            String username = authentication.getName();
//            User user = userRepository.findByUsername(username);
//            form.setUser(user);
//        }
//
//        formRepository.save(form);
//
//        return "Form successfully created";
//    }


//    @PostMapping("/auth/create-form")
//    public String createForm(@RequestBody Form form) {
//        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//        String username = authentication.getName();
//
//        User user = userRepository.findByUsername(username);
//        form.setUser(user);
//        formRepository.save(form);
//
//        return "Form successfully created for user: " + username;
//    }


}
