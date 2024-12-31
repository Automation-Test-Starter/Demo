import { test, expect } from '@playwright/test';
import { ShoppingPage } from '@/web/pages/ShoppingPage';
import { CartPage } from '@/web/pages/CartPage';
import { CheckoutPage } from '@/web/pages/CheckoutPage';

test.describe('Shopping Flow', () => {
  let shoppingPage: ShoppingPage;
  let cartPage: CartPage;
  let checkoutPage: CheckoutPage;

  test.beforeEach(async ({ page }) => {
    shoppingPage = new ShoppingPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);
    await shoppingPage.goto();
  });

  test('should complete purchase flow successfully', async () => {
    // 添加商品到购物车
    await shoppingPage.addProductToCart('iPhone 13');
    await shoppingPage.addProductToCart('AirPods Pro');
    
    // 检查购物车
    await shoppingPage.navigateToCart();
    await expect(cartPage.getItemCount()).resolves.toBe(2);
    
    // 进行结账
    await cartPage.proceedToCheckout();
    await checkoutPage.fillShippingInfo({
      name: 'Test User',
      address: '123 Test St',
      city: 'Test City',
      zipCode: '12345'
    });
    
    // 完成订单
    await checkoutPage.placeOrder();
    await expect(checkoutPage.getOrderConfirmation())
      .resolves.toContain('Order placed successfully');
  });
}); 