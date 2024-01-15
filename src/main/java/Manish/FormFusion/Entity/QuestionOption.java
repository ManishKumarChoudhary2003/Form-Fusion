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

    public QuestionOption(String optionText) {
        this.optionText = optionText;
    }

    public QuestionOption(Question question, String optionText) {
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
                ", question=" + (question != null ? question.getQuestionId() : null) + // Avoid circular reference
                ", optionText='" + optionText + '\'' +
                '}';
    }
}
