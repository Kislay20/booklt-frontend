import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axiosClient from "../api/axiosClient";
import { ArrowLeft } from "lucide-react";

export default function CheckoutPage() {
  const nav = useNavigate();
  const { state } = useLocation();
  const { experience, slot, qty } = (state as any) || {};

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [promo, setPromo] = useState("");
  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!experience || !slot)
    return (
      <div className="p-10 text-center">
        No booking details found. Go back to{" "}
        <button onClick={() => nav("/")} className="underline text-brandYellow-dark">
          home
        </button>
        .
      </div>
    );

  const taxes = Math.round(experience.price * 0.06);

  const applyPromo = async () => {
    if (!promo) return alert("Enter promo code");
    try {
      await axiosClient.post("/promo/validate", { code: promo });
      alert("Promo applied");
    } catch {
      alert("Invalid promo");
    }
  };

  const payAndConfirm = async () => {
    if (!name || !email) return alert("Enter name and email");
    if (!agree) return alert("Please agree to terms");
    setLoading(true);
    try {
      const res = await axiosClient.post("/bookings", {
        slotId: slot.id,
        userName: name,
        userEmail: email,
      });
      nav("/result", {
        state: { success: true, booking: res.data.booking || res.data },
      });
    } catch (e: any) {
      const message =
        e?.response?.data?.error || e?.message || "Booking failed";
      nav("/result", { state: { success: false, error: message } });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-8">
      {/* HEADER */}
      <button
        onClick={() => nav(-1)}
        className="flex items-center gap-2 mb-6 text-mediumGray hover:text-darkText transition-colors"
      >
        <ArrowLeft size={20} />
        <span className="font-medium">Checkout</span>
      </button>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* LEFT SECTION */}
        <div className="lg:col-span-2 bg-lightGray p-6 rounded-xl2 shadow-card w-full">
          {/* NAME + EMAIL */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="text-sm text-mediumGray mb-1">Full name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="p-3 rounded-lg w-full text-darkText bg-inputBgActive focus:outline-none focus:bg-inputBg border-none"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm text-mediumGray mb-1">Email</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="p-3 rounded-lg w-full text-darkText bg-inputBgActive focus:outline-none focus:bg-inputBg border-none"
              />
            </div>
          </div>

          {/* PROMO CODE */}
          <div className="mt-5 flex gap-3">
            <input
              value={promo}
              onChange={(e) => setPromo(e.target.value)}
              placeholder="Promo code"
              className="p-3 rounded-lg w-full bg-inputBgActive text-placeholderText focus:outline-none focus:bg-inputBg border-none placeholder-placeholderText"
            />
            <button
              onClick={applyPromo}
              className="px-5 py-3 bg-darkText text-white rounded-lg hover:bg-mediumGray transition-colors"
            >
              Apply
            </button>
          </div>

          {/* AGREEMENT CHECKBOX */}
          <div className="mt-5">
            <label className="checkbox-btn">
              <input
                type="checkbox"
                checked={agree}
                onChange={(e) => setAgree(e.target.checked)}
                className="sr-only"
              />
              <span className="box" aria-hidden="true">
                <svg
                  viewBox="0 0 24 24"
                  className="check"
                  width="20"
                  height="20"
                  aria-hidden="true"
                >
                  <path
                    d="M5 13 L10.5 18 L20 7"
                    fill="none"
                    stroke="#fff"
                    strokeWidth="2.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>

              <span className="text-sm select-none text-mediumGray">
                I agree to the terms and safety policy
              </span>
            </label>
          </div>
        </div>

        {/* RIGHT SECTION — Summary */}
        <div className="bg-lightGray p-4 rounded-xl2 shadow-card self-start">
          <div className="text-sm flex justify-between">
            <div className="text-mutedGray">Experience</div>
            <div>{experience.title}</div>
          </div>
          <div className="text-sm flex justify-between mt-2">
            <div className="text-mutedGray">Date</div>
            <div>{new Date(slot.startTime).toISOString().split("T")[0]}</div>
          </div>
          <div className="text-sm flex justify-between mt-2">
            <div className="text-mutedGray">Time</div>
            <div>
              {new Date(slot.startTime).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>
          </div>
          <div className="text-sm flex justify-between mt-2">
            <div className="text-mutedGray">Qty</div>
            <div>{qty}</div>
          </div>
          <div className="text-sm flex justify-between mt-2">
            <div className="text-mutedGray">Subtotal</div>
            <div>₹{Math.round(experience.price * qty)}</div>
          </div>
          <div className="text-sm flex justify-between mt-2">
            <div className="text-mutedGray">Taxes</div>
            <div>₹{taxes}</div>
          </div>
          <hr className="my-4 border-borderGray" />
          <div className="mt-4 font-bold text-lg flex justify-between">
            <div>Total</div>
            <div>₹{Math.round(experience.price * qty) + taxes}</div>
          </div>

          <button
            onClick={payAndConfirm}
            disabled={loading}
            className="mt-4 w-full bg-brandYellow text-darkText py-3 rounded-md font-semibold hover:bg-brandYellow-hover transition-colors disabled:bg-disabledBg disabled:text-disabledText"
          >
            {loading ? "Processing..." : "Pay and Confirm"}
          </button>
        </div>
      </div>
    </div>
  );
}
