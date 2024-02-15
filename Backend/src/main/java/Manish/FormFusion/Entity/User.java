package Manish.FormFusion.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import org.hibernate.validator.constraints.UniqueElements;

import java.util.List;

@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    private String username;

    //    @JsonIgnore
    private String password;

    @Column(unique = true)
    @Email
    private String email;

    private String role;
    @JsonManagedReference
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Form> forms;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Response> responses;
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Answer> answers;



    public User() {

    }

    public User(String username, String password, String email, String role, List<Form> forms, List<Response> responses,List<Answer> answers) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.role = role;
        this.forms = forms;
        this.responses = responses;
        this.answers = answers;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public List<Form> getForms() {
        return forms;
    }

    public void setForms(List<Form> forms) {
        this.forms = forms;
    }

    public List<Response> getResponses() {
        return responses;
    }

    public void setResponses(List<Response> responses) {
        this.responses = responses;
    }

    public List<Answer> getAnswers() {
        return answers;
    }

    public void setAnswers(List<Answer> answers) {
        this.answers = answers;
    }

//    @Override
//    public String toString() {
//        return "User{" +
//                "userId=" + userId +
//                ", username='" + username + '\'' +
//                ", password='" + password + '\'' +
//                ", email='" + email + '\'' +
//                ", role='" + role + '\'' +
////                ", forms=" + forms +
////                ", responses=" + responses +
//                '}';
//    }

    @Override
    public String toString() {
        return "{" +
                "\"userId\": \"" + userId + "\"," +
                "\"username\": \"" + username + "\"," +
                "\"password\": \"" + password + "\"," +
                "\"email\": \"" + email + "\"," +
                "\"role\": \"" + role + "\"" +
                "}";
    }


}
