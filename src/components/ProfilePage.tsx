import React, { useEffect, useState } from 'react';
import { User, Shield, AlertTriangle, Scale, LogOut, CheckCircle, FileText } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function ProfilePage() {
  const [userName, setUserName] = useState('User');
  const [userEmail, setUserEmail] = useState('');
  const [reports, setReports] = useState<any[]>([]);
  const [legalNoticesCount, setLegalNoticesCount] = useState(0);
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<'dashboard' | 'reports' | 'settings'>('dashboard');

  const [passwordMsg, setPasswordMsg] = useState('');

  useEffect(() => {
    const name = localStorage.getItem('name');
    if (name) {
      setUserName(name);
    }
    const email = localStorage.getItem('email');
    if (email) {
      setUserEmail(email);
    }
    const savedReports = JSON.parse(localStorage.getItem('userReports') || '[]');
    setReports(savedReports);
    const notices = parseInt(localStorage.getItem('legalNotices') || '0', 10);
    setLegalNoticesCount(notices);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('name');
    localStorage.removeItem('email');
    navigate('/login');
  };

  const handlePasswordReset = async () => {
    if (!userEmail) {
      setPasswordMsg('No email address found to send the reset link.');
      return;
    }
    
    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: userEmail })
      });
      
      const data = await res.json();
      if (res.ok) {
        setPasswordMsg(`A password reset link has been sent to ${userEmail}.`);
      } else {
        setPasswordMsg(data.error || 'Failed to send reset link.');
      }
    } catch (err) {
      setPasswordMsg('An error occurred while sending the reset link.');
      console.error(err);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const res = await fetch('/api/users/me', {
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          if (!res.ok) {
            console.error('Failed to delete user on the backend');
          }
        }
      } catch (err) {
        console.error('Error during deletion', err);
      } finally {
        handleLogout();
      }
    }
  };

  return (
    <div className="min-h-screen bg-brand-bg pt-28 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 fade-up is-visible">
        <div className="flex flex-col md:flex-row gap-8">
          
          {/* Sidebar */}
          <div className="w-full md:w-64 shrink-0">
            <div className="bg-brand-bg2 border border-brand-border rounded-2xl p-6 sticky top-28">
              <div className="flex flex-col items-center mb-6">
                <div className="w-20 h-20 bg-brand-accent/20 rounded-full flex items-center justify-center mb-3 border border-brand-accent/30">
                  <User className="w-10 h-10 text-brand-accent" />
                </div>
                <h3 className="font-display font-bold text-lg text-brand-text">{userName}</h3>
                <span className="text-brand-muted text-sm font-sans">Active Member</span>
              </div>
              
              <div className="space-y-1">
                <button 
                  onClick={() => setActiveTab('dashboard')}
                  className={`w-full text-left px-4 py-2 font-sans font-medium rounded-lg transition-colors ${activeTab === 'dashboard' ? 'bg-brand-bg3 text-brand-text' : 'text-brand-muted hover:bg-brand-bg3 hover:text-brand-text'}`}
                >
                  Dashboard
                </button>
                <button 
                  onClick={() => setActiveTab('reports')}
                  className={`w-full text-left px-4 py-2 font-sans rounded-lg transition-colors ${activeTab === 'reports' ? 'bg-brand-bg3 text-brand-text font-medium' : 'text-brand-muted hover:bg-brand-bg3 hover:text-brand-text'}`}
                >
                  My Reports
                </button>
                <button 
                  onClick={() => setActiveTab('settings')}
                  className={`w-full text-left px-4 py-2 font-sans rounded-lg transition-colors ${activeTab === 'settings' ? 'bg-brand-bg3 text-brand-text font-medium' : 'text-brand-muted hover:bg-brand-bg3 hover:text-brand-text'}`}
                >
                  Settings
                </button>
              </div>

              <div className="mt-8 pt-6 border-t border-brand-border">
                <button onClick={handleLogout} className="w-full flex items-center gap-2 text-brand-accent3 hover:text-brand-accent3/80 font-sans font-medium transition-colors">
                  <LogOut className="w-4 h-4" />
                  Log Out
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-grow space-y-8">
            
            {activeTab === 'dashboard' && (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-brand-bg2 border border-brand-border rounded-2xl p-5">
                    <div className="w-10 h-10 bg-brand-accent2/20 text-brand-accent2 rounded-full flex items-center justify-center mb-3">
                      <Shield className="w-5 h-5" />
                    </div>
                    <span className="font-display font-bold text-2xl text-brand-text block mb-1">Protected</span>
                    <span className="text-brand-muted text-sm font-sans">Account Status</span>
                  </div>
                  
                  <div className="bg-brand-bg2 border border-brand-border rounded-2xl p-5">
                    <div className="w-10 h-10 bg-brand-accent/20 text-brand-accent rounded-full flex items-center justify-center mb-3">
                      <AlertTriangle className="w-5 h-5" />
                    </div>
                    <span className="font-display font-bold text-2xl text-brand-text block mb-1">{reports.length}</span>
                    <span className="text-brand-muted text-sm font-sans">Active Reports</span>
                  </div>
                  
                  <div className="bg-brand-bg2 border border-brand-border rounded-2xl p-5">
                    <div className="w-10 h-10 bg-brand-accent4/20 text-brand-accent4 rounded-full flex items-center justify-center mb-3">
                      <Scale className="w-5 h-5" />
                    </div>
                    <span className="font-display font-bold text-2xl text-brand-text block mb-1">{legalNoticesCount}</span>
                    <span className="text-brand-muted text-sm font-sans">Legal Notices Filed</span>
                  </div>
                </div>

                <div className="bg-brand-bg2 border border-brand-border rounded-2xl p-6 md:p-8">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-display font-bold text-2xl text-brand-text">Recent Reports</h3>
                    <button onClick={() => setActiveTab('reports')} className="text-brand-accent font-sans font-medium text-sm hover:underline">View All</button>
                  </div>
                  
                  <div className="space-y-4">
                    {reports.length === 0 ? (
                      <div className="text-center py-8">
                        <FileText className="w-12 h-12 text-brand-muted mx-auto mb-3 opacity-50" />
                        <p className="font-sans text-brand-muted">You have no active reports.</p>
                      </div>
                    ) : (
                      reports.slice(0, 2).map((report, index) => (
                        <div key={index} className="border border-brand-border bg-brand-bg rounded-xl p-5 fade-up is-visible">
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-xs font-mono text-brand-muted">Case ID: GRD-{Math.floor(Math.random() * 90000) + 10000}</span>
                                <span className="bg-brand-accent4/20 border border-brand-accent4/30 text-brand-accent4 px-2 py-0.5 rounded-full text-xs font-sans font-bold">IN PROGRESS</span>
                              </div>
                              <h4 className="font-sans font-bold text-brand-text">{report.title || 'Reported Incident'}</h4>
                            </div>
                            <span className="text-brand-muted text-xs font-sans">Just now</span>
                          </div>
                          <p className="font-sans text-sm text-brand-muted mb-4">
                            {report.description || 'Report filed and awaiting review.'}
                          </p>
                          <div className="w-full bg-brand-bg3 rounded-full h-2 mb-2">
                            <div className="bg-brand-accent4 h-2 rounded-full" style={{ width: '10%' }}></div>
                          </div>
                          <span className="text-xs font-sans text-brand-muted block text-right">Step 1 of 3: Verification</span>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </>
            )}

            {activeTab === 'reports' && (
              <div className="bg-brand-bg2 border border-brand-border rounded-2xl p-6 md:p-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-display font-bold text-2xl text-brand-text">All Reports & Notices</h3>
                </div>
                
                <div className="space-y-4">
                  {reports.length === 0 ? (
                    <div className="text-center py-8">
                      <FileText className="w-12 h-12 text-brand-muted mx-auto mb-3 opacity-50" />
                      <p className="font-sans text-brand-muted">You have no active reports or notices.</p>
                    </div>
                  ) : (
                    reports.map((report, index) => (
                      <div key={index} className="border border-brand-border bg-brand-bg rounded-xl p-5 fade-up is-visible">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-xs font-mono text-brand-muted">Ref: {Math.floor(Math.random() * 90000) + 10000}</span>
                              <span className="bg-brand-accent4/20 border border-brand-accent4/30 text-brand-accent4 px-2 py-0.5 rounded-full text-xs font-sans font-bold">IN PROGRESS</span>
                            </div>
                            <h4 className="font-sans font-bold text-brand-text">{report.title || 'Reported Incident'}</h4>
                          </div>
                          <span className="text-brand-muted text-xs font-sans">Recently</span>
                        </div>
                        <p className="font-sans text-sm text-brand-muted mb-4">
                          {report.description || 'Details unavailable'}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="bg-brand-bg2 border border-brand-border rounded-2xl p-6 md:p-8 fade-up is-visible">
                <h3 className="font-display font-bold text-2xl text-brand-text mb-6">Account Settings</h3>
                
                <div className="space-y-6">
                  <div>
                    <label className="block font-sans text-sm font-medium text-brand-text mb-2">Display Name</label>
                    <input 
                      type="text" 
                      defaultValue={userName}
                      disabled
                      className="w-full bg-brand-bg border border-brand-border rounded-xl px-4 py-3 text-brand-text font-sans opacity-70 cursor-not-allowed" 
                    />
                    <p className="text-brand-muted text-xs font-sans mt-2">Display name cannot be changed directly at this moment.</p>
                  </div>
                  
                  <div>
                    <label className="block font-sans text-sm font-medium text-brand-text mb-2">Email Address</label>
                    <input 
                      type="email" 
                      value={userEmail || ''}
                      disabled
                      readOnly
                      className="w-full bg-brand-bg border border-brand-border rounded-xl px-4 py-3 text-brand-text font-sans opacity-70 cursor-not-allowed" 
                    />
                  </div>

                  <div className="pt-6 border-t border-brand-border">
                    <h4 className="font-sans font-bold text-brand-text mb-4">Security</h4>
                    <button 
                      onClick={handlePasswordReset}
                      className="bg-brand-bg3 border border-brand-border hover:bg-brand-border px-4 py-2 rounded-lg font-sans text-sm text-brand-text transition-colors">
                      Change Password
                    </button>
                    {passwordMsg && <p className="text-brand-accent mt-2 text-sm font-sans">{passwordMsg}</p>}
                  </div>

                  <div className="pt-6 border-t border-brand-border">
                    <h4 className="font-sans font-bold text-red-500 mb-4">Danger Zone</h4>
                    <button 
                      onClick={handleDeleteAccount}
                      className="border border-red-500/50 text-red-500 hover:bg-red-500/10 px-4 py-2 rounded-lg font-sans text-sm transition-colors">
                      Delete Account
                    </button>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
