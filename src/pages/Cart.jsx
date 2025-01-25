import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectItemsFromCart } from '@/slices/cartSlice'

const Cart = () => {
  const cartItems = useSelector(selectItemsFromCart)
  console.log(cartItems)
  const dispatch = useDispatch()

  const handleRemoveItem = (itemId) => {
    // dispatch(removeItem(itemId)) // Action to remove item from cart
  }

  const handleIncreaseQuantity = (itemId) => {
    // dispatch(updateItemQuantity({ itemId, quantity: 1 })) // Action to increase quantity
  }

  const handleDecreaseQuantity = (itemId) => {
    // dispatch(updateItemQuantity({ itemId, quantity: -1 })) // Action to decrease quantity
  }

  return (
    <div>
      <h2 className="text-3xl font-semibold mb-4 text-gray-800">Your Cart</h2>
      {cartItems.length === 0 ? (
        <p className="text-lg text-gray-600">Your cart is empty</p>
      ) : (
        <ul>
          {cartItems.map((item) => (
            <li
              key={item._id}
              className="p-6 bg-white shadow-lg rounded-3xl border hover:shadow-xl transition-shadow duration-300 mb-6"
            >
              <div className="flex gap-6">
                <img
                  src={`/images/${item.dish.image}`}
                  alt={item.name}
                  className="w-32 h-32 object-cover rounded-xl"
                />
                <div className="flex-1">
                  <h3 className="text-3xl font-semibold mb-2 text-gray-800">{item.dish.name}</h3>
                  <p className="text-lg text-gray-600 mb-2">{item.dish.description}</p>
                  <p className="text-xl font-bold text-gray-900 mb-2">₹{item.dish.price}</p>
                  <p className="text-sm text-gray-500 mb-1">{item.dish.category}</p>
                  <p className={`text-sm ${item.dish.inStock ? 'text-green-500' : 'text-red-500'}`}>
                    {item.inStock ? 'In Stock' : 'Out of Stock'}
                  </p>
                </div>
                <div className="flex items-center">
                  <button
                    onClick={() => handleDecreaseQuantity(item._id)}
                    disabled={item.quantity <= 1}
                    className="px-4 py-2 bg-gray-200 text-gray-700 font-semibold rounded-lg mr-2"
                  >
                    -
                  </button>
                  <span className="text-xl font-semibold text-gray-800">{item.quantity}</span>
                  <button
                    onClick={() => handleIncreaseQuantity(item._id)}
                    className="px-4 py-2 bg-gray-200 text-gray-700 font-semibold rounded-lg ml-2"
                  >
                    +
                  </button>
                  <button
                    onClick={() => handleRemoveItem(item._id)}
                    className="ml-4 px-4 py-2 bg-red-500 text-white font-semibold rounded-lg"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Cart
