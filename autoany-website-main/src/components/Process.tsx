import * as React from 'react';
import { Search, Target, Rocket, Workflow, MessageCircle, BarChart3, Database, Link, Settings, Users, Clock, TrendingUp, CheckCircle, Zap, Brain } from 'lucide-react';
import CardSwap, { Card } from './CardSwap';
import SplitText from './SplitText';
import HeroBentoCard from './HeroBentoCard';
import Carousel from './Carousel';

const ProcessSection = () => {
  const processSteps = [
    {
      number: '01',
      title: 'Discover',
      description: 'We analyze your business operations and identify high-impact automation opportunities that align with your goals',
      icon: Search,
    },
    {
      number: '02', 
      title: 'Design',
      description: 'We create custom automation strategies and equip your team with the knowledge to implement AI solutions confidently',
      icon: Target,
    },
    {
      number: '03',
      title: 'Deploy', 
      description: 'We build and implement AI systems that deliver measurable results and continuously optimize performance',
      icon: Rocket,
    }
  ];


  return (
    <section id="process" className="py-16 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-8 relative content-layer">
        
                {/* Main Header */}
        <div className="text-left mb-0">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight tracking-tight text-white mb-4 font-heading text-contrast">
          The AutoAny Process
        </h2>
        <div className="w-1/2 mb-0">
          <HeroBentoCard
            text="A clear, step-by-step approach that discovers opportunities, designs the right solution, and deploys automations that deliver measurable results — side by side with your team."
            enableSpotlight={true}
            enableTilt={true}
            enableMagnetism={true}
            clickEffect={true}
            spotlightRadius={200}
            particleCount={50}
            glowColor="#41B8D5"
            style={{
              fontSize: "14px",
              lineHeight: "1.5",
              margin: 0,
              fontWeight: "400",
              color: "#9CA3AF"
            }}
          />
        </div>
      </div>

      {/* Process Steps Section */}
      <div className="mb-0">

        {/* Process Steps CardSwap with Problems We Solve */}
        <div className="mt-8 relative">
            {/* Left Side - Problems Carousel */}
            <div className="w-1/2 pr-4">
              <Carousel
                items={[
                  {
                    title: "Manual Work Overload",
                    description: "Your team spends hours on repetitive tasks that should be automated — from copy-pasting data to manually sending follow-ups. This drains focus, delays projects, and keeps people from the strategic work that actually grows the business.",
                    id: 1,
                    icon: <Search className="carousel-icon" />,
                  },
                  {
                    title: "Disconnected Tools",
                    description: "Your CRM, marketing platform, and operations software don't talk to each other. Data silos create errors, wasted time, and missed insights — making it harder to respond quickly or make informed business decisions.",
                    id: 2,
                    icon: <Link className="carousel-icon" />,
                  },
                  {
                    title: "Missed Growth Opportunities",
                    description: "When workflows are clunky and slow, opportunities slip away. Whether it's delayed customer responses or bottlenecks in onboarding, inefficiencies directly cost you revenue and damage customer trust.",
                    id: 3,
                    icon: <Target className="carousel-icon" />,
                  },
                ]}
                baseWidth={400}
                autoplay={true}
                autoplayDelay={4000}
                pauseOnHover={true}
                loop={true}
                round={false}
                showHeading={true}
                headingText="Problems We Solve"
              />
            </div>

            {/* Right Side - Enhanced CardSwap */}
            <div className="w-1/2 absolute top-1/2 right-8 transform -translate-y-1/2">
              <CardSwap
                width={450}
                height={350}
                cardDistance={60}
                verticalDistance={70}
                delay={5000}
                pauseOnHover={false}
                skewAmount={6}
                easing="elastic"
              >
                <Card className="discover-card">
                  <div className="card-header">
                    <h3 className="card-title">
                      Discover
                      <Search className="card-icon" />
                    </h3>
                  </div>
                  
                  <div className="card-content">
                    <p className="card-description">
                      We analyze your business operations and identify high-impact automation opportunities that align with your goals
                    </p>
                    
                    <div className="metrics-grid">
                      <div className="metric">
                        <Clock className="metric-icon" />
                        <span className="metric-value">2-3 Days</span>
                        <span className="metric-label">Analysis</span>
                      </div>
                      <div className="metric">
                        <Brain className="metric-icon" />
                        <span className="metric-value">15+</span>
                        <span className="metric-label">Opportunities</span>
                      </div>
                    </div>
                    
                    <div className="key-benefits">
                      <div className="benefit">
                        <CheckCircle className="benefit-icon" />
                        <span>Process Mapping</span>
                      </div>
                      <div className="benefit">
                        <CheckCircle className="benefit-icon" />
                        <span>ROI Analysis</span>
                      </div>
                    </div>
                  </div>
                </Card>

                <Card className="design-card">
                  <div className="card-header">
                    <h3 className="card-title">
                      Design
                      <Target className="card-icon" />
                    </h3>
                  </div>
                  
                  <div className="card-content">
                    <p className="card-description">
                      We create custom automation strategies and equip your team with the knowledge to implement AI solutions confidently
                    </p>
                    
                    <div className="metrics-grid">
                      <div className="metric">
                        <Users className="metric-icon" />
                        <span className="metric-value">Team</span>
                        <span className="metric-label">Training</span>
                      </div>
                      <div className="metric">
                        <Zap className="metric-icon" />
                        <span className="metric-value">Custom</span>
                        <span className="metric-label">Strategy</span>
                      </div>
                    </div>
                    
                    <div className="key-benefits">
                      <div className="benefit">
                        <CheckCircle className="benefit-icon" />
                        <span>Blueprint Design</span>
                      </div>
                      <div className="benefit">
                        <CheckCircle className="benefit-icon" />
                        <span>Knowledge Transfer</span>
                      </div>
                    </div>
                  </div>
                </Card>

                <Card className="deploy-card">
                  <div className="card-header">
                    <h3 className="card-title">
                      Deploy
                      <Rocket className="card-icon" />
                    </h3>
                  </div>
                  
                  <div className="card-content">
                    <p className="card-description">
                      We build and implement AI systems that deliver measurable results and continuously optimize performance
                    </p>
                    
                    <div className="metrics-grid">
                      <div className="metric">
                        <TrendingUp className="metric-icon" />
                        <span className="metric-value">40%</span>
                        <span className="metric-label">Efficiency</span>
                      </div>
                      <div className="metric">
                        <BarChart3 className="metric-icon" />
                        <span className="metric-value">24/7</span>
                        <span className="metric-label">Monitoring</span>
                      </div>
                    </div>
                    
                    <div className="key-benefits">
                      <div className="benefit">
                        <CheckCircle className="benefit-icon" />
                        <span>Live Implementation</span>
                      </div>
                      <div className="benefit">
                        <CheckCircle className="benefit-icon" />
                        <span>Performance Tracking</span>
                      </div>
                    </div>
                  </div>
                </Card>
              </CardSwap>
            </div>
          </div>
        </div>




      </div>
    </section>
  );
};

export default ProcessSection;