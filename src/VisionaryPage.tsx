import { ArrowLeft, Award, Heart, Sparkles } from 'lucide-react';

export default function VisionaryPage({ onBack }: { onBack: () => void }) {
  return (
    <div className="min-h-screen bg-section-gradient">
      <div className="bg-white border-b border-pink-100 shadow-sm sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center gap-4">
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

      <section className="py-16 lg:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 lg:mb-16">
            <span className="text-wef-pink text-xs font-bold uppercase tracking-widest">Leadership</span>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-wef-charcoal mt-2">
              Our Visionary
            </h1>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-pink-100 to-purple-100 rounded-3xl opacity-60" />
              <div className="relative overflow-hidden rounded-2xl border border-pink-100 shadow-xl">
                <img
                  src="/images/chantelle-abdul.png"
                  alt="Chantelle Abdul, Group Managing Director of Mojec International Holdings"
                  className="w-full aspect-[4/5] object-cover object-top"
                />
              </div>
              <div className="relative mt-6 bg-white rounded-2xl border border-pink-100 shadow-md p-6">
                <p className="font-display text-xl font-bold text-wef-charcoal">Chantelle Abdul</p>
                <p className="text-wef-pink text-sm font-semibold mt-1">
                  Group Managing Director, Mojec International Holdings
                </p>
                <p className="text-gray-500 text-sm mt-1">Non-Executive Director, MOFI</p>
              </div>
            </div>

            <div className="space-y-6">
              <p className="text-gray-600 leading-relaxed text-base">
                Chantelle Abdul is the Group Managing Director of Mojec International Holdings, one of
                Africa&apos;s leading energy-engineering and smart-meter manufacturing companies. Under her
                leadership, Mojec has grown into the largest producer of electricity meters in sub-Saharan
                Africa and a key partner to Nigeria&apos;s power distribution companies, delivering
                large-scale smart-metering and energy-management solutions nationwide. She has been
                instrumental in expanding the group&apos;s operations across metering, power generation,
                transmission, and distribution, positioning Mojec as an integrated energy-solutions provider.
              </p>

              <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl border border-pink-100 p-6 sm:p-8">
                <div className="flex items-center gap-2 mb-4">
                  <Heart size={18} className="text-wef-pink" />
                  <h2 className="font-display text-lg font-bold text-wef-charcoal">
                    A Commitment to Women&apos;s Economic Power
                  </h2>
                </div>
                <p className="text-gray-600 leading-relaxed text-base">
                  Beyond boardrooms and infrastructure, Chantelle Abdul has long believed that true national
                  progress is measured by how many lives are lifted at the grassroots. Through the Women
                  Empowerment Fund, she is channelling that conviction into action, reaching market women,
                  artisans, and small-business owners who have the drive to succeed but lack access to
                  training, capital, and networks. WEF reflects her philanthropic vision: that every woman
                  who sells at a stall today should have a clear path to becoming a boss tomorrow, with the
                  skills, mentorship, and financial tools to build businesses that sustain families and
                  strengthen communities across Lagos and beyond.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 pt-2">
                {[
                  { icon: Award, label: 'Industrial Leadership', desc: 'Sub-Saharan Africa\'s largest smart-meter manufacturing footprint' },
                  { icon: Sparkles, label: 'Social Impact', desc: 'Founder of the Women Empowerment Fund — empowering 200+ women per cohort' },
                ].map(({ icon: Icon, label, desc }) => (
                  <div key={label} className="bg-white rounded-xl border border-pink-100 p-5 shadow-sm">
                    <Icon size={20} className="text-wef-pink mb-3" />
                    <p className="font-semibold text-wef-charcoal text-sm">{label}</p>
                    <p className="text-gray-500 text-xs mt-1 leading-relaxed">{desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
