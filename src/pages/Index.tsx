
import React from 'react';
import { PageLayout } from '@/components/layout/PageLayout';
import { HeroSection } from '@/components/sections/HeroSection';

const Index = () => {
  return (
    <PageLayout>
      <main>
        <HeroSection />
        
        {/* Additional sections can be added here */}
        <section className="py-20 bg-gray-50 dark:bg-gray-800/50">
          <div className="container-custom text-center">
            <h2 className="text-3xl font-heading font-bold mb-8 text-gray-900 dark:text-white">
              Featured Work
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Explore my latest projects and see how I bring ideas to life through code and design.
            </p>
          </div>
        </section>
      </main>
    </PageLayout>
  );
};

export default Index;
