package Manish.FormFusion.Entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.List;

@Entity
public class Response {

    @Id
    @GeneratedValue
    private Long responseId;

    @ManyToOne
    @JoinColumn(name = "form_id")
    private Form form;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    private LocalDateTime timestamp;

//    @OneToMany(mappedBy = "response", cascade = CascadeType.ALL, orphanRemoval = true)
//    private List<Answer> answers;

    public Response(){

    }

    public Response(Form form, User user, LocalDateTime timestamp) {
        this.form = form;
        this.user = user;
        this.timestamp = timestamp;
//        this.answers = answers;
    }

    public Long getResponseId() {
        return responseId;
    }

    public void setResponseId(Long responseId) {
        this.responseId = responseId;
    }

    public Form getForm() {
        return form;
    }

    public void setForm(Form form) {
        this.form = form;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }

//    public List<Answer> getAnswers() {
//        return answers;
//    }
//
//    public void setAnswers(List<Answer> answers) {
//        this.answers = answers;
//    }

    @Override
    public String toString() {
        return "Response{" +
                "responseId=" + responseId +
                ", form=" + form +
                ", user=" + user +
                ", timestamp=" + timestamp +
                '}';
    }
}
