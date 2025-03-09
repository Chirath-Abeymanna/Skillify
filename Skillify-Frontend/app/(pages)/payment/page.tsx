'use client';

import { useState } from 'react';
import * as z from 'zod';

const paymentSchema = z.object({
  cardNumber: z.string()
    .min(16, 'Card number must be 16 digits')
    .max(19, 'Card number is too long')
    .regex(/^\d+$/, 'Card number must contain only digits'),
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

  function validateForm(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const data = {
      cardNumber: formData.get('cardNumber'),
      expiryDate: formData.get('expiryDate'),
      cvv: formData.get('cvv'),
      orderNumber: orderNumber,
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
    value = value.replace(/(\d{4})/g, '$1 ').trim(); 
  
    setCardNumber(value); // Update the card number state
  }
  
  function handleExpiryDateChange(event: React.ChangeEvent<HTMLInputElement>) {
    let value = event.target.value.replace(/\D/g, ''); // Remove non-digit characters
    if (value.length > 2) {
      value = `${value.slice(0, 2)}/${value.slice(2, 4)}`; // Add '/' after the second digit
    }
    if (value.length > 5) {
      value = value.slice(0, 5); // Limit the length to "MM/YY"
    }
    event.target.value = value;
  }

  function handleCvvChange(event: React.ChangeEvent<HTMLInputElement>) {
    let value = event.target.value.replace(/\D/g, ''); // Remove non-digit characters
    if (value.length > 3) {
      value = value.slice(0, 3); // Limit to 3 digits
    }
    event.target.value = value;
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
            <div className="flex justify-start items-center">
              <p className="font-medium mr-4"><strong>Order Number:</strong></p>
              <p className="text-gray-600">{orderNumber}</p>
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
          <div className="bg-gray-100 p-4 rounded-lg mb-4 flex justify-between">
            <div className="w-2/3">
              <p className="text-sm text-gray-500">Card number</p>
              {/* Dynamically update the card number display */}
              <p className="text-lg font-medium">{cardNumber || 'XXXX XXXX XXXX XXXX'}</p>
              <p className="text-sm text-gray-500">EXP Date: MM/YY</p>
            </div>
            <img src="/visa-card.png" alt="Visa" className="w-20" />
          </div>

          <form onSubmit={validateForm} className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Card Number</label>
              <input
                type="text"
                name="cardNumber"
                placeholder="1234 5678 9012 3456"
                className="w-full p-2 border rounded-lg focus:outline-none focus:border-[#0036E8]"
                maxLength={20} // Allow space for the 3 spaces
                onChange={handleCardNumberChange} // Format the card number input
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
                  onChange={handleExpiryDateChange} // Format the expiry date input
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
                  maxLength={3} // Limit to 3 digits
                  onChange={handleCvvChange} // Format the CVV input
                />
                {errors.cvv && <p className="text-red-500 text-sm">{errors.cvv._errors[0]}</p>}
              </div>
            </div>
            <div className="flex items-center mt-4">
              <input type="checkbox" id="terms" className="mr-2" />
              <label htmlFor="terms" className="text-sm">I have read and accept the <a href="#" className="text-[#1949E9]">terms and conditions</a></label>
            </div>
            <div className="flex justify-between mt-6">
              <button type="button" className="px-6 py-2 border border-red-500 text-red-500 rounded-full">Cancel</button>
              <button type="submit" className="px-6 py-2 border border-[#1949E9] bg-blue-500 text-[#1949E9] rounded-full">Pay</button>
              <button type="submit" className="px-6 py-2 border border-[#1949E9] bg-[#002DF4] text-white rounded-full">Pay and Save</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
