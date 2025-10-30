import React from 'react';

export default function BookingSummary({
  price,
  qty,
  onQtyChange,
  taxes = 0,
  disabled = false,
  onConfirm,
}: {
  price: number;
  qty: number;
  onQtyChange: (q: number) => void;
  taxes?: number;
  disabled?: boolean;
  onConfirm?: () => void;
}) {
  const subtotal = price * qty;
  const total = Math.round(subtotal + taxes);

  return (
    <div className="bg-lightGray p-6 rounded-2xl shadow-card"> {/* Refactored */}
      <div className="flex justify-between text-darkText text-sm"> {/* Refactored */}
        <span className="text-mutedGray">Starts at</span>
        <span className="text-darkText font-medium text-lg">₹{price}</span> {/* Refactored */}
      </div>

      {/* Quantity */}
      <div className="flex justify-between items-center text-darkText text-sm mt-4"> {/* Refactored */}
        <span className="text-mutedGray">Quantity</span> {/* Refactored */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => onQtyChange(Math.max(1, qty - 1))}
            className="w-7 h-7 flex items-center justify-center border text-mediumGray border-borderGray bg-lightGray" // Refactored
          >
            –
          </button>
          <span className="w-5 text-center">{qty}</span>
          <button
            onClick={() => onQtyChange(qty + 1)}
            className="w-7 h-7 flex items-center justify-center border text-mediumGray border-borderGray bg-lightGray" // Refactored
          >
            +
          </button>
        </div>
      </div>

      {/* Subtotal & Taxes */}
      <div className="flex justify-between items-center text-darkText text-sm mt-4"> {/* Refactored */}
        <span className="text-mutedGray">Subtotal</span> {/* Refactored */}
        <span className="text-darkText font-medium text-lg">₹{subtotal}</span> {/* Refactored */}
      </div>
      <div className="flex justify-between items-center text-darkText text-sm mt-4"> {/* Refactored */}
        <span className="text-mutedGray">Taxes</span> {/* Refactored */}
        <span className="text-darkText font-medium text-lg">₹{taxes}</span> {/* Refactored */}
      </div>

      <hr className="my-4 border-borderGray" /> {/* Refactored */}

      {/* Total */}
      <div className="flex justify-between items-center text-lg font-semibold text-darkText"> {/* Refactored */}
        <span>Total</span>
        <span>₹{total}</span>
      </div>

      {/* Confirm button */}
      <button
        disabled={disabled}
        onClick={!disabled ? onConfirm : undefined}
        className={`
          mt-5 w-full py-3 rounded-xl font-medium transition-all
          ${
            disabled
              ? 'bg-disabledBg text-disabledText cursor-not-allowed' // Refactored
              : 'bg-brandYellow text-darkText hover:opacity-90 cursor-pointer' // Refactored
          }
        `}
      >
        Confirm
      </button>
    </div>
  );
}