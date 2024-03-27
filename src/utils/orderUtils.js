import Order from '@/components/model/Order';
import OrderItem from '@/components/model/OrderItem';

export function convertToOrder(orderData) {
    const date = new Date(parseFloat(orderData.createdAt) * 1000);
    const formatter = new Intl.DateTimeFormat('en', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
    const formattedDate = formatter.format(date);

    var order = new Order(
        orderData.id,
        orderData.total,
        formattedDate,
        orderData.orderStatus,
        orderData.billingAddress,
        orderData.shippingAddress,
        orderData.payMethod,
        orderData.shipmentMethod,
    );
    return order;

}
export function convertToOrderItem(orderItemData) {
    var orderItem = new OrderItem(
        orderItemData.id,
        orderItemData.book,
        orderItemData.quantity,
    );
    return orderItem;

}