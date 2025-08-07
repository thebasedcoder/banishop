"use client"
import { useState } from 'react'
import { Filter, Search, ChevronDown, ChevronUp, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PopularProductCard from '@/components/products/PopularProductCard'


export default function ProductsPage({ searchParams }: { searchParams: { category?: string } }) {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [filters, setFilters] = useState({
    priceRange: [0, 100],
    categories: [] as string[],
    sortBy: 'featured'
  })

  // Mock data - replace with your actual data fetching
  const products = Array(12).fill({
    id: 1,
    name: "Organic Avocado",
    price: 2.99,
    originalPrice: 3.49,
    image: "/fruits.jpg",
    rating: 4.8,
    reviewCount: 124,
    category: "fruits"
  })

  const categories = [
    { id: 'fruits', name: 'Fruits' },
    { id: 'vegetables', name: 'Vegetables' },
    { id: 'dairy', name: 'Dairy' },
    { id: 'meat', name: 'Meat & Poultry' },
    { id: 'bakery', name: 'Bakery' },
    { id: 'beverages', name: 'Beverages' }
  ]

  const handleCategoryChange = (categoryId: string) => {
    setFilters(prev => ({
      ...prev,
      categories: prev.categories.includes(categoryId)
        ? prev.categories.filter(id => id !== categoryId)
        : [...prev.categories, categoryId]
    }))
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <div className="grid grid-cols-24 flex-1">
        {/* Mobile Filters Button */}
        <div className="col-span-full md:hidden border-b p-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">
            {searchParams.category
              ? `${categories.find(c => c.id === searchParams.category)?.name || searchParams.category}`
              : 'All Products'}
          </h1>
          <Button
            variant="outline"
            onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
            className="flex items-center gap-2"
          >
            <Filter className="h-4 w-4" />
            Filters
            {mobileFiltersOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
        </div>

        {/* Filters Sidebar - Desktop */}
        <aside className="hidden md:block md:col-span-4 lg:col-span-4 p-6 border-r shadow-lg sticky top-[73px] h-[calc(100vh-73px)] overflow-y-auto">
          <div className="space-y-8">
            <div>
              <h3 className="font-medium mb-4">Categories</h3>
              <div className="space-y-3">
                {categories.map(category => (
                  <div key={category.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`cat-${category.id}`}
                      checked={filters.categories.includes(category.id)}
                      onCheckedChange={() => handleCategoryChange(category.id)}
                    />
                    <Label htmlFor={`cat-${category.id}`}>{category.name}</Label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-4">Price Range</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between space-x-4">
                  <Input
                    type="number"
                    placeholder="Min"
                    value={filters.priceRange[0]}
                    onChange={(e) => setFilters({ ...filters, priceRange: [Number(e.target.value), filters.priceRange[1]] })}
                  />
                  <span>to</span>
                  <Input
                    type="number"
                    placeholder="Max"
                    value={filters.priceRange[1]}
                    onChange={(e) => setFilters({ ...filters, priceRange: [filters.priceRange[0], Number(e.target.value)] })}
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-4">Sort By</h3>
              <Select
                value={filters.sortBy}
                onValueChange={(value) => setFilters({ ...filters, sortBy: value })}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Customer Rating</SelectItem>
                  <SelectItem value="newest">Newest Arrivals</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </aside>

        {/* Mobile Filters Overlay */}
        {mobileFiltersOpen && (
          <div className="fixed inset-0 bg-white z-50 p-6 overflow-y-auto md:hidden">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Filters</h2>
              <Button
                variant="ghost"
                onClick={() => setMobileFiltersOpen(false)}
              >
                Close
              </Button>
            </div>

            <div className="space-y-8">
              <div>
                <h3 className="font-medium mb-4">Categories</h3>
                <div className="space-y-3">
                  {categories.map(category => (
                    <div key={category.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`mob-cat-${category.id}`}
                        checked={filters.categories.includes(category.id)}
                        onCheckedChange={() => handleCategoryChange(category.id)}
                      />
                      <Label htmlFor={`mob-cat-${category.id}`}>{category.name}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-4">Price Range</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between space-x-4">
                    <Input
                      type="number"
                      placeholder="Min"
                      value={filters.priceRange[0]}
                      onChange={(e) => setFilters({ ...filters, priceRange: [Number(e.target.value), filters.priceRange[1]] })}
                    />
                    <span>to</span>
                    <Input
                      type="number"
                      placeholder="Max"
                      value={filters.priceRange[1]}
                      onChange={(e) => setFilters({ ...filters, priceRange: [filters.priceRange[0], Number(e.target.value)] })}
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-4">Sort By</h3>
                <Select
                  value={filters.sortBy}
                  onValueChange={(value) => setFilters({ ...filters, sortBy: value })}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Featured</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="rating">Customer Rating</SelectItem>
                    <SelectItem value="newest">Newest Arrivals</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 flex justify-between">
              <Button variant="outline" className="w-full mr-2">Reset</Button>
              <Button className="w-full bg-[#E11D48]" onClick={() => setMobileFiltersOpen(false)}>Apply Filters</Button>
            </div>
          </div>
        )}

        {/* Main Content */}
        <main className="col-span-full md:col-span-20 lg:col-span-20 p-4 md:p-6">
          {/* Search and filter header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <h1 className="text-2xl font-bold">
              {searchParams.category
                ? `${categories.find(c => c.id === searchParams.category)?.name || searchParams.category}`
                : 'All Products'}
            </h1>
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="search"
                placeholder="Search products..."
                className="pl-10"
              />
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {products.map((product, index) => (
              <PopularProductCard
                key={`${product.id}-${index}`}
                {...product}
                className="w-full"
              />
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-8">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" isActive>1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">2</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  )
}