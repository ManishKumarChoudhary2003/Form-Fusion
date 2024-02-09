package Manish.FormFusion.repository;


import Manish.FormFusion.entity.Form;
import Manish.FormFusion.entity.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
@Transactional
public interface QuestionRepository  extends JpaRepository<Question, Long> {
    List<Question> findByForm(Form form);
}
