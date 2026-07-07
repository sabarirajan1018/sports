import { Link } from 'react-router-dom';
import { Shield, Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">B</span>
              </div>
              <span className="text-xl font-bold text-white">Bet<span className="text-emerald-400">Pro</span></span>
            </div>
            <p className="text-slate-400 text-sm">
              Your premier destination for sports betting and casino entertainment.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/sportsbook" className="text-slate-400 hover:text-emerald-400 text-sm">Sportsbook</Link></li>
              <li><Link to="/live" className="text-slate-400 hover:text-emerald-400 text-sm">Live Betting</Link></li>
              <li><Link to="/casino" className="text-slate-400 hover:text-emerald-400 text-sm">Casino</Link></li>
              <li><Link to="/promotions" className="text-slate-400 hover:text-emerald-400 text-sm">Promotions</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li><Link to="/help" className="text-slate-400 hover:text-emerald-400 text-sm">Help Center</Link></li>
              <li><Link to="/terms" className="text-slate-400 hover:text-emerald-400 text-sm">Terms of Service</Link></li>
              <li><Link to="/privacy" className="text-slate-400 hover:text-emerald-400 text-sm">Privacy Policy</Link></li>
              <li><Link to="/responsible-gaming" className="text-slate-400 hover:text-emerald-400 text-sm">Responsible Gaming</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-slate-400 text-sm">
                <Mail className="w-4 h-4" /> support@betpro.demo
              </li>
              <li className="flex items-center gap-2 text-slate-400 text-sm">
                <Phone className="w-4 h-4" /> +1 (555) 123-4567
              </li>
              <li className="flex items-center gap-2 text-slate-400 text-sm">
                <MapPin className="w-4 h-4" /> Demo City, DC 00000
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-slate-400 text-sm">
              &copy; 2024 BetPro Demo. All rights reserved.
            </p>
            <div className="flex items-center gap-2 text-amber-400 text-sm bg-amber-400/10 px-4 py-2 rounded-lg">
              <Shield className="w-4 h-4" />
              <span>This is a demo platform for software showcase only. No real money involved.</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
