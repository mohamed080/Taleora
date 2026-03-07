export function AuthorSpotlight() {
  return (
    <section className="bg-[#fff3df] py-12">
      <div className="mx-auto max-w-4xl px-4 text-center md:px-8">
        <h2 className="font-serif text-3xl text-amber-700 md:text-4xl">Meet The Storyteller</h2>
        <div className="mx-auto mt-6 max-w-xl rounded-3xl border border-orange-200 bg-white p-6 shadow-sm">
          <div className="mx-auto h-24 w-24 rounded-full bg-gradient-to-br from-orange-300 to-rose-300" />
          <h3 className="mt-4 text-xl font-semibold text-stone-800">Coach Haneen</h3>
          <p className="mt-2 text-sm text-stone-600">
            Educator and children&apos;s reading coach focused on emotional growth and joyful literacy habits.
          </p>
          <button className="mt-5 rounded-full bg-rose-400 px-5 py-2 text-sm font-semibold text-white hover:bg-rose-500">
            Read Full Story
          </button>
        </div>
      </div>
    </section>
  );
}
