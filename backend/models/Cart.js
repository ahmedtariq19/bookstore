let Cart = function(oldCart) {
    this.items = oldCart.items || {};
    this.totalQty = oldCart.totalQty || 0;
    this.totalPrice = oldCart.totalPrice || 0;
    this.add = function(item, id) {
        // console.log("item:", item);
        let storedItem = this.items[id];
        if (!storedItem) {
            storedItem = this.items[id] = { item: item, qty: 0, price: 0 };
        }
        storedItem.qty += 1;
        storedItem.price = storedItem.item.price * storedItem.qty;
        this.totalQty += 1;
        this.totalPrice += storedItem.item.price;
    };

    this.minusOne = function(item, id) {
        if (id in this.items) {
            this.totalQty--;
            this.totalPrice -= item.price;
            this.items[id].qty--;
            this.items[id].price -= item.price;
            if (this.items[id].qty === 0) {
                delete this.items[id];
            }
        }
    };

    this.remove = function(item, id) {
        if (id in this.items) {
            this.totalQty -= this.items[id].qty;
            this.totalPrice -= this.items[id].price;
            delete this.items[id];
        }
    };
};

module.exports = Cart;
