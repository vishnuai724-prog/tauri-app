import { useState, useEffect } from 'react';
import { FlaskConical, Eye, EyeOff, Microscope, TestTube2, BarChart3, Shield, Zap, ChevronLeft, ChevronRight, Database, Network } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ModeToggle } from '@/shared/components/ModeToggle';
import { cn } from '@/lib/utils';
import { useLoginForm } from '../hooks/useLoginForm';
import { useAuthStore } from '../store/useAuthStore';
import { useNavigate, Navigate, Link } from 'react-router-dom';

interface LoginPageProps {
  onLoginSuccess?: () => void;
}

const carouselItems = [
  {
    icon: TestTube2,
    tag: 'Sample Management',
    title: 'Real-Time Specimen Tracking',
    description: 'Track sample chain-of-custody, storage location, and testing status in real-time across lab units.',
    gradient: 'from-blue-600 to-sky-500',
  },
  {
    icon: Microscope,
    tag: 'Workflow Automation',
    title: 'Instrument Data Integration',
    description: 'Interface directly with analytical instruments to eliminate manual entry errors & boost lab output.',
    gradient: 'from-sky-500 to-blue-500',
  },
  {
    icon: BarChart3,
    tag: 'Analytics & Reporting',
    title: 'Compliance & Audit Trail',
    description: 'Generate instant PDF/Excel compliance reports backed by comprehensive, tamper-proof audit trails.',
    gradient: 'from-blue-500 to-sky-600',
  },
  {
    icon: Shield,
    tag: 'Quality Assurance',
    title: 'ISO/IEC 17025 Ready',
    description: 'Enforce standard operating procedures, quality control metrics, and accreditation guidelines.',
    gradient: 'from-sky-600 to-blue-600',
  },
];

function LabEquipmentSketch() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.07] z-0 mix-blend-overlay">
      {/* Blueprint Grid */}
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="blueprint-grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" className="text-white" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#blueprint-grid)" />
        
        {/* Technical connection lines */}
        <path d="M 150 250 L 250 150 L 400 150 M 400 350 L 300 450 L 200 450 M 500 200 L 600 300 L 600 450" 
              fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="6 6" className="text-white" />
      </svg>

      {/* Floating Blueprint Equipment Sketches */}
      <div className="absolute top-20 -left-10 transform -rotate-12">
        <Microscope className="w-80 h-80 text-white" strokeWidth={0.75} />
      </div>
      <div className="absolute top-1/3 -right-20 transform rotate-12">
        <FlaskConical className="w-96 h-96 text-white" strokeWidth={0.75} />
      </div>
      <div className="absolute bottom-10 left-1/4 transform -rotate-6">
        <TestTube2 className="w-72 h-72 text-white" strokeWidth={0.75} />
      </div>
      <div className="absolute -top-10 right-1/4 transform rotate-12">
        <Database className="w-64 h-64 text-white" strokeWidth={0.75} />
      </div>
      <div className="absolute bottom-1/4 right-20 transform -rotate-12">
        <Network className="w-56 h-56 text-white" strokeWidth={0.75} />
      </div>
    </div>
  );
}

