package ecommerce.payment.db.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ecommerce.payment.db.entities.Customer;

public interface CustomerRepository extends JpaRepository<Customer, Long> {
}