export default function Category() {
  return (
    <section className="col-span-full py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {[
            { name: "Fruits & Vegetables", icon: "🍎", count: 124 },
            { name: "Dairy & Eggs", icon: "🥛", count: 89 },
            { name: "Meat & Fish", icon: "🍗", count: 76 },
            { name: "Bakery", icon: "🥖", count: 54 },
            { name: "Beverages", icon: "🧃", count: 112 }
          ].map((category) => (
            <div key={category.name} className="border rounded-lg p-4 text-center hover:shadow-md transition-all">
              <span className="text-4xl mb-2 block">{category.icon}</span>
              <h3 className="font-medium">{category.name}</h3>
              <p className="text-sm text-gray-500">{category.count} items</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}