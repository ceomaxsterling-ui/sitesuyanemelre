import React from 'react';

interface BadgeProps {
  icon: string;
  label: string;
}

const badges: BadgeProps[] = [
  { icon: 'verified', label: 'CFP® Certificada' },
  { icon: 'workspace_premium', label: 'CEA Certificada' },
  { icon: 'handshake', label: 'Acompanhamento Especializado' },
  { icon: 'trending_up', label: 'Estratégia Personalizada' },
];

const allBadges = [...badges, ...badges, ...badges];

const Badge: React.FC<BadgeProps> = ({ icon, label }) => (
  <div className="flex items-center gap-2 bg-white border border-silver rounded-full px-4 py-2 shadow-sm shrink-0">
    <span
      className="material-symbols-outlined text-navy text-base"
      style={{ fontVariationSettings: "'FILL' 1" }}
    >
      {icon}
    </span>
    <span className="text-[11px] font-bold uppercase tracking-widest text-executive whitespace-nowrap">
      {label}
    </span>
  </div>
);

export const CertificationsMarquee: React.FC = () => {
  return (
    <div className="border-t border-b border-silver bg-[#F8FAFC] py-5 overflow-hidden">
      <p className="text-center text-[10px] font-bold uppercase tracking-[0.2em] text-executive/50 mb-3">
        Excelência &amp; Exclusividade
      </p>

      <div className="relative">
        <div className="absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-[#F8FAFC] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-[#F8FAFC] to-transparent z-10 pointer-events-none" />

        <div className="marquee-track flex gap-4">
          {allBadges.map((badge, index) => (
            <Badge key={`${badge.label}-${index}`} icon={badge.icon} label={badge.label} />
          ))}
        </div>
      </div>
    </div>
  );
};
