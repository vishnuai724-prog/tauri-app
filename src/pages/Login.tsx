import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/useAuthStore";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { FlaskConical, Fingerprint, Network } from "lucide-react";
import bgImage from "@/assets/login-bg.jpg";

const loginSchema = z.object({
  email: z.string().email({ error: "Please enter a valid email address." }),
  password: z.string().min(6, { error: "Password must be at least 6 characters." }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function Login() {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    // Simulate an API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Dummy authentication success
    login({
      id: "usr_123",
      name: "Dr. Admin",
      email: data.email,
      role: "admin",
    });

    toast.success("Successfully logged in to QLIMS");
    navigate("/");
  };

  return (
    <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2 bg-slate-950">
      {/* Left side: Beautiful AI Background */}
      <div className="relative hidden lg:block overflow-hidden">
        <div className="absolute inset-0 z-10 bg-linear-to-r from-blue-950/40 to-slate-950/80 mix-blend-multiply" />
        <div className="absolute inset-0 z-20 bg-linear-to-t from-slate-950 via-transparent to-transparent opacity-80" />
        <img
          src={bgImage}
          alt="Laboratory Network"
          className="absolute inset-0 h-full w-full object-cover scale-105 animate-in fade-in zoom-in duration-1000"
        />

        {/* Floating Decorative Elements */}
        <div className="absolute bottom-12 left-12 z-30 space-y-4">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-blue-500/20 p-2 backdrop-blur-md border border-blue-400/30">
              <Network className="w-8 h-8 text-cyan-400" />
            </div>
            <h1 className="text-4xl font-extrabold text-white tracking-tight">QLIMS</h1>
          </div>
          <p className="text-lg text-slate-300 max-w-md font-medium leading-relaxed">
            The next generation of laboratory information management. Connect, analyze, and
            accelerate your clinical workflows.
          </p>
        </div>
      </div>

      {/* Right side: Login Panel */}
      <div className="flex flex-col items-center justify-center p-6 md:p-8 lg:p-12">
        <div className="w-full max-w-md space-y-8 animate-in slide-in-from-bottom-8 fade-in duration-700">
          <div className="text-center lg:text-left">
            <div className="flex lg:hidden justify-center mb-6">
              <div className="p-3 bg-blue-900/30 border border-blue-500/20 rounded-2xl shadow-[0_0_20px_rgba(59,130,246,0.15)]">
                <FlaskConical className="w-8 h-8 text-cyan-400" />
              </div>
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-white">Welcome back</h2>
            <p className="text-sm text-slate-400 mt-2">
              Please authenticate to securely access the clinical portal.
            </p>
          </div>

          <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 p-8 rounded-2xl shadow-2xl">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-300 font-medium">
                  Network Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="tech@laboratory.com"
                  className="h-10 bg-slate-950/50 border-slate-700 text-white placeholder:text-slate-500 focus-visible:ring-cyan-500 text-sm"
                  {...register("email")}
                />
                {errors.email && <p className="text-xs text-red-400">{errors.email.message}</p>}
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-slate-300 font-medium">
                    Passphrase
                  </Label>
                  <a
                    href="#"
                    className="text-xs text-cyan-400 hover:text-cyan-300 transition-colors"
                  >
                    Recovery options
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="h-10 bg-slate-950/50 border-slate-700 text-white placeholder:text-slate-500 focus-visible:ring-cyan-500 text-sm"
                  {...register("password")}
                />
                {errors.password && (
                  <p className="text-xs text-red-400">{errors.password.message}</p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full h-10 mt-2 bg-linear-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white border-0 shadow-[0_0_15px_rgba(6,182,212,0.4)] transition-all hover:shadow-[0_0_25px_rgba(6,182,212,0.6)]"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  "Authenticating..."
                ) : (
                  <>
                    <Fingerprint className="w-4 h-4 mr-2" />
                    Secure Login
                  </>
                )}
              </Button>
            </form>
          </div>

          <p className="text-center text-xs text-slate-500">
            Protected by enterprise-grade encryption. Unauthorized access is strictly prohibited.
          </p>
        </div>
      </div>
    </div>
  );
}
