package hoa.ecom.dto;

import lombok.Data;

import java.util.Set;

import hoa.ecom.entity.Address;
import hoa.ecom.entity.Customer;
import hoa.ecom.entity.Order;
import hoa.ecom.entity.OrderItem;

@Data
public class Purchase {

    private Customer customer;
    private Address shippingAddress;
    private Address billingAddress;
    private Order order;
    private Set<OrderItem> orderItems;

}
