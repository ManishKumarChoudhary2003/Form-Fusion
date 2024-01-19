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

    @PostMapping("/{formId}/{questionId}/submit-answer")
    public ResponseEntity<String> submitAnswerForQuestion(
            @PathVariable Long formId,
            @PathVariable Long questionId,
            @RequestBody String answer) {

        try {
            Form form = formRepository.findById(formId)
                    .orElseThrow(() -> new EntityNotFoundException("Form not found with id: " + formId));

            Question question = questionRepository.findById(questionId)
                    .orElseThrow(() -> new EntityNotFoundException("Question not found with id: " + questionId));

            if (!form.getQuestions().contains(question)) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Question does not belong to the specified form.");
            }

            Answer submittedAnswer = new Answer(question, answer);
            answerRepository.save(submittedAnswer);

            return ResponseEntity.status(HttpStatus.CREATED).body("Answer successfully submitted for the question");
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error submitting the answer");
        }
    }



    @PutMapping("/{formId}/{questionId}/update-answer")
    public ResponseEntity<String> updateAnswerForQuestion(
            @PathVariable Long formId,
            @PathVariable Long questionId,
            @RequestBody String updatedAnswer) {

        try {
            Form form = formRepository.findById(formId)
                    .orElseThrow(() -> new EntityNotFoundException("Form not found with id: " + formId));

            Question question = questionRepository.findById(questionId)
                    .orElseThrow(() -> new EntityNotFoundException("Question not found with id: " + questionId));

            if (!form.getQuestions().contains(question)) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Question does not belong to the specified form.");
            }

            Answer existingAnswer = answerRepository.findByQuestion(question)
                    .orElseThrow(() -> new EntityNotFoundException("Answer not found for the specified question"));

            existingAnswer.setAnswer(updatedAnswer);
            answerRepository.save(existingAnswer);

            return ResponseEntity.status(HttpStatus.OK).body("Answer successfully updated for the question");
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error updating the answer");
        }
    }



}
