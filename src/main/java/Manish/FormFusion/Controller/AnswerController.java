package Manish.FormFusion.Controller;

import Manish.FormFusion.Entity.Answer;
import Manish.FormFusion.Entity.Form;
import Manish.FormFusion.Entity.Question;
import Manish.FormFusion.Repository.AnswerRepository;
import Manish.FormFusion.Repository.FormRepository;
import Manish.FormFusion.Repository.QuestionRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<String> submitQuestion(@RequestBody Answer answer,
                                                 @PathVariable Long form_id,
                                                 @PathVariable Long question_id) {

        Form form = formRepository.findById(form_id)
                .orElseThrow(() -> new EntityNotFoundException("Form not found"));

        Question question = questionRepository.findById(question_id)
                .orElseThrow(() -> new EntityNotFoundException("Question not found"));

        if (!form.getQuestions().contains(question)) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Question with ID " + question_id + " does not belong to Form with ID " + form_id);
        }

        answer.setQuestion(question);
        answerRepository.save(answer);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body("Answer submitted successfully for the Question ID -> " + question_id);
    }


    @PutMapping("/{form_id}/{question_id}/update-answer")
    public ResponseEntity<String> updateAnswer(@RequestBody Answer updatedAnswer,
                                               @PathVariable Long form_id,
                                               @PathVariable Long question_id) {

        Form form = formRepository.findById(form_id)
                .orElseThrow(() -> new EntityNotFoundException("Form not found"));

        Question question = questionRepository.findById(question_id)
                .orElseThrow(() -> new EntityNotFoundException("Question not found"));

        if (!form.getQuestions().contains(question)) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Question with ID " + question_id + " does not belong to Form with ID " + form_id);
        }

        Answer existingAnswer = answerRepository.findByQuestionAndResponse_ResponseId(question, updatedAnswer.getResponse().getResponseId());

        if (existingAnswer == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Answer not found for the specified Question ID and Response ID");
        }

        // Update the answer with the new content
        existingAnswer.setAnswer(updatedAnswer.getAnswer());
        answerRepository.save(existingAnswer);

        return ResponseEntity.status(HttpStatus.OK)
                .body("Answer updated successfully for the Question ID -> " + question_id);
    }



}
