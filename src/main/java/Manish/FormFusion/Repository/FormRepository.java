package Manish.FormFusion.Repository;

import Manish.FormFusion.Entity.Form;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Repository
@Transactional
public interface FormRepository extends JpaRepository<Form, Long> {

    Optional<Form> findByformId(Long id);
}
