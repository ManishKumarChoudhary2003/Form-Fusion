package Manish.FormFusion.Controller;


import Manish.FormFusion.Entity.Answer;
import Manish.FormFusion.Entity.Form;
import Manish.FormFusion.Entity.Response;
import Manish.FormFusion.Entity.User;
import Manish.FormFusion.Repository.AnswerRepository;
import Manish.FormFusion.Repository.FormRepository;
import Manish.FormFusion.Repository.ResponseRepository;
import Manish.FormFusion.Repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.ArrayList;

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

    @PostMapping("/{user_id}/{form_id}/send-response")
    public void sendResponse(@PathVariable Long user_id, @PathVariable Long form_id) {

        User user = userRepository.findById(user_id)
                .orElseThrow(() -> new EntityNotFoundException("User not found"));

        Form form = formRepository.findById(form_id)
                .orElseThrow(() -> new EntityNotFoundException("Form not found"));

        Response newResponse = new Response(form, user, LocalDateTime.now());
        responseRepository.save(newResponse);
    }

}
