'use client';

import { useState } from 'react';

export default function PaymentFlow() {
  const [step, setStep] = useState(1);
  const [cardDetails, setCardDetails] = useState({ number: '', expiry: '', cvv: '', saveCard: false });
  const [pin, setPin] = useState(['', '', '', '']);

  const handleNext = () => {
    if (validateCardDetails()) {
      setStep(2);
    } else {
      alert('Please enter valid card details.');
    }
  };

  const handleBack = () => {
    setStep(1);
  };

  const validateCardDetails = () => {
    const cardNumberRegex = /^\d{4} \d{4} \d{4} \d{4}$/;
    const expiryRegex = /^(0[1-9]|1[0-2])\/(\d{2})$/;
    const cvvRegex = /^\d{3}$/;

    return (
      cardNumberRegex.test(cardDetails.number) &&
      expiryRegex.test(cardDetails.expiry) &&
      cvvRegex.test(cardDetails.cvv)
    );
  };

  const handleConfirm = () => {
    if (window.confirm('Payment Confirmed! Click OK to proceed.')) {
      window.location.href = '/consultation'; // Replace with the actual consultant page URL
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-[1000px]">
        {step === 1 ? (
          <CardPaymentForm
            cardDetails={cardDetails}
            setCardDetails={setCardDetails}
            onNext={handleNext}
          />
        ) : (
          <CardPinForm pin={pin} setPin={setPin} onConfirm={handleConfirm} onBack={handleBack} />
        )}
      </div>
    </div>
  );
}

interface CardDetails {
  number: string;
  expiry: string;
  cvv: string;
  saveCard: boolean;
}

function CardPaymentForm({
  cardDetails,
  setCardDetails,
  onNext,
}: {
  cardDetails: CardDetails;
  setCardDetails: React.Dispatch<React.SetStateAction<CardDetails>>;
  onNext: () => void;
}) {
  const formatCardNumber = (value: string) => {
    return value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim();
  };

  const formatExpiryDate = (value: string) => {
    const cleanedValue = value.replace(/\D/g, '');
    if (cleanedValue.length <= 2) {
      return cleanedValue;
    }
    return `${cleanedValue.slice(0, 2)}/${cleanedValue.slice(2, 4)}`;
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Payment</h2>
      <label className="block text-sm">Card Number</label>
      <input
        type="text"
        className="border p-3 w-full mb-3 rounded"
        value={cardDetails.number}
        onChange={(e) =>
          setCardDetails({ ...cardDetails, number: formatCardNumber(e.target.value) })
        }
        placeholder="1234 5678 9101 1121"
        maxLength={19}
      />
      <div className="flex gap-4">
        <div>
          <label className="block text-sm">Expiration Date</label>
          <input
            type="text"
            className="border p-3 w-full rounded"
            value={cardDetails.expiry}
            onChange={(e) => setCardDetails({ ...cardDetails, expiry: formatExpiryDate(e.target.value) })}
            placeholder="MM/YY"
            maxLength={5}
          />
        </div>
        <div>
          <label className="block text-sm">CVV</label>
          <input
            type="text"
            className="border p-3 w-full rounded"
            value={cardDetails.cvv}
            onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value.replace(/[^0-9]/g, '').slice(0, 3) })}
            placeholder="123"
            maxLength={3}
          />
        </div>
      </div>
      <div className="flex items-center mt-4">
        <input
          type="checkbox"
          checked={cardDetails.saveCard}
          onChange={() => setCardDetails({ ...cardDetails, saveCard: !cardDetails.saveCard })}
          className="mr-2"
        />
        <label className="text-sm">Save card details</label>
      </div>
      <button onClick={onNext} className="bg-[#002DF4] text-white p-3 w-full mt-5 rounded-lg">
        Confirm Card Details
      </button>
    </div>
  );
}

function CardPinForm({
  pin,
  setPin,
  onBack,
  onConfirm,
}: {
  pin: string[];
  setPin: React.Dispatch<React.SetStateAction<string[]>>;
  onBack: () => void;
  onConfirm: () => void;
}) {
  const handlePinChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newPin = [...pin];
    newPin[index] = e.target.value.replace(/[^0-9]/g, '').slice(0, 1);
    setPin(newPin);
  };

  const handleConfirm = () => {
    if (window.confirm('Payment Confirmed! Click OK to proceed.')) {
      window.location.href = '/consultation'; // Replace with the actual consultant page URL
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Payment</h2>
      <p className="text-sm mb-3">Enter your 4-digit card PIN</p>
      <div className="flex justify-between">
        {pin.map((digit, index) => (
          <input
            key={index}
            type="text"
            className="border p-3 w-14 text-center rounded-lg"
            maxLength={1}
            value={digit}
            onChange={(e) => handlePinChange(e, index)}
          />
        ))}
      </div>
      <div className="flex justify-between mt-6">
        <button onClick={onBack} className="bg-[#002DF4] text-white p-3 w-1/3 rounded-lg">
          Back
        </button>
        <button onClick={handleConfirm} className="bg-[#002DF4] text-white p-3 w-2/3 rounded-lg">
          Confirm Payment
        </button>
      </div>
    </div>
  );
}
