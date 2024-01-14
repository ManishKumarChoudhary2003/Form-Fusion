package Manish.FormFusion.Repository;


import Manish.FormFusion.Entity.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
@Transactional
public interface QuestionRepository  extends JpaRepository<Question, Long> {

}
