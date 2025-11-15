'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getUser, getUserById, getVoiceActorProfile } from '@/lib/auth';
import { createOrGetConversation } from '@/lib/messaging';
import { Star, DollarSign, Play, MessageSquare, Briefcase } from 'lucide-react';

export default function VoiceActorProfilePage() {
  const router = useRouter();
  const params = useParams();
  const [currentUser, setCurrentUser] = useState(getUser());
  const [actor, setActor] = useState<any>(null);

  useEffect(() => {
    const id = params.id as string;
    const user = getUserById(id);
    if (!user || user.userType !== 'voice_actor') {
      router.push('/browse');
      return;
    }

    const profile = getVoiceActorProfile(id);
    setActor({ ...user, profile });
  }, [params, router]);

  const handleContact = () => {
    if (!currentUser || !actor) {
      router.push('/login');
      return;
    }

    const convId = createOrGetConversation(
      currentUser.id,
      currentUser.name,
      actor.id,
      actor.name
    );

    router.push('/messages');
  };

  const handleHire = () => {
    if (!currentUser) {
      router.push('/login');
      return;
    }
    // In production, this would open a project creation modal
    alert(`Hire functionality would open a project form for ${actor.name}`);
  };

  if (!actor || !actor.profile) return null;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-24 pb-12 px-4">
        <div className="container mx-auto max-w-5xl">
          <Card>
            <CardContent className="pt-8">
              <div className="flex flex-col md:flex-row gap-8">
                <div className="flex-shrink-0">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-primary-foreground text-4xl font-bold">
                    {actor.name.charAt(0)}
                  </div>
                </div>

                <div className="flex-1">
                  <h1 className="text-3xl font-bold mb-2">{actor.name}</h1>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-1">
                      <Star className="h-5 w-5 fill-primary text-primary" />
                      <span className="font-semibold">4.9</span>
                      <span className="text-muted-foreground">(24 reviews)</span>
                    </div>
                    <div className="flex items-center gap-1 font-semibold text-lg">
                      <DollarSign className="h-5 w-5" />
                      {actor.profile.rate}/hr
                    </div>
                  </div>

                  <p className="text-muted-foreground mb-6">{actor.profile.experience} of experience</p>

                  <div className="flex gap-2 mb-6">
                    <Button onClick={handleHire}>
                      <Briefcase className="mr-2 h-4 w-4" />
                      Hire Now
                    </Button>
                    <Button variant="outline" onClick={handleContact}>
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Contact
                    </Button>
                  </div>
                </div>
              </div>

              <div className="space-y-6 mt-8">
                <div>
                  <h2 className="text-xl font-semibold mb-3">About</h2>
                  <p className="text-muted-foreground leading-relaxed">{actor.profile.bio}</p>
                </div>

                <div>
                  <h2 className="text-xl font-semibold mb-3">Specialties</h2>
                  <div className="flex flex-wrap gap-2">
                    {actor.profile.specialties.map((specialty: string) => (
                      <Badge key={specialty} variant="secondary">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h2 className="text-xl font-semibold mb-3">Languages</h2>
                  <div className="flex flex-wrap gap-2">
                    {actor.profile.languages.map((language: string) => (
                      <Badge key={language} variant="outline">
                        {language}
                      </Badge>
                    ))}
                  </div>
                </div>

                {actor.profile.demos.length > 0 && (
                  <div>
                    <h2 className="text-xl font-semibold mb-3">Demo Reel</h2>
                    <div className="grid md:grid-cols-2 gap-4">
                      {actor.profile.demos.map((demo: any) => (
                        <div key={demo.id} className="flex items-center gap-3 p-4 rounded-lg bg-muted">
                          <Play className="h-6 w-6 text-primary" />
                          <div className="flex-1">
                            <div className="font-medium">{demo.title}</div>
                            <div className="text-sm text-muted-foreground">
                              {demo.category} • {Math.floor(demo.duration / 60)}:{(demo.duration % 60).toString().padStart(2, '0')}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
