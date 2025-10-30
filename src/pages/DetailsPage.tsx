import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosClient from '../api/axiosClient';
import { Experience, Slot } from '../types';
import BookingSummary from '../components/BookingSummary';
import { ArrowLeft } from 'lucide-react';

// --- Constants ---
const TAX_RATE = 0.06; // 6% tax

// --- Helper Functions ---
const formatDateButton = (dateStr: string) => {
  // Adds 1 day to the date to correct for UTC conversion issues
  const dateObj = new Date(dateStr);
  // dateObj.setUTCDate(dateObj.getUTCDate() + 1);
  const month = dateObj.toLocaleString('en-US', { month: 'short', timeZone: 'UTC' });
  const day = dateObj.getUTCDate();
  return `${month} ${day}`;
};

const formatTimeButton = (dateStr: string) => {
  return new Date(dateStr).toLocaleTimeString([], {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
};

// --- Component ---
export default function DetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [experience, setExperience] = useState<Experience | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
  const [qty, setQty] = useState<number>(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    axiosClient
      .get(`/experiences/${id}`)
      .then((res) => {
        setExperience(res.data);
      })
      .catch((err) => {
        console.error('Failed to fetch experience:', err);
        // Optionally navigate to a not-found page
        // navigate('/404');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-mediumGray mt-10">Loading...</div>
      </div>
    );
  }

  if (!experience) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-mediumGray mt-10">Experience not found.</div>
      </div>
    );
  }

  const now = new Date();
  const todayISO = now.toISOString().slice(0, 10);

  // Get first 7 unique, upcoming dates
  const dates = Array.from(
    new Set(
      (experience.slots || [])
        .map((s) => s.startTime.slice(0, 10))
        .filter((d) => d >= todayISO)
    )
  ).slice(0, 7);

  const timesForDate = (date: string) =>
    (experience.slots || []).filter((s) => s.startTime.slice(0, 10) === date);

  const onConfirm = () => {
    if (!selectedSlot || !selectedDate) return;
    navigate('/checkout', {
      state: { experience, slot: selectedSlot, qty },
    });
  };

  const isValidSlot =
    selectedSlot &&
    new Date(selectedSlot.startTime) > now &&
    selectedSlot.totalCapacity - selectedSlot.bookedCapacity > 0;

  const isConfirmDisabled = !selectedDate || !isValidSlot;

  return (
    <div className="max-w-6xl mx-auto px-6 py-6">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 mb-6 text-mediumGray hover:text-darkText transition" // Refactored
      >
        <ArrowLeft size={20} />
        <span className="font-medium">Details</span>
      </button>

      {/* IMAGE + BOOKING SUMMARY */}
      <div className="flex flex-col lg:flex-row lg:items-start lg:gap-12">
        <img
          src={experience.imageUrl}
          alt={experience.title}
          className="w-full lg:w-[60%] rounded-xl h-[320px] object-cover"
        />

        <div className="lg:w-[35%] mt-6 lg:mt-0 self-start">
          <BookingSummary
            price={Math.round(experience.price)}
            qty={qty}
            onQtyChange={setQty}
            taxes={Math.round(experience.price * TAX_RATE)} // Use constant
            disabled={isConfirmDisabled}
            onConfirm={onConfirm}
          />
        </div>
      </div>

      {/* TITLE + DESCRIPTION */}
      <h2 className="text-2xl font-semibold mt-8 text-darkText"> {/* Refactored */}
        {experience.title}
      </h2>
      <p className="mt-3 leading-relaxed max-w-2xl text-accentGray"> {/* Refactored */}
        {experience.description ||
          'Curated small-group experience. Certified guide. Safety first with gear included.'}
      </p>

      {/* DATE SELECTOR */}
      <div className="mt-8">
        <div className="mb-3 font-semibold text-mediumGray">Choose date</div> {/* Refactored */}
        <div className="flex flex-wrap gap-2">
          {dates.map((d) => (
            <button
              key={d}
              onClick={() => {
                setSelectedDate(d);
                setSelectedSlot(null);
              }}
              className={`px-3 py-2 rounded-md text-sm border transition-all ${
                selectedDate === d
                  ? 'bg-brandYellow border-brandYellow text-darkText' // Refactored
                  : 'bg-white border-lightBorder text-lightText hover:border-brandYellow' // Refactored
              }`}
            >
              {formatDateButton(d)}
            </button>
          ))}
        </div>
      </div>

      {/* TIME SELECTOR */}
      <div className="mt-8">
        <div className="mb-3 font-semibold text-mediumGray">Choose time</div> {/* Refactored */}
        <div className="flex flex-wrap gap-3">
          {(selectedDate ? timesForDate(selectedDate) : []).map((t) => {
            const left = t.totalCapacity - t.bookedCapacity;
            const soldOut = left <= 0;
            const slotTime = new Date(t.startTime);
            const isSameDay = slotTime.toDateString() === now.toDateString();
            const isPast = isSameDay && slotTime < now;
            const disabled = soldOut || isPast;
            const selected = selectedSlot?.id === t.id;

            return (
              <button
                key={t.id}
                onClick={() => !disabled && setSelectedSlot(t)}
                disabled={disabled}
                className={`px-4 py-2 rounded-md text-sm border transition-all flex items-center justify-center ${
                  disabled
                    ? 'bg-lightGray text-disabledText border-lightBorder cursor-not-allowed' // Refactored
                    : selected
                    ? 'bg-brandYellow border-brandYellow text-darkText' // Refactored
                    : 'bg-white border-lightBorder text-lightText hover:border-brandYellow' // Refactored
                }`}
              >
                <span
                  className={`font-medium ${
                    selected ? 'text-darkText' : 'text-lightText' // Refactored
                  }`}
                >
                  {formatTimeButton(t.startTime)}
                </span>

                {soldOut ? (
                  <span className="ml-2 text-xs font-medium text-alertRed"> {/* Refactored */}
                    Sold out
                  </span>
                ) : (
                  <span className="ml-2 text-xs font-medium text-alertRed"> {/* Refactored */}
                    {left} left
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <p className="text-xs mt-2 text-lightText"> {/* Refactored */}
          All times are in IST (GMT +5:30)
        </p>
      </div>

      {/* ABOUT SECTION */}
      <div className="mt-10">
        <h3 className="font-semibold text-mediumGray">About</h3> {/* Refactored */}
        <div className="mt-3 text-sm leading-relaxed text-lightText"> {/* Refactored */}
          Scenic routes, trained guides, and safety briefing. Minimum age 10.
        </div>
      </div>
    </div>
  );
}