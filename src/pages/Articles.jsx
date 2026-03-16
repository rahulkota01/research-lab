import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Clock, FileText, Beaker, BookOpen, Newspaper } from 'lucide-react';

const categories = [
  { id: 'all', label: 'All' },
  { id: 'tutorial', label: 'Tutorials', color: 'emerald' },
  { id: 'research', label: 'Research Papers', color: 'cyan' },
  { id: 'case-study', label: 'Case Studies', color: 'amber' },
  { id: 'news', label: 'News', color: 'purple' }
];

const articles = [
  {
    id: 1,
    category: 'tutorial',
    title: 'Getting Started with Virtual Lab Bench',
    author: 'RO Ecosystem Team',
    date: 'March 2026',
    excerpt: 'Learn how to set up your first virtual experiment using RO Virtual Lab\'s bench simulation...',
    readTime: '5 min read',
    icon: BookOpen
  },
  {
    id: 2,
    category: 'research',
    title: 'Aspirin Stability Under Extreme Conditions: A Virtual Lab Study',
    author: 'Rahul Kota',
    date: 'March 2026',
    excerpt: 'This study examines the thermal decomposition of acetylsalicylic acid under varying temperature and pH conditions...',
    readTime: '8 min read',
    icon: FileText
  },
  {
    id: 3,
    category: 'tutorial',
    title: 'Understanding 3D Molecular Visualization',
    author: 'RO Ecosystem Team',
    date: 'February 2026',
    excerpt: 'A guide to interpreting CPK-colored 3D molecular structures and their significance in drug discovery...',
    readTime: '4 min read',
    icon: BookOpen
  },
  {
    id: 4,
    category: 'case-study',
    title: 'Caffeine Extraction Simulation: Virtual vs Physical Lab Results',
    author: 'Rahul Kota',
    date: 'February 2026',
    excerpt: 'Comparing AI-simulated caffeine extraction outcomes with published experimental data from literature...',
    readTime: '10 min read',
    icon: Beaker
  },
  {
    id: 5,
    category: 'research',
    title: 'ADMET Prediction Using Large Language Models: Accuracy Analysis',
    author: 'RO Ecosystem Research',
    date: 'January 2026',
    excerpt: 'Evaluating the accuracy of Groq\'s llama-3.3-70b model for predicting ADMET properties compared to validated databases...',
    readTime: '12 min read',
    icon: FileText
  },
  {
    id: 6,
    category: 'news',
    title: 'RO Virtual Lab v3.0: 3D Molecules and Real-Time Simulation',
    author: 'RO Ecosystem Team',
    date: 'March 2026',
    excerpt: 'We\'re excited to announce major updates including interactive 3D molecular visualization powered by Three.js and PubChem conformer data...',
    readTime: '3 min read',
    icon: Newspaper
  }
];

const categoryColors = {
  tutorial: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  research: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
  'case-study': 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  news: 'bg-purple-500/20 text-purple-400 border-purple-500/30'
};

export default function Articles() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredArticles = activeCategory === 'all'
    ? articles
    : articles.filter(a => a.category === activeCategory);

  return (
    <div className="min-h-screen bg-[#0A0E1A] text-white">
      {/* Header */}
      <section className="pt-32 sm:pt-36 md:pt-40 pb-12 sm:pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4">
              Research Articles & Resources
            </h1>
            <p className="text-slate-400 text-sm sm:text-base lg:text-lg">
              Insights from the RO Virtual Lab community
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="pb-6 sm:pb-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-wrap justify-center gap-2 sm:gap-3"
          >
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${activeCategory === cat.id
                  ? 'bg-cyan-500 text-white'
                  : 'bg-[#0F1629] text-slate-400 border border-[#1E2A45] hover:border-cyan-500/50'
                  }`}
              >
                {cat.label}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="pb-16 sm:pb-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {filteredArticles.map((article, i) => (
              <motion.article
                key={article.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="group bg-[#0F1629] rounded-2xl border border-[#1E2A45] p-4 sm:p-6 hover:border-cyan-500/30 transition-all cursor-pointer"
                onClick={() => navigate('/app/dashboard')}
              >
                {/* Category Tag */}
                <span className={`inline-block px-2.5 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-medium border mb-3 sm:mb-4 ${categoryColors[article.category]}`}>
                  {categories.find(c => c.id === article.category)?.label}
                </span>

                {/* Title */}
                <h3 className="text-base sm:text-lg font-bold text-white mb-2 sm:mb-3 group-hover:text-cyan-400 transition-colors line-clamp-2">
                  {article.title}
                </h3>

                {/* Meta */}
                <div className="flex items-center gap-1.5 sm:gap-2 text-slate-500 text-xs sm:text-sm mb-2 sm:mb-3">
                  <span className="line-clamp-1">{article.author}</span>
                  <span>•</span>
                  <span>{article.date}</span>
                </div>

                {/* Excerpt */}
                <p className="text-slate-400 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2">
                  {article.excerpt}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between pt-3 sm:pt-4 border-t border-[#1E2A45]">
                  <span className="text-cyan-400 text-xs sm:text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                    Read More <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                  </span>
                  <span className="flex items-center gap-1 text-slate-500 text-[10px] sm:text-xs">
                    <Clock className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                    {article.readTime}
                  </span>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Submit Article Banner */}
      <section className="py-12 sm:py-16 bg-[#080C18] border-t border-[#1E2A45]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">
            Want to contribute a research article?
          </h3>
          <p className="text-slate-400 text-sm sm:text-base mb-4 sm:mb-6">
            Share your virtual lab experiments and findings.
          </p>
          <button className="px-6 py-2.5 sm:py-3 bg-[#0F1629] border border-[#1E2A45] text-slate-400 text-sm sm:text-base rounded-xl hover:border-cyan-500/50 hover:text-cyan-400 transition-all">
            Submit Article
          </button>
        </div>
      </section>
    </div>
  );
}
