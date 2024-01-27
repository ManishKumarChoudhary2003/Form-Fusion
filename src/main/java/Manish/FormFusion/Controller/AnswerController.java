package Manish.FormFusion.Controller;

import Manish.FormFusion.Entity.Answer;
import Manish.FormFusion.Entity.Form;
import Manish.FormFusion.Entity.Question;
import Manish.FormFusion.Entity.User;
import Manish.FormFusion.Repository.AnswerRepository;
import Manish.FormFusion.Repository.FormRepository;
import Manish.FormFusion.Repository.QuestionRepository;
import Manish.FormFusion.Repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("answer")
public class AnswerController {

    @Autowired
    private FormRepository formRepository;
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private QuestionRepository questionRepository;

    @Autowired
    private AnswerRepository answerRepository;


    @PostMapping("/{userId}/{formId}/{questionId}/submit-answer")
    public ResponseEntity<String> submitAnswerForQuestion(
            @PathVariable Long userId,
            @PathVariable Long formId,
            @PathVariable Long questionId,
            @RequestBody String answerText) {
        try {
            User user = userRepository.findById(userId)
                    .orElseThrow(() -> new EntityNotFoundException("User not found with id: " + userId));

            Form form = formRepository.findById(formId)
                    .orElseThrow(() -> new EntityNotFoundException("Form not found with id: " + formId));

            Question question = questionRepository.findById(questionId)
                    .orElseThrow(() -> new EntityNotFoundException("Question not found with id: " + questionId));

            if (!form.getQuestions().contains(question)) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Question does not belong to the specified form.");
            }

            // Check if an answer already exists for the question in the specified form
            Optional<Answer> existingAnswer = answerRepository.findByQuestionAndFormAndUser(question, form, user);
            if (existingAnswer.isPresent()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("An answer already exists for the question in the specified form.");
            }

            Answer submittedAnswer = new Answer(question, user, form, answerText);
            answerRepository.save(submittedAnswer);

            return ResponseEntity.status(HttpStatus.CREATED).body("Answer successfully submitted for the question");
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error submitting the answer");
        }
    }

    @PutMapping("/{userId}/{formId}/{questionId}/update-answer")
    public ResponseEntity<String> updateAnswerForQuestion(
            @PathVariable Long userId,
            @PathVariable Long formId,
            @PathVariable Long questionId,
            @RequestBody String updatedAnswerText) {
        try {
            User user = userRepository.findById(userId)
                    .orElseThrow(() -> new EntityNotFoundException("User not found with id: " + userId));

            Form form = formRepository.findById(formId)
                    .orElseThrow(() -> new EntityNotFoundException("Form not found with id: " + formId));

            Question question = questionRepository.findById(questionId)
                    .orElseThrow(() -> new EntityNotFoundException("Question not found with id: " + questionId));

            if (!form.getQuestions().contains(question)) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Question does not belong to the specified form.");
            }

            // Check if an answer exists for the question in the specified form and user
            Optional<Answer> existingAnswer = answerRepository.findByQuestionAndFormAndUser(question, form, user);
            if (existingAnswer.isPresent()) {
                // Update the existing answer with the new text
                Answer answerToUpdate = existingAnswer.get();
                answerToUpdate.setAnswer(updatedAnswerText);
                answerRepository.save(answerToUpdate);

                return ResponseEntity.status(HttpStatus.OK).body("Answer successfully updated for the question");
            } else {
                // If no existing answer is found, return a not found response
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No existing answer found for the question in the specified form and user.");
            }
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error updating the answer");
        }
    }



// second
//    @PostMapping("/{formId}/{questionId}/submit-answer")
//    public ResponseEntity<String> submitAnswerForQuestion(
//            @PathVariable Long formId,
//            @PathVariable Long questionId,
//            @RequestBody String answer) {
//        try {
//            Form form = formRepository.findById(formId)
//                    .orElseThrow(() -> new EntityNotFoundException("Form not found with id: " + formId));
//
//            Question question = questionRepository.findById(questionId)
//                    .orElseThrow(() -> new EntityNotFoundException("Question not found with id: " + questionId));
//
//            if (!form.getQuestions().contains(question)) {
//                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Question does not belong to the specified form.");
//            }
//
//            // Check if an answer already exists for the question
//            Optional<Answer> existingAnswer = answerRepository.findByQuestion(question);
//            if (existingAnswer.isPresent()) {
//                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("An answer already exists for the question.");
//            }
//
//            Answer submittedAnswer = new Answer(question, answer);
//            answerRepository.save(submittedAnswer);
//
//            return ResponseEntity.status(HttpStatus.CREATED).body("Answer successfully submitted for the question");
//        } catch (EntityNotFoundException e) {
//            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error submitting the answer");
//        }
//    }



// first
//    @PostMapping("/{formId}/{questionId}/submit-answer")
//    public ResponseEntity<String> submitAnswerForQuestion(
//            @PathVariable Long formId,
//            @PathVariable Long questionId,
//            @RequestBody String answer) {
//        try {
//            Form form = formRepository.findById(formId)
//                    .orElseThrow(() -> new EntityNotFoundException("Form not found with id: " + formId));
//
//            Question question = questionRepository.findById(questionId)
//                    .orElseThrow(() -> new EntityNotFoundException("Question not found with id: " + questionId));
//
//            if (!form.getQuestions().contains(question)) {
//                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Question does not belong to the specified form.");
//            }
//
//            Answer submittedAnswer = new Answer(question, answer);
//            answerRepository.save(submittedAnswer);
//
//            return ResponseEntity.status(HttpStatus.CREATED).body("Answer successfully submitted for the question");
//        } catch (EntityNotFoundException e) {
//            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error submitting the answer");
//        }
//    }



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
