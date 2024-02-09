package Manish.FormFusion.Entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.List;

@Entity
public class Form {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long formId;

    private String title;

    private String description;

    private String link;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonBackReference
    private User user;

    @OneToMany(mappedBy = "form", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Question> questions;

    @OneToMany(mappedBy = "form", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Response> responses;

    public Form (){

    }

    public Form(String title, String description, String link, User user, List<Question> questions, List<Response> responses) {
        this.title = title;
        this.description = description;
        this.link = link;
        this.user = user;
        this.questions = questions;
        this.responses = responses;
    }

    public Long getFormId() {
        return formId;
    }

    public void setFormId(Long formId) {
        this.formId = formId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getLink() {
        return link;
    }

    public void setLink(String link) {
        this.link = link;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public List<Question> getQuestions() {
        return questions;
    }

    public void setQuestions(List<Question> questions) {
        this.questions = questions;
    }

    public List<Response> getResponses() {
        return responses;
    }

    public void setResponses(List<Response> responses) {
        this.responses = responses;
    }

    @Override
    public String toString() {
        return "Form{" +
                "formId=" + formId +
                ", title='" + title + '\'' +
                ", description='" + description + '\'' +
                ", link='" + link + '\'' +
                ", user=" + (user != null ? user.getUserId() : null) +
                ", questions=" + (questions != null ? questions : null) +
                ", responses=" + responses +
                '}';
    }

//    @Override
//    public String toString() {
//        return "Form{" +
//                "formId=" + formId +
//                ", title='" + title + '\'' +
//                ", description='" + description + '\'' +
//                ", link='" + link + '\'' +
//                ", user=" + user +
//                ", questions=" + questions +
//                ", responses=" + responses +
//                '}';
//    }
}
