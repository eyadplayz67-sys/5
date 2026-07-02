import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, MessageSquare, Send, CheckCircle2 } from 'lucide-react';

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!name.trim()) newErrors.name = 'Please enter your name.';
    if (!email.trim()) {
      newErrors.email = 'Please enter your email.';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) newErrors.email = 'Please enter a valid email.';
    }
    if (!subject.trim()) newErrors.subject = 'Please specify a subject.';
    if (!message.trim()) newErrors.message = 'Please type your message.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    // Simulate sending
    setSubmitted(true);
    setName('');
    setEmail('');
    setSubject('');
    setMessage('');
    setTimeout(() => setSubmitted(false), 6000);
  };

  return (
    <div className="w-full bg-white px-4 sm:px-6 lg:px-8 py-10 text-left">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header Title */}
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <span className="text-xs font-bold text-[#F59E0B] uppercase tracking-wider">Get In Touch</span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1F2937] tracking-tight">Contact Egypt Pets</h1>
          <p className="text-xs sm:text-sm text-gray-500 font-normal leading-relaxed">
            Have questions about a smart gadget, warranty, or shipping? Feel free to contact our local support team in Cairo.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Contact Info (5 cols) */}
          <div className="lg:col-span-5 bg-[#F8F9FA] border border-[#E5E7EB] rounded-2xl p-6 sm:p-8 space-y-6 flex flex-col justify-between">
            
            <div className="space-y-6 text-left">
              <h2 className="font-extrabold text-lg text-[#1F2937]">Contact Information</h2>
              
              <div className="space-y-4">
                
                {/* Phone */}
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 text-[#F59E0B] flex items-center justify-center shrink-0">
                    <Phone size={18} />
                  </div>
                  <div>
                    <h3 className="font-bold text-xs text-gray-400 uppercase tracking-wider">Phone Support</h3>
                    <a href="tel:+201001234567" className="font-bold text-sm text-[#1F2937] hover:text-[#F59E0B] transition-colors">
                      +20 100 123 4567
                    </a>
                    <p className="text-[10px] text-gray-500">Available Mon-Sat, 10:00 AM - 8:00 PM</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center shrink-0">
                    <Mail size={18} />
                  </div>
                  <div>
                    <h3 className="font-bold text-xs text-gray-400 uppercase tracking-wider">Email Address</h3>
                    <a href="mailto:support@egyptpets.com" className="font-bold text-sm text-[#1F2937] hover:text-[#F59E0B] transition-colors">
                      support@egyptpets.com
                    </a>
                    <p className="text-[10px] text-gray-500">Expect a reply within 24 business hours</p>
                  </div>
                </div>

                {/* Office address */}
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <h3 className="font-bold text-xs text-gray-400 uppercase tracking-wider">Cairo Headquarters</h3>
                    <p className="font-bold text-sm text-[#1F2937]">
                      45 El-Merghany St, Heliopolis
                    </p>
                    <p className="text-[10px] text-gray-500">Cairo, Egypt (Close to Baron Palace)</p>
                  </div>
                </div>

              </div>
            </div>

            {/* Visual reassurance footer */}
            <div className="border-t border-gray-200 pt-6 mt-6 flex items-center gap-3">
              <span className="text-2xl">⚡</span>
              <p className="text-[10px] text-gray-400 font-semibold leading-relaxed">
                Our support experts are fully trained to walk you through the setup and WiFi configuration of smart automatic pet feeders and cameras.
              </p>
            </div>

          </div>

          {/* Right Contact Form (7 cols) */}
          <div className="lg:col-span-7 border border-[#E5E7EB] bg-white rounded-2xl p-6 sm:p-8 text-left">
            
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-4">
                <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center text-[#10B981] mx-auto">
                  <CheckCircle2 size={36} />
                </div>
                <div className="space-y-2">
                  <h3 className="font-extrabold text-lg text-[#1F2937]">Message Sent Successfully!</h3>
                  <p className="text-xs text-gray-500 max-w-sm mx-auto leading-relaxed">
                    Thank you for reaching out to Egypt Pets. We have received your inquiry and our local team in Cairo will review and respond within 24 hours.
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h2 className="font-extrabold text-base text-[#1F2937] flex items-center gap-2">
                  <MessageSquare size={18} className="text-[#F59E0B]" />
                  Send us a Message
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Your Name *</label>
                    <input
                      type="text"
                      placeholder="Ahmed Aly"
                      value={name}
                      onChange={(e) => { setName(e.target.value); if (errors.name) setErrors({ ...errors, name: '' }); }}
                      className={`w-full text-xs border rounded-xl px-3 py-3 outline-none transition-colors ${
                        errors.name ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-[#F59E0B]'
                      }`}
                    />
                    {errors.name && <p className="text-red-500 text-[9px] font-semibold">{errors.name}</p>}
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Your Email *</label>
                    <input
                      type="email"
                      placeholder="ahmed@gmail.com"
                      value={email}
                      onChange={(e) => { setEmail(e.target.value); if (errors.email) setErrors({ ...errors, email: '' }); }}
                      className={`w-full text-xs border rounded-xl px-3 py-3 outline-none transition-colors ${
                        errors.email ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-[#F59E0B]'
                      }`}
                    />
                    {errors.email && <p className="text-red-500 text-[9px] font-semibold">{errors.email}</p>}
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Subject *</label>
                  <input
                    type="text"
                    placeholder="e.g. WiFi configuration or Return inquiry"
                    value={subject}
                    onChange={(e) => { setSubject(e.target.value); if (errors.subject) setErrors({ ...errors, subject: '' }); }}
                    className={`w-full text-xs border rounded-xl px-3 py-3 outline-none transition-colors ${
                      errors.subject ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-[#F59E0B]'
                    }`}
                  />
                  {errors.subject && <p className="text-red-500 text-[9px] font-semibold">{errors.subject}</p>}
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Your Message *</label>
                  <textarea
                    rows={4}
                    placeholder="Please type your message in detail..."
                    value={message}
                    onChange={(e) => { setMessage(e.target.value); if (errors.message) setErrors({ ...errors, message: '' }); }}
                    className={`w-full text-xs border rounded-xl px-3 py-3 outline-none transition-colors ${
                      errors.message ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-[#F59E0B]'
                    }`}
                  />
                  {errors.message && <p className="text-red-500 text-[9px] font-semibold">{errors.message}</p>}
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto bg-[#F59E0B] hover:bg-amber-600 text-white font-bold py-3.5 px-6 rounded-xl text-xs transition-colors shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send size={13} />
                  Send Message
                </button>
              </form>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}
