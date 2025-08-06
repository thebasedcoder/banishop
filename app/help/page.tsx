"use client"

import { ArrowRight, ChevronDown, LifeBuoy, Mail, MessageSquare, Phone, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'

// Main Help Center Page Component
export default function HelpPage() {
  const faqs = [
    {
      question: "How can I track my order?",
      answer: "Once your order has shipped, you will receive an email with a tracking number and a link to the carrier's website. You can also find the tracking information in your account under the 'Orders' section by clicking on the specific order.",
    },
    {
      question: "What are the shipping costs and delivery times?",
      answer: "Standard shipping within Germany is a flat rate of €5.99. Orders are typically processed within 1-2 business days and delivered within 3-5 business days. We will notify you of any potential delays.",
    },
    {
      question: "What is your return policy?",
      answer: "We accept returns for unopened, non-perishable items within 14 days of delivery. Please visit our returns portal or contact customer support to initiate a return. Perishable goods cannot be returned for safety reasons.",
    },
    {
      question: "How do I change my password or account details?",
      answer: "You can update all your personal information, including your password, name, and addresses, by navigating to your Dashboard. The 'Profile' and 'Privacy & Security' sections contain all the necessary forms.",
    },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-white py-16 md:py-24 text-center">
          <div className="container px-4">
            <LifeBuoy className="h-16 w-16 text-[#E11D48] mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900">
              How can we help?
            </h1>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Find answers to your questions, contact our support team, and get the most out of your experience.
            </p>
            <div className="relative mt-8 max-w-xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="search"
                placeholder="Search for answers (e.g., 'return policy')"
                className="h-12 w-full rounded-full pl-12 pr-4 focus:ring-[#E11D48]"
              />
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 md:py-24">
          <div className="container px-4 max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900">Frequently Asked Questions</h2>
              <p className="mt-2 text-lg text-gray-600">
                Quick answers to our most common questions.
              </p>
            </div>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-lg text-left hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-base text-gray-700 leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* Contact Us Section */}
        <section className="bg-white py-16 md:py-24">
          <div className="container px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900">Still need help?</h2>
              <p className="mt-2 text-lg text-gray-600">
                Our team is here to assist you. Choose your preferred way to get in touch.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {/* Email Support Card */}
              <Card className="hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#E11D48]/10">
                    <Mail className="h-6 w-6 text-[#E11D48]" />
                  </div>
                  <CardTitle>Email Support</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Get a detailed response within 24 hours. Perfect for non-urgent inquiries.
                  </CardDescription>
                  <Button asChild variant="link" className="p-0 mt-4 text-[#E11D48]">
                    <a href="mailto:support@freshmart.de">
                      support@freshmart.de <ArrowRight className="h-4 w-4 ml-1" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
              {/* Phone Support Card */}
              <Card className="hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#E11D48]/10">
                    <Phone className="h-6 w-6 text-[#E11D48]" />
                  </div>
                  <CardTitle>Phone Support</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Speak directly with a support agent. Available Mo-Fr, 9:00 - 17:00.
                  </CardDescription>
                  <Button asChild variant="link" className="p-0 mt-4 text-[#E11D48]">
                    <a href="tel:+491234567890">
                      +49 123 456 7890 <ArrowRight className="h-4 w-4 ml-1" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
              {/* Live Chat Card */}
              <Card className="hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#E11D48]/10">
                    <MessageSquare className="h-6 w-6 text-[#E11D48]" />
                  </div>
                  <CardTitle>Live Chat</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Chat with us live for immediate assistance with your questions.
                  </CardDescription>
                  <Button variant="link" className="p-0 mt-4 text-[#E11D48]">
                    Start Chat <ArrowRight className="h-4 w-4 ml-1" />
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}