package Manish.FormFusion.Repository;

import Manish.FormFusion.Entity.Answer;
import Manish.FormFusion.Entity.Form;
import Manish.FormFusion.Entity.Question;
import Manish.FormFusion.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Repository
@Transactional
public interface AnswerRepository extends JpaRepository<Answer, Long> {
    Optional<Answer> findByQuestion(Question question);

    Optional<Answer> findByQuestionAndFormAndUser(Question question, Form form, User user);
}
