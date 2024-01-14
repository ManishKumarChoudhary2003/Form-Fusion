package Manish.FormFusion.Controller;

import Manish.FormFusion.Entity.Form;
import Manish.FormFusion.Entity.Question;
import Manish.FormFusion.Entity.QuestionOption;
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


    @PostMapping("/{formId}/{questionId}/create-options")
    public ResponseEntity<String> createOptionsForQuestion(@PathVariable Long formId, @PathVariable Long questionId, @RequestBody List<String> optionTexts) {
        Form form = formRepository.findById(formId)
                .orElseThrow(() -> new RuntimeException("Form not found with id: " + formId));

        Question question = questionRepository.findById(questionId)
                .orElseThrow(() -> new RuntimeException("Question not found with id: " + questionId));

        // Check if the question belongs to the specified form
        if (!form.getQuestions().contains(question)) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Question does not belong to the specified form.");
        }

        // Check if the question type allows options
        if (!"single_choice".equals(question.getType()) && !"multiple_choice".equals(question.getType())) {
            System.out.println("Options Not setted...........................");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Options can only be added to single choice or multiple choice questions.");
        }

        for (String optionText : optionTexts) {
            QuestionOption questionOption = new QuestionOption(question, optionText);
            question.getOptions().add(String.valueOf(questionOption));
        }

        questionRepository.save(question);
        return ResponseEntity.status(HttpStatus.CREATED).body("Options successfully created for the question");
    }

}
