package Manish.FormFusion.Entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

@Entity
public class Answer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long answerId;

    @ManyToOne
    @JoinColumn(name = "question_id")
    private Question question;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonBackReference
    private User user;

    @ManyToOne
    @JoinColumn(name = "form_id")
    private Form form;

    private String answer;

    public Answer() {
    }

    public Answer(Question question, User user, Form form, String answer) {
        this.question = question;
        this.user = user;
        this.form = form;
        this.answer = answer;
    }


    public Long getAnswerId() {
        return answerId;
    }

    public void setAnswerId(Long answerId) {
        this.answerId = answerId;
    }

    public Question getQuestion() {
        return question;
    }

    public void setQuestion(Question question) {
        this.question = question;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Form getForm() {
        return form;
    }

    public void setForm(Form form) {
        this.form = form;
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
                ", question=" + (question != null ? question.getQuestionId() : null) +
                ", user=" + (user != null ? user.getUserId() : null) +
                ", form=" + (form != null ? form.getFormId() : null) +
                ", answer='" + answer + '\'' +
                '}';
    }
}




//package Manish.FormFusion.Entity;
//
//import jakarta.persistence.*;
//
//@Entity
//public class Answer {
//
//    @Id
//    @GeneratedValue
//    private Long answerId;
//
////    @ManyToOne
////    @JoinColumn(name = "response_id")
////    private Response response;
//
//    @ManyToOne
//    @JoinColumn(name = "question_id")
//    private Question question;
//
//    private String answer;
//
//    public Answer(){
//
//    }
//
//    public Answer(Question question, String answer) {
//        this.question = question;
//        this.answer = answer;
//    }
//
//    public Long getAnswerId() {
//        return answerId;
//    }
//
//    public void setAnswerId(Long answerId) {
//        this.answerId = answerId;
//    }
//
////    public Response getResponse() {
////        return response;
////    }
//
////    public void setResponse(Response response) {
////        this.response = response;
////    }
//
//    public Question getQuestion() {
//        return question;
//    }
//
//    public void setQuestion(Question question) {
//        this.question = question;
//    }
//
//    public String getAnswer() {
//        return answer;
//    }
//
//    public void setAnswer(String answer) {
//        this.answer = answer;
//    }
//
//    @Override
//    public String toString() {
//        return "Answer{" +
//                "answerId=" + answerId +
//                ", question=" + question +
//                ", answer='" + answer + '\'' +
//                '}';
//    }
//}
