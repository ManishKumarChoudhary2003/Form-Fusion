package Manish.FormFusion.Repository;


import Manish.FormFusion.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public interface UserRepository extends JpaRepository<User, Long> {
    public List<User> findByuserId(long userId);
}
