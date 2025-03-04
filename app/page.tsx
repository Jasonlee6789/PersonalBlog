import { Bio } from '@/components/bio';
import { Experience } from '@/components/experience';
import { Skills } from '@/components/skills';
import { Education } from '@/components/education';
import { Contact } from '@/components/contact';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-cyan-800 to-teal-700 relative overflow-hidden">
      {/* 科技感背景动画 */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]" />
        <div className="absolute inset-0 opacity-50">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full animate-float"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${Math.random() * 300 + 50}px`,
                height: `${Math.random() * 300 + 50}px`,
                background: `radial-gradient(circle, rgba(56,189,248,0.1) 0%, rgba(56,189,248,0) 70%)`,
                '--float-duration': `${Math.random() * 10 + 5}s`,
              } as React.CSSProperties}
            />
          ))}
        </div>
      </div>

      {/* 主要内容 */}
      <div className="container mx-auto px-4 py-8 max-w-2xl relative">
        <div className="backdrop-blur-sm bg-white/90 rounded-2xl p-8 shadow-xl">
          <div className="flex flex-col md:flex-row gap-8 mb-12">
            <div className="flex-shrink-0">
              <div className="w-48 h-48 mx-auto md:mx-0 overflow-hidden rounded-full relative border-4 border-cyan-200 shadow-lg">
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

          <section className="mb-12 bg-white/50 rounded-xl p-6 backdrop-blur-sm">
            <h2 className="text-2xl font-bold mb-4 text-cyan-900">Experience</h2>
            <Experience />
          </section>

          <section className="mb-12 bg-white/50 rounded-xl p-6 backdrop-blur-sm">
            <h2 className="text-2xl font-bold mb-4 text-cyan-900">Technical Skills</h2>
            <Skills />
          </section>

          <section className="mb-12 bg-white/50 rounded-xl p-6 backdrop-blur-sm">
            <h2 className="text-2xl font-bold mb-4 text-cyan-900">Education & Languages</h2>
            <Education />
          </section>

          <section className="mb-12 bg-white/50 rounded-xl p-6 backdrop-blur-sm">
            <h2 className="text-2xl font-bold mb-4 text-cyan-900">Contact</h2>
            <Contact />
          </section>
        </div>
      </div>
    </div>
  );
}