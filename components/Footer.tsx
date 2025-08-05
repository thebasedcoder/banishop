export default function Footer() {
  return (
    <section className="col-span-full py-12 bg-primary/80 text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">Get Weekly Deals</h2>
        <p className="mb-6 max-w-2xl mx-auto">Sign up for our newsletter and get 10% off your first order</p>
        <div className="flex max-w-md mx-auto">
          <input
            type="email"
            placeholder="Your email address"
            className="flex-1 px-4 py-3 rounded-l-lg focus:outline-none text-gray-900"
          />
          <button className="bg-green-800 hover:bg-green-900 px-6 py-3 rounded-r-lg font-medium">
            Subscribe
          </button>
        </div>
      </div>
    </section>
  )
}