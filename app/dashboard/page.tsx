'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { getUser, getVoiceActorProfile, getAllVoiceActors, type User } from '@/lib/auth';
import { Mic, DollarSign, Star, TrendingUp, Plus, Eye, Search } from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [profileComplete, setProfileComplete] = useState(false);

  useEffect(() => {
    const currentUser = getUser();
    if (!currentUser) {
      router.push('/login');
      return;
    }
    setUser(currentUser);

    if (currentUser.userType === 'voice_actor') {
      const profile = getVoiceActorProfile(currentUser.id);
      setProfileComplete(!!(profile && profile.bio && profile.demos.length > 0));
    }
  }, [router]);

  if (!user) return null;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-24 pb-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Welcome back, {user.name}!</h1>
            <p className="text-muted-foreground">
              {user.userType === 'voice_actor' 
                ? 'Manage your voice acting career' 
                : 'Find the perfect voice for your project'}
            </p>
          </div>

          {user.userType === 'voice_actor' && !profileComplete && (
            <Card className="mb-6 border-primary">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1">Complete Your Profile</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Add your bio, specialties, and demo reel to start getting discovered by clients.
                    </p>
                    <Button asChild>
                      <Link href="/profile">Complete Profile</Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {user.userType === 'voice_actor' ? (
            <div className="space-y-6">
              <div className="grid md:grid-cols-4 gap-4">
                <Card>
                  <CardHeader className="pb-3">
                    <CardDescription>Profile Views</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="text-2xl font-bold">247</div>
                      <Eye className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      <TrendingUp className="h-3 w-3 inline mr-1" />
                      +12% this week
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardDescription>Active Projects</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="text-2xl font-bold">3</div>
                      <Mic className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">2 pending delivery</div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardDescription>Total Earnings</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="text-2xl font-bold">$4,250</div>
                      <DollarSign className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">This month: $850</div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardDescription>Rating</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="text-2xl font-bold">4.9</div>
                      <Star className="h-5 w-5 text-primary fill-primary" />
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">Based on 24 reviews</div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { title: 'Commercial Voice Over', client: 'TechCorp Inc.', status: 'In Progress', amount: '$350' },
                      { title: 'Audiobook Narration', client: 'Publishing House', status: 'Delivered', amount: '$1,200' },
                      { title: 'E-Learning Module', client: 'EduTech', status: 'In Progress', amount: '$500' },
                    ].map((project, i) => (
                      <div key={i} className="flex items-center justify-between p-4 rounded-lg bg-muted">
                        <div>
                          <div className="font-medium">{project.title}</div>
                          <div className="text-sm text-muted-foreground">{project.client}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">{project.amount}</div>
                          <div className="text-sm text-muted-foreground">{project.status}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="grid md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="pb-3">
                    <CardDescription>Active Projects</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">2</div>
                    <div className="text-xs text-muted-foreground mt-1">1 awaiting delivery</div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardDescription>Total Spent</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">$3,400</div>
                    <div className="text-xs text-muted-foreground mt-1">Across 8 projects</div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardDescription>Saved Actors</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">12</div>
                    <div className="text-xs text-muted-foreground mt-1">In your favorites</div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Quick Actions</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    <Button size="lg" asChild>
                      <Link href="/browse">
                        <Search className="mr-2 h-5 w-5" />
                        Browse Voice Actors
                      </Link>
                    </Button>
                    <Button size="lg" variant="outline" asChild>
                      <Link href="/browse">
                        <Plus className="mr-2 h-5 w-5" />
                        Post a Project
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Your Projects</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { title: 'YouTube Channel Intro', actor: 'Sarah Johnson', status: 'Delivered', amount: '$200' },
                      { title: 'Corporate Training Video', actor: 'Michael Chen', status: 'In Progress', amount: '$800' },
                    ].map((project, i) => (
                      <div key={i} className="flex items-center justify-between p-4 rounded-lg bg-muted">
                        <div>
                          <div className="font-medium">{project.title}</div>
                          <div className="text-sm text-muted-foreground">Voice Actor: {project.actor}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">{project.amount}</div>
                          <div className="text-sm text-muted-foreground">{project.status}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
