"use client";

import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export default function AboutPage() {
  return (
    <main className="bg-gray-50 text-gray-800">
      {/* Hero */}
      <section className="min-h-[60vh] flex items-center justify-center px-6 text-center">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Powering Modern E-commerce Experiences
          </h1>
          <p className="text-lg text-gray-600">
            A complete platform to sell products, manage orders, and deliver
            seamless shopping experiences.
          </p>
        </motion.div>
      </section>

      {/* About */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl font-semibold mb-4">
              What Our Platform Offers
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Our e-commerce software helps businesses showcase products, accept
              payments, manage customers, and track transactions from a single,
              intuitive dashboard.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white p-6 rounded-xl shadow"
          >
            <ul className="space-y-3 text-gray-700">
              <li>✔ Product & category management</li>
              <li>✔ Cart, checkout & payments</li>
              <li>✔ Order & transaction tracking</li>
              <li>✔ Customer & admin dashboards</li>
              <li>✔ Secure & scalable architecture</li>
            </ul>
          </motion.div>
        </div>
      </section>

      {/* Dashboards */}
      <section className="bg-white py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold text-center mb-12"
          >
            Built for Customers & Admins
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Customer */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              transition={{ duration: 0.6 }}
              className="border rounded-xl p-6"
            >
              <h3 className="text-xl font-semibold mb-3">Customer Dashboard</h3>
              <p className="text-gray-600 mb-4">
                Customers can browse products, add items to cart, complete
                checkout, and track purchases effortlessly.
              </p>
              <ul className="text-sm text-gray-700 space-y-2">
                <li>• View purchased products</li>
                <li>• Track orders & deliveries</li>
                <li>• Transaction history</li>
              </ul>
            </motion.div>

            {/* Admin */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="border rounded-xl p-6"
            >
              <h3 className="text-xl font-semibold mb-3">Admin Dashboard</h3>
              <p className="text-gray-600 mb-4">
                Admins manage products, categories, customers, and orders from a
                powerful control panel.
              </p>
              <ul className="text-sm text-gray-700 space-y-2">
                <li>• Add & manage products</li>
                <li>• View orders & customers</li>
                <li>• Monitor sales & transactions</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
