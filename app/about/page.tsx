import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Image from 'next/image'
import { Award, Leaf, Sprout } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-[50vh] bg-gray-900 text-white flex items-center justify-center">
          <Image
            src="https://images.unsplash.com/photo-1572288339393-5b8b3b1a2b0a" // A vibrant Persian market stall
            alt="A vibrant Persian market stall"
            layout="fill"
            objectFit="cover"
            className="opacity-30"
            priority
          />
          <div className="relative container text-center z-10 px-4">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
              Die Seele Persiens im Herzen Deutschlands
            </h1>
            <p className="mt-4 text-lg md:text-xl max-w-3xl mx-auto text-white/90">
              Authentische Aromen, moderne Eleganz.
            </p>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="py-20 md:py-28">
          <div className="container px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div className="prose prose-lg max-w-none text-gray-700">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-4">
                  Unsere Geschichte
                </h2>
                <p>
                  Im pulsierenden Herzen Deutschlands gegründet, entstand FreshMart aus einer einfachen Leidenschaft: die reichen, authentischen Geschmäcker Persiens mit unserer Gemeinschaft zu teilen. Wir erkannten die Sehnsucht nach den echten Gewürzen, Süßigkeiten und Grundnahrungsmitteln, die die persische Küche so einzigartig machen, und machten uns daran, diese Lücke zu schließen.
                </p>
                <p>
                  Unsere Reise begann mit der Beschaffung der besten Produkte direkt von vertrauenswürdigen Handwerkern und Bauern im Iran. Wir glauben, dass authentischer Geschmack an der Quelle beginnt, und wir sind bestrebt, Ihnen die Qualität zu bieten, der Generationen vertraut haben.
                </p>
              </div>
              <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-300">
                <Image
                  src="https://images.unsplash.com/photo-1617396329022-d7b42d3a8b2a" // Saffron threads
                  alt="Close-up of high-quality Persian saffron"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Our Values Section */}
        <section className="bg-gray-50 py-20 md:py-28">
          <div className="container px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900">Unser Versprechen</h2>
              <p className="mt-3 text-lg text-gray-600 max-w-2xl mx-auto">
                Drei Säulen, die unser Engagement für Sie definieren.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Value Card 1 */}
              <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-[#E11D48]/10 mb-5">
                  <Award className="h-6 w-6 text-[#E11D48]" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Authentizität Garantiert
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Wir arbeiten mit renommierten Produzenten zusammen, um sicherzustellen, dass jedes Produkt echt und von höchster Qualität ist.
                </p>
              </div>
              {/* Value Card 2 */}
              <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-[#E11D48]/10 mb-5">
                  <Leaf className="h-6 w-6 text-[#E11D48]" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Frische & Qualität
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Unser Engagement für Frische bedeutet, dass wir Waren sorgfältig auswählen, um ein unvergleichliches kulinarisches Erlebnis zu liefern.
                </p>
              </div>
              {/* Value Card 3 */}
              <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-[#E11D48]/10 mb-5">
                  <Sprout className="h-6 w-6 text-[#E11D48]" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Kulturelle Brücke
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Mehr als ein Geschäft, sind wir ein kultureller Knotenpunkt, der das reiche Erbe Persiens feiert und seine Schätze teilt.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="py-20 md:py-28">
          <div className="container text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">Entdecken Sie den Geschmack Persiens</h2>
            <p className="mt-3 text-lg text-gray-600 max-w-2xl mx-auto">
              Stöbern Sie durch unsere Kollektion und bringen Sie die Aromen, die Sie lieben, nach Hause.
            </p>
            <div className="mt-8">
              <Button asChild className="bg-[#E11D48] hover:bg-[#E11D48]/90 h-12 px-8 text-lg">
                <Link href="/products">Jetzt Einkaufen</Link>
              </Button>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  )
}