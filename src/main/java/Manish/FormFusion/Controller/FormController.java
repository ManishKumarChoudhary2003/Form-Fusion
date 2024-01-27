package Manish.FormFusion.Controller;

import Manish.FormFusion.Entity.Form;
import Manish.FormFusion.Entity.User;
import Manish.FormFusion.Repository.FormRepository;
import Manish.FormFusion.Repository.UserRepository;
import Manish.FormFusion.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/form")
public class FormController {

    @Autowired
    private FormRepository formRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/{userId}/create")
    public ResponseEntity<String> createForm(@PathVariable Long userId, @RequestBody Form form) {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String username = authentication.getName();
            User user = userRepository.findByUsername(username);

            if (userId != null && !userId.equals(user.getUserId())) {
                throw new UsernameNotFoundException("Provided userId does not match the authenticated user");
            }

            form.setUser(user);
            formRepository.save(form);
            return ResponseEntity.ok("Form successfully created");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @GetMapping("/{userId}/all")
    public ResponseEntity<String> getAllFormsForUser(@PathVariable Long userId) {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String username = authentication.getName();
            User user = userRepository.findByUsername(username);

            if (userId != null && !userId.equals(user.getUserId())) {
                throw new UsernameNotFoundException("Provided userId does not match the authenticated user");
            }

            List<Form> forms = formRepository.findByUser(user);
            return ResponseEntity.ok(forms.toString());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

//    @PostMapping("/{userId}/create-form")
//    public String createForm(@PathVariable(name = "userId", required = false) Long userId,
//                             @RequestBody Form form) {
//        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//        String authenticatedUsername = authentication.getName();
//        User authenticatedUser = userRepository.findByUsername(authenticatedUsername);
//
//        if (userId != null) {
//            if (!userId.equals(authenticatedUser.getUserId())) {
//                throw new RuntimeException("Provided userId does not match the authenticated user's userId");
//            }
//        } else {
//            userId = authenticatedUser.getUserId();
//        }
//
//        Long finalUserId = userId;
//        User user = userRepository.findById(userId)
//                .orElseThrow(() -> new RuntimeException("User not found with id: " + finalUserId));
//
//        form.setUser(user);
//        formRepository.save(form);
//        return "Form successfully created for user";
//    }
//
//    @GetMapping("/{userId}/getForms")
//    public ResponseEntity<List<Form>> getAllFormsForUser(@PathVariable(name = "userId") Long userId) {
//        try {
//            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//            String authenticatedUsername = authentication.getName();
//            User authenticatedUser = userRepository.findByUsername(authenticatedUsername);
//
//            if (userId != null) {
//                if (!userId.equals(authenticatedUser.getUserId())) {
//                    throw new RuntimeException("Provided userId does not match the authenticated user's userId");
//                }
//            } else {
//                userId = authenticatedUser.getUserId();
//            }
//
//            Long finalUserId = userId;
//
//            User user = userRepository.findById(finalUserId)
//                    .orElseThrow(() -> new EntityNotFoundException("User not found with id: " + finalUserId));
//
//            List<Form> forms = formRepository.findByUser(user);
//
//            return ResponseEntity.ok(forms);
//        } catch (EntityNotFoundException e) {
//            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Collections.emptyList());
//        } catch (RuntimeException e) {
//            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Collections.emptyList());
//        }
//    }




//    @GetMapping("/{userId}/getForms")
//    public List<Form> getAllFormsForUser(@PathVariable(name = "userId") Long userId) {
//        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//        String authenticatedUsername = authentication.getName();
//        User authenticatedUser = userRepository.findByUsername(authenticatedUsername);
//
//        if (userId != null) {
//            if (!userId.equals(authenticatedUser.getUserId())) {
//                throw new RuntimeException("Provided userId does not match the authenticated user's userId");
//            }
//        } else {
//            userId = authenticatedUser.getUserId();
//        }
//
//        Long finalUserId = userId;
//
//        User user = userRepository.findById(finalUserId)
//                .orElseThrow(() -> new RuntimeException("User not found with id: " + finalUserId));
//
//        List<Form> forms = formRepository.findByUser(user);
//        return forms;
//    }
}
