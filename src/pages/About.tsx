
import React from 'react';
import { motion } from 'framer-motion';
import { PageLayout } from '@/components/layout/PageLayout';

const About = () => {
  const skills = [
    { name: 'React', level: 95 },
    { name: 'TypeScript', level: 90 },
    { name: 'Node.js', level: 85 },
    { name: 'Three.js', level: 80 },
    { name: 'Python', level: 75 },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <PageLayout className="pt-24">
      <div className="container-custom">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto"
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6 gradient-text">
              About Me
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Passionate developer with a love for creating exceptional digital experiences
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <motion.div variants={itemVariants}>
              <h2 className="text-2xl font-heading font-semibold mb-6 text-gray-900 dark:text-white">
                My Story
              </h2>
              <div className="space-y-4 text-gray-600 dark:text-gray-300">
                <p>
                  I'm a full-stack developer with over 5 years of experience creating 
                  web applications that combine beautiful design with powerful functionality.
                </p>
                <p>
                  My journey started with a curiosity about how websites work, and it has 
                  evolved into a passion for building solutions that make a difference in 
                  people's lives.
                </p>
                <p>
                  When I'm not coding, you can find me exploring new technologies, 
                  contributing to open source projects, or enjoying the great outdoors.
                </p>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="glass-card p-8 rounded-2xl">
              <h3 className="text-xl font-heading font-semibold mb-6 text-gray-900 dark:text-white">
                Skills & Technologies
              </h3>
              <div className="space-y-4">
                {skills.map((skill, index) => (
                  <div key={skill.name}>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {skill.name}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <motion.div
                        className="bg-primary-600 h-2 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, delay: index * 0.2 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </PageLayout>
  );
};

export default About;
