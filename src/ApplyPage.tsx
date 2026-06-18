import { useState } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle, Loader2, ChevronDown } from 'lucide-react';
import { submitApplication, type ApplicationInsert } from './lib/submitApplication';

type Step = 1 | 2 | 3;

const AGE_RANGES = ['Under 18', '18–25', '26–35', '36–45', '46–55', '56 and above'];
const BUSINESS_TYPES = [
  'Food & Agriculture',
  'Fashion & Beauty',
  'Retail & Trading',
  'Services',
  'Other',
];
const YEARS_IN_BUSINESS = [
  'Not yet started',
  'Less than 1 year',
  '1–2 years',
  '3–5 years',
  'More than 5 years',
];
const MONTHLY_REVENUES = [
  'No income yet',
  'Below ₦50,000',
  '₦50,000 – ₦150,000',
  '₦150,000 – ₦500,000',
  'Above ₦500,000',
];
const EQUIPMENT_OPTIONS = [
  'Sewing Machine',
  'Grinding Machine',
  'Hair Dryer',
  'Solar Freezer / Fridge',
  'POS Machine',
  'Food Processing Equipment',
  'Other',
  'None',
];
const LGAS = [
  'Agege', 'Ajeromi-Ifelodun', 'Alimosho', 'Amuwo-Odofin', 'Apapa',
  'Badagry', 'Epe', 'Eti-Osa', 'Ibeju-Lekki', 'Ifako-Ijaiye',
  'Ikeja', 'Ikorodu', 'Kosofe', 'Lagos Island', 'Lagos Mainland',
  'Mushin', 'Ojo', 'Oshodi-Isolo', 'Shomolu', 'Surulere',
];

const emptyForm: ApplicationInsert = {
  first_name: '',
  last_name: '',
  phone_number: '',
  address: '',
  local_government: '',
  age_range: '',
  business_type: '',
  what_you_sell: '',
  years_in_business: '',
  monthly_revenue: '',
  has_existing_business: false,
  challenges: '',
  programme_benefit: '',
  funding_needs: '',
  equipment_needs: '',
};

