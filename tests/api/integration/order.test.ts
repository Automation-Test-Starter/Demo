import { OrderApi } from '@/api/OrderApi';
import { ProductApi } from '@/api/ProductApi';
import { getTestUserToken } from '@/api/helpers/testHelpers';

describe('Order Integration Tests', () => {
  let orderApi: OrderApi;
  let productApi: ProductApi;
  let authToken: string;
  let testProductId: string;

  beforeAll(async () => {
    orderApi = new OrderApi();
    productApi = new ProductApi();
    authToken = await getTestUserToken();
    
    // 创建测试商品
    const product = await productApi.createProduct({
      name: 'Test Product',
      price: 99.99,
      stock: 10
    }, authToken);
    testProductId = product.body.data.id;
  });

  it('should create and process order successfully', async () => {
    // 创建订单
    const orderResponse = await orderApi.createOrder({
      productId: testProductId,
      quantity: 1,
      shippingAddress: '123 Test St'
    }, authToken);
    
    expect(orderResponse.status).toBe(201);
    const orderId = orderResponse.body.data.id;

    // 支付订单
    const paymentResponse = await orderApi.payOrder(orderId, {
      paymentMethod: 'credit_card',
      amount: 99.99
    }, authToken);
    
    expect(paymentResponse.status).toBe(200);
    expect(paymentResponse.body.data.status).toBe('paid');

    // 验证库存更新
    const productResponse = await productApi.getProduct(testProductId);
    expect(productResponse.body.data.stock).toBe(9);
  });

  afterAll(async () => {
    // 清理测试数据
    await productApi.deleteProduct(testProductId, authToken);
  });
}); 