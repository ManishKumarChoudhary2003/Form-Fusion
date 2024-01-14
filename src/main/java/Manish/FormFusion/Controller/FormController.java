package Manish.FormFusion.Controller;

import Manish.FormFusion.Entity.Form;
import Manish.FormFusion.Entity.Question;
import Manish.FormFusion.Entity.QuestionOption;
import Manish.FormFusion.Entity.User;
import Manish.FormFusion.Repository.FormRepository;
import Manish.FormFusion.Repository.QuestionOptionRepository;
import Manish.FormFusion.Repository.QuestionRepository;
import Manish.FormFusion.Repository.UserRepository;
import Manish.FormFusion.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/form")
public class FormController {

    @Autowired
    private FormRepository formRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;



    @PostMapping("/{userId}/create-form")
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


    @GetMapping("/getForms/{userId}")
    public List<Form> getAllFormsForUser(@PathVariable(name = "userId") Long userId) {
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

        User user = userRepository.findById(finalUserId)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + finalUserId));

        List<Form> forms = formRepository.findByUser(user);
        return forms;
    }




}
