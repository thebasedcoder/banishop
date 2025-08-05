export default function WhyChooseUs() {
  return (
    <section className="col-span-full py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose Our Store</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Fresh Products",
              description: "Daily deliveries from local farms and producers",
              icon: "🌱"
            },
            {
              title: "Best Prices",
              description: "Price match guarantee on all items",
              icon: "💰"
            },
            {
              title: "Fast Delivery",
              description: "Free delivery on orders over $50",
              icon: "🚚"
            }
          ].map((feature) => (
            <div key={feature.title} className="text-center">
              <span className="text-5xl mb-4 inline-block">{feature.icon}</span>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}