"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function PaymentFailedPage() {
  // Provide a stable ID constant so both the aria attribute and the heading use the exact same value.
  const headingId = "payment-failed-heading";

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-white p-6">
      {/*
        For accessibility we use both aria-labelledby (preferred) and aria-label as a safe fallback.
        The `headingId` constant ensures the id string is identical in both places.
      */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="max-w-3xl w-full bg-white shadow-lg rounded-2xl p-8 md:p-12 flex flex-col items-center text-center"
        role="region"
        aria-labelledby={headingId}
        aria-label="Payment failed or cancelled notification"
      >
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: [1, 1.03, 1] }}
          transition={{ repeat: Infinity, repeatDelay: 2, duration: 3 }}
          className="rounded-full bg-red-50 p-6 mb-6"
          aria-hidden
        >
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            className="w-16 h-16 text-red-600"
            initial={{ rotate: 0 }}
            animate={{ rotate: [0, -6, 6, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            aria-hidden
          >
            <circle
              cx="12"
              cy="12"
              r="9"
              strokeWidth="1.5"
              className="opacity-30"
            />
            <path
              d="M9.5 9.5l5 5M14.5 9.5l-5 5"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </motion.svg>
        </motion.div>

        {/* Ensure the heading exists and uses the same ID string we passed to aria-labelledby */}
        <h1
          id={headingId}
          className="text-2xl md:text-3xl font-semibold text-gray-900"
        >
          Payment failed or cancelled
        </h1>

        <p className="mt-4 text-sm md:text-base text-gray-600 max-w-xl">
          We couldn’t complete your payment. This can happen if the payment was
          cancelled, declined, or the session timed out. Don’t worry — your cart
          is still saved and you can try again.
        </p>

        <div className="mt-6 w-full flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
          <motion.a
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 300 }}
            href="/checkout"
            className="inline-flex items-center justify-center rounded-lg border border-red-600 bg-red-600/5 px-5 py-2 text-sm md:text-base font-medium text-red-600 hover:bg-red-600/10 focus:outline-none focus:ring-2 focus:ring-red-200"
            aria-label="Try payment again"
          >
            Try payment again
          </motion.a>

          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-lg bg-gray-900 px-5 py-2 text-sm md:text-base font-medium text-white shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
              aria-label="Return to shop"
            >
              Return to shop
            </Link>
          </motion.div>
        </div>

        <div className="mt-6 text-xs text-gray-400">
          <p>
            If you were charged, the amount will be automatically refunded
            within 3–7 business days. If you need help, contact our{" "}
            <Link href="/support" className="underline">
              support team
            </Link>
            .
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 w-full text-left text-xs text-gray-500 bg-gray-50 border border-dashed border-gray-100 rounded-lg p-4"
        >
          <p className="font-mono">
            Order reference: <span className="font-semibold">—</span>
          </p>
          <p className="mt-1">
            Tip: You can review your cart at{" "}
            <Link href="/cart" className="underline">
              /cart
            </Link>
            .
          </p>
        </motion.div>
      </motion.section>
    </main>
  );
}
