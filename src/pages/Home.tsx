import React from 'react'
import { Link } from 'react-router-dom'
import Button from '../components/Button'
import banner from "../assets/paddy1.png";
import { ArrowRight, BarChart2, Leaf, Cloud, Thermometer } from 'lucide-react'

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-background text-text">
      {/* Hero Section */}
      <header
        className="relative h-[80vh] flex items-center justify-center text-center overflow-hidden rounded-b-2xl shadow-2xl"
        style={{
          backgroundImage:
            `url(${banner})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/60 via-secondary/40 to-accent/30 opacity-90"></div>
        <div className="relative z-10 max-w-4xl px-6">
          <h1 className="text-6xl font-extrabold leading-tight mb-6 drop-shadow-lg animate-fade-in-up">
            Predict Your Paddy Yields with{' '}
            <span className="text-white bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
              CropSense
            </span>
          </h1>
          <p className="text-xl text-white mb-10 drop-shadow-md animate-fade-in-up delay-200">
            Leveraging granular data and machine learning to provide highly
            accurate forecasts and optimize your harvest.
          </p>
          <Link to="/signup">
            <Button size="lg" className="animate-fade-in-up delay-400">
              Get Started Today <ArrowRight size={20} />
            </Button>
          </Link>
        </div>
      </header>

      {/* Features Section */}
      <section className="container mx-auto px-6 py-20">
        <h2 className="text-5xl font-bold text-center mb-16 text-text animate-fade-in-up">
          Why Choose CropSense?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          <div className="bg-surface p-8 rounded-2xl shadow-xl hover:shadow-primary/20 transition-all duration-300 transform hover:-translate-y-2 animate-fade-in-up delay-200">
            <div className="flex items-center justify-center w-16 h-16 bg-primary/20 text-primary rounded-full mb-6">
              <BarChart2 size={32} />
            </div>
            <h3 className="text-2xl font-semibold text-text mb-4">
              Granular Data Analysis
            </h3>
            <p className="text-textSecondary leading-relaxed">
              We analyze data across all 105 growth stages of paddy, providing
              unparalleled insights into yield factors.
            </p>
          </div>

          <div className="bg-surface p-8 rounded-2xl shadow-xl hover:shadow-secondary/20 transition-all duration-300 transform hover:-translate-y-2 animate-fade-in-up delay-400">
            <div className="flex items-center justify-center w-16 h-16 bg-secondary/20 text-secondary rounded-full mb-6">
              <Leaf size={32} />
            </div>
            <h3 className="text-2xl font-semibold text-text mb-4">
              Factor Impact Identification
            </h3>
            <p className="text-textSecondary leading-relaxed">
              Understand precisely which factors—fertilizer, temperature,
              rainfall—most impact your final harvest.
            </p>
          </div>

          <div className="bg-surface p-8 rounded-2xl shadow-xl hover:shadow-accent/20 transition-all duration-300 transform hover:-translate-y-2 animate-fade-in-up delay-600">
            <div className="flex items-center justify-center w-16 h-16 bg-accent/20 text-accent rounded-full mb-6">
              <Cloud size={32} />
            </div>
            <h3 className="text-2xl font-semibold text-text mb-4">
              Highly Accurate Forecasts
            </h3>
            <p className="text-textSecondary leading-relaxed">
              Our machine learning models deliver highly accurate yield
              predictions, helping you plan with confidence.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-gradient-to-r from-primary to-secondary py-20 rounded-2xl mx-auto container px-6 my-20 shadow-2xl">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-5xl font-bold text-white mb-6 animate-fade-in-up">
            Ready to Optimize Your Harvest?
          </h2>
          <p className="text-xl text-white/90 mb-10 animate-fade-in-up delay-200">
            Join CropSense today and take the guesswork out of paddy yield
            management.
          </p>
          <Link to="/signup">
            <Button
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-primary animate-fade-in-up delay-400"
            >
              Start Your Free Trial <ArrowRight size={20} />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Home