function SelectField({
  label,
  name,
  value,
  options,
  onChange,
  required,
  placeholder,
}: {
  label: string;
  name: string;
  value: string;
  options: string[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-semibold text-gray-700">
        {label} {required && <span className="text-wef-pink">*</span>}
      </label>
      <div className="relative">
        <select
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          className="w-full appearance-none bg-white border border-gray-200 rounded-xl px-4 py-3 pr-10 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-wef-pink/30 focus:border-wef-pink transition-colors"
        >
          <option value="">{placeholder ?? `Select ${label}`}</option>
          {options.map((o) => (
            <option key={o} value={o}>{o}</option>
          ))}
        </select>
        <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
      </div>
    </div>
  );
}

function TextField({
  label,
  name,
  value,
  onChange,
  required,
  placeholder,
  type = 'text',
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  placeholder?: string;
  type?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-semibold text-gray-700">
        {label} {required && <span className="text-wef-pink">*</span>}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-wef-pink/30 focus:border-wef-pink transition-colors"
      />
    </div>
  );
}

function TextArea({
  label,
  name,
  value,
  onChange,
  required,
  placeholder,
  rows = 3,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  required?: boolean;
  placeholder?: string;
  rows?: number;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-semibold text-gray-700">
        {label} {required && <span className="text-wef-pink">*</span>}
      </label>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        rows={rows}
        className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-wef-pink/30 focus:border-wef-pink transition-colors resize-none"
      />
    </div>
  );
}

const STEPS = [
  { label: 'Personal Info', short: '1' },
  { label: 'Your Business', short: '2' },
  { label: 'Programme Fit', short: '3' },
];

export default function ApplyPage({ onBack }: { onBack: () => void }) {
  const [step, setStep] = useState<Step>(1);
  const [form, setForm] = useState<ApplicationInsert>(emptyForm);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleText = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleBool = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value === 'true' }));
  };

  const canProceedStep1 =
    form.first_name.trim() &&
    form.last_name.trim() &&
    form.phone_number.trim() &&
    form.address.trim() &&
    form.age_range;

  const canProceedStep2 =
    form.what_you_sell.trim() &&
    form.business_type &&
    form.years_in_business &&
    form.monthly_revenue;

  const canSubmit = form.programme_benefit.trim() && form.challenges.trim();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    setSubmitting(true);
    setError(null);

    try {
      await submitApplication(form);
      setSubmitted(true);
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-section-gradient flex items-center justify-center px-4">
        <div className="bg-white rounded-3xl border border-pink-100 shadow-xl p-10 sm:p-14 max-w-lg w-full text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-wef-pink to-wef-purple rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-pink-200">
            <CheckCircle size={36} className="text-white" />
          </div>
          <h2 className="font-display text-3xl font-bold text-wef-charcoal mb-3">
            Application Received!
          </h2>
          <p className="text-gray-600 text-base leading-relaxed mb-8">
            Thank you, <strong>{form.first_name}</strong>! Your application has been submitted
            successfully. Our team will review it and reach out to you on{' '}
            <strong>{form.phone_number}</strong> shortly.
          </p>
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-wef-pink to-wef-purple text-white font-semibold px-8 py-3 rounded-full hover:shadow-lg hover:shadow-pink-200 transition-all duration-300"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-section-gradient pt-0">
      {/* Header bar */}
      <div className="bg-white border-b border-pink-100 shadow-sm sticky top-0 z-40">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 h-16 flex items-center gap-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-wef-pink transition-colors"
          >
            <ArrowLeft size={16} />
            Back
          </button>
          <div className="flex-1 flex justify-center">
            <img
              src="/images/WhatsApp_Image_2026-06-18_at_11.52.46_AM.jpeg"
              alt="WEF"
              className="h-9 w-auto object-contain"
            />
          </div>
          <div className="w-16" />
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10">
        {/* Title */}
        <div className="text-center mb-8">
          <span className="text-wef-pink text-xs font-bold uppercase tracking-widest">
            Applications Open — June 2026
          </span>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-wef-charcoal mt-2 leading-tight">
            Apply to the WEF Programme
          </h1>
          <p className="text-gray-500 mt-3 text-sm max-w-md mx-auto">
            Complete all three sections below. This takes about 5 minutes.
          </p>
        </div>

        {/* Step indicator */}
        <div className="flex items-center justify-center gap-0 mb-10">
          {STEPS.map((s, i) => {
            const num = i + 1;
            const active = step === num;
            const done = step > num;
            return (
              <div key={s.label} className="flex items-center">
                <div className="flex flex-col items-center gap-1">
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all duration-300 ${
                      done
                        ? 'bg-gradient-to-br from-wef-pink to-wef-purple border-transparent text-white'
                        : active
                        ? 'bg-white border-wef-pink text-wef-pink'
                        : 'bg-white border-gray-200 text-gray-400'
                    }`}
                  >
                    {done ? <CheckCircle size={16} className="text-white" /> : num}
                  </div>
                  <span
                    className={`text-xs font-medium hidden sm:block ${
                      active ? 'text-wef-pink' : done ? 'text-wef-purple' : 'text-gray-400'
                    }`}
                  >
                    {s.label}
                  </span>
                </div>
                {i < STEPS.length - 1 && (
                  <div
                    className={`w-16 sm:w-24 h-0.5 mx-2 mb-4 transition-colors duration-300 ${
                      step > i + 1 ? 'bg-gradient-to-r from-wef-pink to-wef-purple' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* Form card */}
        <form onSubmit={handleSubmit}>
          <div className="bg-white rounded-2xl border border-pink-100 shadow-lg p-6 sm:p-8">

            {/* ── Step 1: Personal Info ── */}
            {step === 1 && (
              <div className="space-y-5">
                <div>
                  <h2 className="font-display text-xl font-bold text-wef-charcoal">Personal Information</h2>
                  <p className="text-gray-400 text-sm mt-1">Tell us about yourself.</p>
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <TextField
                    label="First Name"
                    name="first_name"
                    value={form.first_name}
                    onChange={handleText}
                    required
                    placeholder="Ada"
                  />
                  <TextField
                    label="Last Name"
                    name="last_name"
                    value={form.last_name}
                    onChange={handleText}
                    required
                    placeholder="Okafor"
                  />
                </div>
                <TextField
                  label="Phone Number"
                  name="phone_number"
                  value={form.phone_number}
                  onChange={handleText}
                  required
                  placeholder="080XXXXXXXX"
                  type="tel"
                />
                <TextField
                  label="Home Address"
                  name="address"
                  value={form.address}
                  onChange={handleText}
                  required
                  placeholder="Street, area, Lagos"
                />
                <SelectField
                  label="Local Government Area (LGA)"
                  name="local_government"
                  value={form.local_government}
                  options={LGAS}
                  onChange={handleSelect}
                  placeholder="Select your LGA"
                />
                <SelectField
                  label="Age Range"
                  name="age_range"
                  value={form.age_range}
                  options={AGE_RANGES}
                  onChange={handleSelect}
                  required
                />
              </div>
            )}

            {/* ── Step 2: Business Info ── */}
            {step === 2 && (
              <div className="space-y-5">
                <div>
                  <h2 className="font-display text-xl font-bold text-wef-charcoal">Your Business</h2>
                  <p className="text-gray-400 text-sm mt-1">Help us understand what you do.</p>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-gray-700">
                    Do you currently have a business? <span className="text-wef-pink">*</span>
                  </label>
                  <div className="flex gap-6 mt-1">
                    {[{ label: 'Yes', val: 'true' }, { label: 'No', val: 'false' }].map((opt) => (
                      <label key={opt.val} className="flex items-center gap-2 cursor-pointer text-sm text-gray-700">
                        <input
                          type="radio"
                          name="has_existing_business"
                          value={opt.val}
                          checked={form.has_existing_business === (opt.val === 'true')}
                          onChange={handleBool}
                          className="accent-wef-pink w-4 h-4"
                        />
                        {opt.label}
                      </label>
                    ))}
                  </div>
                </div>

                <SelectField
                  label="Business Category"
                  name="business_type"
                  value={form.business_type}
                  options={BUSINESS_TYPES}
                  onChange={handleSelect}
                  required
                  placeholder="Select a category"
                />

                <TextArea
                  label="What do you sell or offer?"
                  name="what_you_sell"
                  value={form.what_you_sell}
                  onChange={handleText}
                  required
                  placeholder="e.g. I sell jollof rice and catering services for events"
                  rows={2}
                />

                <SelectField
                  label="How long have you been in business?"
                  name="years_in_business"
                  value={form.years_in_business}
                  options={YEARS_IN_BUSINESS}
                  onChange={handleSelect}
                  required
                  placeholder="Select duration"
                />

                <SelectField
                  label="Approximate monthly income from your business"
                  name="monthly_revenue"
                  value={form.monthly_revenue}
                  options={MONTHLY_REVENUES}
                  onChange={handleSelect}
                  required
                  placeholder="Select a range"
                />

                <SelectField
                  label="Equipment you need most (if any)"
                  name="equipment_needs"
                  value={form.equipment_needs}
                  options={EQUIPMENT_OPTIONS}
                  onChange={handleSelect}
                  placeholder="Select an option"
                />
              </div>
            )}

            {/* ── Step 3: Programme Fit ── */}
            {step === 3 && (
              <div className="space-y-5">
                <div>
                  <h2 className="font-display text-xl font-bold text-wef-charcoal">Programme Fit</h2>
                  <p className="text-gray-400 text-sm mt-1">Share a bit more so we can support you best.</p>
                </div>

                <TextArea
                  label="What are your biggest business challenges right now?"
                  name="challenges"
                  value={form.challenges}
                  onChange={handleText}
                  required
                  placeholder="e.g. I struggle with pricing my products and finding customers outside my neighbourhood."
                  rows={3}
                />

                <TextArea
                  label="How do you expect this programme to benefit you?"
                  name="programme_benefit"
                  value={form.programme_benefit}
                  onChange={handleText}
                  required
                  placeholder="e.g. I want to learn how to manage my money better, grow my customer base, and access funding to buy equipment."
                  rows={4}
                />

                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-gray-700">
                    Do you need financial support / funding?
                  </label>
                  <div className="flex flex-wrap gap-4 mt-1">
                    {[
                      { label: 'Yes — I need a grant', val: 'Grant' },
                      { label: 'Yes — I need a loan', val: 'Loan' },
                      { label: 'Not sure yet', val: 'Unsure' },
                      { label: 'No', val: 'No' },
                    ].map((opt) => (
                      <label key={opt.val} className="flex items-center gap-2 cursor-pointer text-sm text-gray-700">
                        <input
                          type="radio"
                          name="funding_needs"
                          value={opt.val}
                          checked={form.funding_needs === opt.val}
                          onChange={handleText as unknown as React.ChangeEventHandler<HTMLInputElement>}
                          className="accent-wef-pink w-4 h-4"
                        />
                        {opt.label}
                      </label>
                    ))}
                  </div>
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3">
                    {error}
                  </div>
                )}
              </div>
            )}

            {/* Navigation buttons */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={() => setStep((s) => (s - 1) as Step)}
                  className="flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-wef-pink transition-colors"
                >
                  <ArrowLeft size={16} />
                  Previous
                </button>
              ) : (
                <div />
              )}

              {step < 3 ? (
                <button
                  type="button"
                  onClick={() => setStep((s) => (s + 1) as Step)}
                  disabled={step === 1 ? !canProceedStep1 : !canProceedStep2}
                  className="group flex items-center gap-2 bg-gradient-to-r from-wef-pink to-wef-purple text-white font-semibold text-sm px-6 py-3 rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-pink-200 hover:-translate-y-0.5 transition-all duration-200"
                >
                  Next
                  <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={!canSubmit || submitting}
                  className="group flex items-center gap-2 bg-gradient-to-r from-wef-pink to-wef-purple text-white font-semibold text-sm px-8 py-3 rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-pink-200 hover:-translate-y-0.5 transition-all duration-200"
                >
                  {submitting ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Submitting…
                    </>
                  ) : (
                    <>
                      Submit Application
                      <CheckCircle size={16} />
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </form>

        <p className="text-center text-gray-400 text-xs mt-6">
          Your information is kept private and will only be used for programme selection purposes.
        </p>
      </div>
    </div>
  );
}
