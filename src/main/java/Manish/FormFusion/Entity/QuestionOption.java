package Manish.FormFusion.Entity;

import jakarta.persistence.*;

@Entity
public class QuestionOption {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "question_id")
    private Question question;

    private String optionText;

    public QuestionOption() {
    }

    public QuestionOption(Question question, String optionText) {
        this.question = question;

        // Check if the question type allows options
        if ("single_choice".equals(question.getType()) || "multiple_choice".equals(question.getType())) {
            this.optionText = optionText;
            if (!question.getOptions().contains(optionText)) {
                question.getOptions().add(optionText);
            }
        } else {
            throw new IllegalArgumentException("Options can only be added to single choice or multiple choice questions.");
        }
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Question getQuestion() {
        return question;
    }

    public void setQuestion(Question question) {
        this.question = question;
        if (!question.getOptions().contains(optionText)) {
            question.getOptions().add(optionText);
        }
    }

    public String getOptionText() {
        return optionText;
    }

    public void setOptionText(String optionText) {
        this.optionText = optionText;
    }

    @Override
    public String toString() {
        return "QuestionOption{" +
                "id=" + id +
                ", question=" + question +
                ", optionText='" + optionText + '\'' +
                '}';
    }
}
