import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaClipboardList, FaDownload, FaShareAlt, FaHeart, FaShieldAlt } from 'react-icons/fa';
import api from '../utils/api';

const UPI_ID = 'pyaarfoundation@upi';
const QR_CODE_URL = `https://api.qrserver.com/v1/create-qr-code/?size=420x420&data=${encodeURIComponent(`upi://pay?pa=${UPI_ID}&pn=Pyaar%20Foundation&cu=INR`)}`;
const suggestedAmounts = [5000, 10000, 20000];

const Donation = () => {
    const [formData, setFormData] = useState({ name: '', mobile: '', amount: '', transactionRef: '', notes: '' });
    const [message, setMessage] = useState({ type: '', text: '' });
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        document.title = 'Donate by QR | Pyaar Foundation';
    }, []);

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(UPI_ID);
            setMessage({ type: 'success', text: 'UPI ID copied to clipboard. Thank you for supporting our rescue mission!' });
        } catch (error) {
            setMessage({ type: 'error', text: 'Unable to copy UPI ID. Please copy it manually.' });
        }
    };

    const handleShare = async () => {
        const shareText = `Support Pyaar Foundation with a donation via UPI: ${UPI_ID}. Visit ${window.location.href}`;
        if (navigator.share) {
            try {
                await navigator.share({ title: 'Support Pyaar Foundation', text: shareText, url: window.location.href });
                setMessage({ type: 'success', text: 'Share dialog opened successfully.' });
                return;
            } catch (error) {
                setMessage({ type: 'error', text: 'Unable to open share dialog.' });
            }
        }
        try {
            await navigator.clipboard.writeText(shareText);
            setMessage({ type: 'success', text: 'Donation link copied to clipboard.' });
        } catch (error) {
            setMessage({ type: 'error', text: 'Share is not supported in this browser.' });
        }
    };

    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = QR_CODE_URL;
        link.download = 'rise-for-tails-qr.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage({ type: '', text: '' });
        setIsSaving(true);

        try {
            await api.post('/api/donations', {
                name: formData.name,
                mobile: formData.mobile,
                amount: Number(formData.amount),
                paymentMethod: 'UPI QR',
                transactionRef: formData.transactionRef,
                notes: formData.notes,
            });

            setMessage({ type: 'success', text: 'Thank you! Your donation confirmation has been recorded.' });
            setFormData({ name: '', mobile: '', amount: '', transactionRef: '', notes: '' });
        } catch (error) {
            setMessage({ type: 'error', text: 'Unable to submit donation details. Please try again.' });
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <motion.div className="min-h-screen bg-[#071513] text-slate-100 px-4 py-24 sm:px-6 lg:px-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.2fr_0.8fr] items-start">
                <motion.section className="space-y-8 rounded-[2rem] border border-white/10 bg-white/[0.06] p-10 shadow-2xl shadow-teal-900/20 backdrop-blur" initial={{ x: -40, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.8 }}>
                    <div className="inline-flex items-center gap-3 rounded-full border border-teal-300/15 bg-teal-400/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.28em] text-teal-100">
                        <FaHeart /> QR Donation</div>
                    <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">Give with love, trust and a simple scan.</h1>
                    <p className="max-w-3xl text-slate-300 leading-8">Support rescued and rehabilitated animals through a premium UPI QR donation experience. Scan, pay, and confirm your transaction details instantly.</p>
                    <div className="grid gap-4 sm:grid-cols-3">
                        {[
                            { title: 'Gateway-free', text: 'Donations now use direct UPI QR transfer without checkout redirects.' },
                            { title: 'Transparent', text: 'Your transaction reference is recorded for acknowledgements.' },
                            { title: 'Impactful', text: 'Every donation helps heal, shelter, and rehome animals.' },
                        ].map(item => (
                            <div key={item.title} className="rounded-3xl border border-slate-800/80 bg-slate-950/90 p-6 shadow-lg shadow-slate-950/20">
                                <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                                <p className="mt-3 text-slate-400 leading-7">{item.text}</p>
                            </div>
                        ))}
                    </div>
                    <div className="rounded-[2rem] border border-white/10 bg-[#071513] p-8 shadow-inner shadow-slate-900/30">
                        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
                            <div className="rounded-[1.75rem] border border-slate-800/90 bg-slate-900 p-6 text-center">
                                <div className="relative overflow-hidden rounded-[1.5rem] border border-cyan-500/10 bg-slate-950 p-6">
                                    <img src={QR_CODE_URL} alt="Pyaar Foundation donation QR" className="mx-auto h-auto w-full max-w-[280px] rounded-3xl shadow-2xl shadow-cyan-500/15" />
                                </div>
                                <div className="mt-6 flex flex-col gap-3">
                                    <button type="button" onClick={handleCopy} className="inline-flex items-center justify-center gap-2 rounded-full bg-cyan-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400">
                                        <FaClipboardList /> Copy UPI ID
                                    </button>
                                    <button type="button" onClick={handleDownload} className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-700 bg-slate-900 px-5 py-3 text-sm text-slate-200 transition hover:border-cyan-500">
                                        <FaDownload /> Download QR
                                    </button>
                                </div>
                            </div>
                            <div className="rounded-[1.75rem] border border-slate-800/90 bg-slate-950 p-6">
                                <div className="rounded-3xl bg-slate-900/90 p-6 mb-6 text-center">
                                    <p className="text-sm uppercase tracking-[0.32em] text-cyan-300">UPI ID</p>
                                    <h2 className="mt-3 text-2xl font-semibold text-white break-words">{UPI_ID}</h2>
                                </div>
                                <div className="space-y-5 text-sm leading-relaxed text-slate-300">
                                    <div className="rounded-3xl border border-slate-800/90 bg-slate-950 p-5">
                                        <p className="font-semibold text-white">How it works</p>
                                        <ol className="mt-4 space-y-3 text-slate-400 list-decimal list-inside">
                                            <li>Scan the QR with your UPI app.</li>
                                            <li>Complete payment using the UPI ID.</li>
                                            <li>Enter your transaction reference below.</li>
                                        </ol>
                                    </div>
                                    <div className="rounded-3xl border border-slate-800/90 bg-slate-950 p-5">
                                        <p className="font-semibold text-white">Need support?</p>
                                        <p className="mt-3 text-slate-400">Email <a href="mailto:contact@risefortails.org" className="text-cyan-300 hover:text-cyan-200">contact@risefortails.org</a> or call +91 98765 43210.</p>
                                    </div>
                                </div>
                                <button type="button" onClick={handleShare} className="mt-6 inline-flex w-full items-center justify-center gap-3 rounded-full border border-cyan-500/20 bg-white/5 px-5 py-4 text-sm font-semibold text-white transition hover:bg-white/10">
                                    <FaShareAlt /> Share donation page
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.section>

                <motion.section className="rounded-[2rem] border border-teal-300/10 bg-slate-950/90 p-10 shadow-2xl shadow-teal-500/10" initial={{ x: 40, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.8, delay: 0.15 }}>
                    <div className="mb-8 flex items-center gap-4 text-slate-100">
                        <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-cyan-500/15 text-cyan-300">
                            <FaShieldAlt size={20} />
                        </div>
                        <div>
                            <p className="text-sm uppercase tracking-[0.32em] text-cyan-300">Donate securely</p>
                            <h2 className="text-3xl font-semibold text-white">Confirm Your Donation</h2>
                        </div>
                    </div>
                    <p className="text-slate-400 leading-7">After paying via UPI, please record the transaction reference and share it so we can issue a prompt acknowledgement and keep your support on record.</p>
                    <div className="mt-8 grid grid-cols-3 gap-3">
                        {suggestedAmounts.map(amount => (
                            <button
                                type="button"
                                key={amount}
                                onClick={() => setFormData({ ...formData, amount: String(amount) })}
                                className="rounded-2xl border border-teal-300/15 bg-white/5 px-3 py-3 text-sm font-bold text-teal-100 transition hover:bg-teal-400/10"
                            >
                                Rs. {amount.toLocaleString('en-IN')}
                            </button>
                        ))}
                    </div>
                    <form onSubmit={handleSubmit} className="mt-10 space-y-6">
                        <div className="grid gap-5 sm:grid-cols-2">
                            <label className="block">
                                <span className="text-sm font-semibold text-slate-200">Full Name</span>
                                <input name="name" value={formData.name} onChange={handleChange} placeholder="Your name" className="mt-3 w-full rounded-3xl border border-slate-800 bg-slate-950/90 px-4 py-4 text-white outline-none placeholder:text-slate-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20" required />
                            </label>
                            <label className="block">
                                <span className="text-sm font-semibold text-slate-200">Mobile Number</span>
                                <input name="mobile" value={formData.mobile} onChange={handleChange} placeholder="+91 98765 43210" className="mt-3 w-full rounded-3xl border border-slate-800 bg-slate-950/90 px-4 py-4 text-white outline-none placeholder:text-slate-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20" required />
                            </label>
                        </div>
                        <div className="grid gap-5 sm:grid-cols-2">
                            <label className="block">
                                <span className="text-sm font-semibold text-slate-200">Donation Amount (INR)</span>
                                <input name="amount" type="number" min="10" value={formData.amount} onChange={handleChange} placeholder="1000" className="mt-3 w-full rounded-3xl border border-slate-800 bg-slate-950/90 px-4 py-4 text-white outline-none placeholder:text-slate-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20" required />
                            </label>
                            <label className="block">
                                <span className="text-sm font-semibold text-slate-200">Transaction Reference</span>
                                <input name="transactionRef" value={formData.transactionRef} onChange={handleChange} placeholder="UPI txn ref" className="mt-3 w-full rounded-3xl border border-slate-800 bg-slate-950/90 px-4 py-4 text-white outline-none placeholder:text-slate-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20" required />
                            </label>
                        </div>
                        <label className="block">
                            <span className="text-sm font-semibold text-slate-200">Notes (optional)</span>
                            <textarea name="notes" value={formData.notes} onChange={handleChange} placeholder="Add any special note" className="mt-3 w-full rounded-3xl border border-slate-800 bg-slate-950/90 px-4 py-4 text-white outline-none placeholder:text-slate-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20" rows="3" />
                        </label>
                        <button type="submit" disabled={isSaving} className="w-full rounded-3xl bg-gradient-to-r from-cyan-500 to-emerald-500 px-6 py-4 text-lg font-semibold text-slate-950 transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60">
                            {isSaving ? 'Recording donation...' : 'Confirm Donation'}
                        </button>
                        {message.text && (
                            <div className={`rounded-3xl border px-6 py-4 text-center text-sm font-semibold ${message.type === 'success' ? 'border-emerald-400 bg-emerald-500/10 text-emerald-200' : 'border-rose-400 bg-rose-500/10 text-rose-200'}`}>
                                {message.text}
                            </div>
                        )}
                    </form>
                </motion.section>
            </div>
        </motion.div>
    );
};

export default Donation;
