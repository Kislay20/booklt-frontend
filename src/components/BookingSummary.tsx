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
    <div className="bg-lightGray p-4 sm:p-6 rounded-2xl shadow-card w-full max-w-md mx-auto">
      <div className="flex justify-between text-darkText text-sm sm:text-base">
        <span className="text-mutedGray">Starts at</span>
        <span className="text-darkText font-medium text-lg sm:text-xl">₹{price}</span>
      </div>

      {/* Quantity */}
      <div className="flex justify-between items-center text-darkText text-sm sm:text-base mt-4">
        <span className="text-mutedGray">Quantity</span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onQtyChange(Math.max(1, qty - 1))}
            className="w-8 h-8 flex items-center justify-center border text-mediumGray border-borderGray bg-lightGray rounded-md hover:bg-white transition"
          >
            –
          </button>
          <span className="w-6 text-center">{qty}</span>
          <button
            onClick={() => onQtyChange(qty + 1)}
            className="w-8 h-8 flex items-center justify-center border text-mediumGray border-borderGray bg-lightGray rounded-md hover:bg-white transition"
          >
            +
          </button>
        </div>
      </div>

      {/* Subtotal & Taxes */}
      <div className="flex justify-between items-center text-darkText text-sm sm:text-base mt-4">
        <span className="text-mutedGray">Subtotal</span>
        <span className="text-darkText font-medium text-lg sm:text-xl">₹{subtotal}</span>
      </div>
      <div className="flex justify-between items-center text-darkText text-sm sm:text-base mt-4">
        <span className="text-mutedGray">Taxes</span>
        <span className="text-darkText font-medium text-lg sm:text-xl">₹{taxes}</span>
      </div>

      <hr className="my-4 border-borderGray" />

      {/* Total */}
      <div className="flex justify-between items-center text-lg sm:text-xl font-semibold text-darkText">
        <span>Total</span>
        <span>₹{total}</span>
      </div>

      {/* Confirm button */}
      <button
        disabled={disabled}
        onClick={!disabled ? onConfirm : undefined}
        className={`
          mt-5 w-full py-2.5 sm:py-3 rounded-xl font-medium transition-all
          ${
            disabled
              ? 'bg-disabledBg text-disabledText cursor-not-allowed'
              : 'bg-brandYellow text-darkText hover:opacity-90 cursor-pointer'
          }
        `}
      >
        Confirm
      </button>
    </div>
  );
}
