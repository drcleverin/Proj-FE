 
import React, { useState } from 'react';
import { Search, Calendar, User, ArrowRight, Tag } from 'lucide-react';
import BlogHero from './BlogHero';
import BlogCard from './BlogCard';
import BlogCategories from './BlogCategories';
import Header from '@/components/Header';
 
const blogPosts = [
  {
    id: 1,
    title: "The Future of Web Development: Trends to Watch in 2024",
    excerpt: "Explore the latest trends shaping web development, from AI integration to progressive web apps and the evolution of JavaScript frameworks.",
    author: "Sarah Chen", 
    date: "2024-06-25",
    category: "Technology",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=400&fit=crop",
    readTime: "5 min read"
  },
  {
    id: 2,
    title: "Building Sustainable Digital Products: A Developer's Guide",
    excerpt: "Learn how to create environmentally conscious software solutions that minimize energy consumption and reduce digital carbon footprint.",
    author: "Marcus Rodriguez",
    date: "2024-06-22", 
    category: "Sustainability",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=400&fit=crop",
    readTime: "7 min read"
  },
  {
    id: 3,
    title: "Mastering React Hooks: Advanced Patterns and Best Practices",
    excerpt: "Deep dive into advanced React hooks patterns, custom hooks creation, and performance optimization techniques for modern React applications.",
    author: "Emily Watson",
    date: "2024-06-20",
    category: "React",
    image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=800&h=400&fit=crop",
    readTime: "8 min read"
  },
  {
    id: 4,
    title: "The Art of API Design: Creating Developer-Friendly Interfaces",
    excerpt: "Discover the principles of designing intuitive APIs that developers love to use, including REST best practices and GraphQL considerations.",
    author: "David Kim",
    date: "2024-06-18",
    category: "API Design",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&h=400&fit=crop",
    readTime: "6 min read"
  },
  {
    id: 5,
    title: "Cybersecurity in Modern Web Applications: Essential Practices",
    excerpt: "Protect your web applications with comprehensive security measures, from authentication strategies to preventing common vulnerabilities.",
    author: "Anna Petrov",
    date: "2024-06-15",
    category: "Security",
    image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=800&h=400&fit=crop",
    readTime: "9 min read"
  },
  {
    id: 6,
    title: "Mobile-First Design: Crafting Responsive User Experiences",
    excerpt: "Master the mobile-first approach to web design, ensuring your applications work seamlessly across all device sizes and screen resolutions.",
    author: "Michael Chang",
    date: "2024-06-12",
    category: "Design",
    image: "https://images.unsplash.com/photo-1483058712412-4245e9b90334?w=800&h=400&fit=crop",
    readTime: "5 min read"
  },
  {
    id: 7,
    title: "Machine Learning Integration in Web Applications",
    excerpt: "Explore practical ways to integrate machine learning models into web applications, from client-side inference to cloud-based solutions.",
    author: "Dr. Jennifer Liu",
    date: "2024-06-10",
    category: "AI/ML",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&h=400&fit=crop",
    readTime: "10 min read"
  },
  {
    id: 8,
    title: "Database Optimization: Scaling for High-Traffic Applications",
    excerpt: "Learn advanced database optimization techniques, indexing strategies, and scaling solutions for high-performance web applications.",
    author: "Robert Anderson",
    date: "2024-06-08",
    category: "Database",
    image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=800&h=400&fit=crop",
    readTime: "7 min read"
  },
  {
    id: 9,
    title: "The Rise of Edge Computing: Bringing Processing Closer to Users",
    excerpt: "Understand how edge computing is revolutionizing web performance by reducing latency and improving user experience globally.",
    author: "Sofia Gonzalez",
    date: "2024-06-05",
    category: "Cloud Computing",
    image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=800&h=400&fit=crop",
    readTime: "6 min read"
  },
  {
    id: 10,
    title: "Accessibility in Web Development: Building Inclusive Digital Experiences",
    excerpt: "Create web applications that are accessible to all users, including those with disabilities, through proper ARIA implementation and design principles.",
    author: "Thomas Brown",
    date: "2024-06-03",
    category: "Accessibility",
    image: "https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=800&h=400&fit=crop",
    readTime: "8 min read"
  },
  {
    id: 11,
    title: "Microservices Architecture: Breaking Down Monolithic Applications",
    excerpt: "Transition from monolithic to microservices architecture with practical strategies for service decomposition and inter-service communication.",
    author: "Lisa Park",
    date: "2024-06-01",
    category: "Architecture",
    image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=800&h=400&fit=crop",
    readTime: "9 min read"
  },
  {
    id: 12,
    title: "Progressive Web Apps: The Future of Mobile Web Experiences",
    excerpt: "Build app-like experiences on the web with PWAs, including offline functionality, push notifications, and native device integration.",
    author: "Alex Johnson",
    date: "2024-05-29",
    category: "PWA",
    image: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?w=800&h=400&fit=crop",
    readTime: "7 min read"
  },
  {
    id: 13,
    title: "DevOps Culture: Bridging Development and Operations Teams",
    excerpt: "Foster a collaborative DevOps culture in your organization with effective communication strategies and automated deployment pipelines.",
    author: "Maria Silva",
    date: "2024-05-27",
    category: "DevOps",
    image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=800&h=400&fit=crop",
    readTime: "6 min read"
  },
  {
    id: 14,
    title: "Blockchain Technology: Beyond Cryptocurrency Applications",
    excerpt: "Discover practical blockchain applications in web development, from smart contracts to decentralized identity management systems.",
    author: "Kevin Zhang",
    date: "2024-05-25",
    category: "Blockchain",
    image: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=800&h=400&fit=crop",
    readTime: "8 min read"
  },
  {
    id: 15,
    title: "Performance Optimization: Making Web Applications Lightning Fast",
    excerpt: "Comprehensive guide to web performance optimization, covering code splitting, lazy loading, caching strategies, and Core Web Vitals.",
    author: "Rachel Green",
    date: "2024-05-22",
    category: "Performance",
    image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=400&fit=crop",
    readTime: "10 min read"
  },
  {
    id: 16,
    title: "Cloud-Native Development: Building Applications for the Cloud Era",
    excerpt: "Embrace cloud-native development principles with containerization, serverless architectures, and cloud-first design patterns.",
    author: "James Wilson",
    date: "2024-05-20",
    category: "Cloud",
    image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&h=400&fit=crop",
    readTime: "7 min read"
  },
  {
    id: 17,
    title: "Data Privacy and GDPR Compliance in Web Development",
    excerpt: "Navigate data privacy regulations and implement GDPR-compliant solutions while maintaining excellent user experiences.",
    author: "Catherine Adams",
    date: "2024-05-18",
    category: "Privacy",
    image: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=800&h=400&fit=crop",
    readTime: "6 min read"
  },
  {
    id: 18,
    title: "Testing Strategies for Modern Web Applications",
    excerpt: "Implement comprehensive testing strategies including unit tests, integration tests, and end-to-end testing for robust applications.",
    author: "Daniel Lee",
    date: "2024-05-15",
    category: "Testing",
    image: "https://images.unsplash.com/photo-1458668383970-8ddd3927deed?w=800&h=400&fit=crop",
    readTime: "8 min read"
  },
  {
    id: 19,
    title: "The Psychology of User Experience: Designing for Human Behavior",
    excerpt: "Apply psychological principles to UX design, understanding user behavior patterns and cognitive biases to create intuitive interfaces.",
    author: "Dr. Sarah Morgan",
    date: "2024-05-12",
    category: "UX Psychology",
    image: "https://images.unsplash.com/photo-1504893524553-b855bce32c67?w=800&h=400&fit=crop",
    readTime: "9 min read"
  },
  {
    id: 20,
    title: "Version Control Mastery: Advanced Git Workflows for Teams",
    excerpt: "Master advanced Git workflows, branching strategies, and collaboration techniques for efficient team-based software development.",
    author: "Peter Thompson",
    date: "2024-05-10",
    category: "Version Control",
    image: "https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=800&h=400&fit=crop",
    readTime: "5 min read"
  }
];
 
const categories = [
  "All", "Technology", "React", "Design", "Security", "AI/ML", 
  "Database", "Cloud Computing", "Architecture", "Performance"
];
 
const Blogs = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
 
  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });
 
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50">
        <Header/>
      <BlogHero />
      
      
      {/* Search and Filter Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-6 mb-12">
          {/* Search Bar */}
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 bg-white shadow-sm focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
            />
          </div>
          
          {/* Category Filter */}
          <BlogCategories 
            categories={categories}
            selectedCategory={selectedCategory}
            onCategorySelect={setSelectedCategory}
          />
        </div>
 
        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* {filteredPosts.map((post) => (
            post.id} post={post} />
          ))} */}
{filteredPosts.map((post) => (
  <BlogCard key={post.id} post={post} />
))}

         

        </div>
 
   <div className="text-center mt-16">
          <button className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold rounded-xl hover:from-orange-600 hover:to-amber-600 transform hover:scale-105 transition-all duration-200 shadow-lg">
            Load More Articles
            <ArrowRight className="ml-2 h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
 
export default Blogs;
 
 