'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { getAllVoiceActors, getUser, type User, type VoiceActorProfile } from '@/lib/auth';
import { createOrGetConversation } from '@/lib/messaging';
import { Search, Star, DollarSign, Mic, Play } from 'lucide-react';

export default function BrowsePage() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [voiceActors, setVoiceActors] = useState<(User & { profile: VoiceActorProfile })[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState<string | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);

  useEffect(() => {
    setCurrentUser(getUser());
    const actors = getAllVoiceActors();
    setVoiceActors(actors);
  }, []);

  const handleContact = (actor: User & { profile: VoiceActorProfile }) => {
    if (!currentUser) {
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

  const handleViewProfile = (actorId: string) => {
    router.push(`/voice-actor/${actorId}`);
  };

  const filteredActors = voiceActors.filter(actor => {
    const matchesSearch = actor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         actor.profile.bio.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = !selectedSpecialty || actor.profile.specialties.includes(selectedSpecialty);
    const matchesLanguage = !selectedLanguage || actor.profile.languages.includes(selectedLanguage);
    return matchesSearch && matchesSpecialty && matchesLanguage;
  });

  const allSpecialties = Array.from(new Set(voiceActors.flatMap(va => va.profile.specialties)));
  const allLanguages = Array.from(new Set(voiceActors.flatMap(va => va.profile.languages)));

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-24 pb-12 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Browse Voice Actors</h1>
            <p className="text-muted-foreground">Find the perfect voice for your project</p>
          </div>

          <div className="grid lg:grid-cols-4 gap-6">
            {/* Filters Sidebar */}
            <aside className="lg:col-span-1 space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Filters</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Search</label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search actors..."
                        className="pl-10"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Specialty</label>
                    <div className="flex flex-wrap gap-2">
                      {allSpecialties.map(specialty => (
                        <Badge
                          key={specialty}
                          variant={selectedSpecialty === specialty ? 'default' : 'outline'}
                          className="cursor-pointer"
                          onClick={() => setSelectedSpecialty(selectedSpecialty === specialty ? null : specialty)}
                        >
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Language</label>
                    <div className="flex flex-wrap gap-2">
                      {allLanguages.map(language => (
                        <Badge
                          key={language}
                          variant={selectedLanguage === language ? 'default' : 'outline'}
                          className="cursor-pointer"
                          onClick={() => setSelectedLanguage(selectedLanguage === language ? null : language)}
                        >
                          {language}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {(selectedSpecialty || selectedLanguage || searchTerm) && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full"
                      onClick={() => {
                        setSearchTerm('');
                        setSelectedSpecialty(null);
                        setSelectedLanguage(null);
                      }}
                    >
                      Clear Filters
                    </Button>
                  )}
                </CardContent>
              </Card>
            </aside>

            {/* Results */}
            <div className="lg:col-span-3 space-y-4">
              <div className="text-sm text-muted-foreground mb-4">
                Found {filteredActors.length} voice actor{filteredActors.length !== 1 ? 's' : ''}
              </div>

              {filteredActors.length === 0 && (
                <Card>
                  <CardContent className="pt-6 text-center">
                    <Mic className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="font-semibold mb-2">No voice actors found</h3>
                    <p className="text-muted-foreground text-sm mb-4">
                      Try adjusting your filters or search terms
                    </p>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSearchTerm('');
                        setSelectedSpecialty(null);
                        setSelectedLanguage(null);
                      }}
                    >
                      Clear All Filters
                    </Button>
                  </CardContent>
                </Card>
              )}

              {filteredActors.map(actor => (
                <Card key={actor.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex gap-6">
                      <div className="flex-shrink-0">
                        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-primary-foreground text-2xl font-bold">
                          {actor.name.charAt(0)}
                        </div>
                      </div>

                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="text-xl font-bold">{actor.name}</h3>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <span>{actor.profile.experience}</span>
                              <span>•</span>
                              <div className="flex items-center gap-1">
                                <Star className="h-4 w-4 fill-primary text-primary" />
                                <span>4.8</span>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center gap-1 font-bold text-lg">
                              <DollarSign className="h-5 w-5" />
                              {actor.profile.rate}/hr
                            </div>
                          </div>
                        </div>

                        <p className="text-muted-foreground mb-4 line-clamp-2">
                          {actor.profile.bio}
                        </p>

                        <div className="mb-4">
                          <div className="text-sm font-medium mb-2">Specialties</div>
                          <div className="flex flex-wrap gap-2">
                            {actor.profile.specialties.map(specialty => (
                              <Badge key={specialty} variant="secondary">
                                {specialty}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div className="mb-4">
                          <div className="text-sm font-medium mb-2">Languages</div>
                          <div className="flex flex-wrap gap-2">
                            {actor.profile.languages.map(language => (
                              <Badge key={language} variant="outline">
                                {language}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        {actor.profile.demos.length > 0 && (
                          <div className="mb-4">
                            <div className="text-sm font-medium mb-2">Demo Reel ({actor.profile.demos.length} samples)</div>
                            <div className="flex gap-2 overflow-x-auto">
                              {actor.profile.demos.slice(0, 3).map(demo => (
                                <div key={demo.id} className="flex items-center gap-2 px-3 py-2 rounded-md bg-muted whitespace-nowrap">
                                  <Play className="h-4 w-4 text-primary" />
                                  <span className="text-sm">{demo.title}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        <div className="flex gap-2">
                          <Button onClick={() => handleContact(actor)}>Contact</Button>
                          <Button variant="outline" onClick={() => handleViewProfile(actor.id)}>View Profile</Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
