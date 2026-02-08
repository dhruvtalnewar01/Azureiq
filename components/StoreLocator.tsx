export default function StoreLocator() {
    return (
        <section className="h-[80vh] w-full bg-white text-azure-charcoal flex flex-col md:flex-row items-center">
            <div className="w-full md:w-1/2 h-full bg-gray-200 bg-[url('/store-interior.jpg')] bg-cover bg-center" /> {/* Placeholder for store image */}
            <div className="w-full md:w-1/2 h-full flex flex-col items-center justify-center p-12 text-center">
                <h2 className="text-5xl font-serif mb-6">Find My AZURÉIQ</h2>
                <p className="text-gray-600 mb-10 max-w-md">
                    We look forward to welcoming you to the extraordinary world of AZURÉIQ, where our legacy becomes yours.
                </p>
                <button className="luxury-hover px-12 py-4 border border-azure-charcoal text-azure-charcoal tracking-widest hover:bg-azure-charcoal hover:text-white transition-all">
                    FIND A STORE
                </button>
            </div>
        </section>
    )
}
