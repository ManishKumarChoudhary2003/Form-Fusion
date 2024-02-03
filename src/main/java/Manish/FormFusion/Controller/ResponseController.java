package Manish.FormFusion.Controller;


import Manish.FormFusion.Entity.Form;
import Manish.FormFusion.Entity.Response;
import Manish.FormFusion.Entity.User;
import Manish.FormFusion.Repository.AnswerRepository;
import Manish.FormFusion.Repository.FormRepository;
import Manish.FormFusion.Repository.ResponseRepository;
import Manish.FormFusion.Repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;

@RestController
@RequestMapping("response")
public class ResponseController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private FormRepository formRepository;

    @Autowired
    private ResponseRepository responseRepository;

    @Autowired
    private AnswerRepository answerRepository;

    @PostMapping("/{userId}/{formId}/send-response")
    public ResponseEntity<String> sendResponse(@PathVariable Long userId, @PathVariable Long formId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found"));

        Form form = formRepository.findById(formId)
                .orElseThrow(() -> new EntityNotFoundException("Form not found"));

        Response newResponse = new Response(form, user, LocalDateTime.now());
        responseRepository.save(newResponse);
        return ResponseEntity.status(HttpStatus.CREATED).body("Response submitted successfully for the Form id -> " + formId +
                " and User id ->" + userId);
    }

}
