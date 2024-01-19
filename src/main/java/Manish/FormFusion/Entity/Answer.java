package Manish.FormFusion.Entity;

import jakarta.persistence.*;

@Entity
public class Answer {

    @Id
    @GeneratedValue
    private Long answerId;

//    @ManyToOne
//    @JoinColumn(name = "response_id")
//    private Response response;

    @ManyToOne
    @JoinColumn(name = "question_id")
    private Question question;

    private String answer;

    public Answer(){

    }

    public Answer(Question question, String answer) {
        this.question = question;
        this.answer = answer;
    }

    public Long getAnswerId() {
        return answerId;
    }

    public void setAnswerId(Long answerId) {
        this.answerId = answerId;
    }

//    public Response getResponse() {
//        return response;
//    }

//    public void setResponse(Response response) {
//        this.response = response;
//    }

    public Question getQuestion() {
        return question;
    }

    public void setQuestion(Question question) {
        this.question = question;
    }

    public String getAnswer() {
        return answer;
    }

    public void setAnswer(String answer) {
        this.answer = answer;
    }

    @Override
    public String toString() {
        return "Answer{" +
                "answerId=" + answerId +
                ", question=" + question +
                ", answer='" + answer + '\'' +
                '}';
    }
}
