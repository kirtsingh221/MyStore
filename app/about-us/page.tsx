import { NextPage } from "next";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const teamMembers = [
  {
    name: "Alice Johnson",
    role: "CEO",
    image: "/team/alice.jpg",
  },
  {
    name: "Bob Smith",
    role: "CTO",
    image: "/team/bob.jpg",
  },
  {
    name: "Carol Lee",
    role: "Designer",
    image: "/team/carol.jpg",
  },
];

const About: NextPage = () => {
  return (
    <div className="space-y-24 p-6 md:p-16">
      {/* Hero Section */}
      <section className="text-center max-w-3xl mx-auto space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold">
          About Us
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground">
          We are dedicated to creating seamless digital experiences that empower businesses and users alike. Our passion drives innovation and fosters collaboration.
        </p>
        <Button variant="default" size="lg">
          Join Our Newsletter
        </Button>
      </section>

      {/* Mission Section */}
      <section className="max-w-4xl mx-auto space-y-6">
        <h2 className="text-3xl font-semibold text-center">
          Our Mission
        </h2>
        <p className="text-center text-muted-foreground text-lg">
          To revolutionize the way users interact with technology, blending intuitive design with cutting-edge solutions that deliver measurable impact.
        </p>
      </section>

      {/* Team Section */}
      <section className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-semibold text-center mb-10">
          Meet the Team
        </h2>
        <div className="grid gap-8 md:grid-cols-3">
          {teamMembers.map((member) => (
            <Card key={member.name} className="hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <CardTitle>{member.name}</CardTitle>
                <p className="text-sm text-muted-foreground">{member.role}</p>
              </CardHeader>
              <CardContent className="flex justify-center">
                <Image
                  src={member.image}
                  alt={member.name}
                  width={150}
                  height={150}
                  className="rounded-full"
                />
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Values Section */}
      <section className="max-w-4xl mx-auto space-y-6">
        <h2 className="text-3xl font-semibold text-center">Our Values</h2>
        <div className="grid gap-6 md:grid-cols-3 mt-6">
          <Card className="text-center">
            <CardContent>
              <h3 className="font-bold text-xl mb-2">Integrity</h3>
              <p className="text-muted-foreground">We believe in transparency, honesty, and accountability in everything we do.</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent>
              <h3 className="font-bold text-xl mb-2">Innovation</h3>
              <p className="text-muted-foreground">Constantly pushing boundaries to create cutting-edge solutions for real-world problems.</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent>
              <h3 className="font-bold text-xl mb-2">Collaboration</h3>
              <p className="text-muted-foreground">Fostering teamwork and partnership to achieve greater impact.</p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default About;