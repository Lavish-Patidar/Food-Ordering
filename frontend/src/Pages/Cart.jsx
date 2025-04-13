// Pages/Cart.jsx
import React from 'react';

const Cart = () => {
  // Static data
  const restaurant = {
    name: "Spice Hut Indian Restaurant",
    address: "2036 2ND AVE, NEW YORK, NY 10029"
  };

  const cartItems = [
    { name: "Chicken Tikka Sub", quantity: 2, price: 314 },
    { name: "Methi Chicken Dry", quantity: 2, price: 314 },
    { name: "Reshmi Kebab", quantity: 2, price: 314 },
    { name: "Lemon Cheese Dry", quantity: 2, price: 314 },
    { name: "Rara Paneer", quantity: 2, price: 314 }
  ];

  const totals = {
    itemTotal: 3140,
    restaurantCharges: 62.8,
    deliveryFee: 10,
    discount: 1884,
    total: 1329
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl bg-gray-50 min-h-screen">
      {/* Delivery Address Section */}
      <section className="mb-8 bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Delivery Address</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="border p-4 rounded bg-blue-50 border-blue-200">
            <h3 className="font-bold text-blue-600">Home</h3>
            <p className="whitespace-pre-line text-gray-600">3:01 Welcome iPad\nRedwood City, CA 59603</p>
          </div>
          <div className="border p-4 rounded bg-green-50 border-green-200">
            <h3 className="font-bold text-green-600">Work</h3>
            <p className="whitespace-pre-line text-gray-600">Model Time Loubsters\nPaying $1000$_Note</p>
          </div>
        </div>
      </section>

      {/* Restaurant & Dishes Section */}
      <section className="mb-8 bg-orange-50 p-6 rounded-lg shadow-sm border border-orange-100">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-orange-800">{restaurant.name}</h2>
          <p className="text-gray-600">{restaurant.address}</p>
        </div>

        <div className="space-y-4">
          {cartItems.map((item, index) => (
            <div key={index} className="flex items-center justify-between bg-white p-4 rounded-md border border-gray-200">
              <div className="flex items-center space-x-4">
                <input type="checkbox" className="w-5 h-5 text-orange-600" />
                <span className="font-medium text-gray-700">{item.name}</span>
              </div>
              <div className="text-right">
                <p className="text-gray-600">
                  {item.quantity} × ${item.price}
                </p>
                <p className="font-semibold text-orange-600">
                  ${item.quantity * item.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Order Summary */}
      <section className="mb-8 bg-white p-6 rounded-lg shadow-sm">
        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="text-gray-600">Item Total</span>
            <span className="font-semibold">${totals.itemTotal}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Restaurant Charges</span>
            <span className="font-semibold">${totals.restaurantCharges}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Delivery Fee</span>
            <span className="font-semibold text-green-600">${totals.deliveryFee}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Total Discount</span>
            <span className="font-semibold text-red-600">-${totals.discount}</span>
          </div>
          
          <div className="pt-4 border-t">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-800">TO PAY</h2>
              <p className="text-3xl font-bold text-orange-600">${totals.total}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Payment Section */}
      <section className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Payment Details</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-2">Card number</label>
            <input type='number' className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500" />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-2">Expiry Date</label>
              <input type="text" placeholder="MM/YY" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500" />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">CVV</label>
              <input type="password" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500" />
            </div>
          </div>

          <button className="w-full bg-orange-600 text-white py-4 rounded-lg font-bold text-lg hover:bg-orange-700 transition-colors">
            PAY ${totals.total} →
          </button>
        </div>
      </section>
    </div>
  );
};

export default Cart;