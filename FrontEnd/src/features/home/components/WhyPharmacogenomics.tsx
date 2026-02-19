const WhyPharmacogenomics = () => {
  return (
    <section className="py-20 px-6 bg-white relative overflow-hidden">
      {/* Background Medical Research Image */}
      <div
        className="absolute inset-0 opacity-[0.08] bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=1200&q=80')",
        }}
        aria-hidden="true"
      />
      
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-[#0E3B3B] mb-4">
            Why Pharmacogenomics Matters
          </h2>
        </div>

        <div className="space-y-8">
          <div className="bg-[#E8F7F5] rounded-xl p-8 border border-gray-100">
            <h3 className="text-xl font-bold text-[#0E3B3B] mb-3">
              Drug Response Variability
            </h3>
            <p className="text-gray-700 leading-relaxed">
              Genetic differences between patients cause significant variation
              in how medications are metabolized, transported, and targeted.
              What works safely for one patient may be toxic or ineffective for
              another due to inherited genetic variants in pharmacogenes.
            </p>
          </div>

          <div className="bg-[#E8F7F5] rounded-xl p-8 border border-gray-100">
            <h3 className="text-xl font-bold text-[#0E3B3B] mb-3">
              Preventable Adverse Reactions
            </h3>
            <p className="text-gray-700 leading-relaxed">
              Adverse drug reactions account for millions of hospitalizations
              annually. Many of these events are predictable through
              pharmacogenomic testing. By identifying high-risk genetic profiles
              before prescribing, clinicians can prevent serious complications
              including toxicity, treatment failure, and life-threatening
              reactions.
            </p>
          </div>

          <div className="bg-[#E8F7F5] rounded-xl p-8 border border-gray-100">
            <h3 className="text-xl font-bold text-[#0E3B3B] mb-3">
              Precision Prescribing
            </h3>
            <p className="text-gray-700 leading-relaxed">
              Pharmacogenomics enables personalized medicine by matching
              patients to optimal therapies based on their genetic makeup.
              Clinical guidelines from CPIC, FDA, and PharmGKB provide
              evidence-based recommendations for gene-drug pairs, allowing
              physicians to select safer alternatives or adjust dosing before
              treatment begins.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyPharmacogenomics;
