'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { getUser, getVoiceActorProfile, saveVoiceActorProfile, getClientProfile, saveClientProfile, type VoiceActorProfile, type ClientProfile } from '@/lib/auth';
import { Upload, X, Plus } from 'lucide-react';

const SPECIALTIES = ['Commercial', 'Narration', 'Character', 'Audiobook', 'Documentary', 'E-Learning', 'IVR', 'Video Game', 'Animation', 'Podcast'];
const LANGUAGES = ['English', 'Spanish', 'French', 'German', 'Italian', 'Portuguese', 'Chinese', 'Japanese', 'Korean', 'Arabic'];

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState(getUser());
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Voice Actor State
  const [voiceProfile, setVoiceProfile] = useState<VoiceActorProfile>({
    userId: user?.id || '',
    bio: '',
    specialties: [],
    languages: [],
    experience: '',
    rate: 0,
    demos: [],
  });

  // Client State
  const [clientProfile, setClientProfile] = useState<ClientProfile>({
    userId: user?.id || '',
    company: '',
    bio: '',
  });

  const [newDemo, setNewDemo] = useState({ title: '', category: 'Commercial' });

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }

    if (user.userType === 'voice_actor') {
      const profile = getVoiceActorProfile(user.id);
      if (profile) setVoiceProfile(profile);
    } else {
      const profile = getClientProfile(user.id);
      if (profile) setClientProfile(profile);
    }
  }, [user, router]);

  const handleVoiceActorSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      saveVoiceActorProfile(voiceProfile);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleClientSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      saveClientProfile(clientProfile);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const toggleSpecialty = (specialty: string) => {
    setVoiceProfile(prev => ({
      ...prev,
      specialties: prev.specialties.includes(specialty)
        ? prev.specialties.filter(s => s !== specialty)
        : [...prev.specialties, specialty]
    }));
  };

  const toggleLanguage = (language: string) => {
    setVoiceProfile(prev => ({
      ...prev,
      languages: prev.languages.includes(language)
        ? prev.languages.filter(l => l !== language)
        : [...prev.languages, language]
    }));
  };

  const addDemo = () => {
    if (newDemo.title) {
      const demo = {
        id: Date.now().toString(),
        title: newDemo.title,
        url: `/placeholder.svg?height=100&width=100&query=audio+waveform+${encodeURIComponent(newDemo.title)}`,
        duration: Math.floor(Math.random() * 180) + 30,
        category: newDemo.category,
      };
      setVoiceProfile(prev => ({
        ...prev,
        demos: [...prev.demos, demo]
      }));
      setNewDemo({ title: '', category: 'Commercial' });
    }
  };

  const removeDemo = (id: string) => {
    setVoiceProfile(prev => ({
      ...prev,
      demos: prev.demos.filter(d => d.id !== id)
    }));
  };

  if (!user) return null;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-24 pb-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">My Profile</h1>
            <p className="text-muted-foreground">
              {user.userType === 'voice_actor' 
                ? 'Complete your profile to start getting hired' 
                : 'Manage your client information'}
            </p>
          </div>

          {success && (
            <div className="mb-6 p-4 rounded-md bg-primary/10 text-primary">
              Profile updated successfully!
            </div>
          )}

          {user.userType === 'voice_actor' ? (
            <form onSubmit={handleVoiceActorSubmit} className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Basic Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="bio">Professional Bio</Label>
                    <Textarea
                      id="bio"
                      rows={5}
                      placeholder="Tell potential clients about your voice, experience, and what makes you unique..."
                      value={voiceProfile.bio}
                      onChange={(e) => setVoiceProfile({ ...voiceProfile, bio: e.target.value })}
                      required
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="experience">Years of Experience</Label>
                      <Input
                        id="experience"
                        placeholder="e.g., 5+ years"
                        value={voiceProfile.experience}
                        onChange={(e) => setVoiceProfile({ ...voiceProfile, experience: e.target.value })}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="rate">Hourly Rate (USD)</Label>
                      <Input
                        id="rate"
                        type="number"
                        min="0"
                        placeholder="e.g., 150"
                        value={voiceProfile.rate || ''}
                        onChange={(e) => setVoiceProfile({ ...voiceProfile, rate: parseFloat(e.target.value) })}
                        required
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Specialties</CardTitle>
                  <CardDescription>Select all that apply</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {SPECIALTIES.map((specialty) => (
                      <Badge
                        key={specialty}
                        variant={voiceProfile.specialties.includes(specialty) ? 'default' : 'outline'}
                        className="cursor-pointer"
                        onClick={() => toggleSpecialty(specialty)}
                      >
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Languages</CardTitle>
                  <CardDescription>Languages you can perform in</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {LANGUAGES.map((language) => (
                      <Badge
                        key={language}
                        variant={voiceProfile.languages.includes(language) ? 'default' : 'outline'}
                        className="cursor-pointer"
                        onClick={() => toggleLanguage(language)}
                      >
                        {language}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Demo Reel</CardTitle>
                  <CardDescription>Add samples of your work</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {voiceProfile.demos.map((demo) => (
                    <div key={demo.id} className="flex items-center gap-3 p-3 rounded-md bg-muted">
                      <div className="flex-1">
                        <div className="font-medium">{demo.title}</div>
                        <div className="text-sm text-muted-foreground">
                          {demo.category} • {Math.floor(demo.duration / 60)}:{(demo.duration % 60).toString().padStart(2, '0')}
                        </div>
                      </div>
                      <Button
                        type="button"
                        size="sm"
                        variant="ghost"
                        onClick={() => removeDemo(demo.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}

                  <div className="flex gap-2">
                    <Input
                      placeholder="Demo title..."
                      value={newDemo.title}
                      onChange={(e) => setNewDemo({ ...newDemo, title: e.target.value })}
                    />
                    <select
                      className="px-3 py-2 rounded-md border border-input bg-background"
                      value={newDemo.category}
                      onChange={(e) => setNewDemo({ ...newDemo, category: e.target.value })}
                    >
                      {SPECIALTIES.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                    <Button type="button" onClick={addDemo}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Note: In production, you would upload actual audio files. This demo uses placeholder data.
                  </p>
                </CardContent>
              </Card>

              <Button type="submit" size="lg" disabled={loading} className="w-full">
                {loading ? 'Saving...' : 'Save Profile'}
              </Button>
            </form>
          ) : (
            <form onSubmit={handleClientSubmit} className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Client Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="company">Company Name (Optional)</Label>
                    <Input
                      id="company"
                      placeholder="Your company name"
                      value={clientProfile.company}
                      onChange={(e) => setClientProfile({ ...clientProfile, company: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="clientBio">About You</Label>
                    <Textarea
                      id="clientBio"
                      rows={5}
                      placeholder="Tell voice actors about your projects and what you're looking for..."
                      value={clientProfile.bio}
                      onChange={(e) => setClientProfile({ ...clientProfile, bio: e.target.value })}
                      required
                    />
                  </div>
                </CardContent>
              </Card>

              <Button type="submit" size="lg" disabled={loading} className="w-full">
                {loading ? 'Saving...' : 'Save Profile'}
              </Button>
            </form>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
