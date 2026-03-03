import Head from 'next/head'
import { useEffect, useRef, useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Button from '../components/ui/Button'


export default function Home() {
  const [selectedOption, setSelectedOption] = useState('For sale')
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('Buy')
  const dropdownRef = useRef(null)
  const [sellForm, setSellForm] = useState({
    ownerName: '',
    email: '',
    phone: '',
    propertyType: '',
    location: '',
    price: '',
    bedrooms: '',
    bathrooms: '',
    description: '',
  })

  const options = ['For sale', 'For rent', 'New construction', 'Joint Venture']
  const tabs = ['Buy', 'Rent', 'Sell']
  const placeholderCards = [1, 2, 3]
  const isSellTab = activeTab === 'Sell'

  const handleSellInputChange = (event) => {
    const { name, value } = event.target

    setSellForm((previous) => ({
      ...previous,
      [name]: value,
    }))
  }

  const handleSellSubmit = (event) => {
    event.preventDefault()
    alert('Your property details were submitted. Our team will contact you shortly.')
    setSellForm({
      ownerName: '',
      email: '',
      phone: '',
      propertyType: '',
      location: '',
      price: '',
      bedrooms: '',
      bathrooms: '',
      description: '',
    })
  }

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false)
      }
    }

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setDropdownOpen(false)
      }
    }

    document.addEventListener('pointerdown', handleOutsideClick)
    document.addEventListener('keydown', handleEscape)

    return () => {
      document.removeEventListener('pointerdown', handleOutsideClick)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [])

  return (
    <>
      <Head>
        <title>ELOTS | Find the Perfect Property</title>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
      </Head>

      <div className="bg-white text-gray-900 antialiased">
        <Header />

        {/* Hero Section */}
        <section className="hero-bg h-[600px] flex flex-col items-center justify-center text-center px-4 relative">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 drop-shadow-md">
            FIND THE PERFECT PROPERTY FOR YOU
          </h1>
          <p className="text-gray-200 mb-8 max-w-xl text-lg">
            Helping you find the home of your dreams
          </p>

          {/* Search Bar */}
          <div className="bg-white p-2 rounded-full shadow-2xl flex items-center max-w-3xl w-full mx-auto transform translate-y-4">
            <div
              ref={dropdownRef}
              className="relative border-r border-gray-200 px-6 h-full flex items-center"
            >
              <button
                type="button"
                onClick={() => setDropdownOpen((previous) => !previous)}
                aria-haspopup="listbox"
                aria-expanded={dropdownOpen}
                className="flex items-center font-medium text-gray-700 hover:text-brand-blue focus:outline-none"
              >
                <span>{selectedOption}</span>
                <i className="fa-solid fa-chevron-down ml-3 text-xs text-gray-400"></i>
              </button>

              {dropdownOpen && (
                <div
                  className="absolute top-full left-0 mt-4 w-56 bg-white rounded-2xl shadow-xl py-3 z-50 text-left border border-gray-100 animate-fade-in-down"
                  role="listbox"
                >
                {options.map((option) => {
                  const isSelected = option === selectedOption
                  return (
                    <button
                      key={option}
                      type="button"
                      onClick={() => {
                        setSelectedOption(option)
                        setDropdownOpen(false)
                      }}
                      className={`w-full text-left px-6 py-2.5 hover:bg-blue-50 dropdown-item ${
                        isSelected
                          ? 'text-brand-blue font-bold flex justify-between items-center'
                          : 'text-gray-700 hover:text-gray-900 font-medium transition'
                      }`}
                      role="option"
                      aria-selected={isSelected}
                    >
                      {option}
                      {isSelected && (
                        <i className="fa-solid fa-check text-brand-blue"></i>
                      )}
                    </button>
                  )
                })}
                </div>
              )}
            </div>
            <div className="flex-1 flex items-center px-4">
              <input
                type="text"
                placeholder="Address, City, Zip, or Neighborhood"
                className="w-full outline-none text-gray-700 placeholder-gray-400"
              />
            </div>
            <button className="bg-brand-blue hover:bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center transition shrink-0">
              <i className="fa-solid fa-search"></i>
            </button>
          </div>
        </section>

        {/* Explore Homes Section */}
        <section className="py-20 px-6 max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Explore Homes
            </h2>

            <div className="inline-flex bg-gray-100 rounded-full p-1">
              {tabs.map((tab) => {
                const isActive = tab === activeTab
                return (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setActiveTab(tab)}
                    className={
                      isActive
                        ? 'bg-brand-blue text-white px-6 py-2 rounded-full text-sm font-medium shadow-sm tab-btn'
                        : 'text-gray-600 px-6 py-2 rounded-full text-sm font-medium hover:bg-gray-200 transition tab-btn'
                    }
                  >
                    {tab}
                  </button>
                )
              })}
            </div>
          </div>

          {isSellTab ? (
            <div className="max-w-4xl mx-auto border border-gray-200 rounded-3xl p-6 md:p-8 bg-white shadow-sm">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                List Your Property
              </h3>
              <p className="text-gray-500 mb-6">
                Fill in your details and our team will help you publish your
                property listing
              </p>

              <form
                onSubmit={handleSellSubmit}
                className="grid grid-cols-1 sm:grid-cols-2 gap-4"
              >
                <input
                  type="text"
                  name="ownerName"
                  value={sellForm.ownerName}
                  onChange={handleSellInputChange}
                  placeholder="Full Name"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-brand-blue"
                  required
                />
                <input
                  type="email"
                  name="email"
                  value={sellForm.email}
                  onChange={handleSellInputChange}
                  placeholder="Email Address"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-brand-blue"
                  required
                />
                <input
                  type="tel"
                  name="phone"
                  value={sellForm.phone}
                  onChange={handleSellInputChange}
                  placeholder="Phone Number"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-brand-blue"
                  required
                />
                <input
                  type="text"
                  name="propertyType"
                  value={sellForm.propertyType}
                  onChange={handleSellInputChange}
                  placeholder="Property Type (House, Apartment...)"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-brand-blue"
                  required
                />
                <input
                  type="text"
                  name="location"
                  value={sellForm.location}
                  onChange={handleSellInputChange}
                  placeholder="Property Location"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-brand-blue"
                  required
                />
                <input
                  type="number"
                  name="price"
                  value={sellForm.price}
                  onChange={handleSellInputChange}
                  placeholder="Asking Price"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-brand-blue"
                  required
                />
                <input
                  type="number"
                  name="bedrooms"
                  value={sellForm.bedrooms}
                  onChange={handleSellInputChange}
                  placeholder="Bedrooms"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-brand-blue"
                />
                <input
                  type="number"
                  name="bathrooms"
                  value={sellForm.bathrooms}
                  onChange={handleSellInputChange}
                  placeholder="Bathrooms"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-brand-blue"
                />
                <textarea
                  name="description"
                  value={sellForm.description}
                  onChange={handleSellInputChange}
                  placeholder="Property Description"
                  rows={5}
                  className="sm:col-span-2 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-brand-blue resize-none"
                  required
                />

                <div className="sm:col-span-2 flex justify-end pt-2">
                  <Button type="submit" variant="primary" size="md">
                    Submit Property
                  </Button>
                </div>
              </form>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {placeholderCards.map((card) => (
                  <div
                    key={`${activeTab}-${card}`}
                    className="group cursor-pointer border border-gray-200 rounded-3xl hover:shadow-lg transition overflow-hidden"
                  >
                    <div className="relative">
                      <img
                        src="/comingsoon.png"
                        alt={`${activeTab} listings coming soon`}
                        className="w-full h-64 object-cover transform group-hover:scale-105 transition duration-500"
                      />
                      <div className="absolute top-4 left-4 flex space-x-2">
                        <span className="bg-amber-500 text-white text-xs px-2 py-1 rounded">
                          Coming Soon
                        </span>
                      </div>
                      <button className="absolute bottom-4 right-4 bg-white p-2 rounded-full shadow-md text-gray-800 hover:text-red-500 transition">
                        <i className="fa-regular fa-heart"></i>
                      </button>
                    </div>
                    <div className="p-4 flex flex-col space-y-[6px]">
                      <h3 className="text-xl font-bold text-gray-900">
                        Coming Soon
                      </h3>
                      <p className="text-gray-500 text-sm">
                        New listings will be available soon.
                      </p>
                      <div className="flex items-center text-gray-400 text-sm space-x-4">
                        <span>
                          <i className="fa-solid fa-bed mr-1"></i> Beds TBD
                        </span>
                        <span>
                          <i className="fa-solid fa-bath mr-1"></i> Baths TBD
                        </span>
                        <span>
                          <i className="fa-solid fa-ruler-combined mr-1"></i>{' '}
                          Sqft TBD
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-center mt-12">
                <Button variant="secondary" size="md">
                  View All Properties
                </Button>
              </div>
            </>
          )}
        </section>

        {/* Features Section */}
        <section className="py-20 bg-[#F2F7F8]">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid gap-12 sm:grid-cols-2 md:grid-cols-3 text-center">
              <div className="flex flex-col items-center justify-center text-gray-700">
                <div className="text-blue-600 text-5xl mb-4">🏡</div>
                <h2 className="font-bold text-xl mb-2">Diverse Listings</h2>
                <p className="max-w-xs text-gray-500">
                  From cozy apartments to luxury villas, we’ve got it all
                </p>
              </div>
              <div className="flex flex-col items-center justify-center text-gray-700">
                <div className="text-blue-600 text-5xl mb-4">⚡</div>
                <h2 className="font-bold text-xl mb-2">Fast Process</h2>
                <p className="max-w-xs text-gray-500">
                  Streamlined search and quick communication with agents
                </p>
              </div>
              <div className="flex flex-col items-center justify-center text-gray-700">
                <div className="text-blue-600 text-5xl mb-4">🤝</div>
                <h2 className="font-bold text-xl mb-2">Trusted Partners</h2>
                <p className="max-w-xs text-gray-500">
                  Work with verified agents and reliable property owners
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Become An Affiliated Agent Section */}
        <section className="py-20 px-6 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="w-full md:w-1/2">
              <img
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Agent"
                className="rounded-2xl shadow-xl w-full h-[400px] object-cover"
              />
            </div>
            <div className="w-full md:w-1/2">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Become An Affiliated Agent
              </h2>
              <p className="text-gray-500 mb-6 leading-relaxed">
                Join the ELOTS network and take your real estate career to the
                next level. We provide the tools, support, and leads you need to
                succeed in today's market
              </p>
              <Button variant="secondary" size="md">
                Learn More
              </Button>
            </div>
          </div>
        </section>

        {/* List Your Property Section */}
        <section className="py-20 bg-[#F2F7F8]">
          <div className="px-6 max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row-reverse items-center gap-12">
              <div className="w-full md:w-1/2">
                <img
                  src="/listimage.png"
                  alt="List Property"
                  className="rounded-2xl shadow-xl w-full h-[400px] object-cover"
                />
              </div>
              <div className="w-full md:w-1/2">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  List Your Property on{' '}
                  <span className="text-brand-blue">ELOTS</span>
                </h2>
                <p className="text-gray-500 mb-6 leading-relaxed">
                  Sell your home faster and for a better price. Our advanced
                  marketing strategies and vast network of buyers ensure your
                  property gets the attention it deserves
                </p>
                <Button variant="secondary" size="md">
                  List Now
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Trends Section */}
        <section className="py-20 px-6 max-w-4xl mx-auto text-center">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl group cursor-pointer">
            <img
              src="elotsmainctaillustration.png"
              alt="Trends"
              className="w-full h-80 object-cover transform group-hover:scale-105 transition duration-700"
            />
            <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col justify-center items-center p-8">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Keep Up With The Latest Trends
              </h2>
              <p className="text-gray-200 mb-6 max-w-lg">
                Stay informed with the latest market insights, interior design
                trends, and real estate news
              </p>
              <button className="cta-btn cta-primary cta-sm">
                Read More
              </button>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  )
}