function ProfessionalLabTelemetry() {
  return (
    <div className="relative w-full bg-zinc-950/40 backdrop-blur-xl border border-white/10 rounded-2xl p-4 my-4 shadow-2xl overflow-hidden">
      {/* Decorative Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />

      <div className="relative z-10 flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-sky-500"></span>
          </span>
          <span className="text-[11px] font-bold tracking-wider text-sky-400 uppercase">Live Telemetry Monitor</span>
        </div>
        <span className="text-[10px] font-mono text-sky-300/80">LATENCY: 4ms</span>
      </div>

      {/* Animated Telemetry Graph Line */}
      <div className="relative h-10 w-full my-1 overflow-hidden">
        <svg className="w-full h-full" viewBox="0 0 400 50" preserveAspectRatio="none" fill="none">
          <path
            d="M0 25 Q 50 5, 100 25 T 200 25 T 300 25 T 400 25"
            stroke="rgba(56, 189, 248, 0.2)"
            strokeWidth="2"
          />
          <path
            d="M0 25 Q 50 10, 100 25 T 200 25 T 300 25 T 400 25"
            stroke="url(#graphGradient)"
            strokeWidth="2.5"
            className="animate-pulse"
          />
          <defs>
            <linearGradient id="graphGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="50%" stopColor="#2563eb" />
              <stop offset="100%" stopColor="#0ea5e9" />
            </linearGradient>
          </defs>
        </svg>
        {/* Animated Laser Pulse Dot */}
        <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-2.5 h-2.5 bg-sky-400 rounded-full shadow-[0_0_12px_#38bdf8] animate-ping" />
      </div>

      {/* Live Mini Metrics Grid */}
      <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/10 relative z-10">
        <div>
          <div className="text-[10px] text-zinc-400 font-medium">Daily Samples</div>
          <div className="text-xs xl:text-sm font-extrabold text-white tracking-tight">1,480 <span className="text-[10px] text-sky-400 font-normal">↑</span></div>
        </div>
        <div>
          <div className="text-[10px] text-zinc-400 font-medium">Workflow Run</div>
          <div className="text-xs xl:text-sm font-extrabold text-sky-300 tracking-tight">99.9%</div>
        </div>
        <div>
          <div className="text-[10px] text-zinc-400 font-medium">Compliance</div>
          <div className="text-xs xl:text-sm font-extrabold text-blue-300 tracking-tight">ISO 17025</div>
        </div>
      </div>
    </div>
  );
}

export function LoginPage({ onLoginSuccess }: LoginPageProps) {
  const [activeSlide, setActiveSlide] = useState(0);
  const { loginApi, loginMock, isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  const {
    register,
    errors,
    isSubmitting,
    showPassword,
    togglePassword,
    handleSubmit,
    rootError,
  } = useLoginForm({
    onSubmit: async (data) => {
      try {
        await loginApi({ email: data.email, password: data.password, rememberMe: !!data.rememberMe });
        navigate('/');
        onLoginSuccess?.();
      } catch (err) {
        throw err;
      }
    },
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide(prev => (prev + 1) % carouselItems.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="container relative min-h-svh flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      {/* Mode Toggle in Top Right */}
      <div className="absolute right-4 top-4 md:right-8 md:top-8 z-20">
        <ModeToggle />
      </div>

      {/* Left Branding Panel (Dark/Primary Accent) */}
      <div 
        className="relative hidden h-full flex-col p-12 text-white lg:flex overflow-hidden"
        style={{ background: 'linear-gradient(135deg,#071e3d 0%,#0a2463 35%,#1565c0 68%,#0288d1 100%)' }}
      >
        <LabEquipmentSketch />
        
        {/* Subtle Ambient Background Gradients for the Blue Theme */}
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full"
          style={{ background: 'radial-gradient(circle,rgba(56,189,248,.10),transparent)' }} />
        <div className="absolute top-1/2 -right-40 w-[30rem] h-[30rem] rounded-full"
          style={{ background: 'radial-gradient(circle,rgba(37,99,235,.10),transparent)' }} />

        {/* 1. Logo (Top) */}
        <div className="relative z-20 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 shadow-lg">
            <FlaskConical className="h-6 w-6 text-sky-400" />
          </div>
          <div>
            <div className="text-2xl font-bold tracking-wide">QLIMS</div>
            <div className="text-sky-400 text-[10px] font-medium tracking-[0.18em] uppercase">Enterprise</div>
          </div>
        </div>

        {/* 2. Hero & Animated Feature Carousel (Middle) */}
        <div className="relative z-20 max-w-xl my-auto">
          <h1 className="text-4xl xl:text-5xl font-extrabold leading-tight mb-3">
            Quality Laboratory
            <span className="block text-sky-400 mt-1">Information System</span>
          </h1>
          <p className="text-zinc-200 text-sm xl:text-base mb-6 leading-relaxed max-w-md">
            Streamline lab operations, ensure compliance, and drive data-driven decisions — all from one unified platform.
          </p>

          {/* Professional Animated Telemetry Monitor */}
          <ProfessionalLabTelemetry />

          {/* Animated Feature Carousel Card */}
          {(() => {
            const currentSlide = (carouselItems[activeSlide] ?? carouselItems[0])!;
            const Icon = currentSlide.icon;
            return (
              <div className="relative bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-5 shadow-2xl transition-all duration-500 hover:border-white/20 overflow-hidden">
                <div className="absolute -right-10 -bottom-10 w-36 h-36 bg-sky-500/10 rounded-full blur-2xl pointer-events-none" />

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-sky-300 bg-sky-500/20 border border-sky-400/30 px-2.5 py-0.5 rounded-full">
                      {currentSlide.tag}
                    </span>

                    {/* Navigation Controls */}
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => setActiveSlide(prev => (prev === 0 ? carouselItems.length - 1 : prev - 1))}
                        className="w-6 h-6 rounded-md bg-white/5 hover:bg-white/10 text-white flex items-center justify-center transition-colors border border-white/5"
                        aria-label="Previous Slide"
                      >
                        <ChevronLeft className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setActiveSlide(prev => (prev + 1) % carouselItems.length)}
                        className="w-6 h-6 rounded-md bg-white/5 hover:bg-white/10 text-white flex items-center justify-center transition-colors border border-white/5"
                        aria-label="Next Slide"
                      >
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <div key={activeSlide} className="animate-in fade-in zoom-in-95 duration-300 flex items-start gap-3.5">
                    <div className={cn(
                      'w-10 h-10 rounded-xl bg-linear-to-br flex items-center justify-center shrink-0 shadow-lg border border-white/10',
                      currentSlide.gradient
                    )}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white mb-0.5">
                        {currentSlide.title}
                      </h3>
                      <p className="text-zinc-200 text-xs leading-relaxed">
                        {currentSlide.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 mt-4">
                    {carouselItems.map((_, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setActiveSlide(idx)}
                        className={cn(
                          'h-1.5 rounded-full transition-all duration-300',
                          idx === activeSlide ? 'w-6 bg-sky-400' : 'w-1.5 bg-white/20 hover:bg-white/40'
                        )}
                        aria-label={`Go to slide ${idx + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            );
          })()}
        </div>

        {/* 3. LIMS Highlight Badge (Bottom) */}
        <div className="relative z-20 mt-auto">
          <div className="flex items-center gap-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl px-4 py-3 inline-flex">
            <div className="w-8 h-8 rounded-full bg-linear-to-br from-blue-500 to-sky-400 flex items-center justify-center border-2 border-white/10">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="text-white text-xs font-semibold">Intelligent Lab Management</div>
              <div className="text-zinc-300 text-xs">Accelerating turnaround times & accuracy</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Login Form Panel */}
      <div className="lg:p-8 flex items-center justify-center w-full h-full bg-background">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]">
          
          <div className="flex flex-col space-y-2 text-center mb-4">
            <div className="flex lg:hidden justify-center items-center gap-2 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-blue-600 text-white shadow-sm">
                <FlaskConical className="h-6 w-6" />
              </div>
              <span className="text-2xl font-bold tracking-wide">QLIMS</span>
            </div>
            <h1 className="text-2xl font-semibold tracking-tight text-foreground">
              Welcome back
            </h1>
            <p className="text-sm text-muted-foreground">
              Enter your credentials to sign in to your account
            </p>
          </div>

          <div className="grid gap-6">
            <form onSubmit={handleSubmit} noValidate>
              <div className="grid gap-5">
                
                {rootError && (
                  <div className="flex items-center gap-2 rounded-md bg-destructive/15 p-3 text-sm text-destructive border border-destructive/20">
                    <svg className="h-4 w-4 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
                    </svg>
                    <span className="font-medium">{rootError}</span>
                  </div>
                )}

                <div className="grid gap-2">
                  <Label htmlFor="email" className="font-medium">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    autoCapitalize="none"
                    autoComplete="email"
                    autoCorrect="off"
                    disabled={isSubmitting}
                    className={cn(
                      "h-11 bg-muted/30 border-muted-foreground/20",
                      errors.email && "border-destructive focus-visible:ring-destructive"
                    )}
                    {...register('email')}
                  />
                  {errors.email && <p className="text-[13px] font-medium text-destructive">{errors.email.message}</p>}
                </div>

                <div className="grid gap-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password" className="font-medium">Password</Label>
                    <Link to="#" className="text-sm font-medium text-blue-600 hover:underline hover:text-blue-700 transition-colors">
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      autoComplete="current-password"
                      disabled={isSubmitting}
                      className={cn(
                        "h-11 bg-muted/30 border-muted-foreground/20 pr-10",
                        errors.password && "border-destructive focus-visible:ring-destructive"
                      )}
                      {...register('password')}
                    />
                    <button
                      type="button"
                      onClick={togglePassword}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      tabIndex={-1}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {errors.password && <p className="text-[13px] font-medium text-destructive">{errors.password.message}</p>}
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    id="remember"
                    type="checkbox"
                    className="h-4 w-4 rounded border-input bg-transparent accent-blue-600 cursor-pointer"
                    {...register('rememberMe')}
                    disabled={isSubmitting}
                  />
                  <Label
                    htmlFor="remember"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                  >
                    Remember me
                  </Label>
                </div>

                <Button disabled={isSubmitting} type="submit" className="w-full h-11 font-medium bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-600/20">
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Signing in...
                    </span>
                  ) : (
                    "Sign In"
                  )}
                </Button>
              </div>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="grid gap-2">
              <Button 
                variant="outline" 
                type="button" 
                disabled={isSubmitting}
                onClick={() => {
                  loginMock({ id: '1', email: 'admin@qlims.com', name: 'Admin', role: 'Lab Director' }, 'demo-token');
                  navigate('/');
                }}
                className="w-full h-11 bg-background hover:bg-muted"
              >
                Quick Demo Login (Bypass API)
              </Button>
              <Button variant="outline" type="button" disabled={isSubmitting} className="w-full h-11 bg-background hover:bg-muted">
                <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
                Google SSO
              </Button>
            </div>
          </div>

          <p className="px-8 text-center text-sm text-muted-foreground">
            By clicking continue, you agree to our{" "}
            <Link to="#" className="underline underline-offset-4 hover:text-blue-600">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link to="#" className="underline underline-offset-4 hover:text-blue-600">
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
