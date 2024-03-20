export default class Order {
    constructor(id, total, createdAt, orderStatus, billingAddress, shippingAddress, payMethod, shipmentMethod) {
        this.id = id;
        this.total = total;
        this.createdAt = createdAt;
        this.orderStatus = orderStatus;
        this.billingAddress = billingAddress;
        this.shippingAddress = shippingAddress;
        this.payMethod = payMethod;
        this.shipmentMethod = shipmentMethod;
    }
}