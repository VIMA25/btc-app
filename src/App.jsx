import React, { useState, useEffect } from 'react';
import { Trophy, TrendingUp, Info, Wallet, DollarSign, ShieldAlert, Users, ArrowRight, Target, Share2, Copy, Check,
Twitter, MessageCircle, Star, Cpu } from 'lucide-react';

const App = () => {
const [btcAmount, setBtcAmount] = useState('');
const [usdPrice, setUsdPrice] = useState(null);
const [rankData, setRankData] = useState(null);
const [nextRankData, setNextRankData] = useState(null);
const [loadingPrice, setLoadingPrice] = useState(true);
const [copied, setCopied] = useState(false);

// Approximate distribution data (2025/2026 Projections)
const tiers = [
{
id: 'humpback',
min: 5000,
label: 'The Humpback',
percentile: 0.00001,
emoji: '🐋',
desc: 'Market Mover',
gradient: 'from-purple-500 via-fuchsia-500 to-indigo-500',
shadow: 'shadow-purple-500/40',
textColor: 'text-purple-200'
},
{
id: 'whale',
min: 1000,
label: 'Whale',
percentile: 0.004,
emoji: '🐳',
desc: 'Ultra-High Net Worth',
gradient: 'from-blue-600 via-cyan-400 to-teal-300',
shadow: 'shadow-blue-500/40',
textColor: 'text-blue-100'
},
{
id: 'shark',
min: 100,
label: 'Shark',
percentile: 0.03,
emoji: '🦈',
desc: 'Institutional Elite',
gradient: 'from-slate-300 via-slate-100 to-slate-300',
shadow: 'shadow-slate-400/30',
textColor: 'text-slate-200'
},
{
id: 'dolphin',
min: 10,
label: 'Dolphin',
percentile: 0.4,
emoji: '🐬',
desc: 'Wealthy Tier',
gradient: 'from-cyan-500 via-teal-400 to-emerald-400',
shadow: 'shadow-teal-400/30',
textColor: 'text-teal-100'
},
{
id: 'whole',
min: 1,
label: 'Whole Coiner',
percentile: 2.2,
emoji: '🥇',
desc: 'The 21 Million Club',
gradient: 'from-yellow-300 via-amber-400 to-yellow-600',
shadow: 'shadow-amber-500/40',
textColor: 'text-amber-100'
},
{
id: 'crab',
min: 0.1,
label: 'Crab',
percentile: 9.5,
emoji: '🦀',
desc: 'Accumulator',
gradient: 'from-orange-400 via-red-400 to-rose-500',
shadow: 'shadow-orange-500/30',
textColor: 'text-orange-100'
},
{
id: 'shrimp',
min: 0.01,
label: 'Shrimp',
percentile: 24.0,
emoji: '🦐',
desc: 'Network Backbone',
gradient: 'from-rose-400 via-pink-500 to-purple-500',
shadow: 'shadow-pink-500/30',
textColor: 'text-rose-100'
},
{
id: 'plankton',
min: 0,
label: 'Plankton',
percentile: 100,
emoji: '🦠',
desc: 'New Entrant',
gradient: 'from-gray-600 to-gray-800',
shadow: 'shadow-gray-500/20',
textColor: 'text-gray-400'
},
];

useEffect(() => {
const fetchPrice = async () => {
try {
const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd');
const data = await response.json();
setUsdPrice(data.bitcoin.usd);
} catch (e) {
console.warn('Price fetch failed, using fallback');
setUsdPrice(95000);
} finally {
setLoadingPrice(false);
}
};
fetchPrice();
}, []);

const calculateRank = (val) => {
const amount = parseFloat(val);
if (isNaN(amount) || amount < 0) { setRankData(null); setNextRankData(null); return; } const
    tierIndex=tiers.findIndex(t=> amount >= t.min);

    if (tierIndex !== -1) {
    setRankData(tiers[tierIndex]);
    setNextRankData(tierIndex > 0 ? tiers[tierIndex - 1] : null);
    } else {
    setRankData(tiers[tiers.length - 1]);
    setNextRankData(tiers[tiers.length - 2]);
    }
    setCopied(false);
    };

    const handleInputChange = (e) => {
    const val = e.target.value;
    setBtcAmount(val);
    calculateRank(val);
    };

    const getShareText = () => {
    if (!rankData) return '';
    return `I hold the rank of ${rankData.emoji} ${rankData.label} (Top ${rankData.percentile}%) in the Global Bitcoin
    Ranker. 🏆\n\nCheck your status:`;
    };

    const copyToClipboard = () => {
    const text = getShareText();
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    };

    const shareTwitter = () => {
    const text = encodeURIComponent(getShareText());
    window.open(`https://twitter.com/intent/tweet?text=${text}`, '_blank');
    };

    const shareWhatsapp = () => {
    const text = encodeURIComponent(getShareText());
    window.open(`https://wa.me/?text=${text}`, '_blank');
    };

    const formatUSD = (amount) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0
    }).format(amount);
    };

    const formatBTC = (amount) => {
    return new Intl.NumberFormat('en-US', { maximumFractionDigits: 8 }).format(amount);
    }

    return (
    <div
        className="min-h-screen bg-[#050505] text-gray-100 font-sans selection:bg-yellow-500/30 p-4 md:p-8 flex flex-col items-center">

        {/* Custom Styles for Animation & Inputs */}
        <style>
            {

                ` input[type=number]::-webkit-inner-spin-button,
                input[type=number]::-webkit-outer-spin-button {
                    -webkit-appearance: none;
                    margin: 0;
                }

                input[type=number] {
                    -moz-appearance: textfield;
                }

                @keyframes shimmer {
                    0% {
                        transform: translateX(-150%) skewX(-15deg);
                    }

                    100% {
                        transform: translateX(150%) skewX(-15deg);
                    }
                }

                .animate-shimmer {
                    animation: shimmer 2.5s infinite;
                }

                .luxury-card-bg {
                    background-image: radial-gradient(circle at 50% 0%, rgba(255, 255, 255, 0.03) 0%, rgba(0, 0, 0, 0) 70%);
                }

                `
            }
        </style>

        <div className="w-full max-w-4xl space-y-8">

            {/* Header */}
            <div className="text-center space-y-2 mt-4">
                <div className="flex items-center justify-center gap-3 mb-4">
                    <div className="relative group">
                        <div
                            className="absolute inset-0 bg-yellow-500/50 blur-xl rounded-full opacity-50 group-hover:opacity-75 transition-opacity">
                        </div>
                        <div className="bg-[#111] border border-yellow-500/30 p-3 rounded-2xl relative">
                            <svg viewBox="0 0 32 32" className="w-8 h-8 fill-yellow-500">
                                <path
                                    d="M23.189 14.02c.314-2.096-1.283-3.223-3.465-3.975l.708-2.84-1.728-.43-.69 2.765c-.454-.114-.92-.22-1.385-.326l.695-2.783L15.596 6l-.708 2.839c-.376-.086-.746-.17-1.104-.26l.002-.009-2.384-.595-.46 1.846s1.283.294 1.256.312c.7.175.826.638.805 1.006l-.806 3.235c.048.012.11.03.18.057l-.183-.045-1.13 4.532c-.086.212-.303.531-.793.41.018.025-1.256-.313-1.256-.313l-.858 1.978 2.25.561c.418.105.828.215 1.231.318l-.715 2.872 1.727.43.708-2.84c.472.127.93.245 1.378.357l-.706 2.828 1.728.43.715-2.866c2.948.558 5.164.333 6.097-2.333.752-2.146-.037-3.402-1.594-4.212 1.132-.26 1.986-1.003 2.213-2.538zm-3.96 5.661c-.54 2.163-4.186.994-5.37.7l.957-3.841c1.183.295 4.977.88 4.412 3.141zm.536-5.698c-.493 1.975-3.568.968-4.567.719l.87-3.486c1.006.25 3.81.696 3.696 2.767z" />
                            </svg>
                        </div>
                    </div>
                </div>
                <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-white font-serif">
                    Global Wealth Ranker
                </h1>
                <p className="text-gray-500 max-w-lg mx-auto text-sm md:text-base">
                    Visualize your position in the Bitcoin economy.
                </p>
            </div>

            {/* Input Section */}
            <div className="flex justify-center">
                <div
                    className="bg-[#111] border border-gray-800 rounded-2xl p-2 md:p-3 shadow-2xl relative w-full max-w-lg group hover:border-gray-700 transition-colors">
                    <div className="flex items-center gap-4 pl-4">
                        <span className="text-yellow-500 text-xl font-serif">₿</span>
                        <input type="number" value={btcAmount} onChange={handleInputChange} placeholder="0.00"
                            className="w-full bg-transparent text-2xl md:text-3xl font-bold text-white outline-none placeholder:text-gray-800 py-3"
                            step="any" />
                    </div>
                    {usdPrice && btcAmount && !isNaN(btcAmount) && (
                    <div
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-xs md:text-sm text-gray-500 font-mono bg-[#1a1a1a] px-2 py-1 rounded border border-gray-800">
                        {formatUSD(parseFloat(btcAmount) * usdPrice)}
                    </div>
                    )}
                </div>
            </div>

            {/* 🏆 LUXURY CARD RESULT AREA 🏆 */}
            {rankData && (
            <div className="animate-in fade-in zoom-in duration-500 flex flex-col items-center gap-8">

                {/* The Black Card */}
                <div className={`relative w-full max-w-md aspect-[1.586/1] rounded-2xl p-6 md:p-8 overflow-hidden
                    transition-all duration-500 group shadow-2xl ${rankData.shadow}`}>

                    {/* Dynamic Gradient Background */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${rankData.gradient} opacity-10
                        group-hover:opacity-20 transition-opacity duration-700`}></div>
                    <div className="absolute inset-0 bg-[#080808] opacity-90 luxury-card-bg"></div>

                    {/* Shimmer Effect */}
                    <div
                        className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/5 to-transparent z-10 pointer-events-none">
                    </div>

                    {/* Border Glow */}
                    <div className={`absolute inset-0 border border-white/10 rounded-2xl pointer-events-none`}></div>

                    {/* Card Content Layer */}
                    <div className="relative z-20 flex flex-col justify-between h-full">

                        {/* Card Header */}
                        <div className="flex justify-between items-start">
                            <div className="flex items-center gap-2 opacity-80">
                                <Trophy className="w-4 h-4 text-yellow-500" />
                                <span
                                    className="text-[10px] md:text-xs tracking-[0.2em] text-yellow-500/90 uppercase font-bold">Satoshi
                                    Reserve</span>
                            </div>

                            {/* Chip Icon */}
                            <Cpu className="w-8 h-8 text-yellow-600/80 rotate-90" strokeWidth={1.5} />
                        </div>

                        {/* Card Body - Rank Name */}
                        <div
                            className="text-center my-auto transform group-hover:scale-105 transition-transform duration-500">
                            <div
                                className="text-5xl md:text-6xl mb-3 drop-shadow-2xl filter brightness-110 animate-bounce delay-700 duration-1000">
                                {rankData.emoji}
                            </div>
                            <h2
                                className="text-3xl md:text-4xl font-serif text-white font-medium tracking-wide drop-shadow-md">
                                {rankData.label}
                            </h2>
                            <div className="flex items-center justify-center gap-2 mt-2">
                                <div
                                    className="h-[1px] w-8 bg-gradient-to-r from-transparent via-yellow-500/50 to-transparent">
                                </div>
                                <span className={`text-[10px] uppercase tracking-widest ${rankData.textColor}
                                    font-semibold`}>Top {rankData.percentile}% Worldwide</span>
                                <div
                                    className="h-[1px] w-8 bg-gradient-to-r from-transparent via-yellow-500/50 to-transparent">
                                </div>
                            </div>
                        </div>

                        {/* Card Footer */}
                        <div className="flex justify-between items-end">
                            <div className="flex flex-col gap-1">
                                <span className="text-[8px] text-gray-600 uppercase tracking-wider font-bold">Verified
                                    Holder</span>
                                <div className="flex items-center gap-1.5 text-xs font-mono text-gray-400">
                                    <span className="text-yellow-600/80">★</span>
                                    <span>{new Date().getFullYear()} MEMBER</span>
                                </div>
                            </div>

                            <div className="text-right">
                                <div className="text-[8px] text-gray-600 uppercase tracking-wider mb-0.5">Rank Status
                                </div>
                                <div className={`text-xs md:text-sm font-bold bg-white/5 border border-white/10 px-2
                                    py-0.5 rounded backdrop-blur-sm ${rankData.textColor}`}>
                                    ACTIVE
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                {/* Share / Action Bar (Pills) */}
                <div className="flex flex-wrap justify-center gap-3">
                    <button onClick={shareTwitter}
                        className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#111] hover:bg-[#1a1a1a] border border-gray-800 hover:border-blue-500/50 text-gray-400 hover:text-blue-400 transition-all text-sm font-medium group">
                        <Twitter className="w-4 h-4 group-hover:scale-110 transition-transform" />
                        <span>X / Twitter</span>
                    </button>

                    <button onClick={shareWhatsapp}
                        className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#111] hover:bg-[#1a1a1a] border border-gray-800 hover:border-green-500/50 text-gray-400 hover:text-green-400 transition-all text-sm font-medium group">
                        <MessageCircle className="w-4 h-4 group-hover:scale-110 transition-transform" />
                        <span>WhatsApp</span>
                    </button>

                    <button onClick={copyToClipboard}
                        className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-yellow-500/10 hover:bg-yellow-500/20 border border-yellow-500/20 text-yellow-500 transition-all text-sm font-medium min-w-[140px] justify-center">
                        {copied ?
                        <Check className="w-4 h-4" /> :
                        <Copy className="w-4 h-4" />}
                        <span>{copied ? 'Copied' : 'Copy Rank'}</span>
                    </button>
                </div>

                {/* NEXT LEVEL PROGRESS - Moved out of card for cleaner look */}
                {nextRankData && (
                <div
                    className="w-full max-w-md bg-[#111] rounded-xl border border-gray-800 p-4 relative overflow-hidden">
                    <div className="flex justify-between items-center mb-3">
                        <div className="flex items-center gap-2">
                            <span className="text-gray-400 text-xs uppercase tracking-wider font-bold">Next Rank</span>
                            <ArrowRight className="w-3 h-3 text-gray-600" />
                            <span className={`text-sm font-serif ${nextRankData.textColor}`}>{nextRankData.emoji}
                                {nextRankData.label}</span>
                        </div>
                        <span className="text-yellow-500 font-mono text-sm font-bold">
                            {(parseFloat(btcAmount) / nextRankData.min * 100).toFixed(1)}%
                        </span>
                    </div>

                    <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-yellow-700 to-yellow-400 transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(234,179,8,0.3)]"
                            style={{ width: `${Math.min((parseFloat(btcAmount) / nextRankData.min * 100), 100)}%` }} />
                    </div>

                    <div className="flex items-center gap-2 mt-3 text-xs text-gray-500">
                        <TrendingUp className="w-3 h-3" />
                        <span>Need <span className="text-gray-300 font-mono">{formatBTC(nextRankData.min -
                                parseFloat(btcAmount))} BTC</span> to level up</span>
                    </div>
                </div>
                )}
            </div>
            )}

            {/* Global Stats Table */}
            {!rankData && (
            <div
                className="bg-[#111] border border-gray-800 rounded-2xl overflow-hidden opacity-50 hover:opacity-100 transition-opacity duration-500">
                <div className="p-4 border-b border-gray-800 bg-[#0f0f0f] flex items-center justify-between">
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Global
                        Distribution</span>
                    <Users className="w-4 h-4 text-gray-600" />
                </div>
                <div className="divide-y divide-gray-800/50">
                    {tiers.map((tier) => (
                    <div key={tier.id}
                        className="flex items-center justify-between p-3 px-5 hover:bg-[#161616] transition-colors group">
                        <div className="flex items-center gap-3">
                            <span
                                className="text-xl grayscale group-hover:grayscale-0 transition-all">{tier.emoji}</span>
                            <span
                                className="text-sm font-medium text-gray-400 group-hover:text-gray-200 transition-colors">{tier.label}</span>
                        </div>
                        <span className="text-xs font-mono text-gray-600">Top {tier.percentile}%</span>
                    </div>
                    ))}
                </div>
            </div>
            )}

        </div>
    </div>
    );
    };

    export default App;