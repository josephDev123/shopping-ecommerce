"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function InvalidTransactionNotice() {
  return (
    <main className="min-h-[60vh] flex flex-col items-center justify-center bg-gradient-to-b from-red-50 to-white px-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="max-w-md w-full bg-white shadow-md rounded-2xl p-8 border border-red-100"
      >
        <motion.div
          initial={{ scale: 0.8, rotate: -6 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 10 }}
          className="w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-full bg-red-100 text-red-600"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-10 h-10"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </motion.div>

        <h1 className="text-xl md:text-2xl font-semibold text-gray-900">
          Invalid or Missing Transaction Details
        </h1>

        <p className="mt-3 text-sm text-gray-600">
          It seems this payment link is missing some required parameters or the
          transaction reference could not be verified.
        </p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-6 flex flex-col sm:flex-row gap-3 justify-center"
        >
          <Link
            href="/checkout"
            className="inline-flex items-center justify-center rounded-lg bg-red-600 text-white px-5 py-2.5 text-sm font-medium hover:bg-red-700 transition-colors shadow-md"
          >
            Try Again
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-lg border border-gray-300 text-gray-700 px-5 py-2.5 text-sm font-medium hover:bg-gray-50 transition-colors"
          >
            Contact Support
          </Link>
        </motion.div>
      </motion.div>

      <p className="mt-6 text-xs text-gray-400">
        If you already made a payment, please don’t retry immediately — check
        your transaction history first.
      </p>
    </main>
  );
}
