import React from 'react';
import { useClinic } from '../../context/ClinicContext';
import { Gift, MessageCircle, Calendar, CheckCircle2 } from 'lucide-react';

export const FintechGiftCardsLedger: React.FC = () => {
  const { giftCards, formatCurrency } = useClinic();

  const totalGiftValue = giftCards.reduce((acc, c) => acc + c.amount, 0);

  return (
    <div className="space-y-6 font-sans">
      {/* Header Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-[#EAEEF4] shadow-sm">
          <span className="text-xs font-semibold text-slate-500 block mb-1">Total Digital Cards Sold</span>
          <div className="text-2xl font-bold text-slate-900">{giftCards.length} Vouchers</div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-[#EAEEF4] shadow-sm">
          <span className="text-xs font-semibold text-slate-500 block mb-1">Pre-Collected Gift Revenue</span>
          <div className="text-2xl font-bold text-purple-700">{formatCurrency(totalGiftValue)}</div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-[#EAEEF4] shadow-sm">
          <span className="text-xs font-semibold text-slate-500 block mb-1">Redemption Window</span>
          <div className="text-2xl font-bold text-slate-900">12 Months Validity</div>
        </div>
      </div>

      {/* Gift Cards Table */}
      <div className="bg-white rounded-2xl p-6 border border-[#EAEEF4] shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-base font-bold text-slate-900">Sold Luxury Digital Gift Cards</h3>
            <p className="text-xs text-slate-500">Instant WhatsApp voucher deliveries to patients</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                <th className="py-3 px-4">Recipient &amp; Buyer</th>
                <th className="py-3 px-4">Tier &amp; Denomination</th>
                <th className="py-3 px-4">Personal Message</th>
                <th className="py-3 px-4">Payment Method</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {giftCards.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-slate-400">
                    No gift cards issued yet.
                  </td>
                </tr>
              ) : (
                giftCards.map((card) => {
                  const cleanPhone = card.recipientPhone.replace(/[^0-9]/g, '');
                  const waText = encodeURIComponent(
                    `Hello ${card.recipientName}! You have received an Aurelia Clinic KL Luxury Gift Card (${card.tierTitle}) of ${formatCurrency(card.amount)} from ${card.senderName}.\n\n` +
                    `Personal Note: "${card.personalMessage}"\n\n` +
                    `To redeem your doctor-led skin session in Bangsar or Damansara Heights, simply reply here or visit our website.`
                  );

                  return (
                    <tr key={card.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3.5 px-4">
                        <strong className="block text-slate-900 font-semibold text-xs">
                          {card.recipientName}
                        </strong>
                        <span className="text-[11px] text-slate-500">
                          From: {card.senderName} ({card.recipientPhone})
                        </span>
                      </td>

                      <td className="py-3.5 px-4">
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-purple-50 text-purple-700 border border-purple-200">
                          <Gift className="w-3 h-3 text-purple-600" />
                          <span>{formatCurrency(card.amount)}</span>
                        </span>
                        <span className="block text-[10px] text-slate-400 mt-0.5">
                          {card.tierTitle}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-slate-700 italic max-w-xs truncate" title={card.personalMessage}>
                        "{card.personalMessage}"
                      </td>

                      <td className="py-3.5 px-4 text-slate-600">
                        <span className="font-medium text-xs block">{card.paymentProvider}</span>
                        <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> Paid &amp; Issued
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-right">
                        <a
                          href={`https://wa.me/${cleanPhone}?text=${waText}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 text-xs font-bold transition-all border border-purple-200"
                        >
                          <MessageCircle className="w-3.5 h-3.5 text-purple-600" />
                          <span>Resend Card Link</span>
                        </a>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
