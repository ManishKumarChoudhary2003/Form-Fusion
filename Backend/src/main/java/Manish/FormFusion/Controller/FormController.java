package Manish.FormFusion.controller;

import Manish.FormFusion.entity.Form;
import Manish.FormFusion.entity.User;
import Manish.FormFusion.repository.FormRepository;
import Manish.FormFusion.repository.UserRepository;
import Manish.FormFusion.service.UserService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

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
    public ResponseEntity<String> createForm(@PathVariable Long userId, @RequestBody Form form) {
        try {
//            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//            String username = authentication.getName();
//            User user = userRepository.findByUsername(username);

//            if (userId != null && !userId.equals(user.getUserId())) {
//                throw new UsernameNotFoundException("Provided userId does not match the authenticated user");
//            }
            User user = userRepository.findById(userId)
                    .orElseThrow(() -> new EntityNotFoundException("User not found with ID: " + userId));

            form.setUser(user);
            formRepository.save(form);
            return ResponseEntity.ok("Form successfully created");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @PostMapping("/{userId}/{formId}/set-link")
    public ResponseEntity<String> setFormUrl(@PathVariable Long userId, @PathVariable Long formId) {
        try {
            User user = userRepository.findById(userId)
                    .orElseThrow(() -> new EntityNotFoundException("User not found with ID: " + userId));
            Form form = formRepository.findById(formId)
                    .orElseThrow(() -> new EntityNotFoundException("Form not found with ID: " + formId));

            String url = "http://localhost:8080/form/" + userId + "/" + formId;
            form.setLink(url);
            formRepository.save(form);
            return ResponseEntity.ok("Successfully Set the form Link -> " + url);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error generating form URL");
        }
    }

    @PutMapping("/{userId}/{formId}/update-form")
    public ResponseEntity<String> updateForm(
            @PathVariable Long userId,
            @PathVariable Long formId,
            @RequestBody Form updatedForm) {
        try {
//            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//            String username = authentication.getName();
//            User user = userRepository.findByUsername(username);
//
//            if (userId != null && !userId.equals(user.getUserId())) {
//                throw new UsernameNotFoundException("Provided userId does not match the authenticated user");
//            }

            User user = userRepository.findById(userId)
                    .orElseThrow(() -> new EntityNotFoundException("User not found with ID: " + userId));

            Optional<Form> existingFormOptional = formRepository.findById(formId);

            if (((Optional<?>) existingFormOptional).isPresent()) {
                Form existingForm = existingFormOptional.get();

                if (!existingForm.getUser().equals(user)) {
                    return ResponseEntity.status(HttpStatus.FORBIDDEN).body("You do not have permission to update this form.");
                }

                String existingFormLink = existingForm.getLink();
                existingForm.setTitle(updatedForm.getTitle());
                existingForm.setDescription(updatedForm.getDescription());
                existingForm.setLink(existingFormLink);

                formRepository.save(existingForm);
                return ResponseEntity.ok("Form successfully updated");
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Form not found with id: " + formId);
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }


    @GetMapping("/{userId}/all-forms")
    public ResponseEntity<String> getAllFormsForUser(@PathVariable Long userId) {
        try {
//            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//            String username = authentication.getName();
//            User user = userRepository.findByUsername(username);
//
//            if (userId != null && !userId.equals(user.getUserId())) {
//                throw new UsernameNotFoundException("Provided userId does not match the authenticated user");
//            }
            User user = userRepository.findById(userId)
                    .orElseThrow(() -> new EntityNotFoundException("User not found with ID: " + userId));

            List<Form> forms = formRepository.findByUser(user);
            return ResponseEntity.ok(forms.toString());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }
    @GetMapping("/{userId}/{formId}/getForm")
    public ResponseEntity<String> getFormById(
            @PathVariable Long userId,
            @PathVariable Long formId) {
        try {
//            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//            String username = authentication.getName();
//            User user = userRepository.findByUsername(username);
//
//            if (userId != null && !userId.equals(user.getUserId())) {
//                throw new UsernameNotFoundException("Provided userId does not match the authenticated user");
//            }

            User user = userRepository.findById(userId)
                    .orElseThrow(() -> new EntityNotFoundException("User not found with ID: " + userId));

            Optional<Form> formOptional = formRepository.findById(formId);

            if (formOptional.isPresent()) {
                Form form = formOptional.get();

                // Check if the authenticated user owns the requested form
                if (!form.getUser().equals(user)) {
                    return ResponseEntity.status(HttpStatus.FORBIDDEN).body("You do not have permission to access this form.");
                }

                return ResponseEntity.ok(form.toString());
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Form not found with id: " + formId);
            }
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
