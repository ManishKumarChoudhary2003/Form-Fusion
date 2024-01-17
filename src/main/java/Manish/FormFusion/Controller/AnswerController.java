package Manish.FormFusion.Controller;

import Manish.FormFusion.Entity.Answer;
import Manish.FormFusion.Entity.Form;
import Manish.FormFusion.Entity.Question;
import Manish.FormFusion.Repository.AnswerRepository;
import Manish.FormFusion.Repository.FormRepository;
import Manish.FormFusion.Repository.QuestionRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("answer")
public class AnswerController {

    @Autowired
    private FormRepository formRepository;

    @Autowired
    private QuestionRepository questionRepository;

    @Autowired
    private AnswerRepository answerRepository;

    @PostMapping("/{form_id}/{question_id}/submit-answer")
    public void submitQuestion(@RequestBody Answer answer, @PathVariable Long form_id, @PathVariable Long question_id){



        Question question = questionRepository.findById(question_id)
                .orElseThrow(() -> new EntityNotFoundException("Question not found"));



    }


}
