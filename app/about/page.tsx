import { Metadata } from 'next';
import { Bio } from '@/components/bio';
import { Experience } from '@/components/experience';
import { Skills } from '@/components/skills';
import { Education } from '@/components/education';
import { Contact } from '@/components/contact';

export const metadata: Metadata = {
  title: 'About Me | Jing Lee',
  description: 'Learn more about Jing Lee, a Frontend Developer based in Tokyo.',
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="flex flex-col md:flex-row gap-8 mb-12">
        <div className="flex-shrink-0">
          <div className="w-48 h-48 mx-auto md:mx-0 overflow-hidden rounded-full relative">
            <img
              src="/images/image.png"
              alt="Jing Lee"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div>
          <Bio />
        </div>
      </div>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Experience</h2>
        <Experience />
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Technical Skills</h2>
        <Skills />
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Education & Languages</h2>
        <Education />
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Contact</h2>
        <Contact />
      </section>
    </div>
  );
}