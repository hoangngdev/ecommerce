package hoa.ecom.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import hoa.ecom.entity.Customer;

public interface CustomerRepository extends JpaRepository<Customer, Long> {
}
