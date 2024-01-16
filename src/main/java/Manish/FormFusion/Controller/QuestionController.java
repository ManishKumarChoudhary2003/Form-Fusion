package Manish.FormFusion.Controller;

import Manish.FormFusion.Entity.Form;
import Manish.FormFusion.Entity.Question;
import Manish.FormFusion.Repository.FormRepository;
import Manish.FormFusion.Repository.QuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/question")
public class QuestionController {

    @Autowired
    private FormRepository formRepository;

    @Autowired
    private QuestionRepository questionRepository;


    @PostMapping("/{formId}/create-question")
    public ResponseEntity<String> createQuestionForForm(@PathVariable Long formId, @RequestBody Question question) {
        Form form = formRepository.findById(formId)
                .orElseThrow(() -> new RuntimeException("Form not found with id: " + formId));

        question.setForm(form);
        questionRepository.save(question);
        return ResponseEntity.status(HttpStatus.CREATED).body("Question successfully created for the form");
    }

    @PutMapping("/{formId}/update-question/{questionId}")
    public ResponseEntity<String> updateQuestionForForm(
            @PathVariable Long formId,
            @PathVariable Long questionId,
            @RequestBody Question updatedQuestion) {

        Form form = formRepository.findById(formId)
                .orElseThrow(() -> new RuntimeException("Form not found with id: " + formId));

        Question existingQuestion = questionRepository.findById(questionId)
                .orElseThrow(() -> new RuntimeException("Question not found with id: " + questionId));

        if (!form.getQuestions().contains(existingQuestion)) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Question does not belong to the specified form.");
        }

        existingQuestion.setText(updatedQuestion.getText());
        existingQuestion.setOptions(updatedQuestion.getOptions().subList(0, 4)); // Limit to four options
        questionRepository.save(existingQuestion);
        return ResponseEntity.status(HttpStatus.OK).body("Question successfully updated for the form");
    }

    @PostMapping("/{formId}/{questionId}/create-options")
    public ResponseEntity<String> createOptionsForQuestion(@PathVariable Long formId, @PathVariable Long questionId,
                                                           @RequestBody List<String> optionTexts) {
        Form form = formRepository.findById(formId)
                .orElseThrow(() -> new RuntimeException("Form not found with id: " + formId));

        Question question = questionRepository.findById(questionId)
                .orElseThrow(() -> new RuntimeException("Question not found with id: " + questionId));

        if (!form.getQuestions().contains(question)) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Question does not belong to the specified form.");
        }

        if (optionTexts.size() != 4) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Exactly four options are required.");
        }

        question.getOptions().clear(); // Remove existing options
        question.getOptions().addAll(optionTexts);
        questionRepository.save(question);
        return ResponseEntity.status(HttpStatus.CREATED).body("Options successfully created for the question");
    }


}
