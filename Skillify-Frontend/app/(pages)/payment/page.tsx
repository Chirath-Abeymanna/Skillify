'use client';

import { useState } from 'react';
import * as z from 'zod';

const paymentSchema = z.object({
  cardNumber: z.string()
    .min(16, 'Card number must be 16 digits')
    .max(19, 'Card number is too long')
    .regex(/^\d{16,19}$/, 'Card number must contain only digits'),  // Adjusted regex to validate digits properly
  expiryDate: z.string()
    .regex(/^(0[1-9]|1[0-2])\/(\d{2})$/, 'Invalid expiry date (MM/YY)')
    .refine((val) => {
      const [month, year] = val.split('/');
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear() % 100;
      const currentMonth = currentDate.getMonth() + 1;
      if (parseInt(year) < currentYear || (parseInt(year) === currentYear && parseInt(month) < currentMonth)) {
        return false;
      }
      return true;
    }, 'Expiry date cannot be in the past'),
  cvv: z.string()
    .length(3, 'CVV must be 3 digits')
    .regex(/^\d{3}$/, 'CVV must contain only digits'),
  orderNumber: z.string()
    .min(12, 'Order number must be at least 12 characters')
    .regex(/^[A-Za-z0-9]+$/, 'Order number must contain only alphanumeric characters'),
});

