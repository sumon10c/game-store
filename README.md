# 🎮 GameStore - Premium MERN Stack Gaming Marketplace

**GameStore** is a high-performance, cinematic e-commerce platform built for gamers. It features a modern dark-themed UI, real-time search capabilities, and a robust admin dashboard for order management.

---

## ✨ Key Features

* **⚡ Real-time Instant Search:** Filter through the entire game library instantly as you type, with no page reloads.
* **🛒 Seamless Checkout:** Integrated order system allowing users to purchase games effortlessly.
* **🛡️ Admin Dashboard:** Powerful admin tools to **Accept** or **Reject** pending orders with real-time status updates.
* **👤 User Profile:** Personalized dashboard for users to track their order history and current status.
* **🌑 Cinematic UI:** Premium dark-mode design with indigo accents and smooth hover animations (Framer Motion/GSAP inspired).
* **📱 Fully Responsive:** Optimized for a perfect experience across Desktop, Tablet, and Mobile devices.

---

## 🚀 Tech Stack

| Technology       | Usage                                      |
| :--------------- | :----------------------------------------- |
| **Next.js 15** | Full-stack framework with App Router      |
| **MongoDB** | NoSQL Database for Games & Orders         |
| **NextAuth.js** | Secure Authentication (Credentials/Social) |
| **Tailwind CSS** | Modern styling and layout                 |
| **Lucide React** | High-quality vector icons                 |
| **SweetAlert2** | Interactive feedback & notifications      |

---

## 🛠️ Installation & Setup

Follow these steps to run the project locally:

1.  **Clone the Repository:**
    ```bash
    git clone [https://github.com/sumon-projects/game-store.git](https://github.com/sumon-projects/game-store.git)
    cd game-store
    ```

2.  **Install Dependencies:**
    ```bash
    npm install
    ```

3.  **Environment Variables:**
    Create a `.env` file in the root directory and add the following:
    ```env
    MONGODB_URI=your_mongodb_connection_string
    NEXTAUTH_SECRET=your_secret_key
    NEXTAUTH_URL=http://localhost:3000
    ```

4.  **Run the Development Server:**
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📜 Order Workflow Logic

The system follows a secure order pipeline:
* **Pending:** The initial state when a user places an order.
* **Accepted:** Admin verifies and confirms the order for delivery.
* **Rejected:** Admin cancels the order (e.g., due to payment issues).

---

## 👨‍💻 Developer
**Sumon Chakrabarty**
* Full Stack Developer | MERN & Next.js Enthusiast
* [GitHub Profile](https://github.com/sumon10c)

---

### 📝 License
This project is licensed under the MIT License.
