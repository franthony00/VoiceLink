import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { Mic, Search, Shield, Star, Users, Zap, Check, Play } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 pointer-events-none" />
        <div className="container mx-auto relative">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent leading-tight">
              VoiceLink
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8">
              Connecting voices to opportunities
            </p>
            <p className="text-lg mb-8 max-w-2xl mx-auto">
              The premier platform connecting professional voice actors with clients worldwide. Find the perfect voice for your project or showcase your talent to thousands of potential clients.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/register">Get Started Free</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/browse">Browse Voice Actors</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Problem & Market */}
      <section id="problem" className="py-20 px-4 bg-card">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">The Voice Industry Challenge</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>For Voice Actors</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Finding consistent work is difficult. Traditional agencies take large commissions, and freelance platforms lack industry focus. Voice actors deserve a dedicated space to showcase their unique talents.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>For Clients</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Hiring the right voice is time-consuming. Sorting through generic freelance sites, evaluating demos, and ensuring quality is overwhelming. You need a streamlined, professional solution.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Solution & USP */}
      <section id="features" className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">The VoiceLink Solution</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            A 100% voice-focused platform with advanced filters, professional demos, and secure hiring
          </p>
          
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <Mic className="h-10 w-10 text-primary mb-2" />
                <CardTitle>100% Voice Focused</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Unlike generic freelance sites, we specialize exclusively in voice talent, ensuring quality and relevance.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <Search className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Advanced Filters</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Find the perfect voice with filters for accent, age, gender, style, language, and more.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <Shield className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Secure Hiring</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Protected payments, contract templates, and dispute resolution ensure safe transactions.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <Play className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Professional Demos</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Every voice actor showcases multiple high-quality demos across different styles and categories.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <Zap className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Fast Matching</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  AI-powered recommendations connect you with ideal matches in minutes, not days.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <Users className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Global Network</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Access thousands of voice actors worldwide, speaking over 50 languages and dialects.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-20 px-4 bg-card">
        <div className="container mx-auto max-w-5xl">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">Mission</h3>
              <p className="text-muted-foreground">
                To empower voice actors worldwide by providing a professional platform that connects their talent with meaningful opportunities, while helping clients find the perfect voice for every project.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4">Vision</h3>
              <p className="text-muted-foreground">
                To become the world's leading voice talent marketplace, recognized for quality, innovation, and fair treatment of voice professionals.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4">Values</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Transparency in all transactions</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Respect for creative professionals</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Quality over quantity</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">How VoiceLink Works</h2>
          
          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* For Voice Actors */}
            <div>
              <h3 className="text-2xl font-bold mb-6 text-primary">For Voice Actors</h3>
              <div className="space-y-6">
                {[
                  { step: 1, title: 'Create Your Profile', desc: 'Sign up and build a professional profile showcasing your experience and skills' },
                  { step: 2, title: 'Upload Demos', desc: 'Add high-quality audio samples across different styles and categories' },
                  { step: 3, title: 'Get Discovered', desc: 'Clients find you through search or receive invitations to audition' },
                  { step: 4, title: 'Land Projects', desc: 'Accept offers, deliver work, and build your reputation with reviews' }
                ].map((item) => (
                  <div key={item.step} className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                      {item.step}
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* For Clients */}
            <div>
              <h3 className="text-2xl font-bold mb-6 text-secondary">For Clients</h3>
              <div className="space-y-6">
                {[
                  { step: 1, title: 'Post Your Project', desc: 'Describe your needs, budget, and timeline in minutes' },
                  { step: 2, title: 'Browse & Filter', desc: 'Search our database or review auditions from interested actors' },
                  { step: 3, title: 'Hire Securely', desc: 'Choose your favorite, agree on terms, and fund the project safely' },
                  { step: 4, title: 'Receive & Review', desc: 'Get your final files, approve, and leave a review' }
                ].map((item) => (
                  <div key={item.step} className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center font-bold">
                      {item.step}
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 px-4 bg-card">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Simple, Transparent Pricing</h2>
          <p className="text-center text-muted-foreground mb-12">Choose the plan that works for you</p>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>Free</CardTitle>
                <CardDescription>For getting started</CardDescription>
                <div className="text-3xl font-bold mt-4">$0<span className="text-lg font-normal text-muted-foreground">/mo</span></div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary mt-0.5" />
                    <span className="text-sm">Basic profile</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary mt-0.5" />
                    <span className="text-sm">Up to 3 demo uploads</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary mt-0.5" />
                    <span className="text-sm">15% platform fee</span>
                  </li>
                </ul>
                <Button className="w-full mt-6" variant="outline" asChild>
                  <Link href="/register">Get Started</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-primary">
              <CardHeader>
                <CardTitle>Pro</CardTitle>
                <CardDescription>For professionals</CardDescription>
                <div className="text-3xl font-bold mt-4">$29<span className="text-lg font-normal text-muted-foreground">/mo</span></div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary mt-0.5" />
                    <span className="text-sm">Featured profile</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary mt-0.5" />
                    <span className="text-sm">Unlimited demos</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary mt-0.5" />
                    <span className="text-sm">10% platform fee</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary mt-0.5" />
                    <span className="text-sm">Priority support</span>
                  </li>
                </ul>
                <Button className="w-full mt-6" asChild>
                  <Link href="/register">Go Pro</Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Enterprise</CardTitle>
                <CardDescription>For agencies</CardDescription>
                <div className="text-3xl font-bold mt-4">Custom</div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary mt-0.5" />
                    <span className="text-sm">Multiple team members</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary mt-0.5" />
                    <span className="text-sm">Custom branding</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary mt-0.5" />
                    <span className="text-sm">Negotiable fees</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary mt-0.5" />
                    <span className="text-sm">Dedicated support</span>
                  </li>
                </ul>
                <Button className="w-full mt-6" variant="outline" asChild>
                  <Link href="/#contact">Contact Sales</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">What Our Users Say</h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                name: 'Sarah Johnson',
                role: 'Voice Actor',
                text: 'VoiceLink transformed my career. I went from inconsistent gigs to a steady stream of quality projects.',
                rating: 5
              },
              {
                name: 'Michael Chen',
                role: 'Podcast Producer',
                text: 'Finding the perfect narrator for our series was effortless. The quality of talent here is exceptional.',
                rating: 5
              },
              {
                name: 'Emma Rodriguez',
                role: 'Marketing Director',
                text: 'We use VoiceLink for all our commercial voiceovers. The platform is professional and reliable.',
                rating: 5
              }
            ].map((testimonial, i) => (
              <Card key={i}>
                <CardContent className="pt-6">
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4">{testimonial.text}</p>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary to-secondary text-primary-foreground">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Connect Your Voice?</h2>
          <p className="text-lg mb-8 opacity-90">
            Join thousands of voice actors and clients already using VoiceLink
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/register">Get Started Free</Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
