package hoa.ecom.service;

import hoa.ecom.dto.Purchase;
import hoa.ecom.dto.PurchaseResponse;

public interface CheckoutService {

    PurchaseResponse placeOrder(Purchase purchase);
}
