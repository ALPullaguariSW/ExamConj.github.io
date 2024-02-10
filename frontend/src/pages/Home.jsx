import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAllOrders, addOrder } from "../scripts/dashboard";

const Home = () => {
  const [orders, setOrders] = useState([]);
  const [newItem, setNewItem] = useState("");
  const [newPrice, setNewPrice] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      const allOrders = await getAllOrders();
      console.log("All Orders:", allOrders);
      setOrders(allOrders);
    };
    fetchOrders();
  }, []);

  const navigate = useNavigate();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
        console.log("Signed out successfully");
      })
      .catch((error) => {
        console.error("Sign out error:", error);
      });
  };

  const handleAddItem = async () => {
    if (!newItem || !newPrice) return;
    const orderData = {
      item: newItem,
      price: newPrice,
    };
    const orderId = await addOrder(orderData);
    if (orderId) {
      setOrders([...orders, orderData]);
      setNewItem("");
      setNewPrice("");
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="flex justify-between items-center bg-gray-800 p-4">
        <h2 className="text-lg font-semibold text-white">Dashboard</h2>
        <div className="flex items-center space-x-4">
          <button className="text-white hover:text-gray-300">
            Notifications
          </button>
          <button className="text-white hover:text-gray-300">Settings</button>
          <button
            className="text-white hover:text-gray-300"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
      <div className="flex flex-1">
        <aside className="w-1/5 bg-gray-200 p-4">
          <ul>
            <li className="mb-2">
              <a href="#" className="text-gray-800 hover:text-gray-600">
                Dashboard
              </a>
            </li>
            <li className="mb-2">
              <a href="#" className="text-gray-800 hover:text-gray-600">
                Products
              </a>
            </li>
            <li className="mb-2">
              <a href="#" className="text-gray-800 hover:text-gray-600">
                Orders
              </a>
            </li>
            <li className="mb-2">
              <a href="#" className="text-gray-800 hover:text-gray-600">
                Customers
              </a>
            </li>
            <li className="mb-2">
              <a href="#" className="text-gray-800 hover:text-gray-600">
                Reports
              </a>
            </li>
          </ul>
        </aside>
        <main className="flex-1 p-4">
          {/* Contenido principal del dashboard */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Enter item"
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 mr-2"
            />
            <input
              type="text"
              placeholder="Enter price"
              value={newPrice}
              onChange={(e) => setNewPrice(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 mr-2"
            />
            <button
              onClick={handleAddItem}
              className="bg-indigo-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
            >
              Add Item
            </button>
          </div>
          <h3 className="text-lg font-semibold mb-4">Recent Orders</h3>
          <div className="grid grid-cols-3 gap-4">
            {/* Renderizar las órdenes aquí */}
            {orders.map((order, index) => (
              <div key={index} className="bg-white p-4 shadow-md rounded-md">
                <table>
                  <thead>
                    <tr>
                      <th>Item</th>
                      <th>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{order.item}</td>
                      <td>{order.price}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;
