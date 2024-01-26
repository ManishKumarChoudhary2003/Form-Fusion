package Manish.FormFusion.Controller;

import Manish.FormFusion.Entity.Form;
import Manish.FormFusion.Entity.Options;
import Manish.FormFusion.Entity.Question;
import Manish.FormFusion.Entity.User;
import Manish.FormFusion.Repository.FormRepository;
import Manish.FormFusion.Repository.QuestionRepository;
import Manish.FormFusion.Repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/question")
public class QuestionController {

    @Autowired
    private FormRepository formRepository;

    @Autowired
    private QuestionRepository questionRepository;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/{userId}/{formId}/create-question")
    public ResponseEntity<String> createQuestionForForm(@PathVariable Long userId,
                                                        @PathVariable Long formId,
                                                        @RequestBody Question question) {
        try {
            User user = userRepository.findById(userId)
                    .orElseThrow(() -> new EntityNotFoundException("User not found with id: " + userId));

            Form form = formRepository.findById(formId)
                    .orElseThrow(() -> new EntityNotFoundException("Form not found with id: " + formId));

            question.setForm(form);

            List<Options> options = question.getOptions();
            if (options != null) {
                for (Options option : options) {
                    option.setQuestion(question);
                }
            }

            questionRepository.save(question);

            return ResponseEntity.status(HttpStatus.CREATED).body("Question successfully created for the form");
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error creating the question");
        }
    }

    @PutMapping("/{userId}/{formId}/update-question/{questionId}")
    public ResponseEntity<String> updateQuestionForForm(@PathVariable Long userId,
                                                        @PathVariable Long formId,
                                                        @PathVariable Long questionId,
                                                        @RequestBody Question updatedQuestion) {

        try {
            User user = userRepository.findById(userId)
                    .orElseThrow(() -> new EntityNotFoundException("User not found with id: " + userId));

            Form form = formRepository.findById(formId)
                    .orElseThrow(() -> new EntityNotFoundException("Form not found with id: " + formId));

            Question existingQuestion = questionRepository.findById(questionId)
                    .orElseThrow(() -> new EntityNotFoundException("Question not found with id: " + questionId));

            // Update question text and form
            existingQuestion.setText(updatedQuestion.getText());
            existingQuestion.setForm(form);

            // Update options
            List<Options> existingOptions = existingQuestion.getOptions();
            List<Options> updatedOptions = updatedQuestion.getOptions();

            if (existingOptions != null && updatedOptions != null) {
                // Remove existing options not present in the updated question
                existingOptions.retainAll(updatedOptions);

                // Add new or updated options
                for (Options updatedOption : updatedOptions) {
                    if (!existingOptions.contains(updatedOption)) {
                        updatedOption.setQuestion(existingQuestion);
                        existingOptions.add(updatedOption);
                    }
                }
            } else {
                // Handle the case where options are null in the request
                existingQuestion.setOptions(updatedOptions);
            }

            questionRepository.save(existingQuestion);

            return ResponseEntity.status(HttpStatus.OK).body("Question successfully updated for the form");
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error updating the question");
        }
    }


//    @PostMapping("/{userId}/{formId}/create-question")
//    public ResponseEntity<String> createQuestionForForm(@PathVariable Long userId,
//                                                        @PathVariable Long formId,
//                                                        @RequestBody Question question) {
//        try {
//            User user = userRepository.findById(userId)
//                    .orElseThrow(() -> new EntityNotFoundException("User not found with id: " + userId));
//
//            Form form = formRepository.findById(formId)
//                    .orElseThrow(() -> new EntityNotFoundException("Form not found with id: " + formId));
//
//            question.setForm(form);
//
//            questionRepository.save(question);
//
//            return ResponseEntity.status(HttpStatus.CREATED).body("Question successfully created for the form");
//        } catch (EntityNotFoundException e) {
//            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error creating the question");
//        }
//    }


//    @PutMapping("/{userId}/{formId}/update-question/{questionId}")
//    public ResponseEntity<String> updateQuestionForForm(
//            @PathVariable Long userId,
//            @PathVariable Long formId,
//            @PathVariable Long questionId,
//            @RequestBody Question updatedQuestion) {
//
//        try {
//            User user = userRepository.findById(userId)
//                    .orElseThrow(() -> new EntityNotFoundException("User not found with id: " + userId));
//
//            Form form = formRepository.findById(formId)
//                    .orElseThrow(() -> new EntityNotFoundException("Form not found with id: " + formId));
//
//            Question existingQuestion = questionRepository.findById(questionId)
//                    .orElse(null);
//
//            if (existingQuestion == null || !form.getQuestions().contains(existingQuestion)) {
//                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
//                        .body("Question does not exist or does not belong to the specified form. Update failed.");
//            }
//
//            existingQuestion.setText(updatedQuestion.getText());
//            questionRepository.save(existingQuestion);
//
//            return ResponseEntity.status(HttpStatus.OK).body("Question text successfully updated for the form");
//        } catch (EntityNotFoundException e) {
//            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error updating the question text");
//        }
//    }


    @PostMapping("/{userId}/{formId}/create-options/{questionId}")
    public ResponseEntity<String> createOptionsForQuestion(
            @PathVariable Long userId,
            @PathVariable Long formId,
            @PathVariable Long questionId,
            @RequestBody List<String> options) {

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

            List<Options> questionOptions = new ArrayList<>();
            for (String optionData : options) {
                Options option = new Options(optionData, question);
                questionOptions.add(option);
            }

            question.setOptions(questionOptions);
            questionRepository.save(question);

            return ResponseEntity.status(HttpStatus.CREATED).body("Options successfully created for the question");
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error creating options for the question");
        }
    }


    @PutMapping("/{userId}/{formId}/update-options/{questionId}")
    public ResponseEntity<String> updateOptionsForQuestion(
            @PathVariable Long userId,
            @PathVariable Long formId,
            @PathVariable Long questionId,
            @RequestBody List<String> updatedOptions) {

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

            List<Options> existingOptions = question.getOptions();
            if (existingOptions == null || existingOptions.isEmpty()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Question does not have existing options to update.");
            }

            for (int i = 0; i < Math.min(updatedOptions.size(), existingOptions.size()); i++) {
                existingOptions.get(i).setOptionData(updatedOptions.get(i));
            }

            questionRepository.save(question);

            return ResponseEntity.status(HttpStatus.OK).body("Options successfully updated for the question");
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error updating options for the question");
        }
    }

}