export default function PaymentForm() {
  const [errors, setErrors] = useState<z.ZodFormattedError<{ cardNumber: string; expiryDate: string; cvv: string; orderNumber: string }>>({
    _errors: [],
    cardNumber: { _errors: [] },
    expiryDate: { _errors: [] },
    cvv: { _errors: [] },
    orderNumber: { _errors: [] }
  });
  const [amount, setAmount] = useState(5.00);
  const [orderNumber] = useState("ORD123456789");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");

  function validateForm(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = {
      cardNumber: cardNumber.replace(/\s/g, ''), // Remove spaces before validation
      expiryDate,
      cvv,
      orderNumber,
    };
    const result = paymentSchema.safeParse(data);
    if (!result.success) {
      setErrors(result.error.format());
      return;
    }
    setErrors({ _errors: [], cardNumber: { _errors: [] }, expiryDate: { _errors: [] }, cvv: { _errors: [] }, orderNumber: { _errors: [] } });
    console.log('Payment Data:', data);
  }

  function handleCardNumberChange(event: React.ChangeEvent<HTMLInputElement>) {
    let value = event.target.value.replace(/\D/g, ''); // Remove non-digit characters
    value = value.slice(0, 16); // Limit to 16 digits
    
    // Automatically format with spaces every 4 digits
    value = value.replace(/(\d{4})(?=\d)/g, '$1 '); // Add spaces after every 4 digits
    setCardNumber(value); // Update the card number state
  }
  
  function handleExpiryDateChange(event: React.ChangeEvent<HTMLInputElement>) {
    let value = event.target.value.replace(/\D/g, ''); // Remove non-digit characters
    if (value.length > 2) {
      value = value.slice(0, 2) + '/' + value.slice(2, 4); // Add '/' after the second digit
    }
    if (value.length > 5) {
      value = value.slice(0, 5); // Limit the length to "MM/YY"
    }
    setExpiryDate(value); // Update the expiry date state
  }

  function handleCvvChange(event: React.ChangeEvent<HTMLInputElement>) {
    let value = event.target.value.replace(/\D/g, ''); // Remove non-digit characters
    if (value.length > 3) {
      value = value.slice(0, 3); // Limit to 3 digits
    }
    setCvv(value); // Update the CVV state
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-5xl bg-white shadow-lg rounded-lg flex">
        
        {/* Left Section */}
        <div className="w-1/3 p-6 bg-blue-50 rounded-l-lg">
          <h2 className="text-2xl font-bold text-[#376CB1] mb-2">
            Skillify <br /> payment
          </h2>
          <div className="mt-6 space-y-6 text-sm">
            <div className="flex justify-start items-center">
              <p className="font-medium mr-4"><strong>Merchant name:</strong></p>
              <p className="text-gray-600">Skillify</p>
            </div>
            <div className="flex justify-start items-center">
              <p className="font-medium mr-4"><strong>E-commerce Website:</strong></p>
              <p className="text-gray-600">www.skillify.solutions</p>
            </div>
          </div>

          {/* Total Amount Section */}
          <div className="mt-6 bg-[#D8E4F9] p-4 rounded-lg">
            <div className="flex flex-col items-center">
              <p className="text-sm text-gray-600">TOTAL AMOUNT DUE</p>
              <p className="text-2xl font-semibold" style={{ color: '#283EB8' }}>${amount}</p>
            </div>
          </div>

          {/* Personal Data Encryption Text and Logos */}
          <div className="mt-24 flex flex-col items-center space-y-4"> 
            <div className="flex items-center space-x-2">
              <img src="/images/payment/secure.png" alt="Secure Logo" className="w-6 h-6" />
              <p className="text-xs text-[#28B873]">All your personal data is encrypted and secured</p>
            </div>
            <div className="flex items-center space-x-8"> 
              <img src="/images/payment/mastercard.png" alt="Mastercard" className="w-10" />
              <img src="/images/payment/visa.png" alt="Verified by Visa" className="w-16" />
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="w-2/3 p-8">
          <h2 className="text-xl font-semibold mb-4">Your card information</h2>

        {/* Visa Card Representation */}
          <div className="flex space-x-6">
            {/* Front of the Card */}
            <div className="relative w-full max-w-sm h-40 bg-gradient-to-r from-[#1A1F71] to-[#0097F4] rounded-lg p-6 text-white shadow-lg">
              <p className="absolute top-4 left-6 text-xs text-gray-200">Card number</p>
              <p className="text-lg font-semibold tracking-wider mt-3">
                {cardNumber ? cardNumber.replace(/\d{4}(?=\d)/g, '$& ') : 'XXXX XXXX XXXX XXXX'}
              </p>
              <div className="absolute bottom-4 left-6 flex justify-between w-full pr-6">
                <div>
                  <p className="text-xs text-gray-200">EXP Date</p>
                  <p className="text-sm">{expiryDate ? expiryDate.replace(/(\d{2})(\d{2})/, '$1/$2') : 'MM/YY'}</p>
                </div>
                <p className="text-xl font-bold absolute bottom-1 left-52">VISA</p>
              </div>
            </div>
            {/* Back of the Card */}
            <div className="relative w-full max-w-sm h-40 bg-gradient-to-r from-[#1A1F71] to-[#0097F4] rounded-lg p-6 text-white shadow-lg">
              <div className="absolute top-6 left-0 w-full h-8 bg-black"></div>
              <div className="absolute bottom-6 right-6 text-right">
                <p className="text-xs text-gray-200">CVV</p>
                <div className="bg-gray-300 text-black px-4 py-1 rounded text-sm tracking-widest inline-block">
                  {cvv || '*'}
                </div>
              </div>
              <p className="absolute bottom-4 left-6 text-xl font-bold">VISA</p>
            </div>
          </div>


          <form onSubmit={validateForm} className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Card Number</label>
              <input
                type="text"
                name="cardNumber"
                placeholder="1234 5678 9012 3456"
                className="w-full p-2 border rounded-lg focus:outline-none focus:border-[#0036E8]"
                maxLength={19} // Includes spaces
                value={cardNumber} // Controlled component
                onChange={handleCardNumberChange}
              />
              {errors.cardNumber && <p className="text-red-500 text-sm">{errors.cardNumber._errors[0]}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium">Expiry Date (MM/YY)</label>
                <input
                  type="text"
                  name="expiryDate"
                  placeholder="MM/YY"
                  className="w-full p-2 border rounded-lg focus:outline-none focus:border-[#0036E8]"
                  value={expiryDate} // Controlled component
                  onChange={handleExpiryDateChange}
                />
                {errors.expiryDate && <p className="text-red-500 text-sm">{errors.expiryDate._errors[0]}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium">CVV</label>
                <input
                  type="text"
                  name="cvv"
                  placeholder="123"
                  className="w-full p-2 border rounded-lg focus:outline-none focus:border-[#0036E8]"
                  maxLength={3}
                  value={cvv} // Controlled component
                  onChange={handleCvvChange}
                />
                {errors.cvv && <p className="text-red-500 text-sm">{errors.cvv._errors[0]}</p>}
              </div>
            </div>

            <div className="flex justify-between mt-6">
              <button type="button" className="px-8 py-2 border border-[#B82828] text-[#F40000] rounded-full">Cancel</button>
              <button type="submit" className="px-14 py-2 border border-[#1949E9]  text-[#1949E9] rounded-full">Pay</button>
              <button type="submit" className="px-6 py-2 border border-[#1949E9] bg-[#002DF4] text-white rounded-full">Pay and Save</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
